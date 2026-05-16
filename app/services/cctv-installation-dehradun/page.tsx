import type { Metadata } from "next";
import Script from "next/script";
import { ServiceLanding } from "@/components/ServiceLanding";
import { seoPages, siteConfig } from "@/data/site";

const page = seoPages["cctv-installation-dehradun"];

export const metadata: Metadata = {
  title: "CCTV Installation in Dehradun",
  description:
    "Premium CCTV installation in Dehradun for offices, cafes, coaching institutes, retail stores, warehouses, and commercial buildings. Get site inspection and clean installation support.",
  alternates: { canonical: "/services/cctv-installation-dehradun" },
  openGraph: {
    title: "CCTV Installation in Dehradun | Ardens Business Solutions",
    description: page.description,
    images: [{ url: page.image, width: 1200, height: 630, alt: page.title }]
  }
};

export default function CctvPage() {
  return (
    <>
      <Script
        id="cctv-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: page.title,
            provider: { "@type": "LocalBusiness", name: siteConfig.name, telephone: siteConfig.phone },
            areaServed: "Dehradun, Uttarakhand",
            serviceType: "CCTV Installation",
            description: page.description
          })
        }}
      />
      <ServiceLanding page={page} />
    </>
  );
}
