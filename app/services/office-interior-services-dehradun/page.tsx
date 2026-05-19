import type { Metadata } from "next";
import Script from "next/script";
import { ServiceLanding } from "@/components/ServiceLanding";
import { seoPages, siteConfig } from "@/data/site";

const page = seoPages["office-interior-services-dehradun"];

export const metadata: Metadata = {
  title: "Office Interior Services in Dehradun",
  description:
    "Office interior services in Dehradun including renovation, workstation setup, lighting, electrical coordination, meeting rooms, and turnkey execution.",
  alternates: { canonical: "/services/office-interior-services-dehradun" },
  openGraph: {
    title: "Office Interior Services in Dehradun | Aaden's Business Solutions",
    description: page.description,
    images: [{ url: page.image, width: 1200, height: 630, alt: page.title }]
  }
};

export default function OfficeInteriorPage() {
  return (
    <>
      <Script
        id="office-interior-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: page.title,
            provider: { "@type": "LocalBusiness", name: siteConfig.name, telephone: siteConfig.phone },
            areaServed: "Dehradun, Uttarakhand",
            serviceType: "Office Interior Services",
            description: page.description
          })
        }}
      />
      <ServiceLanding page={page} />
    </>
  );
}
