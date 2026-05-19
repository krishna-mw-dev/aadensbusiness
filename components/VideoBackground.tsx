"use client";

import { useRef, useEffect, useState } from "react";
import { cn, getOptimizedImageUrl } from "@/lib/utils";
import { Pause, Play } from "lucide-react";
import { useMotion } from "@/context/MotionContext";

interface VideoSource {
  src: string;
  type: string;
}

interface VideoBackgroundProps {
  src: string | VideoSource[];
  poster?: string;
  opacity?: number;
  overlayColor?: string;
  overlayOpacity?: number;
  className?: string;
  parallaxSpeed?: number;
  showControls?: boolean;
  fixed?: boolean;
  texture?: "grid" | "scanline" | "none";
}

export function VideoBackground({
  src,
  poster,
  opacity = 0.4,
  overlayColor = "bg-white",
  overlayOpacity = 0.05,
  className,
  parallaxSpeed = 0,
  showControls = false,
  fixed = false,
  texture = "none",
}: VideoBackgroundProps) {
  const { isMotionEnabled } = useMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(true); // Default to true for SSR safety

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  // 1. Intersection Observer and mobile detection
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth < 768;
    const mobileStatus = isTouch || isSmallScreen;
    setIsMobileDevice(mobileStatus);

    const container = containerRef.current;
    if (!container) return;

    // Active viewport observer (with 150px buffer margin to mount/unmount dynamically)
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "150px 0px 150px 0px" }
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  // 2. Play/Pause based on user play state, motion configuration, and viewport visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying && isMotionEnabled && isVisible) {
      video.play().catch(() => setIsPlaying(false));
    } else {
      video.pause();
    }
  }, [isPlaying, isMotionEnabled, isVisible, isLoaded]);

  useEffect(() => {
    if (parallaxSpeed === 0 || fixed || isMobileDevice) return;

    const handleScroll = () => {
      if (!containerRef.current || !videoRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const offset = (scrolled - rect.top) * parallaxSpeed;
      videoRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [parallaxSpeed, fixed, isMobileDevice]);

  // Optimize background poster images dynamically
  const optimizedPoster = poster ? getOptimizedImageUrl(poster, isMobileDevice ? 640 : 1200) : "";

  if (!src || (Array.isArray(src) && src.length === 0)) {
    return (
      <div className={cn(
        fixed ? "fixed" : "absolute",
        "inset-0 overflow-hidden -z-20",
        className
      )}>
        {optimizedPoster && (
          <div
            className="h-full w-full bg-cover bg-center transition-opacity duration-1000"
            style={{ backgroundImage: `url(${optimizedPoster})`, opacity }}
          />
        )}
        <div
          className={cn("absolute inset-0 -z-10", overlayColor)}
          style={{ opacity: overlayOpacity }}
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        fixed ? "fixed" : "absolute",
        "inset-0 overflow-hidden -z-20 video-container",
        className
      )}
    >
      {isVisible ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={optimizedPoster}
          onCanPlay={() => setIsLoaded(true)}
          className={cn(
            "h-full w-full object-cover transition-opacity duration-1000",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          style={{ opacity: isLoaded ? opacity : 0 }}
        >
          {Array.isArray(src) ? (
            src.map((source, index) => (
              <source key={index} src={source.src} type={source.type} />
            ))
          ) : (
            <source src={src} type="video/mp4" />
          )}
        </video>
      ) : (
        optimizedPoster && (
          <div
            className="h-full w-full bg-cover bg-center transition-opacity duration-1000"
            style={{ backgroundImage: `url(${optimizedPoster})`, opacity }}
          />
        )
      )}

      {/* Overlay */}
      <div
        className={cn("absolute inset-0 -z-10", overlayColor)}
        style={{ opacity: overlayOpacity }}
      />

      {/* Texture Overlays */}
      {texture === "grid" && (
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
             style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      )}
      {texture === "scanline" && (
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
             style={{ backgroundImage: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.1) 50%)', backgroundSize: '100% 4px' }} />
      )}

      {/* Accessibility Controls */}
      {showControls && (
        <button
          onClick={togglePlay}
          className={cn(
            "z-50 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/40 text-slate-600 backdrop-blur-md transition-all hover:bg-white/60 hover:text-slate-900 pointer-events-auto shadow-sm",
            fixed ? "fixed bottom-6 right-6" : "absolute bottom-6 right-6"
          )}
          aria-label={isPlaying ? "Pause background video" : "Play background video"}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
      )}
    </div>
  );
}
