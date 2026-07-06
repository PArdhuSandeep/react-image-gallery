import React from "react";
import { createRoot } from "react-dom/client";
import ImageGallery from "src/components/ImageGallery";
import "../styles/image-gallery.css";

// Use remote S3 image URLs instead of local assets.
const s3BucketBase = "https://pardhu-anusha-wedding.s3.us-east-1.amazonaws.com/Wedding";
const remoteImageFiles = [
  "01.jpg",
  "02.jpg",
  "04.jpg",
  "05.jpg",
  "06.jpg",
  "06a.jpg",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "1.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
  "19.jpg",
  "2.jpg",
  "20.jpg",
  "21.jpg",
  "22.jpg",
  "24.jpg",
  "25.jpg",
  "25end.jpg",
  "26.jpg",
  "27.jpg",
  "29.jpg",
  "3.jpg",
  "30.jpg",
  "31.jpg",
  "33.jpg",
  "36.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "Coverpage copy.jpg",
];

const s3Images = remoteImageFiles.map((fileName) => ({
  original: `${s3BucketBase}/${fileName}`,
  thumbnail: `${s3BucketBase}/${fileName}`,
  type: 'image',
}));

// Add video to the gallery
const s3Video = {
  original: `${s3BucketBase}/Wedding_teaser.mp4`,
  thumbnail: `${s3BucketBase}/06.jpg`, // Using an image as thumbnail
  type: 'video',
  description: 'Wedding Video - Awaara',
};

// Mix images and video together
const allMediaItems = [
  s3Images[0],
  s3Images[1],
  s3Video, // Video in the middle
  s3Images[2],
  s3Images[3],
  s3Images[4],
  ...s3Images.slice(5),
];

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showIndex: false,
      showBullets: true,
      infinite: true,
      showThumbnails: true,
      showFullscreenButton: true,
      showGalleryFullscreenButton: true,
      showPlayButton: true,
      showGalleryPlayButton: true,
      showNav: true,
      slideVertically: false,
      isRTL: false,
      slideDuration: 550,
      slideInterval: 2000,
      slideOnThumbnailOver: false,
      thumbnailPosition: "bottom",
      useWindowKeyDown: true,
      lazyLoad: false,
      maxBullets: 0,
      darkMode: false,
    };

    this.images = this._getRemoteImages();
  }

  _onImageClick(event) {
    console.debug(
      "clicked on image",
      event.target,
      "at index",
      this._imageGallery.getCurrentIndex()
    );
  }

  _onImageLoad(event) {
    console.debug("loaded image", event.target.src);
  }

  _onSlide(index) {
    console.debug("slid to index", index);
  }

  _onPause(index) {
    console.debug("paused on index", index);
  }

  _onScreenChange(fullScreenElement) {
    console.debug("isFullScreen?", !!fullScreenElement);
  }

  _onPlay(index) {
    console.debug("playing from index", index);
  }

  _handleInputChange(state, event) {
    if (event.target.value > 0) {
      this.setState({ [state]: event.target.value });
    }
  }

  _handleCheckboxChange(state, event) {
    this.setState({ [state]: event.target.checked });
  }

  _handleThumbnailPositionChange(event) {
    this.setState({ thumbnailPosition: event.target.value });
  }

  _getRemoteImages() {
    return allMediaItems;
  }

  render() {
    return (
      <section className={`app${this.state.darkMode ? " dark-mode" : ""}`}>
        <div className="dark-mode-toggle">
          <input
            checked={this.state.darkMode}
            id="dark_mode"
            type="checkbox"
            onChange={this._handleCheckboxChange.bind(this, "darkMode")}
          />
          <label htmlFor="dark_mode">
            {this.state.darkMode ? "☀️ Light" : "🌙 Dark"}
          </label>
        </div>

        <section className="gallery-demo">
          <h1 className="gallery-demo-header">
            Pardhasaradhi
            <br />
            <span className="gallery-demo-heart">❤️</span>
            <br />
            Dr. Dharani Anusha
          </h1>
          <h3 className="gallery-demo-header-3">
            {/* A beautiful, responsive, and customizable image gallery component
            for React applications */}
          </h3>
        </section>

        <ImageGallery
          ref={(i) => (this._imageGallery = i)}
          additionalClass="app-image-gallery"
          infinite={this.state.infinite}
          isRTL={this.state.isRTL}
          items={this.images}
          lazyLoad={this.state.lazyLoad}
          maxBullets={
            this.state.maxBullets > 0 ? this.state.maxBullets : undefined
          }
          showBullets={this.state.showBullets}
          showFullscreenButton={
            this.state.showFullscreenButton &&
            this.state.showGalleryFullscreenButton
          }
          showIndex={this.state.showIndex}
          showNav={this.state.showNav}
          showPlayButton={
            this.state.showPlayButton && this.state.showGalleryPlayButton
          }
          showThumbnails={this.state.showThumbnails}
          slideDuration={parseInt(this.state.slideDuration)}
          slideInterval={parseInt(this.state.slideInterval)}
          slideOnThumbnailOver={this.state.slideOnThumbnailOver}
          slideVertically={this.state.slideVertically}
          thumbnailPosition={this.state.thumbnailPosition}
          useWindowKeyDown={this.state.useWindowKeyDown}
          onClick={this._onImageClick.bind(this)}
          onImageLoad={this._onImageLoad}
          onPause={this._onPause.bind(this)}
          onPlay={this._onPlay.bind(this)}
          onScreenChange={this._onScreenChange.bind(this)}
          onSlide={this._onSlide.bind(this)}
        />
      </section>
    );
  }
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
