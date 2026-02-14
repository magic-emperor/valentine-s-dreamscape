# Background Music Setup Guide

## About Background Music

The website now has a background music player! Music will play automatically
when visitors arrive (depending on browser autoplay policies) and can be
controlled with the music widget in the bottom-right corner.

## Adding Your Music Files

### Option 1: Multiple Individual Songs (10 Songs)

1. Add 10 MP3 files to this folder: `public/music/`
2. Name them exactly like this:
   - `song1.mp3`
   - `song2.mp3`
   - `song3.mp3`
   - `song4.mp3`
   - `song5.mp3`
   - `song6.mp3`
   - `song7.mp3`
   - `song8.mp3`
   - `song9.mp3`
   - `song10.mp3`

3. Songs will play in order and loop automatically

### Option 2: Single Compilation File

If you prefer a single long compilation file:

1. Combine your songs into one MP3 file using audio software (Audacity, ffmpeg,
   etc.)
2. Name it `song1.mp3` and delete all other song references
3. Update the `BackgroundMusic.tsx` file with just one song entry

### Music Widget Features

- **Play/Pause**: Toggle music with the button (or click the note icon when
  paused)
- **Next/Previous**: Navigate through songs with ⏮ and ⏭ buttons
- **Volume Control**: Adjust volume with the slider
- **Auto Loop**: Music automatically loops through all songs
- **Persistent**: Music continues playing across different sections of the site

### Browser Autoplay Policies

Some browsers block autoplay. Users will see a play button and can click to
start music:

- Music will play automatically on desktop browsers
- Mobile browsers may require user interaction first
- The play button will appear if autoplay is blocked

### File Format & Quality

- **Format**: MP3 (recommended for web)
- **Bitrate**: 128-192 kbps (good balance of size and quality)
- **Sample Rate**: 44.1 kHz standard
- **Duration**: Suggestion: 3-5 minutes per song

### File Size Recommendations

- Total size for 10 songs: 10-30 MB is reasonable
- Smaller file sizes = faster loading for visitors
- Consider compressing with online MP3 compressors if needed

### Customizing Song Names

To show custom names in the player instead of "Song 1", "Song 2", etc.:

1. Edit `src/components/BackgroundMusic.tsx`
2. Find this section:

```tsx
const songs = [
  { name: "Song 1", url: "/music/song1.mp3" },
  { name: "Song 2", url: "/music/song2.mp3" },
  // ... etc
];
```

3. Change the `name` field to your custom titles, for example:

```tsx
const songs = [
  { name: "Our First Dance", url: "/music/song1.mp3" },
  { name: "Sunset Memories", url: "/music/song2.mp3" },
  // ... etc
];
```

## Testing

1. Run `npm run dev`
2. Visit http://localhost:5173
3. Look for the music widget in the bottom-right corner
4. Click the note icon to start playing
5. You should hear music playing

## Troubleshooting

**Music doesn't play?**

- Check that MP3 files are in `public/music/` folder with exact names
- Check browser console (F12) for errors
- Try clicking the play button (autoplay might be blocked)
- Ensure file format is MP3

**Wrong song names showing?**

- Update the `name` field in BackgroundMusic.tsx

**Volume too loud/quiet?**

- Change the default volume in `BackgroundMusic.tsx` line 13:
  `const [volume, setVolume] = useState(0.3);`
- Value ranges from 0 (silent) to 1 (full volume)

**Want to disable autoplay?**

- Set `const [isPlaying, setIsPlaying] = useState(false);` to start with paused
  state
