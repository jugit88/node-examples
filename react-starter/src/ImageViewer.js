'use strict';
import React from 'react';
// import Viewer from 'viewerjs';
// import Lightbox from 'react-images';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

// var viewer = new Viewer(document.getElementById('images'));
export default class ImageViewer extends React.Component {
  constructor () {
		super();
		this.state = {
			lightboxIsOpen: false,
			currentImage: 0,
		};
  }
  buildList() {
    const list = this.props.id.map( (curId,i) =>
      <li key={curId.toString()}>
        onClick={ (e) => this.openLightbox(i, e)}
        <img src={this.props.thumbnailUrl[i]} alt={this.props.title[i]}/>
      </li>
    );
    return list;
  }
  builtImageArray() {
    const imagesFormat = this.props.title.map( (curTitle,i) => {
      var Obj = {
        original: this.props.url[i],
        thumbnail: this.props.thumbnailUrl[i]
      };
      return Obj;
    });
    return imagesFormat;
  }
  handleImageLoad(event) {
   console.log('Image loaded', event.target)
 }
  render() {
    return (
      <div>
      <ImageGallery
      items={this.builtImageArray()}
      slideInterval={2000}
      onImageLoad={this.handleImageLoad}/>


      </div>
    );
  }
}
