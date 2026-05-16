import Script from "next/script";
import { HomePage } from "@/components/HomePage";
import { siteConfig } from "@/data/site";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteConfig.url}/#localbusiness`,
  name: siteConfig.name,
  url: siteConfig.url,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dehradun",
    addressRegion: "Uttarakhand",
    addressCountry: "IN"
  },
  areaServed: [
    "Dehradun",
    "Uttarakhand",
    "Rajpur Road",
    "Jakhan",
    "Dharampur",
    "Ballupur",
    "GMS Road",
    "Saharanpur Road"
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:30",
      closes: "19:30"
    }
  ],
  priceRange: "₹₹",
  description:
    "Multi-domain infrastructure and business solutions company in Dehradun providing CCTV installation, fiber networking, server setup, electrical infrastructure, civil construction, office interiors, and co-working space.",
  makesOffer: [
    "CCTV Installation",
    "Fiber Networking",
    "Server Setup",
    "Access Control Systems",
    "Electrical Solutions",
    "Office Interiors",
    "Civil Construction",
    "Co-working Space"
  ],
  sameAs: [siteConfig.mapsUrl]
};

export default function Page() {
  return (
    <>
      <Script
        id="ardens-local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <HomePage />
    </>
  );
}
