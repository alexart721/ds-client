import { FC, useState } from 'react';
import Link from 'next/link';
import { Button } from 'antd';
import { IssueState } from '../../lib/redux/reducers';
import styles from './IssueItem.module.css';

interface Props {
  issue: IssueState,
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
          <h2 style={{width:"fit-content", margin:"0"}}>{ issue.title } - Prority Medium</h2>
          <h2 style={{margin:"0"}}>Time</h2>
        </div>
        <div>
          <h3>Dr. Alex Teodorescu</h3>
        </div>
        <div>
          <p style={{marginBottom:"0"}}>Hi, Here we will add description of the issue.</p>
          <Button type="link" className={styles.antBtn} onClick={clickHandler}><span style={{color:"#001529"}}>See more details...</span></Button>
        </div>
      </div> : 
      <div>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
          <h2 style={{width:"fit-content", margin:"0"}}>{ issue.title } - Prority Medium</h2>
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
          <Button type="primary" onClick={clickHandler}>Collapse</Button>
          <Link href="/channel/[channel]/[issue]" as={`/channel/${channel}/${issue.title}`}><Button type="primary">Respond</Button></Link>
        </div>
      </div>
      }
    </div>
  )
};

export default IssueItem;
