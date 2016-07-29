interface Artifact {
  name: string
  project: Project,
  sourcefile: string,
  contents: Artifact[]
  dependencias: Artifact[]
  dependentes: Artifact[]
}


interface Project extends Artifact {
  root: string
}

interface I18N {
  [language: string]: string
} 

interface Icon {
  getAsSVG() : string;  
  getAsImgSrc() : string;  
  getAsClasses() : string;  
}