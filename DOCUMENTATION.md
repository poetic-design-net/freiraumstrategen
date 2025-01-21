# Project Documentation

## Project Structure

The project is structured as follows:

- **app/**: Contains the main application code.
  - **src/**: Source code for the application.
    - **lib/**: Library code, including components, utilities, and styles.
    - **routes/**: Route definitions for the application.
    - **static/**: Static assets like images and favicons.
  - **studio/**: Sanity Studio configuration and schemas.

## Key Files

### app/vite.config.ts
Configuration for Vite, the build tool used in the project.

### app/package.json
Contains project dependencies and scripts.

### app/src/app.html
The main HTML file for the application.

### app/src/app.pcss
The main CSS file for the application.

### app/src/lib/components/
Contains reusable Svelte components.

### app/src/lib/utils/
Contains utility functions and scripts.

### app/src/lib/styles/
Contains CSS stylesheets.

### app/src/lib/templates/
Contains Svelte templates for different sections of the application.

### app/src/routes/
Contains route definitions for the application.

### app/static/
Contains static assets like images and favicons.

### studio/
Contains Sanity Studio configuration and schemas.

### studio/schemas/
Contains Sanity schemas for different content types.

### studio/components/
Contains custom Sanity Studio components.

## Analysis

### Vite Configuration
The `vite.config.ts` file configures Vite, the build tool used in the project. It includes settings for plugins, aliases, and other build configurations.

```typescript
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  base: '/',
  optimizeDeps: {
    include: ['gsap', 'gsap/all']
  },
  build: {
    target: 'esnext'
  },
  resolve: {
    mainFields: ['browser', 'module', 'main'],
    extensions: ['.js', '.ts', '.svelte'],
    alias: {
      'gsap/all': '@gsap/shockingly/all'
    }
  }
});
```

### Package.json
The `package.json` file lists the project dependencies and scripts. Key dependencies include Svelte, Vite, and various utility libraries.

```json
{
  "name": "app",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "vite dev",
    "build": "NODE_ENV=production vite build",
    "preview": "vite preview",
    "lint": "prettier --plugin-search-dir . --check . && eslint .",
    "format": "prettier --plugin-search-dir . --write .",
    "start": "node build"
  },
  "dependencies": {
    "@gsap/shockingly": "^3.12.5",
    "@sanity/client": "^6.15.4",
    "@sanity/image-url": "^1.0.2",
    "@sanity/svelte-loader": "^1.11.1",
    "@sanity/visual-editing": "^2.1.8",
    "@sveltejs/adapter-vercel": "^5.4.6",
    "@sveltejs/kit": "^2.7.3",
    "@tailwindcss/aspect-ratio": "^0.4.2",
    "clsx": "^2.1.1",
    "groq": "^3.33.0",
    "gsap": "^3.12.5",
    "sanitize-html": "^2.13.1",
    "svelte": "^4.2.18",
    "svelte-motion": "^0.12.2",
    "tailwind-merge": "^2.5.4",
    "tailwindcss-gradients": "^3.0.0",
    "vanilla-cookieconsent": "3.0.1"
  },
  "devDependencies": {
    "@portabletext/svelte": "^2.1.11",
    "@portabletext/types": "^2.0.13",
    "@sanity/types": "^3.52.4",
    "@sveltejs/adapter-auto": "^3.2.2",
    "@sveltejs/vite-plugin-svelte": "^3.1.1",
    "@types/sanitize-html": "^2.13.0",
    "@typescript-eslint/eslint-plugin": "^6.21.0",
    "@typescript-eslint/parser": "^6.21.0",
    "autoprefixer": "^10.4.20",
    "eslint": "^8.57.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-svelte": "^2.43.0",
    "magic-string": "^0.30.14",
    "postcss": "^8.4.41",
    "prettier": "^3.3.3",
    "prettier-plugin-svelte": "^3.2.6",
    "tailwindcss": "^3.4.14",
    "tslib": "^2.6.3",
    "typescript": "^5.5.3",
    "vite": "^5.3.5"
  },
  "type": "module",
  "engines": {
    "node": "20.x"
  }
}
```

### Main HTML File
The `app.html` file is the main HTML file for the application. It includes the root element and any global scripts or styles.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="robots" content="noindex, nofollow">
    <meta charset="utf-8" />
    <link rel="icon" href="%sveltekit.assets%/favicon.png" />
    <link rel="stylesheet" href="%sveltekit.assets%/global.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <!-- Preload critical assets -->
    <link rel="preload" href="https://use.typekit.net/opp4fpc.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="https://use.typekit.net/opp4fpc.css"></noscript>
    %sveltekit.head%
  </head>
  <body class="article-page:bg-conic-gradient" data-sveltekit-preload-data="hover">
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
```

### Main CSS File
The `app.pcss` file is the main CSS file for the application. It includes global styles and any CSS variables.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  /* Set all headings to gray-900 by default */
  h1, h2, h3, h4, h5, h6,
  .font-heading {
    @apply text-gray-900;
  }

  :root {
    --header-height: 100px;
    font-family: 'sofia-pro', sans-serif;

    --background: 0 0% 100%;  /* Weiß */
    --foreground: 0 0% 13%;   /* #222 */

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 13%;

    --card: 0 0% 100%;
    --card-foreground: 0 0% 13%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;

    --primary: 189 100% 23%;  /* #006775 */
    --color-primary-50: 189 100% 97%;   /* #f0fbfc */
    --color-primary-100: 189 100% 94%;  /* #e1f7f9 */
    --color-primary-200: 189 100% 86%;  /* #b8edf2 */
    --color-primary-300: 189 100% 78%;  /* #8fe3eb */
    --color-primary-400: 189 100% 60%;  /* #3dcbdb */
    --color-primary-500: 189 100% 42%;  /* #0da6b8 */
    --color-primary-600: 189 100% 34%;  /* #0b8695 */
    --color-primary-700: 189 100% 28%;  /* #096f7c */
    --color-primary-800: 189 100% 23%;  /* #006775 - Ihre Basisfarbe */
    --color-primary-900: 189 100% 19%;  /* #005460 */
    --color-primary-950: 189 100% 10%;  /* #002c33 */
    --primary-foreground: 0 0% 100%;
    --heading: 0 0% 13%;      /* #222 für Überschriften im Light Mode */

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 0 0% 13%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 0 0% 13%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;

    --ring: 215 20.2% 65.1%;

    --radius: 0.5rem;
  }

  .dark {
    --background: 0 0% 13%;   /* #222 */
    --foreground: 0 0% 100%;  /* #fff */

    --muted: 0 0% 20%;
    --muted-foreground: 0 0% 80%;

    --popover: 0 0% 13%;
    --popover-foreground: 0 0% 100%;

    --card: 0 0% 13%;
    --card-foreground: 0 0% 100%;

    --border: 0 0% 20%;
    --input: 0 0% 20%;

    --primary: 189 100% 23%;  /* #006775 */
    --primary-foreground: 0 0% 100%;
    --heading: 0 0% 13%;      /* #222 für Überschriften im Dark Mode */

    --secondary: 0 0% 20%;
    --secondary-foreground: 0 0% 100%;

    --accent: 0 0% 20%;
    --accent-foreground: 0 0% 100%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;

    --ring: 0 0% 30%;
  }
}

