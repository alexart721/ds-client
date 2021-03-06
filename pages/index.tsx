import React from 'react';
import Link from 'next/link';
import { Button } from 'antd';
import SideBar from '../components/SideBar/SideBar';
import NavBar from '../components/NavBar/NavBar';

interface Props {
  userName: string
}

const Home: React.FC<Props> = ({ userName }) => (
  <div style={{ display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#d0e4f7',
    color: '#103456' }}
  >
    <SideBar />
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <NavBar userName={userName} />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <h1 style={{ marginBottom: '2rem', fontSize: 'xxx-large', position: 'absolute', top: '20rem' }}>Welcome to DoctorSource!</h1>
        <p style={{ fontSize: 'large', position: 'absolute', top: '25rem' }}>
          Please select a channel or
          <Link href="/subscribechannel" passHref><Button type="link" style={{ fontSize: 'large', padding: '0' }}>subscribe</Button></Link>
          {' '}
          new channels!
        </p>
      </div>
    </div>
  </div>
);

export default Home;
