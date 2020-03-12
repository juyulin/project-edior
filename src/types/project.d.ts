import { File } from '@babel/types'

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

export interface Project {
  id?: string;
  desc?: string;
  pages: Array<Page>
}