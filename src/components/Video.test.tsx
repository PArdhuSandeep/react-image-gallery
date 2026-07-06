import React from 'react';
import { render, screen } from '@testing-library/react';
import Video from './Video';

describe('Video Component', () => {
    it('renders video element', () => {
        render(
            <Video original="test-video.mp4" />
        );
        const videoElement = screen.getByRole('img', { hidden: true }) || document.querySelector('video');
        expect(videoElement).toBeInTheDocument();
    });

    it('renders with poster image when provided', () => {
        render(
            <Video original="test-video.mp4" posterUrl="poster.jpg" />
        );
        const videoElement = document.querySelector('video');
        expect(videoElement).toHaveAttribute('poster', 'poster.jpg');
    });

    it('renders description when provided', () => {
        render(
            <Video original="test-video.mp4" description="Test Description" />
        );
        expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('renders video controls', () => {
        render(
            <Video original="test-video.mp4" />
        );
        expect(document.querySelector('.video-controls-bar')).toBeInTheDocument();
        expect(document.querySelector('.play-pause-btn')).toBeInTheDocument();
        expect(document.querySelector('.volume-control')).toBeInTheDocument();
    });

    it('uses fullscreen URL when isFullscreen is true', () => {
        const { rerender } = render(
            <Video original="test-video.mp4" fullscreen="fullscreen-video.mp4" isFullscreen={false} />
        );
        let videoElement = document.querySelector('video');
        expect(videoElement?.querySelector('source')).toHaveAttribute('src', 'test-video.mp4');

        rerender(
            <Video original="test-video.mp4" fullscreen="fullscreen-video.mp4" isFullscreen={true} />
        );
        videoElement = document.querySelector('video');
        expect(videoElement?.querySelector('source')).toHaveAttribute('src', 'fullscreen-video.mp4');
    });

    it('sets video dimensions when provided', () => {
        render(
            <Video
                original="test-video.mp4"
                originalWidth="800"
                originalHeight="600"
            />
        );
        const videoElement = document.querySelector('video');
        expect(videoElement).toHaveAttribute('width', '800');
        expect(videoElement).toHaveAttribute('height', '600');
    });
});
