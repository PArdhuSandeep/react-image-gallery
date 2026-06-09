import React from "react";
import { createRoot } from "react-dom/client";
import ImageGallery from "src/components/ImageGallery";
import "../styles/image-gallery.css";

// Auto-import all image assets from the Images folder so newly added
// files are picked up automatically without manual imports.
function importAll(r) {
  return r.keys().map(r);
}

// webpack's require.context will return module URLs for each image.
const localImages = importAll(
  require.context("../Images", false, /\.(jpe?g|png|webp)$/i)
);

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

    this.images = this._getStaticImages();
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

  _getStaticImages() {
    return localImages.map((src) => ({
      original: src,
      thumbnail: src,
    }));
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
