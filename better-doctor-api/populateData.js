var elasticsearch = require('elasticsearch')
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
})

exports.populate = function(name, data) {
  var newName = name.replace(' ','-')
  client.index({
    index: newName,
    id: '1',
    type: 'doctors',
    body: data
  },function(err,resp,status) {
      if(err) {
        console.log({status: err})
      }
      console.log(resp);
  });
}
