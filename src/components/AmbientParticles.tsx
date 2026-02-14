import { useEffect, useState, useMemo } from "react";
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
  layer: number; // parallax layer
}

const SYMBOLS = ["✦", "·", "∘", "✧", "⋆", "♡", "◌", "○"];

const AmbientParticles = () => {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 18 + 6,
      delay: Math.random() * 8,
      duration: Math.random() * 15 + 10,
      opacity: Math.random() * 0.15 + 0.03,
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      layer: Math.floor(Math.random() * 3),
    }));
  }, []);

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
            filter: p.layer === 0 ? "blur(2px)" : p.layer === 2 ? "blur(0.5px)" : "none",
          }}
          initial={{ y: "110vh" }}
          animate={{
            y: "-10vh",
            x: [0, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 30, 0],
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
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            width: 60 + Math.random() * 120,
            height: 60 + Math.random() * 120,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, hsl(var(--terracotta) / ${0.04 + Math.random() * 0.04}), transparent 70%)`,
            filter: "blur(30px)",
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 12 + Math.random() * 10,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default AmbientParticles;
