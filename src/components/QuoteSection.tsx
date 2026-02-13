import { motion } from "framer-motion";
import ZoomScrollSection from "./ZoomScrollSection";

const QuoteSection = () => (
  <ZoomScrollSection className="py-32 px-4 relative overflow-hidden">
    {/* Large decorative background text */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
      <motion.span
        className="text-[20rem] md:text-[30rem] font-display font-bold text-primary/[0.03] leading-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
      >
        ♡
      </motion.span>
    </div>

    <div className="max-w-3xl mx-auto text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="flex items-center justify-center gap-3 mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="h-px w-12 bg-border" />
          <span className="text-primary/40 text-sm">✦</span>
          <div className="h-px w-12 bg-border" />
        </motion.div>

        <blockquote className="font-display text-3xl md:text-5xl lg:text-6xl font-light text-foreground/80 leading-snug italic mb-8">
          "Whatever our souls are made of, his and mine are the same"
        </blockquote>

        <motion.p
          className="text-muted-foreground font-body text-sm tracking-widest uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          — Emily Brontë
        </motion.p>
      </motion.div>
    </div>
  </ZoomScrollSection>
);

export default QuoteSection;
