import React, { FC } from 'react';
import { Layout, Button } from 'antd';
import Link from 'next/link';
import styles from './ChannelNavBar.module.css';

const { Header } = Layout;

interface Props {
  channel?: string,
  issue?: string
}

const ChannelNavBar: FC<Props> = ({channel, issue}) => {

  return (
    <div className={styles.channelsNavBarDiv}>
      <Header className={styles.sitePageHeader}>
        <div style={{display:"flex", justifyContent:"space-between"}}>
          {channel && issue ? <div>
            # {channel} - {issue}
          </div> :
          <div>
            # {channel}
          </div>
          }
          <div style={{display:"flex", alignItems:"center"}}>
            {channel && !issue ? <Link href="/channel/postIssue/[channel]" as={`/channel/postIssue/${channel}`}><Button type="primary">&emsp;&emsp; Post Issue &emsp;&emsp;</Button></Link> :
            <Link href="/channel/[channel]" as={`/channel/${channel}`}><Button type="primary">&emsp;&emsp; Back To Channel &emsp;&emsp;</Button></Link>}
          </div>
        </div>
      </Header>
    </div>
  );
};

export default ChannelNavBar;
