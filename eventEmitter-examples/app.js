"use strict";
const emitter = require('events').EventEmitter
const myEmitter = new emitter();
const pubSub = require('./pubsub.js') //example 2 only
// example1
// listener for events
// myEmitter.on('event', (err,data) => {
//   if(err)
//     console.log({'error': err});
//   else
//     console.log(data);
// });
// // emitter
// myEmitter.emit('event', null, 'learning about event emitters!');
// example2
// create pupSub instance
const myPubSub = new pubSub()
// listeners
myPubSub.on('New York', function() {
  console.log('Received a New York event!')
})
myPubSub.on('Paris', function() {
  console.log('Received a Paris event!')
})
myPubSub.on('Seattle', function() {
  console.log('Received a Seattle event!')
})
