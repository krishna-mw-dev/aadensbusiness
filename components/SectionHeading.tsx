"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { VideoBackground } from "@/components/VideoBackground";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
  videoSrc?: string;
  variant?: "blue" | "orange";
};

export function SectionHeading({ eyebrow, title, copy, align = "left", videoSrc, variant = "orange" }: SectionHeadingProps) {
  return (
    <div className={cn("relative", align === "center" ? "mx-auto max-w-4xl text-center" : "max-w-4xl")}>
      {videoSrc && (
        <VideoBackground
          src={videoSrc}
          opacity={0.5}
          overlayOpacity={0}
          className="rounded-[3rem] blur-3xl scale-125"
        />
      )}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className={cn(
          "mb-4 inline-flex items-center gap-2 rounded-full border backdrop-blur-sm px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em]",
          variant === "orange" ? "border-orange-500/20 bg-orange-500/5 text-orange-500" : "border-blue-500/20 bg-blue-500/5 text-blue-500",
          align === "center" && "mx-auto"
        )}
      >
        <span className={cn(
          "relative flex h-1.5 w-1.5",
          variant === "orange" ? "text-orange-500" : "text-blue-500"
        )}>
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-40"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current"></span>
        </span>
        {eyebrow}
      </motion.div>
      <motion.h2
        className="font-heading text-4xl font-black leading-[1.1] text-slate-900 md:text-6xl tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        {title}
      </motion.h2>
      {copy && (
        <motion.p
          className={cn(
            "mt-6 text-lg leading-relaxed text-slate-600 md:text-xl text-balance",
            align === "center" && "mx-auto"
          )}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {copy}
        </motion.p>
      )}
    </div>
  );
}
