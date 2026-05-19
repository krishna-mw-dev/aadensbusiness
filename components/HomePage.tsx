"use client";

import {
  ArrowRight,
  Award,
  BadgeCheck,
  Blocks,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Cpu,
  Database,
  Facebook,
  Factory,
  Headphones,
  Instagram,
  Linkedin,
  Lock,
  MapPin,
  Menu,
  PanelsTopLeft,
  PhoneCall,
  PlugZap,
  Quote,
  RadioTower,
  Router,
  SatelliteDish,
  Server,
  ShieldCheck,
  Sofa,
  Sparkles,
  Star,
  Twitter,
  Wrench,
  X,
  Youtube,
  Zap,
  ZapOff
} from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { MagneticButton } from "@/components/MagneticButton";
import { Preloader } from "@/components/Preloader";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/SectionReveal";
import { VideoBackground } from "@/components/VideoBackground";
import { useMotion } from "@/context/MotionContext";
import { ServiceImageSlideshow } from "@/components/ServiceImageSlideshow";
import dynamic from "next/dynamic";

const InteractiveHero3D = dynamic(
  () => import("./InteractiveHero3D").then((mod) => mod.InteractiveHero3D),
  { ssr: false }
);
import {
  expandedServices,
  navLinks,
  processSteps,
  projects,
  serviceSlideshowImages,
  siteConfig,
  stats,
  testimonials,
  trustPoints
} from "@/data/site";
import { cn, whatsappUrl, getOptimizedImageUrl } from "@/lib/utils";

function useCounter(target: number) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      let frame = 0;
      const total = 52;
      const tick = () => {
        frame += 1;
        const progress = 1 - Math.pow(1 - frame / total, 3);
        setCount(Math.round(target * progress));
        if (frame < total) requestAnimationFrame(tick);
      };
      tick();
      observer.disconnect();
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [target]);

  return { count, ref };
}

