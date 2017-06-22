#!/usr/bin/env node
// const { URL } = require('url');
// process.env.UV_THREADPOOL_SIZE = 128;
var https = require('https')
var name = 'charles anderson'
var skip = 'skip=100&'
var apikey = //APIKEY
var encodedPath = encodeURI('/2016-03-01/doctors?name='+name+'&limit=100&user_key='+apikey)
const options = {
  hostname: 'api.betterdoctor.com',
  // port: 80,
  path: encodedPath
  // method: 'GET',
  // headers: {
  //   'Content-Type': 'application/json'
  // }
};
// const options = new URL('https://api.betterdoctor.com'+encodedPath);
const req = https.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`)
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  // res.setEncoding('utf8')
  res.on('data', (chunk) =>{
    console.log(`BODY: ${chunk}`)
  })
  res.on('end', () => {
    console.log('No more data in response.');
  })
})
req.on('error', (e) => {
console.error(`problem with request: ${e.message}`);
});
req.end()
