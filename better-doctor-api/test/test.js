var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../server')
var elasticsearch = require('elasticsearch')
var should = chai.should()
chai.use(chaiHttp)

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
})
// TODO: add hooks
describe('BetterDoctor-Proxy', function() {
  // drop all doctors documents in elasticsearch
  client.delete({
    _type: 'doctors',
    _id: '1'
  }, function(err,resp) {
    if (err) {
      console.log(err)
    } else {
      console.log(resp)
    }
  })
  // TODO: when adding names, ben mack must be first

  it('should respond with data from a specific name from DATABASE', function(done) {
    chai.request(server)
      .get('/api/v1/doctors/search?name=charles-anderson')
      .end(function(err, res) {
        res.should.have.status(200)
        res.should.be.json
        res.body[0].should.have.property('_index')
        res.body[0].should.have.property('_type')
        res.body[0].should.have.property('_id')
        res.body[0]._source.payload.meta.count.should.equal(55)
        res.body[0]._source.payload.data[0].practices[0].location_slug.should.equal('tn-jackson')
        done()
      })
  })
  it('should respond with data from a specific name from BETTERDOCTOR API', function(done) {
    chai.request(server)
      .get('/api/v1/doctors/search?name=ben-harris')
      .end(function(err, res) {
        res.should.have.status(200)
        res.should.be.json
        res.body[0].should.not.have.property('_index')
        res.body[0].should.not.have.property('_type')
        res.body[0].should.not.have.property('_id')
        res.body[0].meta.count.should.equal(25)
        res.body[0].meta.count.should.total(25)
        res.body[0].meta.data[0].visit_address[0].city.should.equal('Ely')
        res.body[0].meta.data[0].visit_address[0].state.should.equal('NV')
        done()
      })
  })

  it('should respond with ALL doctor data from database', function(done) {
    chai.request(server)
      .get('/api/v1/doctors/search')
      .end(function(err, res) {
        res.should.have.status(200)
        res.should.be.json
        res.body[0].should.have.property('_index')
        res.body[0].should.have.property('_type')
        res.body[0].should.have.property('_id')
        res.body[0]._source.payload.meta.item_type.should.equal('Doctor')
        res.body[0]._source.payload.meta.count.should.equal(8)
        done()
      })
  })
})
