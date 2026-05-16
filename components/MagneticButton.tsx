"use client";

import { ArrowUpRight, MessageCircle } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "whatsapp" | "ghost" | "orange" | "blue";
  className?: string;
};

export function MagneticButton({ children, href, variant = "primary", className }: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 16 });
  const springY = useSpring(y, { stiffness: 180, damping: 16 });
  const rotateX = useTransform(springY, [-18, 18], [4, -4]);
  const rotateY = useTransform(springX, [-18, 18], [-4, 4]);

  return (
    <motion.a
      href={href}
      className={cn(
        "magnetic group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full border px-6 py-3 text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-white",
        (variant === "primary" || variant === "blue") &&
          "border-[#2563EB] bg-[#2563EB] text-white shadow-[0_10px_25px_-5px_rgba(37,99,235,0.3)] hover:bg-blue-700 hover:shadow-[0_15px_30px_-5px_rgba(37,99,235,0.4)]",
        variant === "orange" &&
          "border-[#F97316] bg-[#F97316] text-white shadow-[0_10px_25px_-5px_rgba(249,115,22,0.3)] hover:bg-orange-600 hover:shadow-[0_15px_30px_-5px_rgba(249,115,22,0.4)]",
        variant === "secondary" &&
          "border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900",
        variant === "whatsapp" &&
          "border-emerald-500/10 bg-emerald-500/5 backdrop-blur-sm text-emerald-600 hover:bg-emerald-500/10 hover:border-emerald-500/20",
        variant === "ghost" &&
          "border-transparent bg-transparent text-slate-500 hover:text-slate-900",
        className
      )}
      style={{ x: springX, y: springY, rotateX, rotateY }}
      onMouseMove={(event) => {
        // Disable magnetic effect on touch/mobile
        if (window.innerWidth < 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0) return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.25);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.25);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.96 }}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 z-0 flex h-full w-full justify-center">
        <div className="relative h-full w-8 bg-white/20 blur-xl transition-all duration-500 group-hover:translate-x-[250px] -translate-x-[150px] skew-x-[45deg]" />
      </div>

      <div className="relative z-10 flex items-center gap-2">
        {variant === "whatsapp" && <MessageCircle className="h-4 w-4" />}
        <span>{children}</span>
        {variant !== "ghost" && (
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        )}
      </div>
    </motion.a>
  );
}
