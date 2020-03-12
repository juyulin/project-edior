import React from 'react';
import { Collapse, Card } from 'antd';
import { ComponentTypes } from '../../reducers/componentTypes/type'
import styles from './style.module.scss'
const { Meta } = Card;
const { Panel } = Collapse;


// const ComponentTypes: Array<ComponentTypes> = [{
//   type: "htmlElement",
//   name: "基本元素",
//   elements: [{
//     type: 'div',
//     name: '图层',
//     desc: '块级容器'
//   }, {
//     type: 'span',
//     name: '行元素',
//     desc: '不换行，可填充文字等'
//   }, {
//     type: 'p',
//     name: '段落，换行',
//     desc: '段落'
//   }, {
//     type: 'img',
//     name: '图片',
//     desc: '可添加图片'
//   }]
// }, {
//   type: "dependency",
//   name: 'antd移动端',
//   lib: 'antd-mobile',
//   elements: [{
//     'type': 'Input',
//     'name': '输入框',
//     'desc': '文本输入框'
//   }, {
//     'type': 'Flex',
//     'name': '浮动布局',
//     'desc': '文本输入框'
//   },]
// }]
export interface ComponentTypesProps {
  data?: ComponentTypes
  onChange: Function
  value: any
}


export default ({
  value,
  data,
  onChange
}: ComponentTypesProps) => (
  <Collapse>
    {
     (data || []).map((item) => {
        const { name, type, elements } = item;
        return <Panel key={type} header={name}>
          <div style={{
            display: 'flex'
          }}>
            {elements.map((ele) => {
              const isSelected = value ? (value.category === item.type && value.type === ele.type) : false
              return (
                <Card  
                  style={{ width: 200, marginRight: '10px' }} 
                  key={ele.name}
                  className={isSelected ? styles.selectedItem : ''}  
                  onClick={() => onChange({
                    category: item.type,
                    ...ele
                  })}>
                  <Meta
                    title={name}
                    description={ele.desc}
                  />
                </Card>
              )
            })}
          </div>
         
        </Panel>
      })
    }
  </Collapse>
)

