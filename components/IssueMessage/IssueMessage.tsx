import React, { FC, useState } from 'react';
import { Input, message } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import styles from './IssueMessage.module.css';
// import io from 'socket.io-client';
import sockets from '../../sockets';

interface Props {
  issue: string,
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
    <>
    <div className = {styles.outerDiv}>
      <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
          <h2 style={{width:"fit-content", margin:"0"}}>{ issue } - Prority Medium</h2>
          <h2 style={{margin:"0"}}>Time</h2>
        </div>
        <div>
          <h3>Dr. Alex Teodorescu</h3>
        </div>
        <div>
          <p>Hi, Here we will add description of the issue.</p>
          <p className={styles.details1}>Age: <span className={styles.details2}>42</span></p>
          <p className={styles.details1}>Gender: <span className={styles.details2}>Male</span></p>
          <p className={styles.details1}>Medical Issues: <span className={styles.details2}>Hypertension</span></p>
          <p className={styles.details1}>Medication: <span className={styles.details2}>Chlorthalidone</span></p>
          <p className={styles.details1}>Vitals:</p>
          <p className={styles.details2}>&emsp;&emsp;&emsp;Temp: 98.5F, BP: 130/80, HR: 72 bpm</p>
          <p className={styles.details1}>Picture:</p>
          &emsp;&emsp;&emsp;<img style={{height:"200px", width:"200px"}} src="https://advancedtissue.com/wp-content/uploads/cut-finger.jpg"/><br/><br/>
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
          allowClear
          enterButton={SendIcon}
          size="large"
          onSearch={onSubmit}
        />
      </div>
    </div>
    </>
  );
};

export default IssueMessage;
