# Video Support in React Image Gallery

## Overview

React Image Gallery now supports **MP4 video playback** alongside images! Videos are seamlessly integrated into the gallery carousel and automatically play when displayed.

## Features

✅ **Video Playback**
- MP4 video format support
- Autoplay when video enters gallery view
- Responsive video sizing

✅ **Complete Video Player Controls**
- Play/Pause button
- Progress bar with scrubbing
- Volume control (0-100%)
- Time display (current/duration)
- Fullscreen button with native fullscreen API

✅ **Gallery Integration**
- Works with existing gallery features
- Thumbnail support for videos
- Responsive design (mobile, tablet, desktop)
- Smooth transitions between images and videos

✅ **Accessibility**
- ARIA labels on video controls
- Keyboard accessible (via browser native video controls)
- Proper error handling

## Usage

### Basic Setup

```javascript
import ImageGallery from 'react-image-gallery';

const items = [
  {
    original: 'image.jpg',
    thumbnail: 'image-thumb.jpg',
    type: 'image'
  },
  {
    original: 'video.mp4',
    thumbnail: 'video-thumb.jpg',
    type: 'video'
  }
];

<ImageGallery items={items} />
```

### Video Item Configuration

```javascript
{
  // Required
  original: 'path/to/video.mp4',           // URL to MP4 video file
  type: 'video',                           // Must be 'video'
  
  // Recommended
  thumbnail: 'path/to/thumbnail.jpg',      // Thumbnail for thumbnail bar
  posterUrl: 'path/to/poster.jpg',         // Poster image (shown before play)
  
  // Optional
  fullscreen: 'path/to/video-hd.mp4',     // Different quality for fullscreen
  description: 'Video description',        // Text below video
  originalAlt: 'Description',              // Accessibility text
  originalWidth: '800',                    // Video width
  originalHeight: '600',                   // Video height
}
```

### Mixed Gallery Example

```javascript
const galleryItems = [
  // Images
  {
    original: 'https://example.com/photo1.jpg',
    thumbnail: 'https://example.com/photo1-thumb.jpg',
    type: 'image',
    description: 'Beautiful sunset'
  },
  
  // Videos
  {
    original: 'https://example.com/intro.mp4',
    thumbnail: 'https://example.com/intro-poster.jpg',
    type: 'video',
    posterUrl: 'https://example.com/intro-poster.jpg',
    description: 'Intro video'
  },
  
  // More images
  {
    original: 'https://example.com/photo2.jpg',
    thumbnail: 'https://example.com/photo2-thumb.jpg',
    type: 'image'
  }
];

<ImageGallery items={galleryItems} />
```

## Styling

Video player controls are styled with CSS custom properties that match the gallery theme:

```css
:root {
  --ig-primary-color: #337ab7;      /* Button hover color */
  --ig-white: #fff;                 /* Control text color */
  --ig-black: #000;                 /* Video background */
}
```

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support (iOS 10+)
- Mobile Browsers: ✅ Full support

## Video Control Details

### Play/Pause
- Click the ▶ button to play or pause
- Videos autoplay when they enter the gallery view
- Autoplay respects browser autoplay policies

### Progress Bar
- Shows current playback position
- Drag to seek/scrub through video
- Hover to see full width

### Volume Control
- 🔊 icon with slider
- Range: 0% (mute) to 100% (max)
- Default: 100%

### Time Display
- Shows `current-time / duration` (e.g., `1:30 / 5:00`)
- Format: `m:ss` or `h:mm:ss` if over 1 hour

### Fullscreen
- Click ⛶ button to enter fullscreen
- Uses native browser fullscreen API
- Escape key or button to exit

## Autoplay Behavior

Videos automatically play when:
1. They enter the gallery view
2. User navigates to a video item
3. Gallery autoplays and reaches a video

Autoplay respects:
- Browser autoplay policies (may require user interaction)
- Video visibility in viewport
- User pausing the video

**Note**: Some browsers require user interaction before allowing autoplay. The component handles this gracefully.

## Error Handling

If a video fails to load:
- Error event is captured
- Gallery remains functional
- Users can navigate to other items
- Set `onImageError` prop to handle errors:

```javascript
const handleError = (event) => {
  console.error('Media load failed:', event);
};

<ImageGallery items={items} onImageError={handleError} />
```

## Performance Tips

1. **Poster Images**: Always provide `posterUrl` or `thumbnail` for videos
   - Reduces initial load time
   - Better UX while video loads

2. **Video Quality**: Use appropriate video resolution
   - Desktop: 1080p or 720p
   - Mobile: 720p or 480p
   - Use `fullscreen` prop for higher quality in fullscreen

3. **File Size**: Optimize video files
   - Use H.264 codec for MP4
   - Compress with tools like FFmpeg
   - Aim for <10MB per video

4. **Responsive Video**: Set width and height
   - Helps browser allocate space
   - Prevents layout shift
   - Improves perceived performance

## Example with Optimization

```javascript
const items = [
  {
    original: 'video-360p.mp4',          // Small file for gallery
    fullscreen: 'video-1080p.mp4',      // High quality for fullscreen
    thumbnail: 'video-poster.jpg',       // Poster shows immediately
    type: 'video',
    originalWidth: '800',
    originalHeight: '450',
    description: 'Optimized video'
  }
];
```

## TypeScript Support

```typescript
import { GalleryItem } from 'react-image-gallery';

const videoItem: GalleryItem = {
  original: 'video.mp4',
  type: 'video',
  thumbnail: 'poster.jpg',
  posterUrl: 'poster.jpg'
};
```

## Limitations

- **Video Formats**: Only MP4 (H.264 codec) supported in this version
  - Other formats (WebM, Ogg) can be added via custom `renderItem`
- **Video Length**: No practical limit
- **Mobile**: Uses native video player on some browsers
- **Autoplay**: Subject to browser autoplay policies

## Future Enhancements

Potential additions:
- [ ] WebM and Ogg format support
- [ ] HLS/DASH streaming support
- [ ] Video thumbnails (multiple frames)
- [ ] Caption/subtitle support
- [ ] Adaptive bitrate selection

## Troubleshooting

### Videos not playing
- Verify MP4 format with H.264 codec
- Check CORS headers if loading from CDN
- Test video in browser directly

### Autoplay not working
- Browser may be blocking autoplay
- User interaction may be required
- Check browser autoplay policy

### Video not displaying
- Verify `type: 'video'` is set
- Check URL is accessible
- Verify video format is supported

### Controls not visible
- Hover over video to see controls
- Check CSS isn't hidden by page styles
- Verify gallery CSS is loaded

## Support

For issues or feature requests, please check the main React Image Gallery repository.
