# fs_module

## Synopsis

* read and write json files with fs module
* tests with mocha and mock-fs

### instantiate

    import FsModule from 'build/app'
    
    fsm = new FsModule()
    
### read a file
  
    fsm.read('file.json').then((data) => {
      logger.info(data)
    }).catch((err) => {
      logger.error(err)
    })
    
## write

    fsm.write('read.json', 'write.json').then(() => {
      logger.info('success')
    }).catch((err) => {
      logger.error(err)
    })
    
### test

    npm test