import { File } from '@babel/types'
import { Action } from 'history';

export interface Path {
  name: string;
  desc: string;
}


export interface BaseFile {
  name: string;
  desc: string;
  file: File;

}


export interface DependencyNode {
  type: "DependencyNode"
  lib: string;
  imports: Array<string>
}

export interface Dependency {
  path: string
  desc: string
  output: Array<any>
}

export interface Library {
  name: string;
  desc?: string
  path?: string;
  outputs: Array<{
    path: string;
    outputs: Array<LibraryOutput>
  }>
}
export interface LibraryOutput {
  name: string;
  desc?: string
}

export interface Output {
  name: string;
  
}
export interface Export {
  type: "Function" | "Action" | "Selector"
  name: string;
  desc: string;
}
export interface LibraryExport {
  key: string;
  desc: string
}

export interface Page extends BaseFile {
  path: string;
  desc: string;
  dependencies: Array<Dependency>;
  components: Array<BaseComponent>;
  file: File;
  style: Object;
}


export interface BaseNode {
  type: string;
  id?: string;
  desc?: string;
}
export interface ProjectNode extends BaseNode{
  type: "ProjectNode"
  routers: Array<Router>
}

export interface Identifier {
  type: "Identifier"
  value: string
}
export interface RouterNode {
  type: "RouterNode"
  path: string
  desc?: string
  index: ComponentNode
  children?: Array<Router>
}

export interface PageNode extends BaseNode {
  type: "PageNode"
  path: Namespace | string;
  components: Array<ComponentNode>
  index: ComponentNode
}



export interface DependencyNode extends BaseNode {
  type: "DependencyNode"
  value: Library
}




export interface ComponentNode {
  type: "ComponentNode"
  name?: string; 
  desc?: string
  dependencies:  Array<DependencyNode>
  mounted: Array<ActionCreator>
  stateCreator: Array<Selector>
  children: Array<ComponentElement>
  
}

export interface ComponentElement {
  type: "ComponentElement"
  name: Namespace | Identifier
  props: Array[any]
  children: Array<ComponentElement | string>
}



interface Selector {
  type: "Selector"
  namespace: Namespace
  name: string
}

interface Namespace extends BaseNode{
  type: "Namespace"
  name: string;
  value: Namespace | string
}

