import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ImageViewer from './ImageViewer'
import Viewer from 'viewerjs';

ReactDOM.render(<App />, document.getElementById('app'));
var viewer = new Viewer(document.getElementById('images'));
