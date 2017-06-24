var express = require('express')
var requestData = require('./requestData')
// var bodyParser = require('body-parser')
var app = express()
var PORT = process.env.PORT || 3000

// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json());

app.get('/api/v1/doctors/search?:name', function(req, res, next) {
  var name = req.query.name
  if(!name) {
    res.status(400).send('invalid query')
  }
  else {
    // res.send(name)
    res.setHeader('Content-Type', 'application/json')
    const data = requestData.checkCache(name)
    res.status(200).send(data)
  }
})
app.get('/', function(req, res, next) {
  res.send("hello world")
})



app.listen(PORT, function () {
  console.log('Listening on port ' + PORT)
})
