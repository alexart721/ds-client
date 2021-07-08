/* eslint-disable prefer-destructuring */
import React, { FC, useState, useEffect } from 'react';
import { Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import moment from 'moment';
import styles from './IssueMessage.module.css';
import { Issue, MessageData } from '../../lib/types';
import MessageList from '../MessageList/MessageList';
import { useSelector } from '../../lib/hooks/useTypedSelector';

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface Props {
  issue: Issue,
}

const { Search } = Input;

const SendIcon = (
  <SendOutlined
    style={{
      fontSize: 30,
      color: '#001529',
    }}
  />
);

const IssueMessage: FC<Props> = ({ issue }) => {
  const [messages, setMessages] = useState<MessageData[]>(issue.threadMessages || []);
  const userInfo = useSelector((store) => store.user);
  const socket = useSelector((store) => store.socket.socket);

  useEffect(() => {
    if (socket && issue._id) {
      socket.emit('leave_all_rooms', `${issue._id}`);
      socket.emit('join_room', `${issue._id}`);
      socket.off('broadcast_message');
      socket.on('broadcast_message', (message: MessageData) => {
        setMessages((oldMessages) => {
          if (!oldMessages.includes(message)) {
            return oldMessages.concat(message);
          }
          return oldMessages;
        });
      });
    }
    return () => {
      socket.off('broadcast_message');
      socket.emit('leave_all_rooms', `${issue._id}`);
    };
  }, [issue._id, socket]);

  useEffect(() => {
    if (issue.threadMessages) {
      setMessages(issue.threadMessages);
    }
  }, [issue.threadMessages]);

  const onSubmit = async (values: string) => {
    const newMessage: MessageData = {
      messageOwnerId: userInfo.id,
      messageOwnerName: `Dr. ${userInfo.firstName} ${userInfo.lastName}`,
      content: values,
    };
    socket.emit('room_message', { room: `${issue._id}`, message: newMessage });
  };

  return (
    <div className={styles.mostOuterDiv}>
      <div className={styles.outerDiv}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          {issue.priority === 'Low' && (
          <h2 style={{ width: 'fit-content', marginBottom: '0.5rem', color: '#C89933' }}>
            { issue.title }
            {' '}
            - Prority
            {' '}
            {issue.priority}
          </h2>
          )}
          {issue.priority === 'Medium' && (
          <h2 style={{ width: 'fit-content', marginBottom: '0.5rem', color: 'orange' }}>
            { issue.title }
            {' '}
            - Prority
            {' '}
            {issue.priority}
          </h2>
          )}
          {issue.priority === 'High' && (
          <h2 style={{ width: 'fit-content', marginBottom: '0.5rem', color: 'red' }}>
            { issue.title }
            {' '}
            - Prority
            {' '}
            {issue.priority}
          </h2>
          )}
          {issue.priority === 'Low' && <h3 style={{ marginBottom: '0.5rem', color: '#C89933' }}>{moment(issue.createdAt).fromNow()}</h3>}
          {issue.priority === 'Medium' && <h3 style={{ marginBottom: '0.5rem', color: 'orange' }}>{moment(issue.createdAt).fromNow()}</h3>}
          {issue.priority === 'High' && <h3 style={{ marginBottom: '0.5rem', color: 'red' }}>{moment(issue.createdAt).fromNow()}</h3>}
        </div>
        <div style={{ marginBottom: '0.5rem' }}>
          {issue.issueOwnerName && <h3 style={{ color: '#103456' }}>{issue.issueOwnerName}</h3>}
        </div>
        <div>
          {issue.issueDescription && <p>{issue.issueDescription}</p>}
          <p className={styles.details1}>
            Age:
            <span className={styles.details2}>{issue.patientAge}</span>
          </p>
          <p className={styles.details1}>
            Gender:
            <span className={styles.details2}>{issue.patientGender}</span>
          </p>
          <p className={styles.details1}>
            Medical Issues:
            <span className={styles.details2}>{issue.patientMedicalIssues}</span>
          </p>
          <p className={styles.details1}>
            Medication:
            <span className={styles.details2}>{issue.patientMedications}</span>
          </p>
          {issue.patientVitals.temperature !== 'undefined'
            && issue.patientVitals.bloodPressure !== 'undefined'
            && issue.patientVitals.heartRate !== 'undefined'
            && <p className={styles.details1}>Vitals:</p>}
          { issue.patientVitals.temperature !== 'undefined'
            && issue.patientVitals.bloodPressure !== 'undefined'
            && issue.patientVitals.heartRate !== 'undefined'
            && (
            <p className={styles.details2}>
&emsp;&emsp;&emsp;Temp:
              {issue.patientVitals.temperature}
              F, BP:
              {issue.patientVitals.bloodPressure}
              , HR:
              {issue.patientVitals.heartRate}
              {' '}
              bpm
            </p>
            )}
          {issue.imageUrl ? (
            <>
              <p className={styles.details1}>Picture:</p>
            &emsp;&emsp;&emsp;
              <img style={{ height: '200px', width: '200px' }} src={`${NEXT_PUBLIC_BASE_URL}${issue.imageUrl}`} alt="Not found" />
              <br />
              <br />
            </>
          ) : null}
        </div>
      </div>
      <div>
        <div className={styles.outerDiv1}>
          <MessageList messages={messages} />
        </div>
        <div className={styles.messageBarDiv}>
          <Search
            className={styles.messageBar}
            placeholder="Type a message..."
            enterButton={SendIcon}
            size="large"
            onSearch={onSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default IssueMessage;
