import { motion } from "framer-motion";

const FooterSection = () => (
  <footer className="py-16 text-center relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-depth opacity-50" />
    <div className="relative z-10">
      <motion.div
        className="flex items-center justify-center gap-3 mb-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="h-px w-8 bg-border" />
        <motion.span
          className="text-primary/40"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ♡
        </motion.span>
        <div className="h-px w-8 bg-border" />
      </motion.div>
      <p className="font-display text-xl text-foreground/60 mb-2">
        made with care
      </p>
      <p className="text-muted-foreground font-body text-xs tracking-widest uppercase">
        Valentine's Day · 2026
      </p>
    </div>
  </footer>
);

export default FooterSection;
