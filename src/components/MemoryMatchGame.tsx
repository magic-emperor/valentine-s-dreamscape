import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ZoomScrollSection from "./ZoomScrollSection";

const CARD_EMOJIS = ["🌹", "✦", "♡", "🦋", "🌙", "⭐", "🎀", "💌"];

interface Card {
  id: number;
  emoji: string;
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryMatchGame = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [bestScore, setBestScore] = useState(() =>
    parseInt(localStorage.getItem("valentine-memory-best") || "999"),
  );

  const initGame = useCallback(() => {
    const shuffled = [...CARD_EMOJIS, ...CARD_EMOJIS]
      .map((emoji, i) => ({
        id: i,
        emoji,
        pairId: i % CARD_EMOJIS.length,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setIsComplete(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    initGame();
  }, [initGame]);

  const handleFlip = (id: number) => {
    if (flippedCards.length >= 2) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.isFlipped || card.isMatched) return;

    const newCards = cards.map((c) =>
      c.id === id ? { ...c, isFlipped: true } : c,
    );
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped.map(
        (fid) => newCards.find((c) => c.id === fid)!,
      );

      if (first.pairId === second.pairId) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.pairId === first.pairId ? { ...c, isMatched: true } : c,
            ),
          );
          setMatches((m) => {
            const newM = m + 1;
            if (newM === CARD_EMOJIS.length) {
              setIsComplete(true);
            }
            return newM;
          });
          setFlippedCards([]);
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              newFlipped.includes(c.id) ? { ...c, isFlipped: false } : c,
            ),
          );
          setFlippedCards([]);
        }, 800);
      }
    }
  };

  // Update best score when game completes
  useEffect(() => {
    if (isComplete && moves < bestScore) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBestScore(moves);
      localStorage.setItem("valentine-memory-best", moves.toString());
    }
  }, [isComplete, moves, bestScore]);

  return (
    <ZoomScrollSection className="py-32 px-4 bg-gradient-depth relative">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-muted-foreground font-body text-sm tracking-[0.2em] uppercase mb-4">
            play together
          </p>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-gradient-rose mb-4">
            Memory Match
          </h2>
          <p className="text-muted-foreground font-body">
            Find all the matching pairs — fewer moves = more love!
          </p>
        </motion.div>

        {/* Stats */}
        <div className="flex justify-center gap-6 mb-10 font-body text-sm">
          <div className="bg-card px-5 py-2.5 rounded-xl border border-border">
            Moves: <span className="font-semibold text-primary">{moves}</span>
          </div>
          <div className="bg-card px-5 py-2.5 rounded-xl border border-border">
            Matched:{" "}
            <span className="font-semibold text-primary">
              {matches}/{CARD_EMOJIS.length}
            </span>
          </div>
          <div className="bg-card px-5 py-2.5 rounded-xl border border-border">
            Best:{" "}
            <span className="font-semibold text-accent">
              {bestScore === 999 ? "–" : bestScore}
            </span>
          </div>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-lg mx-auto">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className="aspect-square cursor-pointer"
              style={{ perspective: 800 }}
              whileHover={
                !card.isFlipped && !card.isMatched ? { scale: 1.05 } : {}
              }
              whileTap={
                !card.isFlipped && !card.isMatched ? { scale: 0.95 } : {}
              }
              onClick={() => handleFlip(card.id)}
            >
              <motion.div
                className="relative w-full h-full"
                style={{ transformStyle: "preserve-3d" }}
                animate={{
                  rotateY: card.isFlipped || card.isMatched ? 180 : 0,
                }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Front (hidden face) */}
                <div
                  className="absolute inset-0 rounded-xl bg-card border-2 border-border flex items-center justify-center"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <motion.span
                    className="text-2xl text-muted-foreground/40"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    ✦
                  </motion.span>
                </div>
                {/* Back (emoji face) */}
                <motion.div
                  className={`absolute inset-0 rounded-xl flex items-center justify-center text-3xl md:text-4xl border-2 ${
                    card.isMatched
                      ? "bg-secondary border-primary/30 glow-warm"
                      : "bg-card border-primary/20"
                  }`}
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <motion.span
                    animate={card.isMatched ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {card.emoji}
                  </motion.span>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Reset button */}
        <motion.div className="text-center mt-8">
          <motion.button
            className="px-6 py-3 bg-card border border-border rounded-xl font-body text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={initGame}
          >
            Shuffle & Restart ↻
          </motion.button>
        </motion.div>

        {/* Win overlay */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              className="fixed inset-0 z-50 bg-foreground/70 backdrop-blur-xl flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-card rounded-3xl p-12 text-center max-w-md mx-4 border border-border glow-warm"
                initial={{ scale: 0.5, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", damping: 15 }}
              >
                <motion.span
                  className="text-6xl block mb-4"
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: 2 }}
                >
                  🎉
                </motion.span>
                <h3 className="text-3xl font-display font-bold text-foreground mb-2">
                  Perfect Match!
                </h3>
                <p className="text-muted-foreground font-body mb-1">
                  Completed in{" "}
                  <span className="text-primary font-semibold">{moves}</span>{" "}
                  moves
                </p>
                {moves <= bestScore && (
                  <p className="text-accent font-body text-sm mb-6">
                    ✦ New best score!
                  </p>
                )}
                <motion.button
                  className="px-8 py-3 bg-primary text-primary-foreground font-body rounded-xl cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={initGame}
                >
                  Play Again
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ZoomScrollSection>
  );
};

export default MemoryMatchGame;
