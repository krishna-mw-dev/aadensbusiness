"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { serviceSlideshowImages } from "@/data/site";

export function ServiceImageSlideshow() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  const images = serviceSlideshowImages;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const flareLeft = useTransform(scrollYProgress, [0, 1], ["-10%", "60%"]);

  useEffect(() => {
    if (isHovered) {
      setProgress(0);
      return;
    }

    const interval = 10; // ms
    const duration = 6000; // ms
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrent((c) => (c + 1) % images.length);
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isHovered, current]);

  const next = () => {
    setCurrent((prev) => (prev + 1) % images.length);
    setProgress(0);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
    setProgress(0);
  };

  const scrollToService = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Touch support
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 50) prev();
    else if (deltaX < -50) next();
    touchStartX.current = null;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      id="showcase"
      ref={containerRef}
      className="h-[200px] w-full bg-white relative overflow-hidden focus:outline-none border-b border-slate-100"
      tabIndex={0}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Interactive Light Flare */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none z-0 opacity-20 blur-[120px] hidden md:block"
        style={{
          background: images[current].accent === "orange" ? "radial-gradient(circle, #f97316 0%, transparent 70%)" : "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
          left: flareLeft,
          top: "20%"
        }}
      />

      {/* Dynamic Background Glow */}
      <motion.div
        animate={{
          backgroundColor: images[current].accent === "orange" ? "rgba(249, 115, 22, 0.03)" : "rgba(59, 130, 246, 0.03)"
        }}
        className="absolute inset-0 transition-colors duration-1000"
      />

      {/* Background patterns */}
      <div className="absolute inset-0 grid-mask opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />

      <div className="w-full h-full relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main Image Container */}
        <div className="h-full w-full overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: isHovered ? 1.02 : 1.1 }}
                transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
                src={images[current].url}
                alt={images[current].title}
                className="h-full w-full object-cover"
              />

              {/* Digital Scanline Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent h-20 w-full pointer-events-none z-10" style={{ animation: 'scan 8s infinite ease-in-out' }} />
            </motion.div>
          </AnimatePresence>

          {/* Progress Bar Overlay */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 backdrop-blur-md overflow-hidden">
            <motion.div
              className={cn(
                "h-full relative",
                images[current].accent === "orange" ? "bg-orange-500" : "bg-blue-500"
              )}
              style={{ width: `${progress}%` }}
            >
              <div className="absolute top-0 right-0 h-full w-4 bg-white/40 blur-md animate-pulse" />
            </motion.div>
          </div>

          {/* Counter UI - Compact */}
          <div className="absolute top-6 right-12 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            <div className="relative h-4 flex items-center justify-center min-w-[30px]">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={current}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  className="text-white text-[8px] font-black tracking-widest block"
                >
                  {String(current + 1).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
              <span className="text-white/30 text-[8px] font-black tracking-widest mx-1">/</span>
              <span className="text-white/50 text-[8px] font-black tracking-widest">
                {String(images.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Controls - Overlay on image */}
        <div className="absolute inset-y-0 left-4 md:left-8 flex items-center z-30">
          <button
            onClick={prev}
            className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all group"
          >
            <ChevronLeft className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-4 md:right-8 flex items-center z-30">
          <button
            onClick={next}
            className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all group"
          >
            <ChevronRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
