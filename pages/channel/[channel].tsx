import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from '../../lib/hooks/useTypedSelector';
import ChannelsBar from '../../components/ChannelsBar/ChannelsBar';
import ChannelNavBar from '../../components/ChannelNavBar/ChannelNavBar';
import IssuesList from '../../components/IssueList/IssueList';

const ChannelIssues = () => {

  const router = useRouter();
  const {channel} = router.query as {channel: string};
  const issues = useSelector((state) => state.issues);

  return (
    <div style={{display:"flex", flexDirection:"row"}}>
      <ChannelsBar />
      <div style={{display:"flex", flexDirection:"column"}}>
        <div>
          {channel && <ChannelNavBar channel={channel}/>}
        </div>
        <div style={{height:"100%"}}>
          {issues && <IssuesList issues={issues} channel={channel}/>}
        </div>
      </div>
    </div>
  );
}

export default ChannelIssues;
