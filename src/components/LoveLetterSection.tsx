import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoveLetterSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-24 px-4 bg-gradient-romantic relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        className="absolute top-10 left-10 text-4xl opacity-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        🌹
      </motion.div>
      <motion.div
        className="absolute bottom-10 right-10 text-4xl opacity-20"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        🌹
      </motion.div>

      <div className="max-w-2xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-display font-bold text-gradient-love mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          A Love Letter For You
        </motion.h2>

        {/* Envelope */}
        <motion.div
          className="relative mx-auto cursor-pointer"
          style={{ perspective: 1000 }}
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.02 }}
        >
          {/* Envelope body */}
          <motion.div
            className="bg-ivory border-2 border-gold-light rounded-xl p-1 shadow-2xl relative overflow-hidden"
            animate={isOpen ? { height: "auto" } : { height: 200 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Envelope flap */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-24 bg-blush border-b border-gold-light z-10 origin-top"
              style={{ clipPath: "polygon(0 0, 50% 100%, 100% 0)" }}
              animate={isOpen ? { rotateX: 180, opacity: 0 } : { rotateX: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            />

            {/* Seal */}
            <AnimatePresence>
              {!isOpen && (
                <motion.div
                  className="absolute top-12 left-1/2 -translate-x-1/2 z-20 w-16 h-16 rounded-full bg-primary flex items-center justify-center text-2xl shadow-lg glow-rose"
                  exit={{ scale: 0, rotate: 180 }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ scale: { duration: 1.5, repeat: Infinity } }}
                >
                  <span className="text-primary-foreground">♥</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Letter content */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="p-8 pt-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <p className="font-body text-foreground/80 italic text-lg leading-relaxed">
                    My Dearest Love,
                  </p>
                  <br />
                  <p className="font-body text-foreground/70 leading-relaxed">
                    Every moment with you is a treasure I hold close to my heart. 
                    You are the reason my world is filled with color, warmth, and 
                    endless joy. Your smile lights up my darkest days, and your 
                    laughter is the sweetest melody I've ever known.
                  </p>
                  <br />
                  <p className="font-body text-foreground/70 leading-relaxed">
                    On this Valentine's Day, I want you to know that my love for 
                    you grows deeper with each passing moment. You are my today, 
                    my tomorrow, and my forever.
                  </p>
                  <br />
                  <p className="font-body text-foreground/80 italic text-lg">
                    Forever & Always Yours 💕
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {!isOpen && (
            <motion.p
              className="mt-4 text-muted-foreground font-body text-sm"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Click to open the love letter ✉️
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default LoveLetterSection;
