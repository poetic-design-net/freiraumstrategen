import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';
import type { GooglePlacesReview } from '$lib/types/reviewSection';
import { serverClient } from '$lib/sanity/server';
import { Buffer } from 'buffer';

const { GOOGLE_PLACES_API_KEY, OUTSCRAPER_API_KEY } = env;

interface GooglePlacesReviewRaw {
  author_name: string;
  author_url: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  language?: string;
}

interface GooglePlacesResponse {
  status: string;
  error_message?: string;
  result?: {
    reviews?: Partial<GooglePlacesReviewRaw>[];
    rating?: number;
  };
}

interface OutscraperReview {
  review_text: string;
  rating: number;
  author_name: string;
  author_link: string;
  profile_photo_url?: string;
  relative_time_description: string;
  review_datetime_utc: string;
  language?: string;
}

function isGoogleReview(review: any): review is Partial<GooglePlacesReviewRaw> {
  return 'text' in review;
}

function isOutscraperReview(review: any): review is Partial<OutscraperReview> {
  return 'review_text' in review;
}

// Helper function um zu prüfen ob ein Review aus der DACH-Region stammt
function isDACHReview(review: Partial<GooglePlacesReviewRaw> | Partial<OutscraperReview>): boolean {
  const dachKeywords = [
    'deutschland', 'german', 'berlin', 'hamburg', 'münchen', 'frankfurt', 'köln',
    'stuttgart', 'düsseldorf', 'dresden', 'leipzig', 'hannover',
    'österreich', 'austria', 'wien', 'salzburg', 'graz', 'linz', 'innsbruck',
    'schweiz', 'switzerland', 'zürich', 'bern', 'basel', 'genf'
  ];

  let reviewText = '';
  if (isGoogleReview(review)) {
    reviewText = review.text || '';
  } else if (isOutscraperReview(review)) {
    reviewText = review.review_text || '';
  }

  const authorName = review.author_name || '';
  const textToCheck = `${authorName} ${reviewText}`.toLowerCase();
  
  const hasGermanChars = /[äöüßÄÖÜ]/.test(textToCheck);
  const hasDACHKeyword = dachKeywords.some(keyword => textToCheck.includes(keyword));
  const isGerman = review.language === 'de';

  return hasGermanChars || hasDACHKeyword || isGerman;
}

async function getOutscraperReviews(placeId: string): Promise<GooglePlacesReview[]> {
  if (!OUTSCRAPER_API_KEY) {
    throw error(500, 'Outscraper API Key ist nicht konfiguriert');
  }

  try {
    const response = await fetch('https://api.outscraper.com/maps/reviews', {
      method: 'POST',
      headers: {
        'X-API-KEY': OUTSCRAPER_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: placeId,
        reviewsLimit: 50,
        language: 'de',
        sort: 'newest'
      })
    });

    if (!response.ok) {
      throw new Error(`Outscraper API Fehler: ${response.statusText}`);
    }

    const data = await response.json();
    const reviews = data[0]?.reviews_data || [];

    return reviews
      .filter((review: OutscraperReview) => review.rating === 5)
      .map((review: OutscraperReview): GooglePlacesReview => ({
        author_name: review.author_name || 'Anonym',
        author_url: review.author_link || '',
        profile_photo_url: review.profile_photo_url,
        rating: review.rating,
        relative_time_description: review.relative_time_description || 'Vor kurzem',
        text: review.review_text || '',
        time: review.review_datetime_utc ? new Date(review.review_datetime_utc).getTime() / 1000 : Date.now() / 1000
      }));
  } catch (err) {
    console.error('Outscraper API Fehler:', err);
    throw error(500, 'Fehler beim Abrufen der Outscraper Reviews');
  }
}

