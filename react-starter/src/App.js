'use strict';
import React from 'react';
import ImageViewer from './ImageViewer';
var fetch = require('node-fetch')
// var toArray = require('stream-to-array')
// import { paintingObj } from './dataStore'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // ids: [],
      artist: [],
      id: [],
      year: [],
      title: [],
      thumbnailUrl: []
    };
  }
  componentDidMount() {
    this.getIds();
    // this.getArt();
  }
  getIds() {
    fetch('https://appsheettest1.azurewebsites.net/sample/art')
      .then(function(res) {
        return res.json();
      }).then((idArray) => {
        // this.setState({ids: json});
        this.getArt(idArray)
      });
  }
  getArt(ids) {
    fetch('https://appsheettest1.azurewebsites.net/sample/art/'+ids[0])
      .then(function(res) {
        return res.json();
      }).then((json) => {
        this.addProperties(json);
      });
  }
  addProperties(paintingObject) {
    var artistArr = this.state.artist.concat(paintingObject.artist);
    var yearArr = this.state.year.concat(paintingObject.year);
    var idArr = this.state.id.concat(paintingObject.id);
    var thumbnailUrlArr = this.state.thumbnailUrl.concat(paintingObject.thumbnailUrl);
    var titleArr = this.state.title.concat(paintingObject.title)
    this.setState({
      artist: artistArr,
      id: idArr,
      year: yearArr,
      title: titleArr,
      thumbnailUrl: thumbnailUrlArr
    })
  }
  render() {
    return (
       <div>
          <ImageViewer id={this.state.id} title = {this.state.title} year = {this.state.year}
          artist = {this.state.artist} thumbnailUrl = {this.state.thumbnailUrl}/>
       </div>
    );
 }
}

export default App;