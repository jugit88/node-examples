'use strict';
import React from 'react';
import ImageGallery from 'react-image-gallery';

export default class ImageViewer extends React.Component {
  buildImageArray() {
    const imagesFormat = this.props.title.map( (curTitle,i) => {
      var Obj = {
        original: this.props.thumbnailUrl[i],
        thumbnail: this.props.thumbnailUrl[i],
        description: this.props.title[i] + '(' + this.props.year[i] + ')' + ' ' + 'Artist: ' + this.props.artist[i],
      };
      return Obj;
    });
    return imagesFormat;
  }
  handleImageLoad(event) {

  }
  render() {
    return (
      <div>
      <ImageGallery
      items={this.buildImageArray()}
      slideInterval={3000}
      lazyLoad={true}
      slideDuration={500}
      showFullscreenButton={false}
      infinite={false}
      onImageLoad={this.handleImageLoad.bind(this)}/>
      </div>
    );
  }
}
