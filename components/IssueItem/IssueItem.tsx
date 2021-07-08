import { FC, useState } from 'react';
import Link from 'next/link';
import { Button } from 'antd';
import moment from 'moment';
import Image from 'next/image';
import styles from './IssueItem.module.css';
import { Issue } from '../../lib/types';

const { BASE_URL } = process.env;

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
  };

  return (
    <div className={styles.outerDiv}>
      {!state ? (
        <div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
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
          <div>
            <h3 style={{ color: '#103456' }}>{issue.issueOwnerName}</h3>
          </div>
          <div>
            <p style={{ marginBottom: '0', color: '#103456' }}>{issue.issueDescription}</p>
            <Button type="link" className={styles.antBtn} onClick={clickHandler}><span style={{ color: '#4091DD' }}>See more details...</span></Button>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
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
          <div>
            <h3 style={{ color: '#103456' }}>{issue.issueOwnerName}</h3>
          </div>
          <div>
            <p style={{ color: '#103456' }}>{issue.issueDescription}</p>
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
            <p className={styles.details1}>Vitals:</p>
            <p className={styles.details2}>
&emsp;&emsp;&emsp;Temp:
              {issue.patientVitals.temperature}
              , BP:
              {issue.patientVitals.bloodPressure}
              , HR:
              {issue.patientVitals.heartRate}
            </p>
            {issue.imageUrl ? (
              <>
                <p className={styles.details1}>Picture:</p>
            &emsp;&emsp;&emsp;
                <Image height="200px" width="200px" src={`${BASE_URL}${issue.imageUrl}`} alt="Not found" />
                <br />
                <br />
              </>
            ) : null}
            <Button type="primary" onClick={clickHandler} style={{ marginRight: '1rem' }}>Collapse</Button>
            <Link href="/channel/[channel]/[issue]" as={`/channel/${channel}/${issue._id}`} passHref><Button type="primary">Respond</Button></Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueItem;
