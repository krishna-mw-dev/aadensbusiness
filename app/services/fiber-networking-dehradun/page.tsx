import type { Metadata } from "next";
import Script from "next/script";
import { ServiceLanding } from "@/components/ServiceLanding";
import { seoPages, siteConfig } from "@/data/site";

const page = seoPages["fiber-networking-dehradun"];

export const metadata: Metadata = {
  title: "Fiber Networking in Dehradun",
  description:
    "Fiber networking in Dehradun for offices and commercial buildings: fiber laying, LAN cabling, rack termination, switches, testing, and support.",
  alternates: { canonical: "/services/fiber-networking-dehradun" },
  openGraph: {
    title: "Fiber Networking in Dehradun | Ardens Business Solutions",
    description: page.description,
    images: [{ url: page.image, width: 1200, height: 630, alt: page.title }]
  }
};

export default function FiberPage() {
  return (
    <>
      <Script
        id="fiber-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: page.title,
            provider: { "@type": "LocalBusiness", name: siteConfig.name, telephone: siteConfig.phone },
            areaServed: "Dehradun, Uttarakhand",
            serviceType: "Fiber Networking",
            description: page.description
          })
        }}
      />
      <ServiceLanding page={page} />
    </>
  );
}
