import React from 'react';
import { Layout } from 'antd';
// import styles from './NavBar.module.css';

const { Header } = Layout;

const NavBar = () => {

  return (
    <div>
      {/* <Header className={styles.sitePageHeader}>Welcome Alex</Header> */}
      <Header>Welcome Alex</Header>
    </div>
  );
};

export default NavBar;