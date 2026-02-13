import { motion } from "framer-motion";
import heroImage from "@/assets/hero-valentine.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Romantic roses"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* 3D Floating heart */}
      <motion.div
        className="absolute top-20 right-20 text-8xl select-none hidden md:block"
        style={{ perspective: 800 }}
        animate={{
          rotateY: [0, 360],
          y: [0, -20, 0],
        }}
        transition={{
          rotateY: { duration: 6, repeat: Infinity, ease: "linear" },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <span className="inline-block" style={{ transformStyle: "preserve-3d" }}>
          💖
        </span>
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-16 text-6xl select-none hidden md:block"
        animate={{
          rotateZ: [0, 10, -10, 0],
          scale: [1, 1.15, 1, 1.1, 1],
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        💕
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-primary-foreground mb-6 drop-shadow-lg"
            animate={{ textShadow: ["0 0 20px rgba(255,255,255,0.3)", "0 0 40px rgba(255,255,255,0.6)", "0 0 20px rgba(255,255,255,0.3)"] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Happy Valentine's
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-primary-foreground/90 font-body italic mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Celebrate love in every heartbeat ♥
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.button
              className="px-8 py-4 bg-primary-foreground text-primary font-display text-lg rounded-full glow-rose cursor-pointer"
              whileHover={{ scale: 1.08, boxShadow: "0 0 50px hsl(348 83% 47% / 0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explore Our Love Story
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
            <motion.div
              className="w-1.5 h-3 bg-primary-foreground/70 rounded-full mt-2"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
