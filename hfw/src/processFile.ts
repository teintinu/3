

var minimatch = require('minimatch');
var fs = require('fs');

var parsers: Parser[] = []

function registerParser(parser: Parser) {
  parsers.push(parser)
}

function processFile(project: Project, path: string) {
  parsers.forEach((parser) => {
    if (minimatch(path, parser.glob)) {
      fs.readFile(path, { encoding: 'utf-8' }, function(err, source) {
        if (err)
          return cache.error({
            message: err.message,
            stack: err.stack && err.stack.toString(),
            link: null
          })
        var artifact = parser.parse(source)
        cache.saveAST(project, path, artifact)
      })
    }
  });
}