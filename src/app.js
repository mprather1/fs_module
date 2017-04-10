import fs from 'fs'

var data = ''
var chunk

export default class fsModule {
  read (file) {
    var promise = new Promise(
      function resolver (resolve, reject) {
        const readableStream = fs.createReadStream(file)
        
        readableStream.setEncoding('utf8')
        
        readableStream.on('readable', (data) => {
          onReadStream(readableStream)
        })

        readableStream.on('end', () => {
          onStreamEnd(data, resolve)
        })
        
        readableStream.on('error', (err) => {
          reject(err)
        })
      } 
      
    )
    return promise
  }
  
  write (read, write) {
    var promise = new Promise(
      function resolver (resolve, reject) {
        const readableStream = fs.createReadStream(read)
        const writableStream = fs.createWriteStream(write)
        
        readableStream.setEncoding('utf8')

        readableStream.on('data', (chunk) =>{
          onWriteStream(writableStream, chunk, resolve)
        })

        readableStream.on('error', (err) => {
          reject(err)
        })        
      }
      
    )
    return promise
  }
}

function onWriteStream (stream, chunk, resolve) {
  resolve(stream.write(chunk))
}

function onReadStream (stream) {
  while ((chunk=stream.read()) != null) {
    data+=chunk
  }
}

function onStreamEnd (data, resolve) {
  const parsed = JSON.parse(data)
  resolve(parsed)
}
