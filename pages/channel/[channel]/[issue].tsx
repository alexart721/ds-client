import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SideBar from '../../../components/SideBar/SideBar';
import ChannelNavBar from '../../../components/ChannelNavBar/ChannelNavBar';
import IssueMessage from '../../../components/IssueMessage/IssueMessage';
import { getIssueByIdApi } from '../../../services';
import { Issue } from '../../../types';
import styles from '../../../styles/ChannelIssue.module.css';

const initialState: Issue = {
  title: '',
  priority: '',
  status: '',
  issueOwnerName: '',
  patientAge: 0,
  patientGender: '',
  patientMedicalIssues: '',
  patientMedications: '',
  patientVitals: {
    temperature: '',
    heartRate: '',
    bloodPressure: '',
  },
  imageUrl: '',
  issueDescription: '',
};

const ChannelIssue = () => {

  const router = useRouter();
  const {channel} = router.query as {channel: string};
  const [singleIssue, setSingleIssue] = useState(initialState);
  
  useEffect(() => {
    const {issue} = router.query as {issue: string};
    if (issue) {
      getIssuebyId(issue);
    }
  },[router.query.issue]);


  const getIssuebyId = async (issue: string) => {
    const issueData: Issue = await getIssueByIdApi(issue).then(res => res.json());
    setSingleIssue(issueData);
  }

  return (
    <div className={styles.outerDiv}>
      <SideBar />
      <div>
        <ChannelNavBar channel={channel} issue={singleIssue.title}/>
        <IssueMessage issue={singleIssue}/>
      </div>
    </div>
  );
};

export default ChannelIssue;