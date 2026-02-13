import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryImage {
  id: string;
  url: string;
  caption: string;
}

const LoveGallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const newImage: GalleryImage = {
          id: Date.now().toString() + Math.random(),
          url: ev.target?.result as string,
          caption: file.name.replace(/\.[^.]+$/, ""),
        };
        setImages((prev) => [...prev, newImage]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    if (selectedImage?.id === id) setSelectedImage(null);
  };

  return (
    <section id="gallery" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-display font-bold text-center text-gradient-love mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Our Precious Moments
        </motion.h2>
        <motion.p
          className="text-center text-muted-foreground font-body mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Upload your favorite memories together 📸
        </motion.p>

        {/* Upload area */}
        <motion.div
          className="mb-12 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="px-8 py-4 bg-primary text-primary-foreground font-display text-lg rounded-full glow-rose cursor-pointer flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => fileInputRef.current?.click()}
          >
            <span className="text-2xl">📷</span>
            Add Your Photos
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

        {/* Gallery grid */}
        {images.length === 0 ? (
          <motion.div
            className="text-center py-20 border-2 border-dashed border-border rounded-2xl bg-card/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💝
            </motion.div>
            <p className="text-muted-foreground font-body text-lg">
              Your love story starts here — add your first photo!
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            <AnimatePresence>
              {images.map((img, index) => (
                <motion.div
                  key={img.id}
                  className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg"
                  style={{ perspective: 800 }}
                  layout
                  initial={{ opacity: 0, scale: 0.6, rotateY: -30 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.6, rotateY: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    boxShadow: "0 20px 60px hsl(348 83% 47% / 0.3)",
                  }}
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-4 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <p className="font-display text-sm">{img.caption}</p>
                  </motion.div>
                  <motion.button
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-primary/80 text-primary-foreground text-sm flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer"
                    whileHover={{ scale: 1.2 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(img.id);
                    }}
                  >
                    ✕
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 z-50 bg-foreground/80 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.img
                src={selectedImage.url}
                alt={selectedImage.caption}
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
                initial={{ scale: 0.5, rotateY: -20 }}
                animate={{ scale: 1, rotateY: 0 }}
                exit={{ scale: 0.5, rotateY: 20 }}
                transition={{ type: "spring", damping: 20 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LoveGallery;
