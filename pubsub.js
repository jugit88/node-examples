/* tweaked from https://coligo.io/nodejs-event-emitter/
* Publish-Subscribe system: more can be found at
* https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern
*/
"use strict";
const EventEmitter = require('events')
const util = require('util')

function pubSub() {
  EventEmitter.call(this)
  const that = this
  setInterval(function() {
    var randCity = randomCity()
    if(randCity.indexOf('New York') > -1) {
      that.emit('New York')
    }
    if(randCity.indexOf('Paris') > -1) {
      that.emit('Paris')
    }
    if(randCity.indexOf('Seattle') > -1) {
      that.emit('Seattle')
    }
  }, 3000)
}
util.inherits(pubSub, EventEmitter)

function randomCity() {
  const cityArr = ['New York', 'Barcelona', 'Seattle', 'Miami','Paris', 'London', 'Berlin', 'Tokyo']
  return cityArr[Math.floor(Math.random() * cityArr.length)]
}
module.exports = pubSub
