import React from 'react';
import Link from 'next/link'
import { Button } from 'antd';
import ChannelsBar from '../components/ChannelsBar/ChannelsBar';
import NavBar from '../components/NavBar/NavBar';

const Home = () => {
  return (
    <div style={{display:"flex", flexDirection:"row"}}>
      <ChannelsBar />
      <div style={{display:"flex", flexDirection:"column"}}>
        <NavBar />
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height:"100%"}}>
          <h1 style={{marginBottom: "2rem", fontSize:"xxx-large"}}>Welcome to DoctorSource!</h1>
          <p style={{fontSize:"large"}}>Please select a channel or <Link href="/subscribechannel"><Button type="link" style={{fontSize:"large", padding:"0"}}>subscribe</Button></Link> new channels!</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
