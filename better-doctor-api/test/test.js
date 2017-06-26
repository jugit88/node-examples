var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../server')
// var elasticsearch = require('elasticsearch')
var requestData = require('../requestData')
var should = require('chai').should()
chai.use(chaiHttp)
describe('BetterDoctor-Proxy', function() {

  it('should respond with data for charles-anderson from BETTERDOCTOR API', function(done) {
    chai.request(server)
      .get('/api/v1/doctors/search?name=charles-anderson')
      .end(function(err, res) {
        res.should.have.status(200)
        res.should.be.json
        res.body.meta.count.should.equal(55)
        res.body.should.not.have.property('_index')
        res.body.should.not.have.property('_type')
        res.body.should.not.have.property('_id')
        res.body.data[0].practices[0].location_slug.should.equal('tn-jackson')
        done()
      })
  })
  it('add charles-anderson to DATABASE', function(done) {
    chai.request(server)
      .get('/api/v1/doctors/search?name=charles-anderson')
      .end(function(err, res) {
        res.should.have.status(200)
        res.should.be.json
        // res.body[0]._source.payload.meta.count.should.equal(55)
        res.body.should.not.have.property('_index')
        res.body.should.not.have.property('_type')
        res.body.should.not.have.property('_id')
        // res.body[0]._source.payload.data[0].practices[0].location_slug.should.equal('tn-jackson')
        done()
      })
  })
  it('should respond with ALL doctor data from database, which now only contains charles-anderson', function(done) {
    chai.request(server)
      .get('/api/v1/doctors/search')
      .end(function(err, res) {
        res.should.have.status(200)
        res.should.be.json
        res.body[0].should.have.property('_index')
        res.body[0]._index.should.equal('charles-anderson')
        res.body[0].should.have.property('_type')
        res.body[0]._source.payload.meta.item_type.should.equal('Doctor')
        res.body[0]._source.payload.meta.count.should.equal(55)
        done()
      })
  })

  it('request ben-harris doctor data from BETTERDOCTOR API', function(done) {
    chai.request(server)
      .get('/api/v1/doctors/search?name=ben-harris')
      .end(function(err, res) {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.not.have.property('_index')
        res.body.should.not.have.property('_type')
        res.body.should.not.have.property('_id')
        done()
      })
  })
  it('add ben-harris doctor data to Database', function(done) {
    chai.request(server)
      .get('/api/v1/doctors/search?name=ben-harris')
      .end(function(err, res) {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.not.have.property('_index')
        res.body.should.not.have.property('_type')
        res.body.should.not.have.property('_id')
        done()
      })
  })

  it('should respond with ALL doctor data from database, which now both', function(done) {
    chai.request(server)
      .get('/api/v1/doctors/search')
      .end(function(err, res) {
        res.should.have.status(200)
        res.should.be.json
        res.body[0].should.property('_index')
      //   res.body[0]._index.should.equal('charles-anderson')
        res.body[0].should.property('_type')
        res.body[0].should.have.property('_id')
        res.body[0]._source.payload.meta.item_type.should.equal('Doctor')
        res.body[0]._source.payload.meta.count.should.equal(25)
        done()
      })
  })
})
