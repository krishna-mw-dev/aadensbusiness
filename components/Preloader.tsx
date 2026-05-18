"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setVisible(false);
      return;
    }
    const timer = window.setTimeout(() => setVisible(false), 3200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] hidden md:flex items-center justify-center overflow-hidden bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }}
        >
          {/* Ambient Glows */}
          <div className="absolute inset-0 grid-mask opacity-5" />

          <motion.div
            className="absolute h-[600px] w-[600px] bg-blue-500/5 blur-[120px] rounded-full -translate-x-1/2"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute h-[500px] w-[500px] bg-orange-500/5 blur-[100px] rounded-full translate-x-1/2"
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          {/* Full Screen Image */}
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src="/videos/preloader.webp"
              alt="Ardens Infrastructure"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-white/10" />
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            {/* Simple elegant loader */}
            <div className="relative mt-[11.5%] w-full max-w-[320px] flex flex-col items-center gap-6">
              <div className="flex flex-col items-center gap-1">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600"
                >
                  Initializing Systems
                </motion.p>
                <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Ardens Business Infrastructure v1.0
                </p>
              </div>

              <div className="relative w-full">
                {/* Thin background line */}
                <div className="h-[1px] w-full bg-slate-200/40 rounded-full" />
                {/* Progress line */}
                <motion.div
                  className="absolute top-0 left-0 h-[1px] bg-blue-600 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  style={{
                    boxShadow: "0 0 20px rgba(59, 130, 246, 0.8)"
                  }}
                  transition={{ duration: 2.8, ease: "easeInOut" }}
                />
              </div>

              <div className="flex justify-between w-full opacity-30">
                <p className="text-[7px] font-black uppercase tracking-tighter">Core.Engine.Load</p>
                <p className="text-[7px] font-black uppercase tracking-tighter">Status: Active</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
