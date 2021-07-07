import React, { FC, useState } from 'react';
import { Input, message } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import moment from 'moment';
import styles from './IssueMessage.module.css';
import { Issue } from '../../types';
// import io from 'socket.io-client';
import sockets from '../../sockets';

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
  const [messageTest, setMessageTest] = useState('');
  const socket = sockets.init();

  socket.on('connection', () => {
    socket.emit('join_room', `${issue}`);
  });
  socket.on('broadcast_message', (message: string) => {
    console.log(message);

    setMessageTest(message);
  });

  const onSubmit = async (values: string) => {
    console.log(values);
    socket.emit('message', { room: `${issue}`, message: `${values}` });
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
          <p className={styles.details1}>Vitals:</p>
          <p className={styles.details2}>&emsp;&emsp;&emsp;Temp: {issue.patientVitals.temperature}F, BP: {issue.patientVitals.bloodPressure}, HR: {issue.patientVitals.heartRate} bpm</p>
          <p className={styles.details1}>Picture:</p>
          &emsp;&emsp;&emsp;<img style={{height:"200px", width:"200px"}} src="https://advancedtissue.com/wp-content/uploads/cut-finger.jpg"/><br/>
        </div>
    </div>
    <div>
      <div className={styles.outerDiv1}>
        <p>{messageTest}</p>
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
