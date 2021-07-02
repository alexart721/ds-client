import React from 'react';
import { useSelector } from 'react-redux';
import ChannelsBar from '../components/ChannelsBar/ChannelsBar';
import NavBar from '../components/NavBar/NavBar';
import SubscribeMenu from '../components/SubscribeMenu/SubscribeMenu';
import { ChannelState } from '../lib/redux/reducers';

const Home = () => {
  const channels = useSelector((state: ChannelState[]) => state);
  return (
    <div style={{display:"flex", flexDirection:"row"}}>
      <ChannelsBar />
      <div style={{display:"flex", flexDirection:"column"}}>
        <NavBar />
        <SubscribeMenu channels={channels}/>
      </div>
    </div>
  );
}

export default Home;
