import React from 'react';
import { Layout } from 'antd';
import styles from './NavBar.module.css';

const { Header } = Layout;

interface Props {
  userName: string
}

const NavBar: React.FC<Props> = ({userName}) => {

  return (
    <div className={styles.navBarDiv}>
      <Header className={styles.sitePageHeader}>Welcome {userName}</Header>
    </div>
  );
};

export default NavBar;