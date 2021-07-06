import { FC, useState } from 'react';
import Link from 'next/link';
import { Button } from 'antd';
import styles from './IssueItem.module.css';
import { Issue } from '../../types';
import moment from 'moment';

interface Props {
  issue: Issue,
  channel: string,
}

const IssueItem: FC<Props> = ({ issue, channel }) => {

  const initialState: boolean = false;
  const [state, setState] = useState(initialState);

  const clickHandler = (e: any) => {
    e.preventDefault();
    setState(!state);
  }

  return (
    <div className = {styles.outerDiv}>
      {!state ? <div>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
          <h2 style={{width:"fit-content", margin:"0"}}>{ issue.title } - Prority {issue.priority}</h2>
          <h2 style={{margin:"0"}}>{moment(issue.createdAt).fromNow()}</h2>
        </div>
        <div>
          <h3>{issue.issueOwnerName}</h3>
        </div>
        <div>
          <p style={{marginBottom:"0"}}>{issue.issueDescription}</p>
          <Button type="link" className={styles.antBtn} onClick={clickHandler}><span style={{color:"#001529"}}>See more details...</span></Button>
        </div>
      </div> :
      <div>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
          <h2 style={{width:"fit-content", margin:"0"}}>{ issue.title } - Prority {issue.priority}</h2>
          <h2 style={{margin:"0"}}>{moment(issue.createdAt).fromNow()}</h2>
        </div>
        <div>
          <h3>{issue.issueOwnerName}</h3>
        </div>
        <div>
          <p>{issue.issueDescription}</p>
          <p className={styles.details1}>Age: <span className={styles.details2}>{issue.patientAge}</span></p>
          <p className={styles.details1}>Gender: <span className={styles.details2}>{issue.patientGender}</span></p>
          <p className={styles.details1}>Medical Issues: <span className={styles.details2}>{issue.patientMedicalIssues}</span></p>
          <p className={styles.details1}>Medication: <span className={styles.details2}>{issue.patientMedications}</span></p>
          <p className={styles.details1}>Vitals:</p>
          <p className={styles.details2}>&emsp;&emsp;&emsp;Temp: {issue.patientVitals.temperature}, BP: {issue.patientVitals.bloodPressure}, HR: {issue.patientVitals.heartRate}</p>
          <p className={styles.details1}>Picture:</p>
          &emsp;&emsp;&emsp;<img style={{height:"200px", width:"200px"}} src="https://advancedtissue.com/wp-content/uploads/cut-finger.jpg"/><br/><br/>
          <Button type="primary" onClick={clickHandler} style={{marginRight:"1rem"}}>Collapse</Button>
          <Link href="/channel/[channel]/[issue]" as={`/channel/${channel}/${issue.title}`}><Button type="primary">Respond</Button></Link>
        </div>
      </div>
      }
    </div>
  )
};

export default IssueItem;
