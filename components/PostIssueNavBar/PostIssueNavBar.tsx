import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Layout, Button } from 'antd';
import styles from './PostIssueNavBar.module.css';

const { Header } = Layout;

const PostIssueNavBar = () => {
  const router = useRouter();
  const { channel } = router.query;

  return (
    <div className={styles.postIssueNavBarDiv}>
      <Header className={styles.sitePageHeader}>
        <div>
          #
          {channel}
          {' '}
          - New Issue
        </div>
        <div className={styles.innerDiv}>
          <Link href="/channel/[channel]" as={`/channel/${channel}`} passHref><Button type="primary">&emsp;&emsp; Back To Channel &emsp;&emsp;</Button></Link>
        </div>
      </Header>
    </div>
  );
};

export default PostIssueNavBar;
