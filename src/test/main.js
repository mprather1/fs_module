import chai from 'chai'
import logger from 'winston-color'
import FsModule from '../app.js'
import mock from 'mock-fs'

const expect = chai.expect

mock({
  '/dir/': mock.directory({
    items: {
      'file.json': '[ \
        { "name":"number1" }, \
        { "name":"number2" }, \
        { "name":"number3" }, \
        { "name":"number4" }, \
        { "name":"number5" } \
      ]',
      'write.json': ''      
    }
  })
})

let fsm = new FsModule()

describe ('fs module', () => {
  it ('should read a file', (done) => {
    fsm.read('/dir/file.json').then((data) => {
      expect(data).to.be.json
      expect(data.length).to.equal(5)
      expect(data[0]).to.have.property('name')
    }).catch((err) => {
      logger.error(err)
    })
    
    done()
  })
  
  it('should write to a file', (done) => {
    fsm.write('/dir/file.json', '/dir/write.json').then((success) => {
        expect(success).to.be.json
        expect(success).to.equal(true)
    }).catch((err) => {
      logger.error(err)
    })
    
    fsm.read('/dir/write.json').then((data) => {
      expect(data).to.be.json
      expect(data.length).to.equal(5)
      expect(data[0]).to.have.property('name')
    }).catch((err) => {
      logger.error(err)
    })
    
    done()
  })
})