'use strict';
var fetch = require('node-fetch')

var paintingObj = {
  ids: [],
  paintInfo: []
};
function getIds() {
  fetch('https://appsheettest1.azurewebsites.net/sample/art')
    .then(function(res) {
      return res.json();
    }).then((json) => {
      paintingObj.ids = json;
    });
}
function getPaintInfo(id) {
  fetch('https://appsheettest1.azurewebsites.net/sample/art/'+id)
    .then(function(res) {
      return res.json();
    }).then((json) => {
      paintingObj.paintInfo.push(json);
    });
}
// getPaintInfo()
getIds();
export { paintingObj };
