"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [isMobile, setIsMobile] = useState(true); // Default to true for SSR safety

  useEffect(() => {
    // Detect mobile or touch screen devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth < 768;
    setIsMobile(isTouchDevice || isSmallScreen);
  }, []);

  // Completely return null and avoid running any expensive Framer Motion spring ticks on mobile
  if (isMobile) return null;

  return <ActualCursor />;
}

// Sub-component containing heavy spring physics and event listeners, only compiled/mounted on desktop mouse-based devices
function ActualCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (isHidden) setIsHidden(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("select") ||
        target.closest(".magnetic");

      const isOverVideo = target.closest(".video-container");

      setIsHovered(!!isInteractive);
      setIsVideoHovered(!!isOverVideo);
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isHidden]);

  if (isHidden) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-[#2563EB]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-[#2563EB]/30 bg-[#2563EB]/5 backdrop-blur-[2px]"
        animate={{
          width: isHovered ? 60 : isVideoHovered ? 48 : 32,
          height: isHovered ? 60 : isVideoHovered ? 48 : 32,
          opacity: isHovered ? 0.8 : 1,
          borderColor: isVideoHovered && !isHovered ? "rgba(37, 99, 235, 0.5)" : "rgba(37, 99, 235, 0.3)",
        }}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}
