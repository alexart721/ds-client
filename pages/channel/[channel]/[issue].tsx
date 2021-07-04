import React from 'react';
import { useRouter } from 'next/router';
import ChannelsBar from '../../../components/ChannelsBar/ChannelsBar';
import ChannelNavBar from '../../../components/ChannelNavBar/ChannelNavBar';
import IssueMessage from '../../../components/IssueMessage/IssueMessage';

const ChannelIssue = () => {

  const router = useRouter();
  const {channel} = router.query as {channel: string};
  const {issue} = router.query as {issue: string};

  return (
    <div style={{display:"flex", flexDirection:"row"}}>
      <ChannelsBar />
      <div>
        <ChannelNavBar channel={channel} issue={issue}/>
        <IssueMessage issue={issue}/>
      </div>
    </div>
  );
}

export default ChannelIssue;