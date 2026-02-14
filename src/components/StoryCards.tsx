import { motion } from "framer-motion";
import ZoomScrollSection from "./ZoomScrollSection";

interface StoryCard {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const storyCards: StoryCard[] = [
  { id: 1, title: "Our First Meeting", description: "When I saw you walking towards me, I knew you were the one for me.", icon: "✦" },
  { id: 2, title: "Favorite Memory", description: "The way you smiled at me, and the way you ran and hug me.", icon: "♡" },
  { id: 3, title: "What I Love About You", description: "Your smile, the way you understand me, the way you make me laugh, the way you make me feel at peace, you.", icon: "⋆" },
  { id: 4, title: "Our Dreams Together", description: "Let build our own world together, Travel together, and live together, and make our own memories together.", icon: "◌" },
  { id: 5, title: "A Promise", description: "I promise to be there for you, to support you, to love you, and to be there for you always.", icon: "○" },
  { id: 6, title: "Your Note", description: "I love you aien, I love you Sweetheart, I love you jaan, I love you Baby, I love you Mehnazz, I love you Mehnnnaaaazzzzz, I love you AAAAIIIEEEENNNN",  icon: "✧" }
];

const StoryCards = () => {
  return (
    <ZoomScrollSection className="py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-muted-foreground font-body text-sm tracking-[0.2em] uppercase mb-4">
            your words
          </p>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-gradient-warm mb-6">
            Our Story
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-lg mx-auto">
            Every love story deserves to be told — Here are our precious memories
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {storyCards.map((card, index) => (
            <motion.div
              key={card.id}
              className="group relative"
              style={{ perspective: 1000 }}
              initial={{ opacity: 0, y: 60, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.div
                className="bg-card border border-border rounded-2xl p-8 h-full relative overflow-hidden"
                whileHover={{
                  y: -12,
                  rotateY: 3,
                  rotateX: -2,
                  boxShadow: "0 30px 60px hsl(var(--foreground) / 0.1)",
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-primary/5 to-transparent bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]" />

                {/* Icon */}
                <motion.div
                  className="text-3xl text-primary/60 mb-6"
                  whileHover={{ scale: 1.2, rotate: 15 }}
                >
                  {card.icon}
                </motion.div>

                <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                  {card.title}
                </h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                  {card.description}
                </p>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary/20"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{ originX: 0 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </ZoomScrollSection>
  );
};

export default StoryCards;
