"use client";

import { useRef, useState, Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useTexture,
  Float,
  PerspectiveCamera,
  Html,
  ContactShadows,
  Environment
} from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { cn } from "@/lib/utils";

const hotspots = [
  {
    id: "security",
    title: "Smart Security",
    x: -2.8,
    y: 2.3,
    z: 0.2,
    sectionId: "service-security",
    color: "#f97316",
    meta: "AI-Powered CCTV"
  },
  {
    id: "workspace",
    title: "Smart Workspace",
    x: -3.6,
    y: 0.3,
    z: 0.1,
    sectionId: "service-workspace",
    color: "#3b82f6",
    meta: "Flexible Hubs"
  },
  {
    id: "civil",
    title: "Civil Solutions",
    x: -2.3,
    y: -1.9,
    z: 0.3,
    sectionId: "service-civil",
    color: "#f97316",
    meta: "Turnkey Interiors"
  },
  {
    id: "it",
    title: "IT Networking",
    x: 2.8,
    y: 2.3,
    z: 0.2,
    sectionId: "service-it",
    color: "#3b82f6",
    meta: "Enterprise Fiber"
  },
  {
    id: "electrical",
    title: "Electrical",
    x: 3.6,
    y: 0,
    z: 0.1,
    sectionId: "service-it",
    color: "#3b82f6",
    meta: "Industrial Power"
  },
  {
    id: "construction",
    title: "Smart Construction",
    x: 2.3,
    y: -1.9,
    z: 0.3,
    sectionId: "service-civil",
    color: "#06b6d4",
    meta: "Site Planning"
  }
];

