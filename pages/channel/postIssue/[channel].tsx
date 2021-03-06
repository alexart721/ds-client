/* eslint-disable no-template-curly-in-string */
import React from 'react';
import { useRouter } from 'next/router';
import { Form, Input, InputNumber, Select, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import SideBar from '../../../components/SideBar/SideBar';
import PostIssueNavBar from '../../../components/PostIssueNavBar/PostIssueNavBar';
import { IssueWithChannelId } from '../../../lib/types';
import { store } from '../../../lib/redux/store';
import { addIssueToChannel } from '../../../lib/redux/reducers';
import styles from '../../../styles/PostIssue.module.css';

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

const PostIssue: React.FC = () => {
  const router = useRouter();

  const onSubmit = async (values: any) => {
    const channelId = store.getState().channels
      .find((channel) => channel.name === router.query.channel)?.id;
    const issueData: IssueWithChannelId = {
      ...values, channelId,
    };
    store.dispatch(addIssueToChannel(issueData));
    router.push(`/channel/${router.query.channel}`);
  };

  return (
    <div className={styles.outerDiv}>
      <SideBar />
      <div className={styles.navBarDiv}>
        <PostIssueNavBar />
        <div className={styles.formDiv}>
          <Form
            {...layout}
            name="nest-messages"
            validateMessages={validateMessages}
            onFinish={onSubmit}
          >
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="patientAge" label="Patient Age" rules={[{ required: true, type: 'number', min: 0, max: 99 }]}>
              <InputNumber />
            </Form.Item>
            <Form.Item
              name="patientGender"
              label="Patient Gender"
              rules={[{ required: true, message: 'Please select gender!' }]}
            >
              <Select placeholder="select patient gender">
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="priority"
              label="Priority"
              rules={[{ required: true, message: 'Please select priority!' }]}
            >
              <Select placeholder="select issue priority">
                <Option value="Low">Low</Option>
                <Option value="Medium">Medium</Option>
                <Option value="High">High</Option>
              </Select>
            </Form.Item>
            <Form.Item name="patientMedicalIssues" label="Medical Issues" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="patientMedications" label="Medications" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={['patientVitals', 'temperature']} label="Temperature">
              <Input />
            </Form.Item>
            <Form.Item name={['patientVitals', 'heartRate']} label="Heart Rate">
              <Input />
            </Form.Item>
            <Form.Item name={['patientVitals', 'bloodPressure']} label="Blood Pressure">
              <Input />
            </Form.Item>
            <Form.Item name="issueDescription" label="Issue Description">
              <Input.TextArea autoSize={{ minRows: 3, maxRows: 3 }} />
            </Form.Item>
            <Form.Item name="imageFile" label="Upload Image">
              <Upload>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
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
};

export default PostIssue;
