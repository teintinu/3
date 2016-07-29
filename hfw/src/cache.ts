
var _errors: CacheError[] = []
var _cache: Cache = {}

var cache = {
  error(err: CacheError) {
    _errors.push(err)
  },
  saveAST(project: Project, sourcefile: string, artifact: Artifact) {
    var p = _cache[project.name]
    if (!p) {
      p = _cache[project.name] = {}
    }
    p[sourcefile] = artifact
  },
  readAST(project: Project, sourcefile: string): Artifact {
    var p = _cache[project.name]
    return p && p[sourcefile]
  }
}
 
interface Cache {
  [projectName: string]: CacheProject
}

interface CacheProject {
  [sourcefile: string]: Artifact
}

interface CacheError {
  message: string
  stack: string
  link: string
}