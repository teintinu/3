
interface Application extends Project {
  title: I18N,
  icon: Icon,
  languages: Language[],
  parsers: Parser[],
  buiders: Builder[],
  routes: Route[]
}

type Language = "en" | "pt_br" | "es"

interface Parser {
  name: string,
  glob: string,
  parse(source: string): Artifact
}

interface Builder {
  name: string,
  parse(artifact: Artifact): string
}

interface Route {
  glob: string,
  action: Action,
  view: View,
  params: RouteParam[]
}

interface RouteParam {
  name: string,
  type: Datatype
}

interface Datatype {
  basictype: "string" | "integer" | "real" | "date" | "boolean" | "complex"
  name: string
}

interface View {
  name: string
  title: I18N
  icon: Icon
  roles: Role[]
  actions: Action[]
}

interface Action {
  name: string
  title: I18N
  icon: Icon
  roles: Role[]
  run: Script
}

interface Role {
  name: string
  title: I18N
}

interface Script {

}