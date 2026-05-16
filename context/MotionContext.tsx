"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface MotionContextType {
  isMotionEnabled: boolean;
  toggleMotion: () => void;
}

const MotionContext = createContext<MotionContextType | undefined>(undefined);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [isMotionEnabled, setIsMotionEnabled] = useState(true);

  // Initialize from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem("motion-enabled");
    if (saved !== null) {
      setIsMotionEnabled(saved === "true");
    } else {
      // Check for prefers-reduced-motion media query
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches) {
        setIsMotionEnabled(false);
      }
    }
  }, []);

  const toggleMotion = () => {
    const newValue = !isMotionEnabled;
    setIsMotionEnabled(newValue);
    localStorage.setItem("motion-enabled", String(newValue));
  };

  return (
    <MotionContext.Provider value={{ isMotionEnabled, toggleMotion }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotion() {
  const context = useContext(MotionContext);
  if (context === undefined) {
    throw new Error("useMotion must be used within a MotionProvider");
  }
  return context;
}
