import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.3);

  // List of songs - add as many as you want to public/music/ folder
  // Supported: song1.mp3, song2.mp3, song3.mp3, etc.
  // NO LIMIT - add 10, 20, 50, or more songs!
  const songs = [
    { name: "Song 1", url: "/music/song1.mp3" },
    { name: "Song 2", url: "/music/song2.mp3" },
    { name: "Song 3", url: "/music/song3.mp3" },
    { name: "Song 4", url: "/music/song4.mp3" },
    { name: "Song 5", url: "/music/song5.mp3" },
    { name: "Song 6", url: "/music/song6.mp3" },
    { name: "Song 7", url: "/music/song7.mp3" },
    { name: "Song 8", url: "/music/song8.mp3" },
    { name: "Song 9", url: "/music/song9.mp3" },
    { name: "Song 10", url: "/music/song10.mp3" },
    // ADD MORE HERE! Example:
    { name: "Song 11", url: "/music/song11.mp3" },
    { name: "Song 12", url: "/music/song12.mp3" },
    { name: "Song 12", url: "/music/song13.mp3" },
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setCurrentTrack((prev) => (prev + 1) % songs.length);
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [songs.length]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // Autoplay might be blocked, user can click to play
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <>
      <audio
        ref={audioRef}
        src={songs[currentTrack].url}
        onLoadedMetadata={() => {
          if (isPlaying) {
            audioRef.current?.play();
          }
        }}
      />

      {/* Music Player Widget */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {!isPlaying && (
            <motion.button
              className="relative w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
              onClick={() => setIsPlaying(true)}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <span className="text-xl">♪</span>
            </motion.button>
          )}

          {isPlaying && (
            <motion.div
              className="bg-white dark:bg-slate-900 rounded-full shadow-xl p-4 backdrop-blur-sm"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <motion.button
                className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors"
                onClick={() => setIsPlaying(false)}
              >
                <span className="text-sm">⏸</span>
              </motion.button>

              <motion.div
                className="mt-3 flex flex-col gap-2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-xs font-display text-foreground/70 max-w-[120px]">
                  {songs[currentTrack].name}
                </p>
                <div className="flex gap-1">
                  <button
                    onClick={() =>
                      setCurrentTrack((prev) =>
                        prev === 0 ? songs.length - 1 : prev - 1,
                      )
                    }
                    className="text-xs px-2 py-1 bg-secondary rounded hover:bg-secondary/80"
                  >
                    ⏮
                  </button>
                  <button
                    onClick={() =>
                      setCurrentTrack((prev) => (prev + 1) % songs.length)
                    }
                    className="text-xs px-2 py-1 bg-secondary rounded hover:bg-secondary/80"
                  >
                    ⏭
                  </button>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full h-1 rounded-lg appearance-none cursor-pointer bg-secondary"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default BackgroundMusic;
