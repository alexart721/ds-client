import React, { FC } from 'react';
import { Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import moment from 'moment';
import styles from './IssueMessage.module.css';
import { Issue } from '../../types';

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

  return (
    <>
    <div className = {styles.outerDiv}>
      <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
          <h2 style={{width:"fit-content", margin:"0"}}>{ issue.title } - {issue.priority}</h2>
          { issue.createdAt && <h2 style={{margin:"0"}}>{moment(issue.createdAt).fromNow()}</h2>}
        </div>
        <div>
          {issue.issueOwnerName && <h3>{issue.issueOwnerName}</h3>}
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
          <p className={styles.details1}>Picture:</p>
          &emsp;&emsp;&emsp;<img style={{height:"200px", width:"200px"}} src="https://advancedtissue.com/wp-content/uploads/cut-finger.jpg"/><br/><br/>
        </div>
    </div>
    <div>
      <div className={styles.outerDiv1}>
      <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
          <h2 style={{width:"fit-content", margin:"0"}}>Prority Medium</h2>
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
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
          <h2 style={{width:"fit-content", margin:"0"}}>Prority Medium</h2>
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
      <div className={styles.messageBarDiv}>
        <Search
          className={styles.messageBar}
          placeholder="Type a message..."
          enterButton={SendIcon}
          size="large"
      />
      </div>
      
    </div>
    </>
  );
};

export default IssueMessage;
