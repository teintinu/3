
var watchr = require('watchr')

var helloworld: Project = {
  name: 'helloworld',
  root: '/home/hoda51/thr0w/3/samples/helloworld',
  project: null,
  sourcefile: null,
  contents: [],
  dependencias: [],
  dependentes: []
};
 
watchr.watch({
  paths: ['/home/hoda51/thr0w/3/samples/helloworld'],
  listeners: {
    log: function(logLevel) {

    },
    error: function(err) {
      cache.error({
        message: err.message,
        stack: err.stack && err.stack.toString(),
        link: null
      })
    },
    watching: function(err, watcherInstance, isWatching) {
      if (err) {
      cache.error({
        message: err.message,
        stack: err.stack && err.stack.toString(),
        link: null
      })
      } else {
        //processFile(helloworld, watcherInstance.path)
        //console.log("watching the path " + watcherInstance.path + " completed")
        usar glob para processar todos os arquivos em  watcherInstance.path
      }
    },
    change: function(changeType, filePath, fileCurrentStat, filePreviousStat) {
      console.log('a change event occured:', arguments)
      processFile(helloworld, filePath.substring(0,helloworld.root.length))
    }
  },
  next: function(err, watchers) {
    if (err) {
      cache.error({
        message: "watching everything failed with error: " + err.message,
        stack: err.stack && err.stack.toString(),
        link: null
      })
      return
    } 
  }
})
