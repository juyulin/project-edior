import React, { RefObject} from 'react';
import { Button, Tabs, Form } from 'antd'
import StyleEditor from './StyleEditor';
import TextEitor from './Text'
import { JSXEditableNode } from '../../types'
const { TabPane } = Tabs;

interface ComponentEditorProps {
  node: JSXEditableNode | null
  onChange: (data: any) => void;
  onStyleChange: Function
}



export default ({
  node,
  onChange,
  onStyleChange
}: ComponentEditorProps) => {
  console.log(Form)
  const [textEditorRef]= Form.useForm();
  const [styleEditorRef] = Form.useForm();
  return (
    <Tabs defaultActiveKey="style">
      <TabPane key="style" tab="样式">
      <Button onClick={() => {
          onStyleChange(styleEditorRef.getFieldsValue())
        }}>提交</Button>
        <StyleEditor
          form={styleEditorRef}
        />
      </TabPane>
      <TabPane key="text" tab="文本">
        <Button onClick={() => {
          onChange({
            node,
            value: textEditorRef.getFieldsValue()
          }) 
         
         
        }}>提交</Button>
        <TextEitor
          form={textEditorRef} 
        />
      </TabPane>
    </Tabs>
  )
}