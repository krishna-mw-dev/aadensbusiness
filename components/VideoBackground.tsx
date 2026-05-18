"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
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
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  // 1. Intersection Observer to detect when the video is close to viewport (lazy load) and actively visible (play/pause)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Use a pre-load margin observer: trigger loading 300px before the video enters screen
    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          loadObserver.disconnect(); // Once we trigger loading, we don't need to check anymore
        }
      },
      { rootMargin: "300px" }
    );
    loadObserver.observe(container);

    // Playback observer: check if the video is actively visible to play/pause
    const playbackObserver = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 } // 5% visibility is enough to play
    );
    playbackObserver.observe(container);

    return () => {
      loadObserver.disconnect();
      playbackObserver.disconnect();
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
  }, [isPlaying, isMotionEnabled, isVisible]);

  useEffect(() => {
    if (parallaxSpeed === 0 || fixed) return;

    const handleScroll = () => {
      if (!containerRef.current || !videoRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const offset = (scrolled - rect.top) * parallaxSpeed;
      videoRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [parallaxSpeed, fixed]);

  if (!src || (Array.isArray(src) && src.length === 0)) {
    return (
      <div className={cn(
        fixed ? "fixed" : "absolute",
        "inset-0 overflow-hidden -z-20",
        className
      )}>
        {poster && (
          <div
            className="h-full w-full bg-cover bg-center transition-opacity duration-1000"
            style={{ backgroundImage: `url(${poster})`, opacity }}
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
      {/* 3. Render video tag only when the user scrolls near the section, otherwise only render the static placeholder image */}
      {isNearViewport ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
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
        // Render background poster static image when offscreen before lazy load
        poster && (
          <div
            className="h-full w-full bg-cover bg-center transition-opacity duration-1000"
            style={{ backgroundImage: `url(${poster})`, opacity }}
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
