# Adding Photos & Music to Your Website

## 📷 **Adding Photos (Visible to All Visitors)**

### Step 1: Prepare Your Images

- Get your 9 photos (3x3 grid)
- Format: JPG, PNG, or WebP
- Recommended size: 600x800px or larger
- Total size: Keep under 5-10 MB for all photos combined

### Step 2: Add Photos to Codebase

Place your images in this folder:

```
public/gallery/
  memory1.jpg
  memory2.jpg
  memory3.jpg
  memory4.jpg
  memory5.jpg
  memory6.jpg
  memory7.jpg
  memory8.jpg
  memory9.jpg
```

### Step 3: Update Photo Names (Optional)

To change captions shown in the gallery, edit `src/components/LoveGallery.tsx`:

Find this section:

```tsx
const preLoadedImages: GalleryImage[] = [
  { id: "1", url: "/gallery/memory1.jpg", caption: "Memory 1" },
  { id: "2", url: "/gallery/memory2.jpg", caption: "Memory 2" },
  // ... etc
];
```

Change the `caption` field to custom names:

```tsx
const preLoadedImages: GalleryImage[] = [
  { id: "1", url: "/gallery/memory1.jpg", caption: "Our First Date ❤️" },
  { id: "2", url: "/gallery/memory2.jpg", caption: "Sunset Moment" },
  { id: "3", url: "/gallery/memory3.jpg", caption: "Laughing Together" },
  // ... etc
];
```

### Step 4: Gallery Features

- **Display**: 3x3 grid (3 columns on desktop, responsive on mobile)
- **Hover Effects**: Images scale and show captions on hover
- **Lightbox**: Click any image to view full size
- **Delete**: Click X button to remove photos
- **Upload More**: Users can add additional photos via the "Add Your Photos"
  button

---

## 🎵 **Adding Music**

### Step 1: Prepare Your Songs

- Format: MP3 (recommended for web)
- Bitrate: 128-192 kbps (good quality, smaller files)
- **NO LIMIT** - Add as many as you want!

### Step 2: Add Music Files

Place your songs in this folder:

```
public/music/
  song1.mp3
  song2.mp3
  song3.mp3
  song4.mp3
  song5.mp3
  song6.mp3
  song7.mp3
  song8.mp3
  song9.mp3
  song10.mp3
  song11.mp3  ← Add more! No limit!
  song12.mp3
  ... and so on
```

### Step 3: Update Song List (if adding more songs)

Edit `src/components/BackgroundMusic.tsx`:

Find this section:

```tsx
const songs = [
  { name: "Song 1", url: "/music/song1.mp3" },
  { name: "Song 2", url: "/music/song2.mp3" },
  // ... existing 10 songs ...
  { name: "Song 10", url: "/music/song10.mp3" },
  // ADD MORE HERE:
  { name: "Song 11", url: "/music/song11.mp3" },
  { name: "Song 12", url: "/music/song12.mp3" },
];
```

### Step 4: Custom Song Names

Change song names to anything you want:

```tsx
const songs = [
  { name: "Our Song", url: "/music/song1.mp3" },
  { name: "Romantic Evening", url: "/music/song2.mp3" },
  { name: "Memories", url: "/music/song3.mp3" },
  // ... etc
];
```

### Step 5: Music Features

- **Auto Loop**: ✅ Music loops through all songs continuously
- **Widget**: Appears in bottom-right corner with controls
- **Controls**:
  - ▶️ Play/Pause button
  - ⏮ Previous track
  - ⏭ Next track
  - 🔊 Volume slider
- **Autoplay**: Music starts automatically (if browser allows)
- **Persistent**: Music continues across all sections

---

## ✅ **File Structure**

Your final project should look like this:

```
valentine/
├── public/
│   ├── gallery/
│   │   ├── memory1.jpg
│   │   ├── memory2.jpg
│   │   ├── memory3.jpg
│   │   ├── memory4.jpg
│   │   ├── memory5.jpg
│   │   ├── memory6.jpg
│   │   ├── memory7.jpg
│   │   ├── memory8.jpg
│   │   └── memory9.jpg
│   ├── music/
│   │   ├── song1.mp3
│   │   ├── song2.mp3
│   │   ├── song3.mp3
│   │   ├── ... (add as many as you want)
│   │   └── song10.mp3
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── BackgroundMusic.tsx (music list here)
│   │   ├── LoveGallery.tsx (photo list here)
│   │   └── ...
│   └── ...
└── ...
```

---

## 🚀 **After Adding Files**

1. Run: `npm run build`
2. Run: `npm run dev` (for testing locally)
3. Visit: `http://localhost:5173`
4. All visitors will see the same photos and hear the music!

---

## ❓ **FAQ**

**Q: Will visitors see the same photos?** A: YES! Photos in `public/gallery/`
are served to everyone.

**Q: Can I have more than 9 photos?** A: YES! Add as many as you want. The grid
will adjust (3x3, 4x3, etc.)

**Q: Can I have more than 10 songs?** A: YES! No limit! Just add more entries to
the songs array.

**Q: Will music loop?** A: YES! It automatically loops through all songs
forever.

**Q: How do I change photo captions?** A: Edit the `caption` field in
`src/components/LoveGallery.tsx`

**Q: How do I change song names?** A: Edit the `name` field in
`src/components/BackgroundMusic.tsx`

**Q: What if a photo doesn't load?** A: Check the filename matches exactly in
both the file and code. Example: if file is `photo.jpg`, URL must be
`/gallery/photo.jpg`
