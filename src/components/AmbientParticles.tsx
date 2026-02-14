import { useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  symbol: string;
  layer: number;
  xOffset1: number;
  xOffset2: number;
  xOffset3: number;
}

interface Orb {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  blur: number;
  duration: number;
  delay: number;
  xOffset1: number;
  xOffset2: number;
  yOffset1: number;
  yOffset2: number;
  scale1: number;
  scale2: number;
}

const SYMBOLS = ["✦", "·", "∘", "✧", "⋆", "♡", "◌", "○"];

const AmbientParticles = () => {
  // Generate all random values once using useRef
  const particlesRef = useRef<Particle[]>([]);
  if (particlesRef.current.length === 0) {
    particlesRef.current = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 18 + 6,
      delay: Math.random() * 8,
      duration: Math.random() * 15 + 10,
      opacity: Math.random() * 0.15 + 0.03,
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      layer: Math.floor(Math.random() * 3),
      xOffset1: (Math.random() - 0.5) * 40,
      xOffset2: (Math.random() - 0.5) * 30,
      xOffset3: (Math.random() - 0.5) * 20,
    }));
  }

  const orbsRef = useRef<Orb[]>([]);
  if (orbsRef.current.length === 0) {
    orbsRef.current = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      width: 60 + Math.random() * 120,
      height: 60 + Math.random() * 120,
      opacity: 0.04 + Math.random() * 0.04,
      blur: 30,
      duration: 12 + Math.random() * 10,
      delay: Math.random() * 5,
      xOffset1: 30,
      xOffset2: -20,
      yOffset1: -40,
      yOffset2: 20,
      scale1: 1.2,
      scale2: 0.9,
    }));
  }

  const particles = particlesRef.current;
  const orbs = orbsRef.current;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-primary"
          style={{
            left: `${p.x}%`,
            fontSize: p.size,
            opacity: p.opacity,
            filter:
              p.layer === 0
                ? "blur(2px)"
                : p.layer === 2
                  ? "blur(0.5px)"
                  : "none",
          }}
          initial={{ y: "110vh" }}
          animate={{
            y: "-10vh",
            x: [0, p.xOffset1, p.xOffset2, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {p.symbol}
        </motion.div>
      ))}
      {/* Soft floating orbs for depth */}
      {orbs.map((o) => (
        <motion.div
          key={`orb-${o.id}`}
          className="absolute rounded-full"
          style={{
            width: o.width,
            height: o.height,
            left: `${o.x}%`,
            top: `${o.y}%`,
            background: `radial-gradient(circle, hsl(var(--terracotta) / ${o.opacity}), transparent 70%)`,
            filter: `blur(${o.blur}px)`,
          }}
          animate={{
            x: [0, o.xOffset1, o.xOffset2, 0],
            y: [0, o.yOffset1, o.yOffset2, 0],
            scale: [1, o.scale1, o.scale2, 1],
          }}
          transition={{
            duration: o.duration,
            delay: o.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default AmbientParticles;
