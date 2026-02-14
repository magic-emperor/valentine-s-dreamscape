import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ZoomSectionProps {
  children: React.ReactNode;
  className?: string;
}

const ZoomScrollSection = ({ children, className = "" }: ZoomSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);
  const z = useTransform(scrollYProgress, [0, 1], [-200, 0]);

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        scale,
        opacity,
        z,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
};

export default ZoomScrollSection;
