import { motion } from "framer-motion";

const FooterSection = () => (
  <footer className="py-12 text-center bg-card relative overflow-hidden">
    <motion.div
      className="absolute inset-0 opacity-5"
      style={{
        backgroundImage: "radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }}
    />
    <motion.p
      className="font-display text-2xl text-gradient-love relative z-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      Made with ♥ for you
    </motion.p>
    <motion.p
      className="text-muted-foreground font-body text-sm mt-2 relative z-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
    >
      Happy Valentine's Day 2026 💕
    </motion.p>
  </footer>
);

export default FooterSection;
