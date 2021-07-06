import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from '../../lib/hooks/useTypedSelector';
import ChannelsBar from '../../components/ChannelsBar/ChannelsBar';
import ChannelNavBar from '../../components/ChannelNavBar/ChannelNavBar';
import IssuesList from '../../components/IssueList/IssueList';
import { getChannelIssuesApi } from '../../services';
import { store } from '../../lib/redux/store';
import { Issue } from '../../types';

const initialChannelIssues: Issue[] = [];

const ChannelIssues = () => {
  const router = useRouter();
  const {channel} = router.query as {channel: string};
  const myIssues = useSelector((state) => state.issues);
  const [channelIssues, setChannelIssues] = useState(initialChannelIssues);

  const fetchIssues = async (channelId: string) => {
    const newChannelIssues = await getChannelIssuesApi(channelId).then(res => res.json());
    setChannelIssues(newChannelIssues);
  }

  useEffect(() => {
    const channelId = store.getState().channels.find(channel => channel.name === router.query.channel)?.id;
    if (channelId) fetchIssues(channelId);
  }, [myIssues, router.query.channel]);

  useEffect(() => {
    store.subscribe(() => {
      const channelId = store.getState().channels.find(channel => channel.name === router.query.channel)?.id;
    if (channelId) fetchIssues(channelId);
    })
  }, [])

  return (
    <div style={{display:"flex", flexDirection:"row"}}>
      <ChannelsBar />
      <div style={{display:"flex", flexDirection:"column"}}>
        <div>
          {channel && <ChannelNavBar channel={channel}/>}
        </div>
        <div style={{height:"100%"}}>
          {channelIssues && <IssuesList issues={channelIssues} channel={channel}/>}
        </div>
      </div>
    </div>
  );
}

export default ChannelIssues;
