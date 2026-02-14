import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ZoomScrollSection from "./ZoomScrollSection";

interface GalleryImage {
  id: string;
  url: string;
  caption: string;
}

const LoveGallery = () => {
  // Pre-loaded images from public/gallery/ folder
  // These images will be available to ALL visitors
  const preLoadedImages: GalleryImage[] = [
    { id: "1", url: "/gallery/memory1.jpeg", caption: "Memory 1" },
    { id: "2", url: "/gallery/memory2.jpeg", caption: "Memory 2" },
    { id: "3", url: "/gallery/memory3.jpeg", caption: "Memory 3" },
    { id: "4", url: "/gallery/memory4.jpeg", caption: "Memory 4" },
    { id: "5", url: "/gallery/memory5.jpeg", caption: "Memory 5" },
    { id: "6", url: "/gallery/memory6.jpeg", caption: "Memory 6" },
    { id: "7", url: "/gallery/memory7.jpeg", caption: "Memory 7" },
    { id: "8", url: "/gallery/memory8.jpeg", caption: "Memory 8" },
    { id: "9", url: "/gallery/memory9.jpeg", caption: "Memory 9" },
    // Add more if you want!
  ];

  const [images, setImages] = useState<GalleryImage[]>(preLoadedImages);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImages((prev) => [
          ...prev,
          {
            id: Date.now().toString() + Math.random(),
            url: ev.target?.result as string,
            caption: file.name.replace(/\.[^.]+$/, ""),
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    if (selectedImage?.id === id) setSelectedImage(null);
  };

  return (
    <ZoomScrollSection className="py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-muted-foreground font-body text-sm tracking-[0.2em] uppercase mb-4">
            your story
          </p>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-gradient-warm mb-6">
            Moments
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-md mx-auto">
            Upload the photos that tell your love story
          </p>
        </motion.div>

        {/* Upload button */}
        <motion.div
          className="flex justify-center mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="group relative px-10 py-5 bg-card border border-border rounded-2xl font-body text-foreground cursor-pointer overflow-hidden"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative flex items-center gap-3">
              <motion.span
                className="text-2xl"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                📷
              </motion.span>
              <span className="font-medium">Add Your Photos</span>
            </span>
          </motion.button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            className="hidden"
          />
        </motion.div>

        {/* Gallery */}
        {images.length === 0 ? (
          <motion.div
            className="text-center py-24 border border-dashed border-border rounded-3xl bg-card/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.span
              className="text-6xl block mb-4"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              ✦
            </motion.span>
            <p className="text-muted-foreground font-body">
              Your memories will appear here
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-0"
            layout
          >
            <AnimatePresence>
              {images.map((img, i) => (
                <motion.div
                  key={img.id}
                  className="relative h-72 sm:h-80 lg:h-96 group cursor-pointer rounded-3xl overflow-hidden mx-auto w-full sm:w-auto"
                  style={{
                    perspective: 1000,
                    maxWidth: "100%",
                  }}
                  layout
                  initial={{ opacity: 0, y: 50, rotateX: 15 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotateX: -15 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  whileHover={{
                    y: -8,
                    rotateY: 2,
                    boxShadow: "0 25px 60px hsl(var(--foreground) / 0.2)",
                  }}
                  onHoverStart={() => setHoveredId(img.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="w-full h-full object-cover rounded-3xl"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent rounded-3xl"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-6 sm:p-5 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-primary-foreground font-display text-lg sm:text-base drop-shadow-lg">
                      {img.caption}
                    </p>
                  </motion.div>
                  {/* <motion.button
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-rose-500/90 backdrop-blur-md text-white text-sm sm:text-xs flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer transition-opacity shadow-lg hover:bg-rose-600"
                    whileHover={{ scale: 1.15 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(img.id);
                    }}
                    title="Delete photo"
                  ></motion.button> */}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 z-50 bg-foreground/90 backdrop-blur-2xl flex items-center justify-center p-4 cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                className="relative"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.img
                  src={selectedImage.url}
                  alt={selectedImage.caption}
                  className="max-w-full max-h-[80vh] sm:max-h-[85vh] object-contain rounded-3xl shadow-2xl"
                  initial={{ scale: 0.7, rotateY: -10, opacity: 0 }}
                  animate={{ scale: 1, rotateY: 0, opacity: 1 }}
                  exit={{ scale: 0.7, rotateY: 10, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                />
                <motion.button
                  className="absolute -top-12 right-0 sm:top-4 sm:right-4 text-white text-3xl sm:text-2xl opacity-80 hover:opacity-100 transition-opacity"
                  onClick={() => setSelectedImage(null)}
                  whileHover={{ scale: 1.1 }}
                >
                  ✕
                </motion.button>
                <motion.p
                  className="text-center text-primary-foreground font-display text-xl sm:text-lg mt-4 drop-shadow-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {selectedImage.caption}
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ZoomScrollSection>
  );
};

export default LoveGallery;
