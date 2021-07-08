/* eslint-disable prefer-destructuring */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from '../../lib/hooks/useTypedSelector';
import SideBar from '../../components/SideBar/SideBar';
import ChannelNavBar from '../../components/ChannelNavBar/ChannelNavBar';
import IssuesList from '../../components/IssueList/IssueList';
import { getChannelIssuesApi } from '../../services';
import { store } from '../../lib/redux/store';
import { Issue } from '../../lib/types';
import styles from '../../styles/ChannelIssues.module.css';

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const initialChannelIssues: Issue[] = [];

const ChannelIssues = () => {
  const router = useRouter();
  const { channel } = router.query as { channel: string };
  const myIssues = useSelector((state) => state.issues);
  const [channelIssues, setChannelIssues] = useState(initialChannelIssues);

  const fetchIssues = async (channelId: string) => {
    const newChannelIssues = await getChannelIssuesApi(channelId, NEXT_PUBLIC_BASE_URL)
      .then((res) => res.json());
    setChannelIssues(newChannelIssues);
  };

  useEffect(() => {
    const channelId = store.getState().channels
      .find((inner) => inner.name === router.query.channel)?.id;
    if (channelId) fetchIssues(channelId);
  }, [myIssues, router.query.channel]);

  useEffect(() => {
    store.subscribe(() => {
      const channelId = store.getState().channels
        .find((inner) => inner.name === router.query.channel)?.id;
      if (channelId) fetchIssues(channelId);
    });
  }, [router.query.channel]);

  return (
    <div style={{ display: 'flex',
      flexDirection: 'row',
      fontFamily: "'Libre Caslon Text', serif",
      backgroundColor: '#d0e4f7' }}
    >
      <SideBar />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          {channel && <ChannelNavBar channel={channel} />}
        </div>
        <div className={styles.issueDiv}>
          {channelIssues && <IssuesList issues={channelIssues} channel={channel} />}
        </div>
      </div>
    </div>
  );
};

export default ChannelIssues;
