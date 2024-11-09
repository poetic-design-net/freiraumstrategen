export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","assets/hero_home-old.jpg","assets/hero_home.jpg","favicon.png","global.css","sanity.svg","saturn-assets/.DS_Store","saturn-assets/images/applications/app-center-image.png","saturn-assets/images/applications/app-full-image.png","saturn-assets/images/applications/arrow-left.png","saturn-assets/images/applications/avatar-photo1.png","saturn-assets/images/applications/avatar-photo2.png","saturn-assets/images/applications/avatar-photo3.png","saturn-assets/images/applications/blue-left-light.png","saturn-assets/images/applications/button-logo1.png","saturn-assets/images/applications/button-logo2.png","saturn-assets/images/applications/center-hand-phone.png","saturn-assets/images/applications/group-app-light.png","saturn-assets/images/applications/light-full-center-blue.png","saturn-assets/images/applications/light-full-center-orange.png","saturn-assets/images/applications/light-orange.png","saturn-assets/images/applications/phone-app.png","saturn-assets/images/applications/phone-left-side.png","saturn-assets/images/applications/star-right-circle.png","saturn-assets/images/applications/star.svg","saturn-assets/images/blog/article-big.png","saturn-assets/images/blog/article-small-1.png","saturn-assets/images/blog/article-small-2.png","saturn-assets/images/blog/article-small-3.png","saturn-assets/images/blog/blog-photo-big-1.png","saturn-assets/images/blog/blog-photo-big-2.png","saturn-assets/images/blog/blog-photo-big-3.png","saturn-assets/images/blog/blue-light-left.png","saturn-assets/images/blog/image-blog-small-1.png","saturn-assets/images/blog/image-blog-small-2.png","saturn-assets/images/blog/image-blog-small-3.png","saturn-assets/images/blog/image-sm-blog-1.png","saturn-assets/images/blog/image-sm-blog-2.png","saturn-assets/images/blog/image-sm-blog-3.png","saturn-assets/images/blog/image-sm-blog-4.png","saturn-assets/images/blog/orange-light-center.png","saturn-assets/images/blog/star-circle-dark-bg.svg","saturn-assets/images/blog/star-circle-right.svg","saturn-assets/images/contact/dots-side-1.svg","saturn-assets/images/contact/dots-side-2.svg","saturn-assets/images/contact/furniture-picture.png","saturn-assets/images/contact/icon-call.svg","saturn-assets/images/contact/icon-email.svg","saturn-assets/images/contact/icon-location.svg","saturn-assets/images/contact/icon-orange-email.svg","saturn-assets/images/contact/icon-orange-headphones.svg","saturn-assets/images/contact/icon-phone.svg","saturn-assets/images/contact/icon-pointer.svg","saturn-assets/images/contact/light-left-blue.png","saturn-assets/images/contact/light-orange-right.png","saturn-assets/images/contact/red-image.png","saturn-assets/images/content/blue-light-right.png","saturn-assets/images/content/check-green.svg","saturn-assets/images/content/image-big-article.png","saturn-assets/images/content/light-blue-left.png","saturn-assets/images/content/orange-light-right.png","saturn-assets/images/content/photo-article-large.png","saturn-assets/images/content/photo-content2.png","saturn-assets/images/content/star-dark-bg.svg","saturn-assets/images/content/stars-left-top.svg","saturn-assets/images/cookies/cookie-icon-small.svg","saturn-assets/images/cookies/cookie-orange-right.svg","saturn-assets/images/cookies/cookie-white-background.svg","saturn-assets/images/cookies/cookies-big.svg","saturn-assets/images/cookies/cookies-dark-right-bottom.svg","saturn-assets/images/cookies/cookies-dark-right.svg","saturn-assets/images/cookies/gradient-background.png","saturn-assets/images/cta/avata-medium1.png","saturn-assets/images/cta/avata-medium2.png","saturn-assets/images/cta/avata-medium3.png","saturn-assets/images/cta/avatar1.png","saturn-assets/images/cta/avatar2.png","saturn-assets/images/cta/avatar3.png","saturn-assets/images/cta/avatar4.png","saturn-assets/images/cta/avatar5.png","saturn-assets/images/cta/banner-red-photo.png","saturn-assets/images/cta/blue-light-left-top.png","saturn-assets/images/cta/circle-bg.svg","saturn-assets/images/cta/circle-triple.svg","saturn-assets/images/cta/double-light-center.png","saturn-assets/images/cta/icon-building.svg","saturn-assets/images/cta/icon-users.svg","saturn-assets/images/cta/image-placeholder-blue.png","saturn-assets/images/cta/image-red.png","saturn-assets/images/cta/image-small.png","saturn-assets/images/cta/light-blue-right.png","saturn-assets/images/cta/men-image-bg.png","saturn-assets/images/cta/orange-right-bottom.png","saturn-assets/images/cta/yellow-star.svg","saturn-assets/images/faq/light-blue-left.png","saturn-assets/images/faq/light-orange-left.png","saturn-assets/images/faq/star-right.svg","saturn-assets/images/features/arrow.svg","saturn-assets/images/features/avatar-1.png","saturn-assets/images/features/avatar-2.png","saturn-assets/images/features/avatar-3.png","saturn-assets/images/features/avatar-medium.png","saturn-assets/images/features/avatar-solo.png","saturn-assets/images/features/blue-light-right.png","saturn-assets/images/features/blue-photo.png","saturn-assets/images/features/check-green.svg","saturn-assets/images/features/color-pastel-image.png","saturn-assets/images/features/icon-cam.svg","saturn-assets/images/features/icon-card.svg","saturn-assets/images/features/icon-element.svg","saturn-assets/images/features/icon-flask.svg","saturn-assets/images/features/icon-hierarchy.svg","saturn-assets/images/features/icon-money-draw.svg","saturn-assets/images/features/icon-mouse.svg","saturn-assets/images/features/icon-plane.svg","saturn-assets/images/features/icon-point.svg","saturn-assets/images/features/icon-robot.svg","saturn-assets/images/features/icon-school-bag.svg","saturn-assets/images/features/icon-writing.svg","saturn-assets/images/features/image-article1.png","saturn-assets/images/features/image-article2.png","saturn-assets/images/features/image-article3.png","saturn-assets/images/features/image-photo-1.png","saturn-assets/images/features/left-blue-center.png","saturn-assets/images/features/light-orange.png","saturn-assets/images/features/orange-right-top.png","saturn-assets/images/features/phone-picture.png","saturn-assets/images/features/star-element-right.png","saturn-assets/images/features/star-left.png","saturn-assets/images/features/start-left-bottom.png","saturn-assets/images/features/violet-image.png","saturn-assets/images/footers/background-dark.png","saturn-assets/images/footers/blue-light-left.png","saturn-assets/images/footers/envelope-light.svg","saturn-assets/images/footers/envelope.svg","saturn-assets/images/footers/icon-facebook.svg","saturn-assets/images/footers/icon-instagram.svg","saturn-assets/images/footers/icon-linkedin.svg","saturn-assets/images/footers/icon-paper-plane.svg","saturn-assets/images/footers/icon-youtube.svg","saturn-assets/images/footers/map-pin-light.svg","saturn-assets/images/footers/map-pin.svg","saturn-assets/images/footers/orange-background.png","saturn-assets/images/footers/orange-light-bottom.png","saturn-assets/images/footers/outline-facebook.svg","saturn-assets/images/footers/outline-linkedin.svg","saturn-assets/images/footers/outline-socialmedia.svg","saturn-assets/images/headers/avatar1.png","saturn-assets/images/headers/avatar2.png","saturn-assets/images/headers/avatar3.png","saturn-assets/images/headers/avatar4.png","saturn-assets/images/headers/background-gradient-photo.png","saturn-assets/images/headers/bg-folder.svg","saturn-assets/images/headers/blue-light-left-bottom.png","saturn-assets/images/headers/center-orange-light.png","saturn-assets/images/headers/icon-download.svg","saturn-assets/images/headers/icon-email-me.svg","saturn-assets/images/headers/icon-help.svg","saturn-assets/images/headers/icon-slack.svg","saturn-assets/images/headers/image-blue-header.png","saturn-assets/images/headers/image-header-1.png","saturn-assets/images/headers/image-header-2.png","saturn-assets/images/headers/image-header-3.png","saturn-assets/images/headers/light-blue-left.png","saturn-assets/images/headers/light-orange-blue-1.png","saturn-assets/images/headers/orange-full-circle-light.png","saturn-assets/images/headers/orange-light-right.png","saturn-assets/images/headers/robot-hand-header.png","saturn-assets/images/headers/small-image.png","saturn-assets/images/headers/star-background-header.png","saturn-assets/images/headers/star-dark-right.svg","saturn-assets/images/headers/star-header-dark.png","saturn-assets/images/headers/star-header-left.png","saturn-assets/images/headers/star-header-right-bottom.png","saturn-assets/images/headers/stars-orange-theme.svg","saturn-assets/images/headers/vr-header.png","saturn-assets/images/http-codes/404-alien.png","saturn-assets/images/http-codes/alien-dark-1.svg","saturn-assets/images/http-codes/alien-dark-2.svg","saturn-assets/images/http-codes/alien-ship.png","saturn-assets/images/http-codes/blue-image.png","saturn-assets/images/http-codes/blue-light-left.png","saturn-assets/images/http-codes/blue-orange-double-light.png","saturn-assets/images/http-codes/cry-face-icon.png","saturn-assets/images/http-codes/dog-photo.png","saturn-assets/images/http-codes/image-yellow.png","saturn-assets/images/http-codes/orange-light-right.png","saturn-assets/images/http-codes/pink-image.png","saturn-assets/images/http-codes/sad-face-icon.svg","saturn-assets/images/instagram-photos/blue-center-light.png","saturn-assets/images/instagram-photos/heart-icon.svg","saturn-assets/images/instagram-photos/icon-insta-white.svg","saturn-assets/images/instagram-photos/icon-instagram.svg","saturn-assets/images/instagram-photos/left-arrow.svg","saturn-assets/images/instagram-photos/photos-insta-color1.png","saturn-assets/images/instagram-photos/photos-insta-color2.png","saturn-assets/images/instagram-photos/photos-insta-color3.png","saturn-assets/images/instagram-photos/photos-insta-color4.png","saturn-assets/images/instagram-photos/photos-insta-color5.png","saturn-assets/images/instagram-photos/photos-insta-color6.png","saturn-assets/images/instagram-photos/photos-insta-color7.png","saturn-assets/images/instagram-photos/photos-insta-color8.png","saturn-assets/images/instagram-photos/right-arrow.svg","saturn-assets/images/instagram-photos/star-left-top.svg","saturn-assets/images/newsletter/bg-gradient-color-big.png","saturn-assets/images/newsletter/bg-gradient-medium.png","saturn-assets/images/newsletter/circle-star-bg.png","saturn-assets/images/newsletter/double-light.png","saturn-assets/images/newsletter/half-star-circle-top.png","saturn-assets/images/newsletter/image-ghost-big-yellow.png","saturn-assets/images/newsletter/image-yellow-ghost.png","saturn-assets/images/newsletter/light-left-top-double.png","saturn-assets/images/newsletter/light-orange-right.png","saturn-assets/images/newsletter/medium-half-right-star.png","saturn-assets/images/newsletter/shape-background.png","saturn-assets/images/newsletter/small-photo-1.png","saturn-assets/images/newsletter/small-photo-2.png","saturn-assets/images/newsletter/star-circle-medium-right.png","saturn-assets/images/pricing/check-circle-grey.svg","saturn-assets/images/pricing/circle-left-star.png","saturn-assets/images/pricing/circle-star.png","saturn-assets/images/pricing/green-check.svg","saturn-assets/images/pricing/icon-bill.svg","saturn-assets/images/pricing/icon-shield.svg","saturn-assets/images/pricing/icon1.svg","saturn-assets/images/pricing/icon2.svg","saturn-assets/images/pricing/icon3.svg","saturn-assets/images/pricing/orange-check.svg","saturn-assets/images/pricing/orange-disable.svg","saturn-assets/images/pricing/red-check.svg","saturn-assets/images/pricing/wave-bg1.svg","saturn-assets/images/pricing/wave-bg2.svg","saturn-assets/images/sign-up/avatar-pink.png","saturn-assets/images/sign-up/avatar-purple-border-2.png","saturn-assets/images/sign-up/avatar-purple-border-3.png","saturn-assets/images/sign-up/avatar-purple-border-4.png","saturn-assets/images/sign-up/avatar-purple-border.png","saturn-assets/images/sign-up/avatar-small-1.png","saturn-assets/images/sign-up/avatar-small-2.png","saturn-assets/images/sign-up/avatar-small-3.png","saturn-assets/images/sign-up/avatar-small-4.png","saturn-assets/images/sign-up/avatar-small-5.png","saturn-assets/images/sign-up/background-gradient-color.png","saturn-assets/images/sign-up/dark-background.png","saturn-assets/images/sign-up/gradient-left.png","saturn-assets/images/sign-up/icon-apple.svg","saturn-assets/images/sign-up/icon-eye.svg","saturn-assets/images/sign-up/icon-facebook.svg","saturn-assets/images/sign-up/icon-small-apple.svg","saturn-assets/images/sign-up/icon-small-facebook.svg","saturn-assets/images/sign-up/icon-small-instagram.svg","saturn-assets/images/sign-up/image-blue-scary.png","saturn-assets/images/sign-up/image-face.png","saturn-assets/images/sign-up/image-funny.png","saturn-assets/images/sign-up/image-vr-woman.png","saturn-assets/images/sign-up/image-yellow.png","saturn-assets/images/sign-up/yellow-star.svg","saturn-assets/images/stats/arrow-down.svg","saturn-assets/images/stats/arrow-up.svg","saturn-assets/images/stats/blue-center.png","saturn-assets/images/stats/chat-icon-1.svg","saturn-assets/images/stats/chat-icon-2.svg","saturn-assets/images/stats/chat-icon-3.svg","saturn-assets/images/stats/check-green.svg","saturn-assets/images/stats/icon-1.svg","saturn-assets/images/stats/icon-2.svg","saturn-assets/images/stats/icon-flight.svg","saturn-assets/images/stats/icon-football.svg","saturn-assets/images/stats/image-stat1.png","saturn-assets/images/stats/left-blue-light.png","saturn-assets/images/stats/left-orange-light.png","saturn-assets/images/stats/orange-light-medium.png","saturn-assets/images/stats/red-image.png","saturn-assets/images/stats/star-circle.svg","saturn-assets/images/stats/star-dark.svg","saturn-assets/images/team/avatar-sm-circle1.png","saturn-assets/images/team/avatar-sm-circle2.png","saturn-assets/images/team/avatar-sm-circle3.png","saturn-assets/images/team/avatar-sm-circle4.png","saturn-assets/images/team/avatar-sm-circle5.png","saturn-assets/images/team/avatar-sm-circle6.png","saturn-assets/images/team/blue-light-right.png","saturn-assets/images/team/circle-team-members1.png","saturn-assets/images/team/circle-team-members2.png","saturn-assets/images/team/circle-team-members3.png","saturn-assets/images/team/circle-team-members4.png","saturn-assets/images/team/full-blue-light.png","saturn-assets/images/team/full-orange-light.png","saturn-assets/images/team/icon-facebook-black.svg","saturn-assets/images/team/icon-facebook.svg","saturn-assets/images/team/icon-instagram-black.svg","saturn-assets/images/team/icon-instagram.svg","saturn-assets/images/team/icon-linkedin-black.svg","saturn-assets/images/team/icon-linkedin.svg","saturn-assets/images/team/icon-twitter.svg","saturn-assets/images/team/large-photo-color1.png","saturn-assets/images/team/large-photo-color2.png","saturn-assets/images/team/large-photo-color3.png","saturn-assets/images/team/light-blue.png","saturn-assets/images/team/light-orange.png","saturn-assets/images/team/orange-light-left.png","saturn-assets/images/team/photo-team-1.png","saturn-assets/images/team/photo-team-2.png","saturn-assets/images/team/photo-team-3.png","saturn-assets/images/team/photo-team-4.png","saturn-assets/images/team/photo-team-5.png","saturn-assets/images/team/photo-team-6.png","saturn-assets/images/team/photo-team-7.png","saturn-assets/images/team/photo-team-8.png","saturn-assets/images/team/photo-team-men1.png","saturn-assets/images/team/photo-team-men2.png","saturn-assets/images/team/photo-team-men3.png","saturn-assets/images/team/photo-team-men4.png","saturn-assets/images/testimonials/avatar-group-1.png","saturn-assets/images/testimonials/avatar-group-2.png","saturn-assets/images/testimonials/avatar-group-3.png","saturn-assets/images/testimonials/avatar-group-4.png","saturn-assets/images/testimonials/avatar-group-5.png","saturn-assets/images/testimonials/avatar-group-6.png","saturn-assets/images/testimonials/avatar-group-7.png","saturn-assets/images/testimonials/avatar-reviews1.png","saturn-assets/images/testimonials/avatar-reviews2.png","saturn-assets/images/testimonials/blue-light.png","saturn-assets/images/testimonials/circle-star-bg.svg","saturn-assets/images/testimonials/men-photo.png","saturn-assets/images/testimonials/orange-light.png","saturn-assets/images/testimonials/photo-testimonial1.png","saturn-assets/images/testimonials/photo-testimonial2.png","saturn-assets/images/testimonials/quote-orange.svg","saturn-assets/images/testimonials/quote-white.svg","saturn-assets/images/testimonials/quote.svg","saturn-assets/images/testimonials/star.svg","saturn-assets/logos/brands/logo-example1.png","saturn-assets/logos/brands/logo-example2.png","saturn-assets/logos/brands/logo-example3.png","saturn-assets/logos/logo-saturn-dark.svg","saturn-assets/logos/logo-saturn-light.svg","saturn-assets/logos/logo-saturn-orange.svg","svelte.svg"]),
	mimeTypes: {".jpg":"image/jpeg",".png":"image/png",".css":"text/css",".svg":"image/svg+xml"},
	_: {
		client: {"start":"_app/immutable/entry/start.C_dhKPc3.js","app":"_app/immutable/entry/app.DmWab-RP.js","imports":["_app/immutable/entry/start.C_dhKPc3.js","_app/immutable/chunks/entry.D6oZpisd.js","_app/immutable/chunks/scheduler.BW_PoDdS.js","_app/immutable/chunks/index.DSSdDI7u.js","_app/immutable/entry/app.DmWab-RP.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/scheduler.BW_PoDdS.js","_app/immutable/chunks/index.BwpyxmsR.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js')),
			__memo(() => import('../output/server/nodes/5.js')),
			__memo(() => import('../output/server/nodes/6.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/likes",
				pattern: /^\/api\/likes\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/likes/_server.ts.js'))
			},
			{
				id: "/api/posts/[id]/like",
				pattern: /^\/api\/posts\/([^/]+?)\/like\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/posts/_id_/like/_server.ts.js'))
			},
			{
				id: "/blog",
				pattern: /^\/blog\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/page/[slug]",
				pattern: /^\/page\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/post/[slug]",
				pattern: /^\/post\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/[slug]",
				pattern: /^\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