export const GET: RequestHandler = async ({ url }) => {
  const placeId = url.searchParams.get('placeId');
  const maxReviews = Number(url.searchParams.get('maxReviews')) || 5;
  const offset = Number(url.searchParams.get('offset')) || 0;
  const forceRefresh = url.searchParams.get('forceRefresh') === 'true';
  const source = url.searchParams.get('source') || 'google'; // 'google' oder 'outscraper'
  
  if (!placeId) {
    throw error(400, 'Place ID ist erforderlich');
  }

  console.log('Request params:', { placeId, maxReviews, offset, source });

  try {
    console.log('Starting review fetch with params:', { placeId, maxReviews, offset, forceRefresh, source });
    
    if (!forceRefresh) {
      console.log('Checking for existing reviews in Sanity...');
      try {
        const sanityReviews = await serverClient.fetch<GooglePlacesReview[]>(`
          *[_type == "googleReview" && rating == 5] | order(coalesce(
            datetime(reviewDate),
            datetime(reviewDate + "Z"),
            datetime(reviewDate + ":00Z"),
            _createdAt
          ) desc)[${offset}...${offset + maxReviews}] {
            "rating": rating,
            "author_name": authorName,
            "text": reviewText,
            "authorImage": authorImage{
              _type,
              asset->{
                _id,
                _type,
                url
              }
            },
            "author_url": authorUrl,
            "relative_time_description": relativeTimeDescription,
            "time": coalesce(
              datetime(reviewDate),
              datetime(reviewDate + "Z"),
              datetime(reviewDate + ":00Z"),
              _createdAt
            )
          }
        `);
        console.log('Fetched reviews from Sanity:', sanityReviews);
      
        if (Array.isArray(sanityReviews) && sanityReviews.length >= 5) {
          const totalCount = await serverClient.fetch<number>('count(*[_type == "googleReview" && rating == 5])');
          
          console.log(`Found ${sanityReviews.length} reviews in Sanity`);
          return new Response(JSON.stringify({
            reviews: sanityReviews,
            total: totalCount,
            hasMore: offset + maxReviews < totalCount,
            source: 'sanity'
          }), {
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'public, max-age=3600'
            }
          });
        }
      } catch (err: any) {
        console.error('Error fetching from Sanity:', err);
        if (err.response) {
          console.error('Sanity API Response:', err.response);
        }
        console.log('Falling back to external APIs...');
      }
    }

    let reviews: GooglePlacesReview[] = [];

    if (source === 'outscraper') {
      if (!OUTSCRAPER_API_KEY) {
        throw error(500, 'Outscraper API Key ist nicht konfiguriert');
      }
      reviews = await getOutscraperReviews(placeId);
    } else {
      if (!GOOGLE_PLACES_API_KEY) {
        throw error(500, 'Google Places API Key ist nicht konfiguriert');
      }

      console.log('Fetching reviews from Google Places API...');

      const detailsUrl = new URL('https://maps.googleapis.com/maps/api/place/details/json');
      detailsUrl.searchParams.append('place_id', placeId);
      detailsUrl.searchParams.append('fields', 'reviews,rating');
      detailsUrl.searchParams.append('key', GOOGLE_PLACES_API_KEY);
      detailsUrl.searchParams.append('language', 'de');
      detailsUrl.searchParams.append('reviews_sort', 'newest');
      detailsUrl.searchParams.append('maxwidth', '5000');
      detailsUrl.searchParams.append('reviews_no_translations', 'true');

      const response = await fetch(detailsUrl.toString());

      if (!response.ok) {
        throw error(response.status, `Fehler beim Abrufen der Google Places Daten: ${response.statusText}`);
      }

      const data: GooglePlacesResponse = await response.json();
      
      if (data.status === 'REQUEST_DENIED') {
        throw error(500, 'Google Places API Zugriff verweigert. Bitte überprüfen Sie den API-Schlüssel.');
      }
      
      if (data.status !== 'OK' || !data.result) {
        return new Response(JSON.stringify({
          reviews: [],
          total: 0,
          hasMore: false,
          error: data.error_message
        }), {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=3600'
          }
        });
      }

      const allReviews = data.result?.reviews || [];
      const fiveStarReviews = allReviews
        .filter((review): review is Partial<GooglePlacesReviewRaw> => 
          review?.rating === 5 && 
          typeof review.author_name === 'string' && 
          typeof review.text === 'string'
        )
        .map((review): GooglePlacesReview => ({
          author_name: review.author_name!,
          author_url: review.author_url || '',
          profile_photo_url: review.profile_photo_url,
          rating: review.rating!,
          relative_time_description: review.relative_time_description || 'Vor kurzem',
          text: review.text!,
          time: review.time || Date.now() / 1000
        }));

      reviews = fiveStarReviews;
    }
    
    // Sortiere Reviews: DACH-Region zuerst, dann nach Datum
    reviews.sort((a, b) => {
      const isDACHA = isDACHReview(a);
      const isDACHB = isDACHReview(b);
      
      if (isDACHA && !isDACHB) return -1;
      if (!isDACHA && isDACHB) return 1;
      
      return b.time - a.time;
    });

    // Wähle die angeforderte Anzahl an Reviews
    const selectedReviews = reviews.slice(0, maxReviews);
    console.log('Selected reviews for processing:', selectedReviews.length);

    console.log('Starting to process and save reviews to Sanity...');
    const reviewPromises = selectedReviews.map(async (review) => {
      if (!review.profile_photo_url) {
        return review;
      }

      try {
        const imageResponse = await fetch(review.profile_photo_url);
        if (!imageResponse.ok) {
          return review;
        }
        const imageBuffer = await imageResponse.arrayBuffer();
        
        const imageAsset = await serverClient.assets.upload('image', Buffer.from(imageBuffer), {
          filename: `review-${review.author_name.replace(/\s+/g, '-').toLowerCase()}.jpg`
        });

        const existingReviews = await serverClient.fetch<any[]>(`*[_type == "googleReview" && authorName == $authorName && reviewText == $reviewText][0]`, {
          authorName: review.author_name,
          reviewText: review.text
        });

        if (existingReviews) {
          return review;
        }

        await serverClient.create({
          _type: 'googleReview',
          rating: review.rating,
          authorName: review.author_name,
          reviewText: review.text,
          authorImage: {
            _type: 'image',
            asset: {
              _type: "reference",
              _ref: imageAsset._id
            }
          },
          reviewDate: new Date(review.time * 1000).toISOString(),
          authorUrl: review.author_url,
          relativeTimeDescription: review.relative_time_description
        });

        return {
          ...review,
          authorImage: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _id: imageAsset._id,
              url: imageAsset.url
            }
          }
        };
      } catch (err) {
        console.error('Fehler beim Speichern des Reviews:', err);
        return review;
      }
    });

    const processedReviews = await Promise.all(reviewPromises);
    
    return new Response(JSON.stringify({
      reviews: processedReviews,
      total: reviews.length,
      hasMore: offset + maxReviews < reviews.length,
      source: source
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      }
    });
  } catch (err) {
    console.error('API Fehler:', err);
    const errorMessage = err instanceof Error ? err.message : 'Unbekannter Fehler';
    throw error(500, `Fehler beim Abrufen der Bewertungen: ${errorMessage}`);
  }
};