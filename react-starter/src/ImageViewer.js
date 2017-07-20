'use strict';
import React from 'react';
import Viewer from 'viewerjs';
// var viewer = new Viewer(document.getElementById('images'));
export default class ImageViewer extends React.Component {
  buildList() {
    var list = ''
    for(var i = 0; i < 4; i++) {
      list += <li key={this.props.id[i]}>
        <img src={this.props.thumbnailUrl[i]} alt={this.props.title[i]}/>
      </li>
    }
    return list;
  }
  render() {
    return (
       <div>
        <ul id="images">
          {this.buildList()}
        </ul>
       </div>
    );
  }
}