function TechParticles({ count = 30 }) {
  const { mouse, viewport } = useThree();
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  const points = useMemo(() => {
    const p = [];
    for (let i = 0; i < count; i++) {
      p.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10
        ),
        speed: 0.01 + Math.random() * 0.02,
        size: 0.02 + Math.random() * 0.05,
        offset: Math.random() * 100
      });
    }
    return p;
  }, [count]);

  useFrame((state) => {
    points.forEach((p, i) => {
      const mesh = meshRefs.current[i];
      if (!mesh) return;

      // Subtle float
      const time = state.clock.getElapsedTime();
      mesh.position.y += Math.sin(time * p.speed + p.offset) * 0.01;
      mesh.position.x += Math.cos(time * p.speed + p.offset) * 0.01;

      // Mouse repulsion
      const targetX = (mouse.x * viewport.width) / 2;
      const targetY = (mouse.y * viewport.height) / 2;

      const dist = mesh.position.distanceTo(new THREE.Vector3(targetX, targetY, mesh.position.z));
      const repulsionRange = 5;

      if (dist < repulsionRange) {
        const force = (repulsionRange - dist) / repulsionRange;
        const dir = new THREE.Vector3().subVectors(mesh.position, new THREE.Vector3(targetX, targetY, mesh.position.z)).normalize();
        mesh.position.add(dir.multiplyScalar(force * 0.1));
      }

      mesh.position.x = THREE.MathUtils.lerp(mesh.position.x, p.position.x, 0.01);
      mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, p.position.y, 0.01);

      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;
    });
  });

  return (
    <group>
      {points.map((p, i) => (
        <mesh
          key={i}
          ref={(el) => { meshRefs.current[i] = el; }}
          position={p.position}
        >
          <boxGeometry args={[p.size, p.size, p.size]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={2} transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function Model({ url }: { url: string }) {
  const texture = useTexture(url);
  const { camera, size } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeTarget, setActiveTarget] = useState<string | null>(null);

  // Responsive camera adjustments
  const isMobile = size.width < 768;

  // Calculate aspect ratio
  const aspect = useMemo(() => {
    if (texture.image) {
      const img = texture.image as any;
      return img.width / img.height;
    }
    return 2; // Fallback
  }, [texture]);

  const height = isMobile ? 30 : 60;
  const width = height * aspect;

  // Scale hotspots relative to model height (base height 4.8)
  const scaleFactor = height / 4.8;
  const yOffset = isMobile ? 4 : 8; // Moving model up in 3D space

  const responsiveHotspots = useMemo(() => {
    return hotspots.map(h => ({
      ...h,
      x: h.x * scaleFactor,
      y: h.y * scaleFactor + yOffset
    }));
  }, [scaleFactor, height, yOffset]);

  // Dynamic Camera Distance - Capped to make it look "Massive"
  const targetZ = useMemo(() => {
    const vfov = 42;
    const tanHalfVfov = Math.tan((vfov * Math.PI) / 180 / 2);
    const canvasAspect = size.width / size.height;

    const zToFitHeight = ((height / 2 + Math.abs(yOffset)) * 1.4) / tanHalfVfov;
    const zToFitWidth = (width * 1.4) / (2 * tanHalfVfov * canvasAspect);

    // Dynamic capping for "Massive" feel - we allow some horizontal overflow on narrow phones
    const mobileCap = 110;
    const desktopCap = 200;

    let finalZ = Math.max(zToFitHeight, zToFitWidth);
    if (isMobile) finalZ = Math.min(finalZ, mobileCap);
    else finalZ = Math.min(finalZ, desktopCap);

    return Math.max(finalZ, isMobile ? 60 : 50);
  }, [height, width, size.width, size.height, isMobile, yOffset]);

  // Parallax + Click-Zoom effect
  const scanlineRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const { x, y } = state.mouse;
    const time = state.clock.getElapsedTime();

    // Animate scanline overlay
    if (scanlineRef.current) {
      scanlineRef.current.position.y = (Math.sin(time * 0.5) * height) / 2;
    }

    if (!activeTarget) {
      // Normal Parallax
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x * 0.15, 0.05);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -y * 0.15, 0.05);

      // Camera position
      camera.position.lerp(new THREE.Vector3(0, 0, targetZ), 0.05);
    } else {
      // Zoom to active target
      const target = responsiveHotspots.find(h => h.id === activeTarget);
      if (target) {
        const zoomPos = new THREE.Vector3(target.x * 0.5, target.y * 0.5, isMobile ? 15 : 12);
        camera.position.lerp(zoomPos, 0.1);
      }
    }
  });

  const handleHotspotClick = (spot: typeof hotspots[0]) => {
    setActiveTarget(spot.id);

    // Delayed scroll
    setTimeout(() => {
      const element = document.getElementById(spot.sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setTimeout(() => setActiveTarget(null), 1200);
    }, 600);
  };

  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh ref={meshRef} position={[0, yOffset, 0]}>
          <planeGeometry args={[width, height, 32, 32]} />
          <meshBasicMaterial
            map={texture}
            transparent
            alphaTest={0.01}
            color={activeTarget ? "#999" : "white"}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Dynamic Scanline Overlay */}
        <mesh ref={scanlineRef} position={[0, yOffset, 0.02]}>
          <planeGeometry args={[width, height * 0.05]} />
          <meshBasicMaterial
            transparent
            opacity={0.15}
            color="#3b82f6"
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </Float>

      {responsiveHotspots.map((spot) => (
        <Html
          key={spot.id}
          position={[spot.x, spot.y, spot.z]}
          center
          distanceFactor={18}
          className="pointer-events-none"
        >
          <div
            onMouseEnter={() => setHovered(spot.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleHotspotClick(spot)}
            className="relative cursor-pointer group pointer-events-auto"
          >
            {/* Pulsing Hotspot UI */}
            <div
              className={cn(
                "h-6 w-6 rounded-full border-2 transition-all duration-500 flex items-center justify-center relative",
                hovered === spot.id || activeTarget === spot.id
                  ? "scale-125 border-white bg-white/20 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                  : "scale-100 border-white/40 bg-white/5"
              )}
              style={{ borderColor: (hovered === spot.id || activeTarget === spot.id) ? spot.color : undefined }}
            >
              {/* Rotating outer ring for world-class feel */}
              {(hovered === spot.id || activeTarget === spot.id) && (
                <motion.div
                  className="absolute inset-[-4px] rounded-full border border-dashed opacity-50"
                  style={{ borderColor: spot.color }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              )}

              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: spot.color }}
              />
              <div
                className="absolute inset-0 h-full w-full rounded-full animate-ping opacity-40"
                style={{ backgroundColor: spot.color }}
              />
            </div>

            {/* Label */}
            <AnimatePresence>
              {(hovered === spot.id || activeTarget === spot.id) && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 whitespace-nowrap pointer-events-none"
                >
                  <div className="bg-slate-900/95 backdrop-blur-xl text-white px-5 py-3 rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: spot.color }} />
                      <p className="text-[11px] font-black uppercase tracking-[0.2em]">{spot.title}</p>
                    </div>

                    <div className="flex items-center gap-3 mt-1">
                      <div className="h-1 w-24 bg-white/5 rounded-full overflow-hidden relative">
                        <motion.div
                          className="absolute inset-0 bg-blue-500"
                          initial={{ x: "-100%" }}
                          animate={{ x: "0%" }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      </div>
                      <p className="text-[8px] text-white/40 uppercase tracking-widest font-bold">
                        {activeTarget === spot.id ? "Syncing..." : spot.meta}
                      </p>
                    </div>

                    {/* Corner accents */}
                    <div className="absolute top-2 left-2 h-1 w-1 border-t border-l border-white/30" />
                    <div className="absolute bottom-2 right-2 h-1 w-1 border-b border-r border-white/30" />
                  </div>
                  <div className="w-3 h-3 bg-slate-900/95 rotate-45 absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 border-r border-b border-white/10" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Html>
      ))}

      {/* Grounded Shadow responsive to model height */}
      <ContactShadows
        position={[0, -(height / 2) + yOffset, 0]}
        opacity={0.4}
        scale={isMobile ? 20 : 30}
        blur={2.5}
        far={10}
        color="#000000"
      />
    </group>
  );
}

export function InteractiveHero3D() {
  return (
    <div className="relative h-full w-full bg-transparent overflow-visible">
      <Canvas dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
        {/* Pulled back camera further to prevent clipping at the top/bottom */}
        <PerspectiveCamera makeDefault position={[0, 0, 50]} fov={42} far={1000} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight
          position={[0, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={2}
          castShadow
        />

        <Suspense fallback={null}>
          <TechParticles count={30} />
          <Model url="/videos/model.png" />
          <EffectComposer>
            <Bloom luminanceThreshold={1} mipmapBlur intensity={0.5} radius={0.4} />
            <ChromaticAberration offset={[0.001, 0.001] as any} />
          </EffectComposer>
        </Suspense>
      </Canvas>

      {/* Instructional Hint - Refined for world-class feel */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-8 bg-blue-500/30" />
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/5">
            Interactive Ecosystem • Explore Nodes
          </p>
          <div className="h-[1px] w-8 bg-blue-500/30" />
        </div>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-blue-500/40"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </div>
    </div>
  );
}
