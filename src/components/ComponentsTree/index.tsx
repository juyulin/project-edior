import React from 'react';
import { Tree } from 'antd';
import _ from 'lodash'
import { PlusCircleOutlined } from '@ant-design/icons'
import { 
  JSXElement, 
  JSXText, 
  JSXExpressionContainer, 
  JSXSpreadChild, 
  JSXFragment,
  JSXIdentifier,
  JSXMemberExpression,
  JSXNamespacedName
} from '@babel/types';

import styles from  './index.module.scss';
console.log(styles)


type ChildElement =   JSXText | JSXExpressionContainer | JSXSpreadChild | JSXElement | JSXFragment

interface treeNode extends JSXElement{
  key?: string;
  title: string;
  children: tree
}
export interface tree extends Array<treeNode>{}


const loop = (data: tree, key: string, callback: Function): treeNode | undefined => {
  let result;
  data.forEach((item, index, arr) => {
    if (item.key === key) {
      return result =  callback(item, index, arr);
    }
    if (item.children) {
      result = loop(item.children, key, callback);
    }
  });
  return result;
};

const find = (data: tree, key: string) => {
  let result : undefined | treeNode;
  data.every(item => {
    if(item.key === key) {
      result = item;
    }else if(item.children){
      result = find(item.children, key);
    }
    return !result;
  })
  return result;
}
function crudTreeNodeFactory(type: string) {
  return (node: treeNode, position: number, tree: tree) => {
    switch(type) {
      case 'Create':
        return tree.splice(position, 0, node)
      case 'Update':
        return tree.splice(position, 1, node)
      case 'Delete':
        return tree.splice(position, 1)
      default:
        return tree;
    }
  }
 
}
interface renderNodesOptions {
  onAddModal: Function
}


interface ComponentsTreeProps {
  onChange?: Function;
  data?: JSXElement | undefined;
  onAddModal?: Function;
  onEdit?: Function,
  onClickInsert?: Function

}


interface Action {
  onClickInsert?: Function
}

function transform(data: any, level: string = '0', action: Action): any {
  switch(data.type) {
    case "JSXElement":
      return transformJSXElement(data, level, action)
    case "JSXText":
      return {
        key: level,
        title: "文本",
        children: []
      }
    default:
      return null
  }
}

export function findNode() {

}


function transformJSXElement({
  openingElement,
  children
}: JSXElement, level: string, action: Action): any{
  const  { name } = openingElement;
  const onClickInsert = (e: React.MouseEvent) => {
    e.stopPropagation()
    const { onClickInsert } = action;
    onClickInsert && onClickInsert(level)
  }
  return {
    key: level,
    title: <div className={styles.treeItem}>
      <span>{transformName(name)}</span>
      <PlusCircleOutlined 
        onClick={onClickInsert} 
        className={styles.insertIcon}
      />
    </div>,
    children: children.map((child, index) => transform(child, [level, index].join('_'), action))
  }

  
}
function transformName(name: JSXIdentifier | JSXMemberExpression | JSXNamespacedName ) {
  switch(name.type) {
    case 'JSXIdentifier':
      return name.name;
    case 'JSXMemberExpression':
      return null;
    case 'JSXNamespacedName':
      return null;
  }
}

export default function (props: ComponentsTreeProps) {
  const { data, onClickInsert } = props;
  if(!data) return null
  return (
    <Tree
        className="draggable-tree"
        draggable
        treeData={[transform(data, '0', {
          onClickInsert
        })]}
    >
    </Tree>
  )
  
}
