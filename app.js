const emitter = require('events').EventEmitter
const myEmitter = new emitter();

// listener for events
myEmitter.on('event', (err,data) => {
  if(err)
    console.log({'error': err});
  else
    console.log(data);
});
// emitter
myEmitter.emit('event', null, 'learning about event emitters!');
