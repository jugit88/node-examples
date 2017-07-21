'use strict';
import React from 'react';
// import Viewer from 'viewerjs';
// import Lightbox from 'react-images';
import ImageGallery from 'react-image-gallery';
// import "react-image-gallery/styles/css/image-gallery.css";

// var viewer = new Viewer(document.getElementById('images'));
export default class ImageViewer extends React.Component {
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
        original: this.props.thumbnailUrl[i],
        thumbnail: this.props.thumbnailUrl[i],
        description: this.props.title[i],
      };
      return Obj;
    });
    return imagesFormat;
  }
  handleImageLoad(event) {
  //  console.log('Image loaded', event.target)
 }
  buildTestImages() {
   const images1 = [
     {
       original: 'http://lorempixel.com/1000/600/nature/1/',
       thumbnail: 'http://lorempixel.com/250/150/nature/1/'

     },
     {
       original: 'http://lorempixel.com/1000/600/nature/2/',
       thumbnail: 'http://lorempixel.com/250/150/nature/2/'
     },
     {
       original: 'http://lorempixel.com/1000/600/nature/3/',
       thumbnail: 'http://lorempixel.com/250/150/nature/3/'
     },
     {
       original: 'http://i2.wp.com/usatftw.files.wordpress.com/2017/06/usp_mlb-_san_francisco_giants_at_colorado_rockies-2.jpg?crop=0px%2C0px%2C4024px%2C2413px&resize=1000%2C600&ssl=1',
       thumbnail: 'http://i2.wp.com/usatftw.files.wordpress.com/2017/06/usp_mlb-_san_francisco_giants_at_colorado_rockies-2.jpg?crop=0px%2C0px%2C4024px%2C2413px&resize=1000%2C600&ssl=1'
     }
   ]
  return images1;
 }
  render() {
    const images = [
      {
        original: "http://www.tate.org.uk/art/images/work/D/D09/D09215_8.jpg",
        thumbnail: "http://www.tate.org.uk/art/images/work/D/D09/D09215_8.jpg"
      }
    ]
    return (
      <div>
      <ImageGallery
      items={this.builtImageArray()}
      slideInterval={3000}
      lazyLoad={true}
      slideDuration={500}
      infinite={false}
      onImageLoad={this.handleImageLoad.bind(this)}/>
      </div>
    );
  }
}
