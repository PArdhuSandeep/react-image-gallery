/**
 * React Image Gallery - Video Support Example
 * 
 * This example demonstrates how to use the video feature
 * alongside images in the React Image Gallery
 */

import React from 'react';
import ImageGallery from 'react-image-gallery';

const VideoGalleryExample = () => {
    // Example gallery items with both images and videos
    const items = [
        {
            original: 'https://example.com/image1.jpg',
            thumbnail: 'https://example.com/thumbnail1.jpg',
            type: 'image',
            description: 'Beautiful landscape image'
        },
        {
            original: 'https://example.com/video1.mp4',
            thumbnail: 'https://example.com/video1-poster.jpg',
            type: 'video',
            posterUrl: 'https://example.com/video1-poster.jpg',
            description: 'Scenic video walkthrough',
            fullscreen: 'https://example.com/video1-hd.mp4' // Optional: different quality for fullscreen
        },
        {
            original: 'https://example.com/image2.jpg',
            thumbnail: 'https://example.com/thumbnail2.jpg',
            type: 'image',
            description: 'Mountain photography'
        },
        {
            original: 'https://example.com/video2.mp4',
            thumbnail: 'https://example.com/video2-poster.jpg',
            type: 'video',
            description: 'Time-lapse video',
            fullscreen: 'https://example.com/video2-hd.mp4'
        }
    ];

    return (
        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Image and Video Gallery</h1>
            <p>Navigate through images and videos. Videos will autoplay when displayed.</p>

            <ImageGallery
                items={items}
                autoPlay={false}
                slideDuration={3000}
                slideInterval={3000}
                thumbnailPosition="bottom"
                showThumbnails={true}
                showNav={true}
                showFullscreenButton={true}
                showPlayButton={true}
            />
        </div>
    );
};

export default VideoGalleryExample;

/**
 * DATA STRUCTURE GUIDE
 * 
 * For Images:
 * {
 *   original: 'url-to-image.jpg',           // Required: main image URL
 *   thumbnail: 'url-to-thumbnail.jpg',      // Optional: thumbnail for thumbnail bar
 *   type: 'image',                          // Optional: 'image' is default
 *   description: 'Image description',       // Optional: shown below the image
 *   originalAlt: 'alt text',                // Optional: accessibility
 *   ...other image properties
 * }
 * 
 * For Videos:
 * {
 *   original: 'url-to-video.mp4',          // Required: main video URL (MP4)
 *   thumbnail: 'url-to-thumbnail.jpg',     // Recommended: thumbnail for thumbnail bar
 *   type: 'video',                         // Required: must be 'video'
 *   posterUrl: 'url-to-poster.jpg',        // Optional: poster image shown before play
 *   fullscreen: 'url-to-video-hd.mp4',     // Optional: higher quality for fullscreen
 *   description: 'Video description',      // Optional: shown below the video
 *   ...other properties
 * }
 * 
 * FEATURES:
 * - Auto-play videos when displayed in gallery
 * - Full video player controls:
 *   - Play/Pause button
 *   - Progress bar (scrubbing)
 *   - Volume control
 *   - Current time / duration display
 *   - Fullscreen button
 * - Responsive design
 * - Works with existing gallery features (thumbnails, navigation, etc.)
 */