function Header() {
  const { isMotionEnabled, toggleMotion } = useMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex flex-col"
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-blue-500 origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* 1. Top Utility Bar (Hidden on scroll for focus) */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div
            initial={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-slate-900 text-white py-4 border-b border-white/5 overflow-hidden hidden lg:block"
          >
            <div className="container-x flex items-center justify-between">
              {/* Logo Section */}
              <a href="#" className="flex items-center gap-4 group">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="h-7 w-7 text-white" />
                </div>
                <div className="flex flex-col">
                  <p className="font-heading text-lg font-black uppercase tracking-widest leading-none">Ardens</p>
                  <p className="text-[9px] uppercase tracking-[0.4em] text-blue-400 font-bold mt-1">Business Solutions</p>
                </div>
              </a>

              {/* Center Stats */}
              <div className="flex items-center gap-12">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <Clock3 className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xs font-black uppercase tracking-wider">Open Now</p>
                    <p className="text-[10px] text-white/50 uppercase tracking-tighter">24 Hours Business Service</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <Award className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xs font-black uppercase tracking-wider">50+ Projects</p>
                    <p className="text-[10px] text-white/50 uppercase tracking-tighter">Trusted Client Base</p>
                  </div>
                </div>
              </div>

              {/* Right CTA */}
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 rounded-full bg-blue-600/20 p-1 border border-blue-500/30 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/40 to-transparent" />
                    <div className="relative z-10 flex h-full w-full items-center justify-center rounded-full bg-slate-900 text-blue-300">
                      <PhoneCall className="h-6 w-6" />
                    </div>
                  </div>
                <div className="flex flex-col text-right">
                    <p className="text-blue-400 font-heading font-black text-xl leading-none tracking-tighter">{siteConfig.phone}</p>
                    <p className="text-[9px] text-white/30 uppercase tracking-[0.25em] mt-1.5 font-black">24/7 Emergency Support</p>
                  </div>
                </div>
                <MagneticButton href="#quotation" className="h-12 px-8 text-[11px] uppercase font-black tracking-widest bg-[#38bdf8] border-[#38bdf8] text-slate-900 shadow-xl shadow-sky-500/20 hover:bg-white hover:border-white transition-all">
                  Request A Quote
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Main Navigation Bar */}
      <div className={cn(
        "bg-slate-900/95 backdrop-blur-xl border-b border-white/5 transition-all duration-500 py-4",
        scrolled ? "shadow-2xl shadow-black/20" : ""
      )}>
        <div className="container-x flex items-center justify-between">
          {/* Mobile Logo (Visible only on scroll or mobile) */}
          <a href="#" className="flex items-center gap-3 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">
              <span className="font-black text-sm text-white">A</span>
            </div>
            <p className="font-heading text-sm font-black uppercase tracking-widest text-white">Ardens</p>
          </a>

          {/* Nav Links */}
          <nav className="hidden items-center gap-10 lg:flex">
            {navLinks.map((link) => (
              <div key={link.href} className="group relative py-4">
                <a
                  href={link.href}
                  className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-white/70 hover:text-blue-400 transition-all relative group/link"
                >
                  {link.label}
                  <ChevronDown className="h-3 w-3 opacity-30 group-hover:opacity-100 group-hover:translate-y-0.5 transition-all" />
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue-500 transition-all duration-300 group-hover/link:w-full" />
                </a>

                {/* Simple world-class dropdown */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                  <div className="bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-6 min-w-[240px] backdrop-blur-xl">
                    <div className="grid gap-4">
                      {link.label === "Services" && [
                        { label: "Smart Security", icon: ShieldCheck, href: "#service-security" },
                        { label: "IT Networking", icon: Router, href: "#service-it" },
                        { label: "Civil Solutions", icon: Building2, href: "#service-civil" },
                        { label: "Smart Workspace", icon: PanelsTopLeft, href: "#service-workspace" }
                      ].map(s => (
                        <a key={s.label} href={s.href} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-blue-400 transition-colors">
                          <s.icon className="h-4 w-4" />
                          {s.label}
                        </a>
                      ))}
                      {link.label !== "Services" && (
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">View all {link.label.toLowerCase()}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="group relative py-4">
              <a href="#news" className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-white/70 hover:text-blue-400 transition-all">
                News
                <ChevronDown className="h-3 w-3 opacity-30 group-hover:opacity-100" />
              </a>
            </div>
          </nav>

          {/* Socials & Extra */}
          <div className="flex items-center gap-6">
            <div className="hidden items-center gap-4 lg:flex border-r border-white/10 pr-6">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="text-white/40 hover:text-blue-400 transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            <button
              onClick={toggleMotion}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-blue-400 transition-all"
            >
              {isMotionEnabled ? <Zap className="h-4 w-4" /> : <ZapOff className="h-4 w-4" />}
            </button>

            <button
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white lg:hidden"
              onClick={() => setOpen((value) => !value)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#f97316] py-2 relative overflow-hidden hidden md:block border-b border-black/5">
        <div className="container-x flex items-center justify-center gap-3">
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-black/10">
            <Star className="h-2 w-2 text-black" fill="currentColor" />
          </div>
          <p className="text-[9px] font-black uppercase tracking-[0.25em] text-black">
            Special Offer – New clients save 10% on all security installations.
            <a href="#quotation" className="ml-2 font-bold underline decoration-2 underline-offset-2 hover:opacity-70 transition-opacity italic">Learn More</a>
          </p>
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-black/10">
            <Star className="h-2 w-2 text-black" fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Mobile Menu (Overlay) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed inset-0 z-[60] bg-slate-950 p-8 lg:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <p className="font-heading text-xl font-black text-white uppercase tracking-widest">Menu</p>
              <button onClick={() => setOpen(false)} className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center text-white">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="text-3xl font-black text-white/60 hover:text-blue-500 transition-colors uppercase tracking-tighter"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function HeroVisual() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], [isMobile ? 0 : 60, isMobile ? 0 : -60]);
  const images = serviceSlideshowImages;
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeImage = images[current];

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setCurrent((value) => (value + 1) % images.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [images.length, isPaused]);

  const goTo = (index: number) => setCurrent((index + images.length) % images.length);
  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className="relative min-h-[560px] md:min-h-[760px] w-full flex items-center justify-center overflow-visible"
    >
      <div className="absolute inset-0 grid-mask opacity-[0.08]" />
      <motion.div
        animate={{
          backgroundColor: activeImage.accent === "orange" ? "rgba(249, 115, 22, 0.12)" : "rgba(37, 99, 235, 0.12)"
        }}
        className="absolute h-[520px] w-[520px] rounded-full blur-[130px] hidden md:block"
      />
      <div className="absolute right-0 top-20 h-64 w-64 rounded-full bg-slate-900/5 blur-[90px] hidden md:block" />

      <motion.div
        className="relative z-10 w-full max-w-[620px]"
        initial={isMobile ? { y: 50, opacity: 0 } : { y: 150, opacity: 0, scale: 0.9, rotateX: 10, filter: "blur(15px)" }}
        whileInView={{ y: 0, opacity: 1, scale: 1, rotateX: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: isMobile ? 1.2 : 2.2,
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: isMobile ? 0.8 : 1.6 },
          filter: { duration: 2 }
        }}
      >
        <div
          className="group relative overflow-hidden rounded-[2.25rem] border border-white bg-white shadow-2xl shadow-slate-300/60"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative aspect-[4/5] min-h-[520px] overflow-hidden bg-slate-900 md:aspect-[5/6]">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage.url}
                src={activeImage.url}
                alt={activeImage.title}
                initial={{ opacity: 0, scale: 1.08, filter: "blur(12px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.18),transparent_30%,transparent_70%,rgba(255,255,255,0.12))] opacity-70" />
            <div
              className="absolute inset-x-0 top-1/2 h-32 bg-gradient-to-b from-transparent via-blue-400/10 to-transparent pointer-events-none"
              style={{ animation: "scan 8s infinite ease-in-out" }}
            />

            <div className="absolute left-6 top-6 z-20 flex items-center gap-3 rounded-full bg-white/90 px-4 py-2 shadow-xl shadow-black/10 backdrop-blur-md">
              <span className={cn("h-2.5 w-2.5 rounded-full", activeImage.accent === "orange" ? "bg-orange-500" : "bg-blue-500")} />
              <span className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-900">
                Live Showcase
              </span>
            </div>

            <div className="absolute right-6 top-6 z-20 rounded-full bg-slate-950/50 px-3 py-2 text-[10px] font-black tracking-widest text-white backdrop-blur-md">
              {String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </div>

            <div className="absolute inset-x-0 bottom-0 z-20 p-6 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="mb-3 text-[10px] font-black uppercase tracking-[0.32em] text-white/55">
                    Ardens Field Work
                  </p>
                  <h3 className="font-heading text-3xl font-black leading-tight text-white md:text-5xl">
                    {activeImage.title}
                  </h3>
                  <p className="mt-4 max-w-md text-sm font-medium leading-relaxed text-white/75 md:text-base">
                    {activeImage.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-7 flex items-center justify-between gap-4">
                <div className="flex gap-2">
                  {images.map((image, index) => (
                    <button
                      key={image.url}
                      type="button"
                      aria-label={`Show ${image.title}`}
                      onClick={() => goTo(index)}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        index === current ? "w-9 bg-white" : "w-3 bg-white/35 hover:bg-white/70"
                      )}
                    />
                  ))}
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    aria-label="Previous showcase image"
                    onClick={prev}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white hover:text-slate-900"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next showcase image"
                    onClick={next}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white hover:text-slate-900"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <motion.div
              key={`${activeImage.url}-progress`}
              initial={{ width: "0%" }}
              animate={{ width: isPaused ? "0%" : "100%" }}
              transition={{ duration: 5.2, ease: "linear" }}
              className={cn(
                "absolute bottom-0 left-0 z-30 h-1",
                activeImage.accent === "orange" ? "bg-orange-500" : "bg-blue-500"
              )}
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 2.8 }}
        className="absolute top-10 right-10 z-20 hidden lg:flex flex-col gap-1 text-right pointer-events-none"
      >
        <p className="text-[7px] font-black text-blue-500 uppercase tracking-[0.4em]">Showcase.Gallery.v1</p>
        <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">Photos: <span className="text-green-500">{images.length} Active</span></p>
        <div className="h-[1px] w-24 bg-gradient-to-l from-blue-500/30 to-transparent mt-1 ml-auto" />
      </motion.div>

      <div
        className="absolute inset-x-0 top-1/2 h-40 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent pointer-events-none z-20"
        style={{ animation: "scan 10s infinite ease-in-out" }}
      />
    </motion.div>
  );
}

function ModelScrollShowcase() {
  const ref = useRef<HTMLElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const modelScale = useTransform(scrollYProgress, [0, 0.18, 0.55, 0.82, 1], [0.78, 1, 1.1, 0.96, 0.82]);
  const modelY = useTransform(scrollYProgress, [0, 0.25, 0.72, 1], [18, -38, -72, -150]);
  const modelX = useTransform(scrollYProgress, [0, 0.45, 1], ["-4%", "0%", "5%"]);
  const modelRotate = useTransform(scrollYProgress, [0, 0.22, 0.54, 0.82, 1], [-7, -1, 3, -2, 5]);
  const scanX = useTransform(scrollYProgress, [0, 1], ["-120%", "120%"]);
  const securityOpacity = useTransform(scrollYProgress, [0.05, 0.16, 0.33, 0.44], [0, 1, 1, 0]);
  const workspaceOpacity = useTransform(scrollYProgress, [0.24, 0.34, 0.52, 0.64], [0, 1, 1, 0]);
  const networkOpacity = useTransform(scrollYProgress, [0.46, 0.56, 0.74, 0.86], [0, 1, 1, 0]);
  const deliveryOpacity = useTransform(scrollYProgress, [0.68, 0.78, 0.96, 1], [0, 1, 1, 0]);

  // Mobile layout: Fit the screen, remove side nodes, remove extra space
  if (isMobile) {
    return (
      <section id="model-scroll" className="relative py-8 overflow-hidden border-y border-slate-100 bg-white">
        <div className="absolute inset-0 grid-mask opacity-[0.07] pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

        <div className="w-full px-2 relative z-10 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex justify-center"
          >
            <img
              src="/videos/model.webp"
              alt="Ardens multi-service business model"
              className="w-full h-auto max-w-[98vw] select-none drop-shadow-2xl"
              draggable={false}
            />
          </motion.div>
        </div>
      </section>
    );
  }

  // Laptop/Desktop view: Keep the high-end sticky scroll-triggered interaction
  return (
    <section ref={ref} id="model-scroll" className="relative min-h-[170vh] overflow-clip border-y border-slate-100 bg-white">
      <div className="sticky top-0 flex min-h-screen items-start overflow-hidden py-12">
        <div className="absolute inset-0 grid-mask opacity-[0.07]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
        <motion.div
          style={{ x: scanX }}
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-blue-500/[0.08] to-transparent"
        />

        <div className="container-x relative z-10">
          <div className="relative mx-auto min-h-[600px] max-w-6xl">
            <motion.div
              style={{ scale: modelScale, y: modelY, x: modelX, rotate: modelRotate }}
              className="absolute inset-x-[-12vw] top-[42%] z-10 -translate-y-1/2"
            >
              <img
                src="/videos/model.webp"
                alt="Ardens multi-service business model"
                className="mx-auto w-[1240px] max-w-none select-none drop-shadow-2xl"
                draggable={false}
              />
            </motion.div>

            <motion.div
              style={{ opacity: securityOpacity }}
              className="absolute left-0 top-6 z-20 max-w-[260px] rounded-2xl border border-orange-500/15 bg-white/90 p-5 shadow-xl shadow-orange-500/10 backdrop-blur-md"
            >
              <ShieldCheck className="h-6 w-6 text-orange-500" />
              <h3 className="mt-4 font-heading text-lg font-black text-slate-950">Security First</h3>
              <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-500">CCTV, monitoring, access control, and clean coverage planning.</p>
            </motion.div>

            <motion.div
              style={{ opacity: workspaceOpacity }}
              className="absolute right-0 top-12 z-20 max-w-[260px] rounded-2xl border border-blue-500/15 bg-white/90 p-5 shadow-xl shadow-blue-500/10 backdrop-blur-md"
            >
              <Sofa className="h-6 w-6 text-blue-600" />
              <h3 className="mt-4 font-heading text-lg font-black text-slate-900 uppercase tracking-tighter text-slate-950">Workspace Ready</h3>
              <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-500">Interiors, co-working spaces, smart rooms, and brand-ready setups.</p>
            </motion.div>

            <motion.div
              style={{ opacity: networkOpacity }}
              className="absolute bottom-28 left-4 z-20 max-w-[260px] rounded-2xl border border-blue-500/15 bg-white/90 p-5 shadow-xl shadow-blue-500/10 backdrop-blur-md"
            >
              <Router className="h-6 w-6 text-blue-600" />
              <h3 className="mt-4 font-heading text-lg font-black text-slate-950 uppercase tracking-tight text-slate-950">Connected Backbone</h3>
              <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-500">Fiber, LAN, server racks, and power coordination for daily work.</p>
            </motion.div>

            <motion.div
              style={{ opacity: deliveryOpacity }}
              className="absolute bottom-14 right-3 z-20 max-w-[260px] rounded-2xl border border-orange-500/15 bg-white/90 p-5 shadow-xl shadow-orange-500/10 backdrop-blur-md"
            >
              <Building2 className="h-6 w-6 text-orange-500" />
              <h3 className="mt-4 font-heading text-lg font-black text-slate-950">Built To Deliver</h3>
              <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-500">Civil construction, electrical repair, maintenance, and site execution.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, index }: { stat: (typeof stats)[number]; index: number }) {
  const { count, ref } = useCounter(stat.value);
  return (
    <motion.div
      ref={ref}
      className="p-8 text-center transition-all duration-500 group"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
    >
      <p className="font-heading text-4xl font-black text-slate-900 md:text-7xl tracking-tighter">
        {count}
        {stat.suffix}
      </p>
      <p className="mt-4 text-sm font-bold uppercase tracking-[0.3em] text-slate-400 group-hover:text-blue-500 transition-colors">{stat.label}</p>
    </motion.div>
  );
}

function SecuritySection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [-20, 20]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-white">
      {/* Curved Divider at Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180 bg-white z-10">
        <svg className="relative block w-[calc(100%+1.3px)] h-[50px] fill-[#2563eb]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V120c67.81-23.09,144.29-30.52,214.34-12.83,78.99,20.83,161.88,61.83,241.82,80.56Z"></path>
        </svg>
      </div>

      {/* Blue Security Hero-style Section */}
      <div className="bg-[#2563eb] pt-40 pb-20 md:pt-64 md:pb-32 relative overflow-hidden">
        {/* Animated Signal Lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          <div className="absolute top-2/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse delay-700" />
          <div className="absolute top-3/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse delay-1000" />
        </div>
        {/* Grid Mask for World-Class look */}
        <div className="absolute inset-0 grid-mask opacity-20 invert pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 hidden md:block" />

        <div className="container-x relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              style={{ y }}
              initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[400px] md:h-[550px] z-10 group/security-img"
            >
              <div className="absolute -inset-4 bg-blue-600/20 blur-3xl opacity-0 group-hover/security-img:opacity-100 transition-opacity duration-1000" />
              <img
                src="/videos/samplecctv.webp"
                alt="CCTV Surveillance"
                className="h-full w-full object-cover rounded-[3rem] shadow-2xl border-4 border-white/10 relative z-10"
              />
              {/* Pulse effect for "active" status */}
              <div className="absolute -inset-1 rounded-[3rem] border-2 border-white/20 animate-pulse z-20 pointer-events-none" />

              {/* Float effect on some icons from reference image 1 */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 h-24 w-24 rounded-3xl bg-white p-6 shadow-2xl flex items-center justify-center text-blue-600 border border-blue-100 hidden md:flex"
              >
                <ShieldCheck className="h-10 w-10" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="text-white"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20">
                  <ShieldCheck className="h-6 w-6 text-white" />
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/60">Security Excellence</span>
              </div>
              <h2 className="font-heading text-5xl font-black leading-tight md:text-7xl tracking-tighter">
                We Provide The Best <span className="text-white/80">Cyber Security</span>
              </h2>
              <p className="mt-8 text-lg leading-relaxed text-white/70 max-w-xl">
                Comprehensive infrastructure security for modern businesses. From physical CCTV surveillance to high-speed network protection, we ensure your assets are guarded 24/7.
              </p>
              <div className="mt-12 flex flex-wrap gap-6 items-center">
                <MagneticButton href="#contact" className="bg-white text-blue-600 border-white hover:bg-slate-50">
                  Get Started Now
                </MagneticButton>
                <div className="flex items-center gap-4 text-white/60">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-8 w-8 rounded-full border-2 border-blue-600 bg-slate-200" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Trusted by 50+ Teams</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Custom Services Section */}
      <div className="bg-white py-24 border-b border-slate-100">
        <div className="container-x text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white mb-6">
              Our Services
            </div>
            <h3 className="font-heading text-4xl font-black text-slate-900 md:text-5xl tracking-tight mb-16">
              Custom Services For Your Business
            </h3>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Cloud Storage Security",
                desc: "Comprehensive cloud protection for your business data, ensuring high availability and encrypted storage solutions.",
                icon: Database,
                color: "bg-[#2563eb]"
              },
              {
                title: "Data Protection",
                desc: "Secure your sensitive information with our advanced encryption and privacy-focused data management protocols.",
                icon: Lock,
                color: "bg-[#0a0a0a]"
              },
              {
                title: "Cyber Security",
                desc: "Elite infrastructure protection against digital threats, maintaining the integrity of your technical backbone.",
                icon: ShieldCheck,
                color: "bg-[#2563eb]"
              }
            ].map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "group relative p-10 rounded-[2.5rem] text-left text-white overflow-hidden shadow-xl transition-all hover:-translate-y-2",
                  service.color
                )}
              >
                <div className="flex justify-between items-start mb-12 relative z-10">
                  <div className="h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <a href="#services" className="text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">
                    Read More <ChevronRight className="inline-block h-3 w-3" />
                  </a>
                </div>

                <h4 className="font-heading text-2xl font-bold mb-4 relative z-10">{service.title}</h4>
                <p className="text-white/70 leading-relaxed text-sm relative z-10">{service.desc}</p>

                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />

                {/* Decorative pattern matching reference */}
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


function Services() {
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth < 768;
    setIsMobile(isTouch || isSmallScreen);
  }, []);

  return (
    <section id="services" className="relative">
      {/* CCTV & Smart Security Section - Light Minimal */}
      <div id="service-security" className="relative min-h-screen flex items-center overflow-hidden bg-white py-24 md:py-32">
        <VideoBackground
          src="/videos/cctv-showcase.mp4"
          poster="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1400&q=80"
          opacity={0.3}
          overlayOpacity={0.08}
          className="-z-10"
        />
        <div className="container-x relative z-10">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-6 inline-flex rounded-full border border-orange-500/10 bg-orange-500/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-orange-600">
                Security Excellence
              </div>
              <h2 className="font-heading text-5xl font-black leading-tight text-slate-900 md:text-7xl tracking-tight">
                Ensure Your <span className="text-orange-600">Safety</span> And Security.
              </h2>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-slate-600 md:text-xl">
                Premium CCTV installation in Dehradun for offices, cafes, coaching institutes, and commercial buildings. Secure your premises with clear coverage and clean wiring.
              </p>
              <div className="mt-12 grid grid-cols-2 gap-4">
                {["IP CCTV Cameras", "DVR/NVR Setup", "Remote Viewing", "AMC Support"].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.4 }}
                    className="flex items-center gap-3 text-slate-600 group/item"
                  >
                    <div className="h-8 w-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover/item:bg-orange-500 group-hover/item:text-white transition-all">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest">{item}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-12">
                <MagneticButton href="/services/cctv-installation-dehradun" variant="orange">
                  View Security Solutions
                </MagneticButton>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="aspect-[4/3] rounded-[3rem] border border-slate-200 bg-white p-8 overflow-hidden shadow-2xl shadow-slate-200/50 relative z-10">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={getOptimizedImageUrl("https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1400&q=80", isMobile ? 640 : 1200)}
                  className="absolute inset-0 h-full w-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700"
                >
                  <source src="/videos/cctv-showcase.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-40" />
                <div className="relative h-full flex flex-col justify-end">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-600 mb-2">Operational 24/7</p>
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Smart Surveillance Systems</h3>
                </div>
              </div>
              {/* High-tech backdrop glow */}
              <div className="absolute -inset-4 bg-orange-500/5 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* IT & Electrical Section - Light Minimal Soft Navy */}
      <div id="service-it" className="relative min-h-screen flex items-center bg-slate-50 py-24 md:py-32 overflow-hidden border-y border-slate-200">
        <VideoBackground
          src="/videos/hero-bg.mp4"
          poster="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80"
          opacity={0.2}
          overlayOpacity={0.03}
          className="-z-10"
        />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600 -skew-x-12 translate-x-24 opacity-[0.03] hidden lg:block" />
        <div className="container-x relative">
          <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/50 border-4 border-white aspect-[4/5]">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={getOptimizedImageUrl("https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80", isMobile ? 640 : 1200)}
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/hero-bg.mp4" type="video/mp4" />
                </video>
                <div className="absolute bottom-0 left-0 right-0 bg-blue-600 p-10 text-white">
                  <p className="text-4xl font-black">4938+</p>
                  <p className="text-sm font-bold uppercase tracking-widest opacity-80">Trusted Deployments</p>
                </div>
              </div>
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-600/5 rounded-full blur-3xl hidden md:block" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="mb-6 inline-flex items-center gap-3">
                <div className="h-px w-8 bg-blue-600" />
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-600">Electricity and Servicing</span>
              </div>
              <h2 className="font-heading text-5xl font-black leading-[1.05] text-slate-900 md:text-7xl tracking-tighter uppercase">
                Ensuring Best <span className="text-blue-600">Electrical</span> Accessibility.
              </h2>
              <p className="mt-8 text-lg leading-relaxed text-slate-600 md:text-xl">
                Structured fiber networking, LAN cabling, server infrastructure, and commercial electrical coordination. We handle the technical backbone of your business.
              </p>
              <div className="mt-12 grid gap-6">
                {[
                  { title: "Fiber Networking", desc: "High-speed commercial backbone." },
                  { title: "Server Setup", desc: "Rack termination and management." },
                  { title: "Power Infrastructure", desc: "Reliable electrical deployments." }
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                    className="flex gap-5 p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:border-blue-500/20 transition-all group/it"
                  >
                    <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover/it:bg-blue-600 group-hover/it:text-white transition-all shadow-sm">
                      <PlugZap className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-heading text-lg font-black text-slate-900 uppercase tracking-tight">{item.title}</h4>
                      <p className="text-sm text-slate-500 mt-1 font-medium">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-12 flex gap-4">
                <MagneticButton href="/services/fiber-networking-dehradun" variant="blue">
                  Get Technical Quote
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Co-working Space Section - Light Minimal */}
      <div id="service-workspace" className="relative min-h-screen flex items-center bg-white py-24 md:py-32 overflow-hidden">
        <VideoBackground
          src="/videos/coworking-showcase.mp4"
          poster="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80"
          opacity={0.25}
          overlayOpacity={0.06}
          className="-z-10"
        />
        <div className="container-x relative">
          <div className="flex flex-col items-center text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4 block">Workspace Evolution</span>
              <h2 className="font-heading text-4xl font-black text-slate-900 md:text-8xl tracking-tighter max-w-4xl uppercase">
                Work <span className="italic font-serif font-light text-blue-500">Better</span>, Together.
              </h2>
            </motion.div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-2 aspect-video rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-200 group/img relative"
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={getOptimizedImageUrl("https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80", isMobile ? 640 : 1200)}
                className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-1000"
              >
                <source src="/videos/coworking-showcase.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover/img:opacity-100 transition-opacity" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-slate-900 p-12 rounded-[3rem] border border-white/5 shadow-2xl flex flex-col justify-between text-white relative overflow-hidden"
            >
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[60px] rounded-full hidden md:block" />

              <div className="relative z-10">
                <h3 className="font-heading text-4xl font-black text-white mb-6 uppercase tracking-tight">Private Offices</h3>
                <p className="text-white/60 leading-relaxed text-lg">
                  Professional workspace solutions for freelancers, agencies, and remote teams looking for a sharp Dehradun base.
                </p>
                <div className="mt-10 space-y-6">
                  {[
                    { label: "Capacity", val: "1-4 Persons" },
                    { label: "Internet", val: "High Speed Fiber" },
                    { label: "Access", val: "Mon - Sat" }
                  ].map((spec) => (
                    <div key={spec.label} className="flex justify-between border-b border-white/10 pb-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/30">{spec.label}</span>
                      <span className="text-sm font-black text-blue-400 uppercase">{spec.val}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-10 relative z-10">
                <MagneticButton href="/services/coworking-space-dehradun" variant="blue" className="w-full bg-blue-600 text-white border-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20">
                  Explore Spaces
                </MagneticButton>
              </div>
            </motion.div>
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Community Building", "Sustainable Actions", "Incubating Innovations", "Room for Flexibility"].map((value, i) => (
              <motion.div
                key={value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-slate-50 rounded-3xl border border-slate-200"
              >
                <h4 className="font-heading text-sm font-bold text-slate-900 uppercase tracking-widest mb-2">{value}</h4>
                <div className="h-1 w-8 bg-blue-600" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Civil & Interior Section - Light Minimal */}
      <div id="service-civil" className="relative min-h-screen flex items-center bg-slate-50 py-24 md:py-32 overflow-hidden border-t border-slate-200">
        <VideoBackground
          src="/videos/civil-showcase.mp4"
          poster="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
          opacity={0.2}
          overlayOpacity={0.05}
          className="-z-10"
        />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-600/5 blur-[120px] -z-10 hidden md:block" />
        <div className="container-x relative">
          <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-lg bg-orange-600 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                New Location
              </div>
              <h2 className="font-heading text-5xl font-black leading-tight text-slate-900 md:text-8xl tracking-tighter uppercase">
                Valued <span className="text-orange-600">Site</span> Planning.
              </h2>
              <p className="mt-8 text-lg leading-relaxed text-slate-600 md:text-xl">
                Turnkey civil work and office interiors. From workstation setup to industrial fabrication, Ardens combines planning with precision execution.
              </p>

              <div className="mt-12 grid grid-cols-2 gap-8">
                {[
                  { icon: Building2, label: "Civil Construction" },
                  { icon: Sofa, label: "Office Interiors" },
                  { icon: Factory, label: "Industrial Fab" },
                  { icon: Wrench, label: "Turnkey Execution" }
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                    className="flex flex-col gap-4 group/civil"
                  >
                    <div className="h-14 w-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-orange-600 group-hover/civil:bg-orange-600 group-hover/civil:text-white group-hover/civil:border-orange-600 group-hover/civil:scale-110 transition-all shadow-lg shadow-orange-500/5">
                      <item.icon className="h-7 w-7" />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-900">{item.label}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12">
                <MagneticButton href="/services/office-interior-services-dehradun" variant="orange" className="bg-orange-600 border-orange-600 text-white hover:bg-orange-700 shadow-lg shadow-orange-500/20">
                  Consult Civil Team
                </MagneticButton>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10 rounded-[3rem] overflow-hidden border border-slate-200 shadow-2xl shadow-slate-300/50">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={getOptimizedImageUrl("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80", isMobile ? 640 : 1200)}
                  className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-1000"
                >
                  <source src="/videos/civil-showcase.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-40" />
                <div className="absolute bottom-10 left-10 right-10 p-8 rounded-3xl bg-orange-600 text-white shadow-xl">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] mb-2 text-white/80">Project Success</p>
                  <p className="text-2xl font-black">Execution with Site Planning</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Detailed Capabilities Grid */}
      <div className="bg-slate-50 py-20 border-t border-slate-200 relative z-10">
        <div className="container-x">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
            {expandedServices.map((item) => {
              const Icon = item.icon;
              const isSafety = item.label.toLowerCase().includes("cctv") ||
                               item.label.toLowerCase().includes("civil") ||
                               item.label.toLowerCase().includes("interior") ||
                               item.label.toLowerCase().includes("renovation") ||
                               item.label.toLowerCase().includes("electrical");

              return (
                <div key={item.label} className={cn(
                  "rounded-2xl border border-slate-200 bg-white p-4 transition shadow-sm group",
                  isSafety ? "hover:border-orange-500/40 hover:shadow-md" : "hover:border-blue-500/40 hover:shadow-md"
                )}>
                  <Icon className={cn(
                    "h-5 w-5 text-slate-400 transition-colors",
                    isSafety ? "group-hover:text-orange-500" : "group-hover:text-blue-500"
                  )} />
                  <p className="mt-3 text-sm font-semibold leading-5 text-slate-900">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function QuoteEstimator() {
  const [service, setService] = useState("CCTV & Security");
  const [size, setSize] = useState("10-30");
  const [scale, setScale] = useState("Standard");
  const [budget, setBudget] = useState("2L-5L");
  const [location, setLocation] = useState("Rajpur Road");

  const estimate = useMemo(() => {
    const base =
      service === "Civil Solutions" ? 180000 :
      service === "Co-working Space" ? 25000 :
      service === "CCTV & Security" ? 75000 :
      85000; // Default for IT & Electrical
    const sizeFactor = size === "1-10" ? 0.75 : size === "10-30" ? 1.15 : size === "30+" ? 1.8 : 1;
    const scaleFactor = scale === "Premium" ? 1.55 : scale === "Enterprise" ? 2.25 : 1;
    const low = Math.round((base * sizeFactor * scaleFactor) / 1000) * 1000;
    const high = Math.round((low * 1.42) / 1000) * 1000;
    return { low, high };
  }, [service, size, scale]);

  return (
    <section id="quotation" className="py-24 md:py-32 relative overflow-hidden bg-white">
      <div className="container-x relative">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] items-center">
          <SectionHeading
            eyebrow="Smart Quotation"
            title="Get a practical project range before the site visit."
            copy="Select your rough requirement and Ardens will map the probable investment range. Final pricing depends on site inspection and support scope."
            variant="blue"
          />

          <div className="glass-card p-8 md:p-12 relative overflow-hidden bg-slate-50 border-slate-200">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
              <CircleDollarSign className="w-40 h-40 text-blue-600" />
            </div>

            <div className="relative z-10 grid gap-6 md:grid-cols-2">
              {[
                ["Service Type", service, setService, ["CCTV & Security", "IT & Electrical", "Civil Solutions", "Co-working Space"]],
                ["Business Size", size, setSize, ["1-10", "10-30", "30+"]],
                ["Location", location, setLocation, ["Rajpur Road", "Jakhan", "Ballupur", "Dharampur", "GMS Road"]],
                ["Project Scale", scale, setScale, ["Standard", "Premium", "Enterprise"]],
                ["Budget Range", budget, setBudget, ["Below 2L", "2L-5L", "5L-10L", "10L+"]]
              ].map(([label, value, setter, options]) => (
                <label key={label as string} className={cn("block", label === "Budget Range" && "md:col-span-2")}>
                  <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">{label as string}</span>
                  <div className="relative group">
                    <select
                      value={value as string}
                      onChange={(event) => (setter as (value: string) => void)(event.target.value)}
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 md:px-5 py-3 md:py-4 text-xs md:text-sm font-bold text-slate-900 outline-none transition-all focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 hover:border-slate-300"
                    >
                      {(options as string[]).map((option) => (
                        <option key={option} className="bg-white text-slate-900">{option}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-transform group-hover:translate-y-[-40%]">
                      <ChevronRight className="h-4 w-4 rotate-90" />
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${estimate.low}-${estimate.high}`}
                className="mt-10 overflow-hidden rounded-2xl border border-blue-500/10 bg-blue-500/5 p-8 backdrop-blur-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="flex items-center gap-3 text-orange-600 mb-6">
                  <div className="h-8 w-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <CircleDollarSign className="h-4 w-4" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em]">Estimated Range</p>
                </div>

                <div className="flex flex-col md:flex-row md:items-end gap-4">
                  <p className="font-heading text-5xl font-black text-slate-900 md:text-6xl tracking-tight">
                    ₹{estimate.low.toLocaleString("en-IN")} <span className="text-2xl text-slate-400 font-bold mx-2">-</span> ₹{estimate.high.toLocaleString("en-IN")}
                  </p>
                </div>

                <p className="mt-6 text-sm leading-relaxed text-slate-600 max-w-lg">
                  For <span className="text-slate-900 font-bold">{service.toLowerCase()}</span> in {location}, aligned to a {scale.toLowerCase()} deployment and {budget} budget intent.
                </p>

              <div className="mt-10 flex flex-wrap gap-4">
                  <MagneticButton href={whatsappUrl(`Hi Ardens, I want a quotation for ${service} in ${location}. Business size: ${size}, scale: ${scale}.`)} variant="primary">
                    Send Requirement
                  </MagneticButton>
                  <MagneticButton href={`tel:${siteConfig.phone}`} variant="secondary" className="border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
                    Call Now
                  </MagneticButton>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseBento() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="container-x">
        <SectionHeading
          eyebrow="Why Choose Ardens"
          title="Built for businesses that need one accountable infrastructure partner."
          align="center"
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-full">
          {/* Main Card */}
          <motion.div
            className="md:col-span-2 md:row-span-2 glass-card p-6 md:p-8 flex flex-col justify-between overflow-hidden relative group border-slate-200 bg-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
              <Blocks className="w-32 h-32 text-blue-600" />
            </div>
            <div>
              <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
                <Blocks className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">End-to-End Solutions</h3>
              <p className="text-slate-600 text-lg max-w-md leading-relaxed">
                Civil, IT, electrical, security, and workspace support under one accountable team. We handle the complexity so you can focus on your business.
              </p>
            </div>
            <div className="mt-8 flex gap-4">
              <div className="px-4 py-2 rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500">Planning</div>
              <div className="px-4 py-2 rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500">Execution</div>
              <div className="px-4 py-2 rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500">Maintenance</div>
            </div>
          </motion.div>

          {/* Side Card 1 */}
          <motion.div
            className="glass-card p-6 flex flex-col justify-between group border-slate-200 bg-white"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="h-10 w-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 mb-4 group-hover:scale-110 transition-transform">
              <Clock3 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Fast Deployment</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                Lean execution planning for Dehradun offices that need to open or scale quickly.
              </p>
            </div>
          </motion.div>

          {/* Side Card 2 */}
          <motion.div
            className="glass-card p-6 flex flex-col justify-between group border-slate-200 bg-white"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-110 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Technical Expertise</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                Network diagrams, device planning, server racks, and electrical load awareness.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Bottom Card 1 */}
          <motion.div
            className="glass-card p-6 flex items-center gap-4 group border-slate-200 bg-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="h-12 w-12 shrink-0 rounded-full bg-slate-50 flex items-center justify-center text-orange-600 group-hover:bg-orange-100 transition-colors">
              <BadgeCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900">Single Vendor</h4>
              <p className="text-slate-500 text-xs">One point of accountability.</p>
            </div>
          </motion.div>

          {/* Bottom Card 2 */}
          <motion.div
            className="glass-card p-6 flex items-center gap-4 group border-slate-200 bg-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="h-12 w-12 shrink-0 rounded-full bg-slate-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900">Dedicated Support</h4>
              <p className="text-slate-500 text-xs">Always here when you need us.</p>
            </div>
          </motion.div>

          {/* Bottom Card 3 */}
          <motion.div
            className="glass-card p-6 flex items-center gap-4 group border-slate-200 bg-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="h-12 w-12 shrink-0 rounded-full bg-slate-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100 transition-colors">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900">Scalable</h4>
              <p className="text-slate-500 text-xs">Built for your future growth.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-24 overflow-hidden bg-slate-950 text-white">
      {/* Background grid-mask matching hero */}
      <div className="absolute inset-0 grid-mask opacity-10 pointer-events-none" />

      {/* Signal Line animation matching security section */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-pulse" />

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="container-x relative grid gap-10 md:gap-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-6 md:space-y-10">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/20">
              <ShieldCheck className="h-6 w-6 md:h-7 md:w-7 text-white" />
            </div>
            <div className="flex flex-col">
              <p className="font-heading text-lg md:text-xl font-black uppercase tracking-widest leading-none">Ardens</p>
              <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-blue-400 font-black mt-1">Business Solutions</p>
            </div>
          </div>
          <p className="text-sm md:text-base leading-relaxed text-white/40 font-medium">
            Multi-domain infrastructure and business solutions for Dehradun, Uttarakhand, and expanding commercial teams across India.
          </p>
          <div className="flex flex-wrap gap-3 md:gap-4">
            {[Facebook, Twitter, Instagram, Youtube, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-xl md:rounded-2xl bg-white/5 border border-white/5 text-white/40 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm group"
              >
                <Icon className="h-4 w-4 md:h-5 md:w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 md:block md:space-y-10 lg:col-span-1">
          <div className="space-y-5">
            <p className="font-heading text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-6 md:mb-10">Quick Links</p>
            <ul className="space-y-4 md:space-y-5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-[11px] md:text-sm font-black uppercase tracking-widest text-white/40 transition-colors hover:text-blue-500 flex items-center gap-3 group">
                    <span className="h-px w-0 bg-blue-500 transition-all group-hover:w-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5 md:mt-10">
            <p className="font-heading text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-6 md:mb-10">Our Expertise</p>
            <ul className="space-y-4 md:space-y-5">
              {["CCTV Installation", "Fiber Networking", "Office Interiors", "Electrical Solutions", "Server Setup", "Co-working Space"].map((service) => (
                <li key={service} className="text-[11px] md:text-sm font-black uppercase tracking-widest text-white/40 flex items-center gap-3 group hover:text-white transition-colors cursor-default">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-600/30 group-hover:bg-blue-600 transition-colors" />
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <p className="font-heading text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-6 md:mb-10">Direct Contact</p>
          <div className="space-y-6 md:space-y-8 text-sm text-white/40">
            <div className="flex gap-4 md:gap-5">
              <div className="h-9 w-9 md:h-10 md:w-10 shrink-0 rounded-xl bg-white/5 flex items-center justify-center text-blue-600 border border-white/5">
                <MapPin className="h-4 w-4 md:h-5 md:w-5" />
              </div>
              <p className="font-medium leading-relaxed uppercase text-[10px] md:text-[11px] tracking-widest">{siteConfig.address}</p>
            </div>
            <div className="flex gap-4 md:gap-5">
              <div className="h-9 w-9 md:h-10 md:w-10 shrink-0 rounded-xl bg-white/5 flex items-center justify-center text-blue-600 border border-white/5">
                <Clock3 className="h-4 w-4 md:h-5 md:w-5" />
              </div>
              <p className="font-medium uppercase text-[10px] md:text-[11px] tracking-widest">{siteConfig.hours}</p>
            </div>
            <a href={`tel:${siteConfig.phone}`} className="flex gap-4 md:gap-5 hover:text-white transition-colors group">
              <div className="h-9 w-9 md:h-10 md:w-10 shrink-0 rounded-xl bg-blue-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg shadow-blue-600/20">
                <PhoneCall className="h-4 w-4 md:h-5 md:w-5" />
              </div>
              <p className="font-black text-base md:text-lg tracking-tighter text-white">{siteConfig.phone}</p>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function HomePage() {
  const { isMotionEnabled } = useMotion();
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth < 768;
    const mobileStatus = isTouch || isSmallScreen;
    setIsMobile(mobileStatus);

    if (mobileStatus) return;

    // Automatically play/pause all static video elements based on viewport visibility
    const videos = document.querySelectorAll("video");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.05 }
    );

    videos.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Preloader />

      <Header />
      <main className="pt-[110px] md:pt-[170px]">
        <section className="relative overflow-hidden pb-24 bg-white">
          {/* Hero Static Background */}
          <div className="absolute inset-0 bg-white -z-20" />
          <div className="absolute inset-0 grid-mask opacity-[0.05] -z-10" />

          {/* Very subtle background elements */}
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-600/[0.03] blur-[180px] -z-10 hidden md:block" />
          <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-orange-600/[0.02] blur-[180px] -z-10 hidden md:block" />

          <div className="container-x relative grid items-center gap-16 lg:grid-cols-[1fr_0.9fr]">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/10 bg-blue-500/5 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.25em] text-blue-600"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Smart Infrastructure Solutions
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-3xl font-heading text-3xl font-black leading-[1.05] text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl tracking-tight"
              >
                Building <span className="text-gradient-blue italic">Modern</span> Business Infrastructure
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg text-balance font-medium"
              >
                From enterprise networking and CCTV infrastructure to civil construction and co-working spaces, Ardens delivers complete business solutions with speed and precision.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
              >
                <MagneticButton href="#quotation" className="min-w-[220px] shadow-2xl shadow-blue-500/20">
                  Get Free Consultation
                </MagneticButton>
                <MagneticButton href="#services" variant="secondary" className="min-w-[200px] border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
                  Explore Services
                </MagneticButton>
              </motion.div>

              <StaggerContainer delay={1.4} className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
                {trustPoints.map((point) => {
                  const Icon = point.icon;
                  return (
                    <StaggerItem key={point.label}>
                      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm hover:border-blue-500/30 hover:shadow-xl hover:-translate-y-1 transition-all group">
                        <Icon className="h-5 w-5 text-orange-500 group-hover:scale-110 transition-transform" />
                        <p className="mt-4 text-xs font-bold text-slate-900 tracking-wide">{point.label}</p>
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              <HeroVisual />
            </motion.div>
          </div>
        </section>

        <SectionReveal className="py-12">
          {/* Desktop Grid Layout */}
          <div className="container-x hidden md:grid gap-4 md:grid-cols-4">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>

          {/* Mobile Endless Ticker Layout */}
          <div className="md:hidden w-full overflow-hidden relative py-4 bg-white select-none pointer-events-none">
            {/* Edge Fades for high-tech premium feel */}
            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent z-10" />

            <motion.div
              className="flex gap-16 whitespace-nowrap pr-16"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                ease: "linear",
                duration: 16,
                repeat: Infinity,
              }}
              style={{ width: "fit-content" }}
            >
              {/* Double items for infinite loop seamless connection */}
              {[...stats, ...stats].map((stat, i) => (
                <div key={i} className="inline-flex flex-col items-center justify-center min-w-[220px]">
                  <p className="font-heading text-4xl font-black text-slate-900 tracking-tighter">
                    {stat.value}{stat.suffix}
                  </p>
                  <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </SectionReveal>

        <ModelScrollShowcase />

        <SecuritySection />

        <SectionReveal>
          <Services />
        </SectionReveal>

        <WhyChooseBento />

        <section id="projects" className="py-24 md:py-32">
          <div className="container-x">
            <SectionHeading
              eyebrow="Recent Deployments"
              title="Local Dehradun projects with a clean execution mindset."
              copy="A premium website should show real operational credibility. These sample deployment patterns reflect the type of work Ardens handles for local commercial clients."
              variant="blue"
            />

            <StaggerContainer className="mt-16 grid gap-8 md:grid-cols-2">
              {projects.map((project, i) => (
                <StaggerItem key={project.title}>
                  <motion.article
                    whileHover={{ y: -8 }}
                    className="project-card group overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-slate-200 bg-white hover:border-blue-500/30 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 relative"
                  >
                    <div className="relative h-64 md:h-96 overflow-hidden">
                      <div className="absolute inset-0 bg-cover bg-center transition duration-1000 group-hover:scale-110 opacity-90" style={{ backgroundImage: `url(${getOptimizedImageUrl(project.after, isMobile ? 640 : 1200)})` }} />

                      {/* Project Video Hover Preview */}
                      {!isMobile && project.video && isMotionEnabled && (
                        <video
                          muted
                          loop
                          playsInline
                          onMouseEnter={(e) => e.currentTarget.play()}
                          onMouseLeave={(e) => {
                            e.currentTarget.pause();
                            e.currentTarget.currentTime = 0;
                          }}
                          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10"
                        >
                          <source src={project.video} type="video/mp4" />
                        </video>
                      )}

                      <div className="project-before absolute inset-0 bg-cover bg-center z-20" style={{ backgroundImage: `url(${getOptimizedImageUrl(project.before, isMobile ? 640 : 1200)})` }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 z-30" />

                      <div className="absolute left-8 top-8 rounded-full bg-white/90 px-5 py-2 text-[10px] font-black uppercase tracking-widest text-slate-900 backdrop-blur-md border border-white/20 z-40">
                        Before / After
                      </div>

                      {/* High-tech overlay on hover */}
                      <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none" />
                    </div>

                    <div className="p-6 md:p-10 relative z-40 bg-white">
                      <div className="mb-4 md:mb-6 flex flex-wrap gap-2">
                        {[project.location, project.duration, project.category].map((meta) => (
                          <span key={meta} className="rounded-full border border-slate-100 bg-slate-50 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-500 transition-colors">
                            {meta}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-heading text-3xl font-black text-slate-900 tracking-tight uppercase">{project.title}</h3>
                      <p className="mt-4 text-base leading-relaxed text-slate-500 font-medium">{project.result}</p>

                      <div className="mt-8 pt-8 border-t border-slate-50 flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Case Study 0{i + 1}</span>
                        <MagneticButton href="#contact" variant="secondary" className="h-10 w-10 p-0 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                          <ArrowRight className="h-5 w-5" />
                        </MagneticButton>
                      </div>
                    </div>
                  </motion.article>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden border-y border-slate-200">
          <div className="container-x relative">
            <SectionHeading
              eyebrow="Execution Process"
              title="A clear five-step workflow from first call to post-installation support."
              align="center"
              variant="blue"
            />

            <StaggerContainer className="mt-16 grid gap-6 md:grid-cols-5">
              {processSteps.map((step, index) => (
                <StaggerItem key={step} className="relative">
                  <div className="h-full rounded-3xl border border-slate-200 bg-white p-6 md:p-10 shadow-sm hover:border-blue-500/30 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                    <p className="font-heading text-5xl md:text-7xl font-black text-blue-500/5 group-hover:text-blue-500/10 transition-colors absolute -top-4 -left-2">0{index + 1}</p>
                    <div className="relative z-10">
                      <div className="h-10 w-10 md:h-12 md:w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-blue-600 mb-6 md:mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                        <BadgeCheck className="h-5 w-5 md:h-6 md:h-6" />
                      </div>
                      <p className="font-heading text-lg md:text-xl font-black text-slate-900 leading-tight uppercase tracking-tighter">{step}</p>
                      <p className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-blue-500 transition-colors">Phase 0{index + 1}</p>
                    </div>

                    {index < processSteps.length - 1 && (
                      <div className="absolute top-1/2 -right-3 z-20 hidden md:block">
                        <ArrowRight className="h-6 w-6 text-slate-200" />
                      </div>
                    )}
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <SectionReveal>
          <QuoteEstimator />
        </SectionReveal>

        <section id="reviews" className="py-24 md:py-32 relative overflow-hidden bg-white">
          <div className="container-x relative">
            <SectionHeading
              eyebrow="Trust & Credibility"
              title="Dehradun businesses choose Ardens for sharp execution and reliability."
              align="center"
              variant="orange"
            />

            <StaggerContainer className="mt-16 grid gap-6 lg:grid-cols-4">
              {testimonials.map((review, i) => (
                <StaggerItem key={review.name}>
                  <motion.article
                    whileHover={{ y: -5 }}
                    className="glass-card p-6 md:p-10 h-full flex flex-col justify-between border-slate-200 bg-white relative overflow-hidden group/review"
                  >
                    {/* High-tech accent */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 blur-[40px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover/review:bg-blue-600/10 transition-colors" />

                    <div>
                      <div className="flex justify-between items-start mb-8">
                        <Quote className="h-10 w-10 text-blue-600/10 group-hover/review:text-blue-600/20 transition-colors" />
                        <div className="flex gap-0.5">
                          {Array.from({ length: review.rating }).map((_, star) => (
                            <Star key={star} className="h-3 w-3 fill-orange-500 text-orange-500" />
                          ))}
                        </div>
                      </div>
                      <p className="text-base leading-relaxed text-slate-600 italic font-medium">"{review.quote}"</p>
                    </div>
                    <div className="mt-10 border-t border-slate-50 pt-8 flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-blue-600 font-black text-sm border-2 border-white shadow-md">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-heading text-base font-black text-slate-900 uppercase tracking-tighter">{review.name}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-blue-600/60 mt-1">{review.role}</p>
                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 mt-1">{review.area}</p>
                      </div>
                    </div>
                  </motion.article>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <SectionReveal id="contact" className="py-24 bg-white">
          <div className="container-x overflow-hidden rounded-[2rem] md:rounded-[4rem] border border-slate-200 bg-slate-950 p-8 md:p-24 relative shadow-2xl shadow-blue-500/10">
            {/* High-tech background patterns */}
            <div className="absolute inset-0 grid-mask opacity-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 hidden md:block" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-600/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 hidden md:block" />

            <div className="grid items-center gap-16 lg:grid-cols-[1.2fr_0.8fr] relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="mb-8 inline-flex items-center gap-3">
                  <div className="h-px w-12 bg-blue-500" />
                  <span className="text-xs font-black uppercase tracking-[0.4em] text-blue-500">Contact Infrastructure Experts</span>
                </div>
                <h2 className="font-heading text-4xl font-black leading-[1] text-white md:text-8xl tracking-tighter uppercase">
                  Ready To <span className="text-blue-500">Upgrade</span> Your Assets?
                </h2>
                <p className="mt-10 max-w-2xl text-lg leading-relaxed text-white/40 md:text-xl font-medium">
                  Talk to Ardens for CCTV, fiber networking, office interiors, electrical work, or a professional workspace solutions. One team, total accountability.
                </p>

                <div className="mt-12 flex flex-wrap gap-8">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Call Directly</span>
                    <a href={`tel:${siteConfig.phone}`} className="text-2xl font-black text-white hover:text-blue-500 transition-colors tracking-tight">{siteConfig.phone}</a>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Write to us</span>
                    <a href={`mailto:${siteConfig.email}`} className="text-2xl font-black text-white hover:text-blue-500 transition-colors tracking-tight">{siteConfig.email}</a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex flex-col gap-4 min-w-[300px]"
              >
                <MagneticButton href="#quotation" variant="blue" className="h-16 text-xs uppercase font-black tracking-widest bg-blue-600 border-blue-600 hover:bg-white hover:text-slate-900 transition-all shadow-xl shadow-blue-500/20">
                  Schedule Consultation
                </MagneticButton>
                <MagneticButton href={whatsappUrl("Hi Ardens, I want to upgrade my business infrastructure. Please call me back.")} variant="whatsapp" className="h-16 text-xs uppercase font-black tracking-widest bg-emerald-500 border-emerald-500 hover:bg-white hover:text-emerald-600 transition-all shadow-xl shadow-emerald-500/20">
                  WhatsApp Support
                </MagneticButton>
                <MagneticButton href={`tel:${siteConfig.phone}`} variant="secondary" className="h-16 text-xs uppercase font-black tracking-widest border-white/10 bg-white/5 text-white hover:bg-white hover:text-slate-900 transition-all">
                  Request Callback
                </MagneticButton>
              </motion.div>
            </div>
          </div>
        </SectionReveal>
      </main>
      <Footer />

      {/* Floating WhatsApp Button */}
      <motion.a
        href={whatsappUrl("Hi Ardens, I'm interested in your infrastructure solutions.")}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-[100] h-16 w-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/40 border-4 border-white group"
      >
        <div className="absolute inset-0 rounded-full animate-ping bg-emerald-400 opacity-20 group-hover:opacity-40" />
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-8 w-8 relative z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.353-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.a>
    </>
  );
}
