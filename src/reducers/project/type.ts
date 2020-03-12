
import { Project } from '../../types/project'
export interface Dependency {
  lib: string;
  alias?: string;
  version?: string;
}

export interface Dependencies extends Array<Dependency>{};


// export enum PropType {
//   Object = 'Object',
//   String = 'String',
//   JSXElement = 'JSXElement',
//   Array = 'Array',
//   Number = 'Number',
//   Function= 'Function',
// }
// export interface Property {
//   name: string;
  
// }

// export interface ObjectProp {
//   type: "Object";
//   name: string;
//   properties: Array<Property>
// }

// interface Prop {
//   type: 'string';

// }

 

// export interface Module {
//   props: Array<Prop>;

// }



export interface ProjectState {
 data: Project;
 loading: boolean;
 error: string;
}