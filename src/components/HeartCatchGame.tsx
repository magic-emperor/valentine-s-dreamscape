import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FallingHeart {
  id: number;
  x: number;
  emoji: string;
  speed: number;
  points: number;
}

const EMOJIS = [
  { emoji: "❤️", points: 1 },
  { emoji: "💖", points: 2 },
  { emoji: "💎", points: 5 },
  { emoji: "🌹", points: 3 },
  { emoji: "💕", points: 2 },
  { emoji: "💔", points: -3 },
];

const HeartCatchGame = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [hearts, setHearts] = useState<FallingHeart[]>([]);
  const [caught, setCaught] = useState<{ id: number; x: number; y: number; points: number }[]>([]);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem("valentine-high-score") || "0");
  });
  const nextId = useRef(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(30);
    setHearts([]);
    setCaught([]);
  };

  const spawnHeart = useCallback(() => {
    const pick = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    const heart: FallingHeart = {
      id: nextId.current++,
      x: Math.random() * 85 + 5,
      emoji: pick.emoji,
      speed: Math.random() * 3 + 3,
      points: pick.points,
    };
    setHearts((prev) => [...prev, heart]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== heart.id));
    }, heart.speed * 1000);
  }, []);

  const catchHeart = (heart: FallingHeart, e: React.MouseEvent | React.TouchEvent) => {
    setScore((prev) => prev + heart.points);
    setHearts((prev) => prev.filter((h) => h.id !== heart.id));

    const rect = gameAreaRef.current?.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0]?.clientX || 0 : e.clientX;
    const clientY = "touches" in e ? e.touches[0]?.clientY || 0 : e.clientY;

    setCaught((prev) => [
      ...prev,
      {
        id: heart.id,
        x: clientX - (rect?.left || 0),
        y: clientY - (rect?.top || 0),
        points: heart.points,
      },
    ]);
    setTimeout(() => {
      setCaught((prev) => prev.filter((c) => c.id !== heart.id));
    }, 800);
  };

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsPlaying(false);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;
    const spawner = setInterval(spawnHeart, 600);
    return () => clearInterval(spawner);
  }, [isPlaying, spawnHeart]);

  useEffect(() => {
    if (!isPlaying && score > highScore) {
      setHighScore(score);
      localStorage.setItem("valentine-high-score", score.toString());
    }
  }, [isPlaying, score, highScore]);

  return (
    <section className="py-24 px-4 bg-gradient-romantic relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-display font-bold text-gradient-love mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Catch the Love! 🎮
        </motion.h2>
        <motion.p
          className="text-muted-foreground font-body mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Tap the hearts to catch them! Avoid 💔 broken hearts!
        </motion.p>

        {/* Score display */}
        <div className="flex justify-center gap-8 mb-6 font-display text-lg">
          <div className="bg-card px-6 py-2 rounded-full shadow-md">
            Score: <span className="text-primary font-bold">{score}</span>
          </div>
          <div className="bg-card px-6 py-2 rounded-full shadow-md">
            Time: <span className="text-primary font-bold">{timeLeft}s</span>
          </div>
          <div className="bg-card px-6 py-2 rounded-full shadow-md">
            Best: <span className="text-gold font-bold">{highScore}</span>
          </div>
        </div>

        {/* Game area */}
        <div
          ref={gameAreaRef}
          className="relative w-full h-[400px] bg-card/50 rounded-2xl border-2 border-border overflow-hidden shadow-inner"
        >
          {!isPlaying && timeLeft === 30 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                className="text-7xl mb-6"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                💘
              </motion.div>
              <motion.button
                className="px-10 py-4 bg-primary text-primary-foreground font-display text-xl rounded-full glow-rose cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={startGame}
              >
                Start Game!
              </motion.button>
            </div>
          )}

          {!isPlaying && timeLeft === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/80 backdrop-blur-sm z-20">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10 }}
              >
                <h3 className="text-3xl font-display font-bold text-foreground mb-2">
                  {score > highScore ? "🎉 New High Score!" : "Game Over!"}
                </h3>
                <p className="text-5xl font-bold text-primary mb-6">{score}</p>
                <motion.button
                  className="px-8 py-3 bg-primary text-primary-foreground font-display rounded-full glow-rose cursor-pointer"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startGame}
                >
                  Play Again ♥
                </motion.button>
              </motion.div>
            </div>
          )}

          {/* Falling hearts */}
          <AnimatePresence>
            {hearts.map((heart) => (
              <motion.button
                key={heart.id}
                className="absolute text-3xl md:text-4xl cursor-pointer select-none z-10 active:scale-75 transition-transform"
                style={{ left: `${heart.x}%` }}
                initial={{ y: -50 }}
                animate={{ y: 420 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: heart.speed, ease: "linear" }}
                onClick={(e) => catchHeart(heart, e)}
                onTouchStart={(e) => catchHeart(heart, e)}
              >
                {heart.emoji}
              </motion.button>
            ))}
          </AnimatePresence>

          {/* Score popups */}
          <AnimatePresence>
            {caught.map((c) => (
              <motion.div
                key={c.id}
                className={`absolute font-display font-bold text-xl pointer-events-none z-30 ${
                  c.points > 0 ? "text-primary" : "text-destructive"
                }`}
                style={{ left: c.x, top: c.y }}
                initial={{ opacity: 1, y: 0, scale: 1 }}
                animate={{ opacity: 0, y: -60, scale: 1.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                {c.points > 0 ? `+${c.points}` : c.points}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default HeartCatchGame;
