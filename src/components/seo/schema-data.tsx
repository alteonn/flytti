import { SITE_CONFIG } from '@/lib/constants';

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Flytti.se",
    "url": "https://flytti.se",
    "logo": "https://flytti.se/favicon.svg",
    "description": "Jämför flyttfirmor och få offerter från kvalitetssäkrade flyttföretag",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Solna",
      "postalCode": "169 79",
      "addressCountry": "SE"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "020-123 456",
      "contactType": "customer service",
      "email": "info@flytti.se",
      "availableLanguage": ["Swedish"]
    }
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "Flytti.se"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Sweden"
    },
    "url": service.url
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function generateReviewSchema(review: {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "LocalBusiness",
      "name": "Flytti.se",
      "@id": "https://flytti.se"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Person",
      "name": review.author
    },
    "reviewBody": review.reviewBody,
    "datePublished": review.datePublished
  };
}

export function generateLocalBusinessSchema(city: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Flytti.se ${city}`,
    "description": `Hitta och jämför flyttfirmor i ${city}. Få kostnadsfria offerter från kvalitetssäkrade flyttföretag.`,
    "url": `https://flytti.se/${city.toLowerCase()}`,
    "areaServed": {
      "@type": "City",
      "name": city
    },
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city,
      "addressCountry": "SE"
    }
  };
}