@layer components {
  .page-transition {
    opacity: 0;
  }

  /* Wenn die Seite bereit ist */
  .page-ready {
    opacity: 1;
    transition: opacity 0.1s;
  }

  .line-through {
    text-decoration-line: line-through;
  }

  .h-full-header {
    height: calc(100dvh - var(--header-height));
  }

  .post-content h2 {
    @apply tracking-tight text-3xl sm:text-4xl font-light text-white mt-12 mb-6;
  }

  .post-content p {
    @apply mb-6;
  }

  .post-content ul {
    @apply p-8 mt-6 bg-gray-100 rounded-lg;
  }

  .post-content li {
    @apply flex mb-6 items-center;
  }

  .post-content li:last-child {
    @apply mb-0;
  }
  .page-content > ul > li > img {
    margin-bottom: 0 !important;
  }
}

@layer utilities {
  .-mt-screen {
    margin-top: -100vh;
  }

  .bg-gradient {
    background-image: radial-gradient(circle farthest-corner at 10% 20%, rgba(0,160,187,1) 0%, rgba(0,188,219,0.90) 90%) !important;
  }

  .bg-gradient-2 {
    background: #E0EAFC;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #CFDEF3, #E0EAFC);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #CFDEF3, #E0EAFC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  .bg-gradient-3 {
    background: #2C3E50;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to left, #0b8695, #006775) !important;  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to left, #0b8695, #006775) !important; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
}

.article-page header {
  background: #fff;
}
```

### Components
The `components` directory contains reusable Svelte components. These components are used throughout the application to build the UI.

- **AnimatedBeam.svelte**
- **AnimatedBeamBiDirectional.svelte**
- **AnimatedGradientText.svelte**
- **BackgroundImage.svelte**
- **BlockQuote.svelte**
- **Button.svelte**
- **Card.svelte**
- **Circle.svelte**
- **CleanText.svelte**
- **ContactForm.svelte**
- **ContentImageRenderer.svelte**
- **CustomListItem.svelte**
- **ImageRenderer.svelte**
- **LiveMode.svelte**
- **Logo.svelte**
- **LogoCarousel.svelte**
- **MemberForm.svelte**
- **Meteors.svelte**
- **MobileMenu.svelte**
- **PortableTextButton.svelte**
- **PortableTextContent.svelte**
- **RelatedArticle.svelte**
- **SanitizedHtml.svelte**
- **SanitizedText.svelte**
- **SanityImage.svelte**
- **ScrollSlider.svelte**
- **SEO.svelte**
- **Slider.svelte**
- **TextAlignmentBlock.svelte**
- **VideoButton.svelte**
- **VideoRenderer.svelte**
- **Welcome.svelte**
- **YouTubePlayer.svelte**

### Utilities
The `utils` directory contains utility functions and scripts. These functions are used to perform common tasks throughout the application.

- **image.ts**
- **index.ts**
- **navigation.ts**
- **slideAnimations.ts**
- **stringUtils.ts**
- **textCleaner.ts**
- **textContext.ts**

### Styles
The `styles` directory contains CSS stylesheets. These stylesheets are used to style the application.

- **hero.css**

### Templates
The `templates` directory contains Svelte templates for different sections of the application. These templates are used to build the UI for different sections of the application.

- **Calltoaction.svelte**
- **CaseSection_grid.svelte**
- **CaseSection_gsap.svelte**
- **CaseSection.svelte**
- **ComingSoonSection.svelte**
- **ContactFormSection.svelte**
- **ContactHeroSection.svelte**
- **ContentSection_alt.svelte**
- **ContentSection.svelte**
- **FaqSection.svelte**
- **FeaturesSection.svelte**
- **Footer.svelte**
- **Header.svelte**
- **HeroSection.svelte**
- **KachelSection.svelte**
- **LegalContent.svelte**
- **SalesAdvantages.svelte**
- **SalesContent.svelte**
- **SalesCurriculum.svelte**
- **SalesEmotional.svelte**
- **SalesEmotionalFreedom.svelte**
- **SalesFaq.svelte**
- **SalesFeatures.svelte**
- **SalesForWho.svelte**
- **SalesHero.svelte**
- **SalesPricing.svelte**
- **SalesWhyContent.svelte**
- **StepSection.svelte**
- **StrategyFeaturesSection_alt.svelte**
- **StrategyFeaturesSection.svelte**
- **StrategyHeroSection.svelte**
- **StrategyIntroSection.svelte**
- **Testimonials_gsap.svelte**
- **Testimonials.svelte**
- **UberunsHeroSection.svelte**
- **UberunsIntroSection.svelte**
- **UberunsTeamSection.svelte**

### Routes
The `routes` directory contains route definitions for the application. These routes define the different pages and views of the application.

- **+layout.server.ts**
- **+layout.svelte**
- **+layout.ts**
- **+page.server.ts**
- **+page.svelte**

### Static Assets
The `static` directory contains static assets like images and favicons. These assets are used throughout the application.

- **favicon.png**
- **global.css**
- **sanity.svg**
- **svelte.svg**

### Sanity Studio
The `studio` directory contains Sanity Studio configuration and schemas. Sanity Studio is used to manage content for the application.

- **.env**
- **.env.example**
- **.eslintrc**
- **.gitignore**
- **.prettierignore**
- **deskStructure.ts**
- **package.json**
- **README.md**
- **sanity.cli.ts**
- **sanity.config.ts**
- **tsconfig.json**

### Sanity Schemas
The `schemas` directory contains Sanity schemas for different content types. These schemas define the structure of different content types in the application.

- **blockContent.ts**
- **category.ts**
- **faq.ts**
- **index.ts**
- **likes.ts**
- **page.ts**
- **post.ts**
- **testimonials.ts**

### Sanity Components
The `components` directory contains custom Sanity Studio components. These components are used to build the UI for Sanity Studio.

- **LivePagePreview.tsx**
- **SectionArrayInput.tsx**
- **SectionPreview.tsx**

## Conclusion

The project is well-structured and follows best practices for a SvelteKit application. The use of Vite for build tooling and Sanity for content management makes the project highly extensible and maintainable.
