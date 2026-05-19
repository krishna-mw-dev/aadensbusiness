"use client";

import { useRef, useState } from "react";
import { ArrowLeft, CheckCircle2, MapPin, PhoneCall, ShieldCheck, Clock3, Star } from "lucide-react";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";
import { siteConfig, seoPages } from "@/data/site";
import { cn, whatsappUrl } from "@/lib/utils";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/SectionReveal";
import { VideoBackground } from "@/components/VideoBackground";

type ServiceLandingProps = {
  page: (typeof seoPages)[keyof typeof seoPages];
};

export function ServiceLanding({ page }: ServiceLandingProps) {
  const isSafety = page.title.toLowerCase().includes("cctv") || page.title.toLowerCase().includes("interior") || page.title.toLowerCase().includes("civil");
  const accentColor = isSafety ? "orange" : "primary";
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: y * -10, y: x * 10 });
  };

  const handleMouseLeave = () => setRotate({ x: 0, y: 0 });

  return (
    <main className="min-h-screen overflow-hidden bg-white">
      <section className="relative min-h-[85vh] flex items-center pb-20 pt-32">
        {/* Video Background with Fallback and Overlay */}
        <VideoBackground
          src={page.video || ""}
          poster={page.image}
          opacity={0.4}
          overlayOpacity={0.05}
          showControls={true}
        />
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br -z-10",
          isSafety
            ? "from-white/40 via-slate-50/20 to-orange-500/5"
            : "from-white/40 via-slate-50/20 to-blue-500/5"
        )} />
        <div className="absolute inset-0 grid-mask opacity-10 -z-10" />

        <div className="container-x relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute -top-16 left-0"
          >
            <a href="/" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-slate-400 shadow-sm transition hover:text-slate-900 hover:border-slate-300">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </a>
          </motion.div>

          <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className={cn(
                  "mb-6 inline-flex rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em]",
                  isSafety ? "border-orange-500/10 bg-orange-500/5 text-orange-600" : "border-blue-500/10 bg-blue-500/5 text-blue-600"
                )}
              >
                {page.badge}
              </motion.div>
              <h1 className="font-heading text-4xl font-black leading-[1.05] text-slate-900 sm:text-6xl md:text-8xl tracking-tight">
                {page.title.split(' ').slice(0, -1).join(' ')} <span className={cn(isSafety ? "text-gradient-orange" : "text-gradient-blue")}>{page.title.split(' ').pop()}</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl text-balance">
                {page.description}
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <MagneticButton href={whatsappUrl(`Hi Aaden's, I need ${page.title}. Please share details.`)} className="min-w-[240px]" variant={accentColor}>
                  Get Free Consultation
                </MagneticButton>
                <MagneticButton href={`tel:${siteConfig.phone}`} variant="secondary" className="min-w-[180px] border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
                  <PhoneCall className="h-4 w-4" />
                  Call Now
                </MagneticButton>
              </div>
            </motion.div>

            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className={cn("glass-card p-10 relative overflow-hidden group shadow-2xl border-slate-200 bg-white", isSafety ? "shadow-orange-500/5" : "shadow-blue-500/5")}
              initial={{ scale: 0.9, opacity: 0, rotate: 2 }}
              animate={{
                scale: 1,
                opacity: 1,
                rotate: 0,
                rotateX: rotate.x,
                rotateY: rotate.y
              }}
              transition={{
                rotateX: { type: "spring", stiffness: 100, damping: 30 },
                rotateY: { type: "spring", stiffness: 100, damping: 30 },
                default: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
              }}
              style={{ perspective: 1000 }}
            >
              <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                <ShieldCheck className={cn("w-32 h-32", isSafety ? "text-orange-600" : "text-blue-600")} />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className={cn(
                    "h-12 w-12 rounded-2xl flex items-center justify-center",
                    isSafety ? "bg-orange-50 text-orange-600" : "bg-blue-50 text-blue-600"
                  )}>
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 tracking-tight">Local Presence</h2>
                </div>

                <p className="text-sm leading-relaxed text-slate-600 mb-8">{page.result}</p>

                <div className="grid grid-cols-2 gap-3">
                  {page.areas.map((area, index) => (
                    <motion.div
                      key={area}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className={cn(
                        "flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs font-bold uppercase tracking-widest text-slate-500 transition-all hover:bg-white hover:border-slate-200",
                        isSafety ? "hover:border-orange-500/20" : "hover:border-blue-500/20"
                      )}
                    >
                      <MapPin className={cn("h-4 w-4 shrink-0", isSafety ? "text-orange-600" : "text-blue-600")} />
                      {area}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 relative border-t border-slate-200 bg-slate-50">
        <div className="container-x">
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionReveal>
              <div>
                <motion.div
                  className={cn(
                    "mb-4 inline-flex rounded-full border px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em]",
                    isSafety ? "border-orange-500/10 bg-orange-500/5 text-orange-600" : "border-blue-500/10 bg-blue-500/5 text-blue-600"
                  )}
                >
                  What We Deliver
                </motion.div>
                <h2 className="font-heading text-4xl font-black leading-tight text-slate-900 md:text-5xl tracking-tight text-balance">
                  Premium execution with site planning.
                </h2>
                <p className="mt-8 text-lg leading-relaxed text-slate-600">
                  Aaden's combines site inspection, quotation clarity, material planning, and post-project support so business owners can avoid scattered vendor management.
                </p>

                <div className="mt-12 space-y-6">
                  <div className="flex gap-4 p-4 rounded-2xl border border-slate-200 bg-white transition-colors hover:border-orange-500/20">
                    <Clock3 className="h-6 w-6 text-orange-600 shrink-0" />
                    <div>
                      <p className="font-heading text-sm font-bold text-slate-900">Fast Response</p>
                      <p className="text-xs text-slate-500 mt-1">24-hour turnaround for Dehradun site visits.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 rounded-2xl border border-slate-200 bg-white transition-colors hover:border-blue-500/20">
                    <Star className="h-6 w-6 text-blue-600 shrink-0" />
                    <div>
                      <p className="font-heading text-sm font-bold text-slate-900">Premium Quality</p>
                      <p className="text-xs text-slate-500 mt-1">Certified materials and structured deployments.</p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>

            <StaggerContainer className="grid gap-6 md:grid-cols-2">
              {page.services.map((service) => (
                <StaggerItem key={service}>
                  <div className="glass-card p-8 h-full transition-all duration-500 group border-slate-200 bg-white shadow-sm hover:shadow-md">
                    <div className={cn(
                      "h-10 w-10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform",
                      isSafety ? "bg-orange-50 text-orange-600" : "bg-blue-50 text-blue-600"
                    )}>
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-slate-900 tracking-tight mb-4">{service}</h3>
                    <p className="text-sm leading-relaxed text-slate-500">
                      Planned for commercial reliability, clean installation, and support-friendly maintenance in Dehradun commercial hubs.
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <SectionReveal className="py-24 bg-white border-t border-slate-200">
        <div className="container-x overflow-hidden rounded-[3rem] border border-slate-200 bg-slate-50 p-10 md:p-20 relative shadow-2xl shadow-slate-200/50">
          <div className={cn(
            "absolute top-0 right-0 w-96 h-96 blur-[100px] -z-10 hidden md:block",
            isSafety ? "bg-orange-500/5" : "bg-blue-500/5"
          )} />
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="font-heading text-4xl font-black leading-tight text-slate-900 md:text-6xl tracking-tight">
                Ready for {page.title}?
              </h2>
              <p className="mt-6 text-lg text-slate-600 max-w-xl">
                Get a clean, professional setup from Dehradun's trusted infrastructure partner.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <MagneticButton href={whatsappUrl(`Hi Aaden's, I want to book a consultation for ${page.title}.`)} variant={accentColor}>
                Book Consultation
              </MagneticButton>
              <MagneticButton href={`tel:${siteConfig.phone}`} variant="secondary" className="border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
                Call Aaden's
              </MagneticButton>
            </div>
          </div>
        </div>
      </SectionReveal>
    </main>
  );
}
