import chai from 'chai'
import logger from 'winston-color'
import fsModule from '../app.js'
import mock from 'mock-fs'

const expect = chai.expect

mock({
  '/dir/': {
    'file.json': '[ \
      { "name":"number1" }, \
      { "name":"number2" }, \
      { "name":"number3" }, \
      { "name":"number4" }, \
      { "name":"number5" } \
    ]'
  }
})

let fsm = new fsModule()

describe ('fs module', () => {
  it ('should read a file', (done) => {
    fsm.read('/dir/file.json').then((data) => {
      expect(data).to.be.json
      expect(data.length).to.equal(5)
      expect(data[0]).to.have.property('name')
    })
    
    .catch((err) => {
      logger.error(err)
    })
    
    done()
  })
})