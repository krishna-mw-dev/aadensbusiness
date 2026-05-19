"use client";

import { motion } from "framer-motion";
import { PhoneCall, MessageCircle, MapPin } from "lucide-react";
import { siteConfig } from "@/data/site";
import { whatsappUrl } from "@/lib/utils";

export function MobileSocialSidebar() {
  return (
    <div className="fixed right-4 bottom-6 z-50 flex flex-col gap-3 md:hidden">
      {/* Floating social sidebar buttons */}
      <motion.a
        href={`tel:${siteConfig.phone}`}
        initial={{ opacity: 0, x: 50, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: 1, duration: 0.5, type: "spring", stiffness: 100 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-white/20 active:bg-blue-700"
        aria-label="Call Us"
      >
        <PhoneCall className="h-5 w-5" />
      </motion.a>

      <motion.a
        href={whatsappUrl("Hi Aaden's, I want to upgrade my business infrastructure. Please call me back.")}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, x: 50, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.5, type: "spring", stiffness: 100 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 border border-white/20 active:bg-emerald-600"
        aria-label="WhatsApp Support"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.a>

      <motion.a
        href={siteConfig.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, x: 50, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5, type: "spring", stiffness: 100 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg shadow-orange-500/30 border border-white/20 active:bg-orange-600"
        aria-label="Google Maps Location"
      >
        <MapPin className="h-5 w-5" />
      </motion.a>
    </div>
  );
}
