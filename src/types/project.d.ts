import { File } from '@babel/types'
import { Action } from 'history';
import { ActionCreator } from 'dnd-core';

export interface Path {
  name: string;
  desc: string;
}


export interface BaseFile {
  name: string;
  desc: string;
  file: File;

}


export interface dependency {
  lib: string;
  name?: string
}

export interface Page extends BaseFile {
  path: string;
  desc: string;
  dependencies: Array<dependency>;
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
  pages: Array<PageNode>
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

export interface Library {
  name: string;
  exports: Array<{
    type: "Component" 
    name: string;
  }>
}

export interface ComponentNode {
  type: "ComponentNode"
  dependencies:  Array<DependencyNode>
  mounted: Array<ActionCreator>
  stateCreator: Array<Selector>
  body: Array<ComponentElement>
  
}
export interface ComponentElement {
  type: "ComponentElement"
  name: Namespace
  props: Array[any]
  children: ComponentElement | string
}

interface ComponentProp {
  type: ComponentProp
  name: Namespace
  value: any
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

