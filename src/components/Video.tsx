import React, { useRef, useEffect, useCallback, useState } from "react";

interface VideoProps {
    original: string;
    handleVideoLoaded?: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
    onVideoError?: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
    description?: string;
    fullscreen?: string;
    isFullscreen?: boolean;
    originalAlt?: string;
    originalHeight?: string;
    originalWidth?: string;
    originalTitle?: string;
    posterUrl?: string;
    autoPlay?: boolean;
    onPlayPause?: (isPlaying: boolean) => void;
    isActive?: boolean;
    [key: string]: any; // Allow item properties to be passed through
}

const defaultProps: Partial<VideoProps> = {
    description: "",
    fullscreen: "",
    isFullscreen: false,
    originalAlt: "",
    originalHeight: "",
    originalWidth: "",
    originalTitle: "",
    posterUrl: "",
    autoPlay: false,
    isActive: true,
};

const Video = (props: VideoProps) => {
    const {
        description,
        fullscreen,
        handleVideoLoaded,
        isFullscreen,
        onVideoError,
        original,
        originalAlt,
        originalHeight,
        originalWidth,
        originalTitle,
        posterUrl,
        autoPlay,
        onPlayPause,
        isActive: isActiveProp,
        __isActive,
    } = { ...defaultProps, ...props };

    // Use __isActive from item if isActive prop not explicitly set
    const isActive = isActiveProp !== undefined ? isActiveProp : __isActive;

    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const itemSrc = isFullscreen ? fullscreen || original : original;

    // Stop video when it goes off-screen (not visible in gallery)
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let animationFrameId: number;
        let isAnimating = false;

        const checkVisibility = () => {
            if (!container || !videoRef.current) return;

            const rect = container.getBoundingClientRect();

            // Check if video is off-screen (completely or mostly)
            const isCompletelyOffLeft = rect.right <= 0;
            const isCompletelyOffRight = rect.left >= window.innerWidth;
            const isPartiallyOffscreen = rect.top >= window.innerHeight || rect.bottom <= 0;

            const isOffScreen = isCompletelyOffLeft || isCompletelyOffRight || isPartiallyOffscreen;

            if (isOffScreen && !videoRef.current.paused) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
                setIsPlaying(false);
                setIsHovering(false);
            }
        };

        // Continuous frame-based checking - fires ~60x per second
        const checkFrame = () => {
            checkVisibility();
            animationFrameId = requestAnimationFrame(checkFrame);
        };

        animationFrameId = requestAnimationFrame(checkFrame);

        // Also use intersection observer as backup
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting && videoRef.current && !videoRef.current.paused) {
                        videoRef.current.pause();
                        videoRef.current.currentTime = 0;
                        setIsPlaying(false);
                        setIsHovering(false);
                    }
                });
            },
            {
                threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
                root: null,
            }
        );

        observer.observe(container);

        return () => {
            observer.disconnect();
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // Auto-play video when it enters the gallery (only if autoPlay is true)
    useEffect(() => {
        if (autoPlay && videoRef.current) {
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        onPlayPause?.(true);
                        setIsPlaying(true);
                    })
                    .catch(() => {
                        // Autoplay was prevented - video will wait for user interaction
                    });
            }
        }
    }, [autoPlay, onPlayPause]);

    // Stop video on visibility changes (tab switch, etc)
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden && videoRef.current && !videoRef.current.paused) {
                videoRef.current.pause();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    // Stop video immediately when it's no longer the active slide
    useEffect(() => {
        if (!isActive && videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            setIsPlaying(false);
            setIsHovering(false);
        }
    }, [isActive]);

    const handlePlayPauseClick = useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            event.stopPropagation();
            if (videoRef.current) {
                if (videoRef.current.paused) {
                    const playPromise = videoRef.current.play();
                    if (playPromise !== undefined) {
                        playPromise
                            .then(() => {
                                onPlayPause?.(true);
                                setIsPlaying(true);
                            })
                            .catch(() => {
                                // Play was prevented
                            });
                    }
                } else {
                    videoRef.current.pause();
                    onPlayPause?.(false);
                    setIsPlaying(false);
                }
            }
        },
        [onPlayPause]
    );

    const handleCenterPlayClick = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            event.stopPropagation();
            if (videoRef.current && videoRef.current.paused) {
                const playPromise = videoRef.current.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            onPlayPause?.(true);
                            setIsPlaying(true);
                        })
                        .catch(() => {
                            // Play was prevented
                        });
                }
            }
        },
        [onPlayPause]
    );

    // Update play state when video plays or pauses
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        video.addEventListener("play", handlePlay);
        video.addEventListener("pause", handlePause);

        return () => {
            video.removeEventListener("play", handlePlay);
            video.removeEventListener("pause", handlePause);
        };
    }, []);

    const handleVolumeChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (videoRef.current) {
                videoRef.current.volume = parseFloat(event.target.value);
            }
        },
        []
    );

    const handleTimeUpdate = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (videoRef.current) {
                videoRef.current.currentTime = parseFloat(event.target.value);
            }
        },
        []
    );

    const handleFullscreenClick = useCallback(() => {
        if (videoRef.current) {
            if (videoRef.current.requestFullscreen) {
                videoRef.current.requestFullscreen();
            } else if ((videoRef.current as any).webkitRequestFullscreen) {
                (videoRef.current as any).webkitRequestFullscreen();
            } else if ((videoRef.current as any).mozRequestFullScreen) {
                (videoRef.current as any).mozRequestFullScreen();
            } else if ((videoRef.current as any).msRequestFullscreen) {
                (videoRef.current as any).msRequestFullscreen();
            }
        }
    }, []);

    return (
        <React.Fragment>
            <div
                ref={containerRef}
                className="image-gallery-video-container"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <video
                    ref={videoRef}
                    className="image-gallery-video"
                    height={originalHeight}
                    width={originalWidth}
                    title={originalTitle}
                    poster={posterUrl}
                    onError={onVideoError}
                    onLoadedMetadata={handleVideoLoaded}
                >
                    <source src={itemSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {!isPlaying && (
                    <div
                        className="video-center-play-button"
                        onClick={handleCenterPlayClick}
                        role="button"
                        tabIndex={0}
                        aria-label="Play video"
                    >
                        <div className="play-button-icon">▶</div>
                    </div>
                )}

                {isPlaying && isHovering && (
                    <div
                        className="video-center-pause-button"
                        onClick={handlePlayPauseClick}
                        role="button"
                        tabIndex={0}
                        aria-label="Pause video"
                    >
                        <div className="pause-button-icon">⏸</div>
                    </div>
                )}

                <div className="image-gallery-video-controls">
                    <div className="video-progress-container">
                        <input
                            type="range"
                            min="0"
                            max={videoRef.current?.duration || 0}
                            value={videoRef.current?.currentTime || 0}
                            onChange={handleTimeUpdate}
                            className="video-progress-bar"
                            title="Progress"
                        />
                    </div>

                    <div className="video-controls-bar">
                        <button
                            className="video-control-button play-pause-btn"
                            onClick={handlePlayPauseClick}
                            title="Play/Pause"
                            aria-label="Play or pause video"
                        >
                            <span className="video-control-icon">▶</span>
                        </button>

                        <div className="volume-control">
                            <label htmlFor="volume-input" className="volume-label">
                                🔊
                            </label>
                            <input
                                id="volume-input"
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                defaultValue="1"
                                onChange={handleVolumeChange}
                                className="volume-slider"
                                title="Volume"
                            />
                        </div>

                        <div className="video-time">
                            <span className="current-time">
                                {videoRef.current
                                    ? formatTime(videoRef.current.currentTime)
                                    : "0:00"}
                            </span>
                            <span className="time-separator"> / </span>
                            <span className="duration">
                                {videoRef.current
                                    ? formatTime(videoRef.current.duration)
                                    : "0:00"}
                            </span>
                        </div>

                        <button
                            className="video-control-button fullscreen-btn"
                            onClick={handleFullscreenClick}
                            title="Fullscreen"
                            aria-label="Enter fullscreen"
                        >
                            <span className="video-control-icon">⛶</span>
                        </button>
                    </div>
                </div>
            </div>
            {description && (
                <span className="image-gallery-description">{description}</span>
            )}
        </React.Fragment>
    );
};

function formatTime(seconds: number): string {
    if (isNaN(seconds)) return "0:00";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
        return `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(
            2,
            "0"
        )}`;
    }
    return `${minutes}:${String(secs).padStart(2, "0")}`;
}

Video.displayName = "Video";

export default Video;
