'use strict';
import React from 'react';
import ImageViewer from './ImageViewer';
var fetch = require('node-fetch')


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      artist: [],
      id: [],
      year: [],
      title: [],
      url: [],
      thumbnailUrl: []
    };
  }
  componentDidMount() {
    this.getIds();
  }
  getIds() {
    fetch('https://appsheettest1.azurewebsites.net/sample/art')
      .then(function(res) {
        return res.json();
      }).then((idArray) => {
        this.getArt(idArray)
      });
  }
  getArt(ids) {
    for(var i = 0; i < 50; i++) {
      fetch('https://appsheettest1.azurewebsites.net/sample/art/'+ids[i])
        .then(function(res) {
          return res.json();
        }).then((json) => {
          this.addProperties(json);
        });
    }
  }
  addProperties(paintingObject) {
    var artistArr = this.state.artist.concat(paintingObject.artist);
    var yearArr = this.state.year.concat(paintingObject.year);
    var idArr = this.state.id.concat(paintingObject.id);
    var urlArr = this.state.url.concat(paintingObject.url);
    var thumbnailUrlArr = this.state.thumbnailUrl.concat(paintingObject.thumbnailUrl);
    var titleArr = this.state.title.concat(paintingObject.title)
    this.setState({
      artist: artistArr,
      id: idArr,
      year: yearArr,
      title: titleArr,
      url: urlArr,
      thumbnailUrl: thumbnailUrlArr
    })
  }
  render() {
    return (
       <div>
          <ImageViewer id={this.state.id} title = {this.state.title} year = {this.state.year}
          artist = {this.state.artist} thumbnailUrl = {this.state.thumbnailUrl} url={this.state.url} />
       </div>
    );
 }
}

export default App;
