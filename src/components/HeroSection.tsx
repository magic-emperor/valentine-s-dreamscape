import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroImage from "@/assets/hero-aesthetic.jpg";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const blur = useTransform(scrollYProgress, [0, 1], [0, 10]);

  return (
    <section ref={ref} className="relative h-[150vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background with zoom parallax */}
        <motion.div className="absolute inset-0" style={{ scale }}>
          <img
            src={heroImage}
            alt="Aesthetic Valentine"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero-overlay" />
        </motion.div>

        {/* Grain overlay */}
        <div className="absolute inset-0 grain-overlay" />

        {/* Content */}
        <motion.div
          className="relative z-10 h-full flex flex-col items-center justify-center px-4"
          style={{ opacity, y: textY, filter: `blur(${blur}px)` } as any}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <motion.p
              className="text-primary-foreground/60 font-body text-sm tracking-[0.3em] uppercase mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              February 14th
            </motion.p>

            <motion.h1
              className="text-7xl md:text-9xl lg:text-[10rem] font-display font-bold text-primary-foreground leading-[0.85] mb-8"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="block">Val</span>
              <motion.span
                className="block italic font-light"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
              >
                entine
              </motion.span>
            </motion.h1>

            <motion.div
              className="flex items-center gap-4 justify-center mb-10"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <div className="h-px w-16 bg-primary-foreground/30" />
              <span className="text-primary-foreground/50 text-2xl">♡</span>
              <div className="h-px w-16 bg-primary-foreground/30" />
            </motion.div>

            <motion.p
              className="text-primary-foreground/70 font-body text-lg md:text-xl max-w-md mx-auto font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              an aesthetic celebration of love, memories & moments
            </motion.p>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <motion.div
              className="flex flex-col items-center gap-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <span className="text-primary-foreground/40 font-body text-xs tracking-widest uppercase">Scroll to explore</span>
              <div className="w-5 h-8 border border-primary-foreground/30 rounded-full flex justify-center pt-1.5">
                <motion.div
                  className="w-1 h-2 bg-primary-foreground/50 rounded-full"
                  animate={{ y: [0, 8, 0], opacity: [1, 0.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
