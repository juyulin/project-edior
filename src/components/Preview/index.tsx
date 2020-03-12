import React from 'react';
import { 
  JSXElement, 
  JSXIdentifier, 
  JSXMemberExpression, 
  JSXNamespacedName, 
  ObjectExpression, 
  JSXAttribute, 
  JSXFragment,
  StringLiteral,
  JSXExpressionContainer,
  JSXText,
  JSXSpreadAttribute,
  JSXSpreadChild,
  Expression
} from '@babel/types';
import generator from '@babel/generator'
import cs from 'classnames';
import { getNodeLubanId } from '../../pages/pageEditor/astUtil'
import style from './styles.module.scss'
import { useSelectedComponent } from '../../pages/pageEditor/hooks/preview'
import { useExchangeComponent } from '../../pages/pageEditor/hooks/pageEditor'
import Card from './card'
const styles = {
  
}

interface WrapperProps {
  lubanId: string
  children: any
}
function Wrapper(props: WrapperProps) {
  const lubanId = props.lubanId
  const [selected, setSelected] = useSelectedComponent()
  const onMove = useExchangeComponent()
  return (
    <Card id={lubanId} moveCard={onMove}>
      <div className={style.componentPreivewWrapper} >
        <div 
          className={cs(style.componentPreivewArea, {
            [style.selectedComponent]: selected === lubanId
          })} 
          onClick={() => setSelected(lubanId)}></div>
        {props.children}
      </div>
    </Card>
    
  )
}
const transformMap: TransformMap = {
  JSXIdentifier: (node: JSXIdentifier) => node.name,
  JSXElement: (node: JSXElement) => {
    const { name, attributes } = node.openingElement
    const type = transform(name);
    const props = {
    };
    attributes.map(attr => {
      const { name, value } = transform(attr)
      Object.defineProperty(props, name, {
        value,
        enumerable: true
      })
    })
    return <Wrapper lubanId={getNodeLubanId(node)}>{React.createElement(type, props, node.children.map(transform))}</Wrapper>
  },
  JSXText: (node: JSXText): string => node.value,
  JSXAttribute: node => {
    const name = transform(node.name);
    const value = transform(node.value)
    return {
      name,
      value
    }
  },
  JSXNamespacedName : (node) => null,
  JSXFragment: (node) => React.createElement(React.Fragment, {}, node.children.map(transform)),
  StringLiteral: (node) => node.value,
  JSXExpressionContainer: node => {
    return eval(generator(node, {
      minified: true,
      concise: true,
      jsescOption: {
        quotes: "double",
        json: true
      }
    }).code)
  },
  JSXMemberExpression:  node => null,
  JSXSpreadAttribute: node=> null,
  JSXSpreadChild: node => null,
  ObjectExpression: (node) => eval(generator(node, {
    minified: true,
    concise: true,
    jsescOption: {
      quotes: "double",
      json: true
    }
  }).code)
}

interface TransformProps {
  selected: string;
  onSelect:  (data: string) => void
}



interface TransformMap {
  JSXIdentifier: (node: JSXIdentifier) => any
  JSXElement: (node:JSXElement ) => any
  JSXAttribute: (node: JSXAttribute) => any
  JSXText: (node: JSXText) => string
  JSXNamespacedName: (node : JSXNamespacedName) => any
  JSXFragment: (node: JSXFragment) => any
  StringLiteral: (node: StringLiteral) => any
  JSXExpressionContainer: (node: JSXExpressionContainer) => any
  JSXMemberExpression: (node: JSXMemberExpression) => any
  JSXSpreadAttribute: (node: JSXSpreadAttribute) => any
  JSXSpreadChild: (node: JSXSpreadChild) => any
  ObjectExpression: (node: Expression) => any
}

type transformNode = JSXIdentifier | JSXElement | JSXAttribute | JSXText | JSXNamespacedName | JSXFragment | 
    StringLiteral | JSXExpressionContainer | null | JSXMemberExpression | JSXSpreadAttribute | JSXSpreadChild
    | JSXExpressionContainer | ObjectExpression
export function transform(node: transformNode): any {
  if(node === null) return null;
  const { type } = node
  const func = transformMap[type]
  return func(node as any)
}

interface PreviewProps {
  data: transformNode
  selected?: string;
  onSelect?: (selected: string) => void
}

export default function Preview(props: PreviewProps) {
  const { data } = props
  return (
    <div>
      {transform(data)}
    </div>
  )
}