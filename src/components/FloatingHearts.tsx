import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  symbol: string;
}

const SYMBOLS = ["✦", "·", "∘", "○", "✧", "⋆"];

const AmbientParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 14 + 8,
      delay: Math.random() * 12,
      duration: Math.random() * 12 + 10,
      opacity: Math.random() * 0.2 + 0.05,
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-primary/30"
          style={{ left: `${p.x}%`, fontSize: p.size, opacity: p.opacity }}
          initial={{ y: "110vh" }}
          animate={{ y: "-10vh", x: [0, 15, -10, 20, 0] }}
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
    </div>
  );
};

export default AmbientParticles;
