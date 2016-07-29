var _errors = [];
var _cache = {};
var cache = {
    error: function (err) {
        _errors.push(err);
    },
    saveAST: function (project, sourcefile, artifact) {
        var p = _cache[project.name];
        if (!p) {
            p = _cache[project.name] = {};
        }
        p[sourcefile] = artifact;
    },
    readAST: function (project, sourcefile) {
        var p = _cache[project.name];
        return p && p[sourcefile];
    }
};
var watchr = require('watchr');
var helloworld = {
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
        log: function (logLevel) {
        },
        error: function (err) {
            cache.error({
                message: err.message,
                stack: err.stack && err.stack.toString(),
                link: null
            });
        },
        watching: function (err, watcherInstance, isWatching) {
            if (err) {
                cache.error({
                    message: err.message,
                    stack: err.stack && err.stack.toString(),
                    link: null
                });
            }
            else {
            }
        },
        change: function (changeType, filePath, fileCurrentStat, filePreviousStat) {
            console.log('a change event occured:', arguments);
            processFile(helloworld, filePath.substring(0, helloworld.root.length));
        }
    },
    next: function (err, watchers) {
        if (err) {
            cache.error({
                message: "watching everything failed with error: " + err.message,
                stack: err.stack && err.stack.toString(),
                link: null
            });
            return;
        }
    }
});
var minimatch = require('minimatch');
var fs = require('fs');
var parsers = [];
function registerParser(parser) {
    parsers.push(parser);
}
function processFile(project, path) {
    parsers.forEach(function (parser) {
        if (minimatch(path, parser.glob)) {
            fs.readFile(path, { encoding: 'utf-8' }, function (err, source) {
                if (err)
                    return cache.error({
                        message: err.message,
                        stack: err.stack && err.stack.toString(),
                        link: null
                    });
                var artifact = parser.parse(source);
                cache.saveAST(project, path, artifact);
            });
        }
    });
}
registerParser({
    name: "application-pug",
    glob: "/app.jade",
    parse: function (source) {
        return null;
    }
});
//# sourceMappingURL=boot.js.map