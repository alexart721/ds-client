import React, { FC, useState, useEffect } from 'react';
import { Input, message } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import moment from 'moment';
import styles from './IssueMessage.module.css';
import { Issue, MessageData } from '../../types';
// import io from 'socket.io-client';
import sockets from '../../sockets';
import MessageList from '../MessageList/MessageList';
import { store } from '../../lib/redux/store';
import { UserState } from '../../lib/redux/reducers';
import { useSelector } from '../../lib/hooks/useTypedSelector';
import { BASE_URL } from '../../services';

interface Props {
  issue: Issue,
}

const {Search} = Input;

const SendIcon = (<SendOutlined
                  style={{
                    fontSize: 30,
                    color: '#001529',
                  }}
                  />)

const IssueMessage: FC<Props>  = ({ issue }) => {

  const [messages, setMessages] = useState<MessageData[]>(issue.threadMessages || []);
  const userInfo = useSelector((store) => store.user);
  const socket = useSelector((store) => store.socket.socket);

  useEffect(() => {
    // Get messages from issue
    // console.log(issue.threadMessages);
    // if (issue.threadMessages && issue.threadMessages.length > messages.length) {
    //   setMessages(issue.threadMessages);
    // }
    // console.log('store', store.getState());
    // if (!userInfo) {
    //   userInfo = store.getState().user;
    // }
//
    if (socket && issue._id) {
      console.log('Loading socket...');
      socket.emit('leave_all_rooms', `${issue._id}`);
console.log('Issue id when joining room:', issue._id);
      socket.emit('join_room', `${issue._id}`);
      socket.off('broadcast_message');
      socket.on('broadcast_message', (message: MessageData) => {
        console.log('Message received', message);
        setMessages(oldMessages => {
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
    }
  }, [issue._id, socket]);

  useEffect(() => {
    if (issue.threadMessages) {
      setMessages(issue.threadMessages);
    }
  }, [issue.threadMessages]);

  // *****
  // * Socket.io stuff
  // *****



  const onSubmit = async (values: string) => {
    const newMessage: MessageData = {
      messageOwnerId: userInfo.id,
      messageOwnerName: `Dr. ${userInfo.firstName} ${userInfo.lastName}`,
      content: values,
    }
    console.log(newMessage);
    socket.emit('room_message', { room: `${issue._id}`, message: newMessage });
  }

  return (
    <div className={styles.mostOuterDiv}>
      <div className = {styles.outerDiv}>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
          {issue.priority === "Low" && <h2 style={{width:"fit-content", marginBottom:"0.5rem", color:"#C89933"}}>{ issue.title } - Prority {issue.priority}</h2>}
          {issue.priority === "Medium" && <h2 style={{width:"fit-content", marginBottom:"0.5rem", color:"orange"}}>{ issue.title } - Prority {issue.priority}</h2>}
          {issue.priority === "High" && <h2 style={{width:"fit-content", marginBottom:"0.5rem", color:"red"}}>{ issue.title } - Prority {issue.priority}</h2>}
          {issue.priority === "Low" && <h3 style={{marginBottom:"0.5rem", color:"#C89933"}}>{moment(issue.createdAt).fromNow()}</h3>}
          {issue.priority === "Medium" && <h3 style={{marginBottom:"0.5rem", color:"orange"}}>{moment(issue.createdAt).fromNow()}</h3>}
          {issue.priority === "High" && <h3 style={{marginBottom:"0.5rem", color:"red"}}>{moment(issue.createdAt).fromNow()}</h3>}
        </div>
        <div style={{marginBottom:"0.5rem"}}>
          {issue.issueOwnerName && <h3 style={{color:"#103456"}}>{issue.issueOwnerName}</h3>}
        </div>
        <div>
          {issue.issueDescription && <p>{issue.issueDescription}</p>}
          <p className={styles.details1}>Age: <span className={styles.details2}>{issue.patientAge}</span></p>
          <p className={styles.details1}>Gender: <span className={styles.details2}>{issue.patientGender}</span></p>
          <p className={styles.details1}>Medical Issues: <span className={styles.details2}>{issue.patientMedicalIssues}</span></p>
          <p className={styles.details1}>Medication: <span className={styles.details2}>{issue.patientMedications}</span></p>
          {issue.patientVitals.temperature !=='undefined' &&
            issue.patientVitals.bloodPressure !== 'undefined' &&
            issue.patientVitals.heartRate !== 'undefined' &&
            <p className={styles.details1}>Vitals:</p>}
          { issue.patientVitals.temperature !=='undefined' &&
            issue.patientVitals.bloodPressure !== 'undefined' &&
            issue.patientVitals.heartRate !== 'undefined' &&
            <p className={styles.details2}>&emsp;&emsp;&emsp;Temp: {issue.patientVitals.temperature}F, BP: {issue.patientVitals.bloodPressure}, HR: {issue.patientVitals.heartRate} bpm</p>}
          {issue.imageUrl ?<>
          <p className={styles.details1}>Picture:</p>
            &emsp;&emsp;&emsp;<img style={{height:"200px", width:"200px"}} src={`${BASE_URL}${issue.imageUrl}`}/><br/><br/></> : null}
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
