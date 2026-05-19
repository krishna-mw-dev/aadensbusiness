import type { Metadata } from "next";
import Script from "next/script";
import { ServiceLanding } from "@/components/ServiceLanding";
import { seoPages, siteConfig } from "@/data/site";

const page = seoPages["coworking-space-dehradun"];

export const metadata: Metadata = {
  title: "Co-working Space in Dehradun",
  description:
    "Modern co-working space in Dehradun with dedicated desks, meeting room, high-speed internet, power backup, and flexible plans for teams and founders.",
  alternates: { canonical: "/services/coworking-space-dehradun" },
  openGraph: {
    title: "Co-working Space in Dehradun | Aaden's Business Solutions",
    description: page.description,
    images: [{ url: page.image, width: 1200, height: 630, alt: page.title }]
  }
};

export default function CoworkingPage() {
  return (
    <>
      <Script
        id="coworking-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: page.title,
            provider: { "@type": "LocalBusiness", name: siteConfig.name, telephone: siteConfig.phone },
            areaServed: "Dehradun, Uttarakhand",
            serviceType: "Co-working Space",
            description: page.description
          })
        }}
      />
      <ServiceLanding page={page} />
    </>
  );
}
