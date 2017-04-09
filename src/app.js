import fs from 'fs'

var data = ''
var chunk
    
export default class fsModule {
  read (file) {
    var promise = new Promise(
      function resolver (resolve, reject) {
        const readableStream = fs.createReadStream(file)
        
        readableStream.on('readable', () => {
          onReadStream(readableStream)
        })

        readableStream.on('end', () => {
          onStreamEnd(data, resolve)
        })
        
        readableStream.on('error', (error) => {
          reject(error)
        })
      } 
      
    )
    return promise
  }
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