import * as _ from 'lodash'
import { File, JSXElement, JSXText } from '@babel/types'
import traverse from '@babel/traverse';
import * as types from '@babel/types'
import { type } from 'os';
import { transcode } from 'buffer';


export function getNodeLubanId(node: JSXElement): string {
  const { attributes } = node.openingElement;
  const lubanIdAttribute = _.find(attributes, attr => _.get(attr, 'name.name') === '__luban__id__')
  return _.get(lubanIdAttribute, 'value.value')
}


export function getNodeTree(node: File, callback: Function) {
  traverse(node, {
    ReturnStatement: (path) => {
      const result = path.findParent(p => p.isExportDefaultDeclaration());

      if (result) {
        callback(path.node.argument)
      }

    }
  })
}


export function exchangeNode(data: File, id1: string, id2: string) {
  let result = types.cloneDeep(data);
  let node1: undefined | JSXElement, node2: undefined | JSXElement;
  traverse(data, {
    JSXElement: (path) => {
      
      const lubanId = getNodeLubanId(path.node);
      if(lubanId === id1) {
        node1 = types.cloneDeep(path.node);
      }
      if(lubanId === id2) {
        node2 =  types.cloneDeep(path.node);
      }
    }
  })

  traverse(result, {
    JSXElement: (path) => {
      
      if((getNodeLubanId(path.node) === id1) && node2) {
        path.insertBefore(types.cloneDeep(node2 as JSXElement))
        path.remove()
        node2 = undefined
        return 
      }
      if((getNodeLubanId(path.node) === id2) && node1) {
        path.insertBefore(types.cloneDeep(node1 as JSXElement))
        path.remove()
        node1 = undefined
        return
       }
       
      
    }
  })
  console.log(result)
  return result

}

export function updateComponentNode(data: File, node: JSXText | JSXElement, value: string): File {
  traverse(data, {
    JSXText: (path) => {
      if (path.node === node) {
        const newNode = types.jsxText(value)
        path.replaceWith(newNode)
        path.stop()
      }
    }

  })
  return {
    ...data
  }
}
export function insertComponentNode(data: File, node: JSXElement ) {
  const copyData = types.cloneDeep(data)
  traverse(copyData, {
    JSXElement: (path) => {
      if(path.node === node) {
        const tag = types.jsxIdentifier('div')
        const newNode = types.jsxElement(types.jsxOpeningElement(tag, []), types.jsxClosingElement(tag), [types.jsxText("34344")], false)
        path.node.children.push(newNode)
      }
    }

  })
  return copyData
}
export function getDefaultExportReturnNode(node: File): JSXElement  {
  let result: any = null;
  traverse(node, {
    ReturnStatement: (path) => {
      const parent = path.findParent(p => p.isExportDefaultDeclaration());
      if(parent) {
        result = path.node.argument
        path.stop()
      }

    }
  })
  return result
}

interface Node {
  children?: any
}

export function getNode(nodes: Array<Node>, levels: Array<string>): Node {
  const level  = levels.shift() as string
  const node = nodes[Number(level)]
  if(levels.length === 0) {
    return node
  }
  if(node.children) {
    return getNode(node.children, levels) 
  }
  return node
  
}