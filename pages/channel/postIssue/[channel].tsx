import React from 'react';
import { Form, Input, InputNumber, Select, Button } from 'antd';
import ChannelsBar from '../../../components/ChannelsBar/ChannelsBar';
import PostIssueNavBar from '../../../components/PostIssueNavBar/PostIssueNavBar';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const { Option } = Select;

const PostIssue = () => {

  return (
    <div style={{display:"flex", flexDirection:"row"}}>
      <ChannelsBar />
      <div style={{display:"flex", flexDirection:"column"}}>
        <PostIssueNavBar />
        <div style={{margin:"4rem", justifyContent:"center"}} >
          <Form {...layout} name="nest-messages" validateMessages={validateMessages}>
            <Form.Item name={['user', 'title']} label="Title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={['user', 'age']} label="Age" rules={[{ required: true, type: 'number', min: 0, max: 99 }]}>
              <InputNumber />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: 'Please select gender!' }]}
            >
              <Select placeholder="select patient gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
            <Form.Item name={['user', 'patientMedicalIssues']} label="Medical Issues" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={['user', 'patientMedications']} label="Medications" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={['user', 'temperature']} label="Temperature" rules={[{ type: 'number', min: 99, max: 110 }]}>
              <InputNumber />
            </Form.Item>
            <Form.Item name={['user', 'heart rate']} label="Heart Rate" rules={[{ type: 'number'}]}>
              <InputNumber />
            </Form.Item>
            <Form.Item name={['user', 'blood pressure']} label="Blood Pressure">
              <Input />
            </Form.Item>
            {/* <Form.Item name={['user', 'blood pressure sbp']} label="Blood Presure (SBP)" rules={[{ type: 'number'}]}>
              <InputNumber />
            </Form.Item>
            <Form.Item name={['user', 'blood pressure dbp']} label="Blood Presure (DBP)" rules={[{ type: 'number'}]}>
              <InputNumber />
            </Form.Item> */}
            <Form.Item name={['user', 'issue description']} label="Issue Description">
              <Input.TextArea autoSize={{ minRows: 3, maxRows: 3 }}/>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default PostIssue;
