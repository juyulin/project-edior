export interface Element {
  type: string,
  name: string,
  desc: string
}
export interface ComponentTypes extends Array<ComponentType> {}


export interface ComponentType {
  type: string;
  name: string;
  lib?: string;
  elements: Array<Element>;
}

export interface ComponentTypeState {
  data: Array<ComponentType>,
  loading: Boolean,
  error: string | undefined | null
}
