# fs_module

## Synopsis

* read and write json files with fs module
* tests with mocha and mock-fs

### instantiate

    import FsModule from 'build/app'
    
    fsm = new FsModule()
    
### read a file
  
    fsm.read('file.json')
    
### test

    npm test