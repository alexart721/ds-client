import React from 'react';
import { useSelector } from '../lib/hooks/useTypedSelector';
import ChannelsBar from '../components/ChannelsBar/ChannelsBar';
import NavBar from '../components/NavBar/NavBar';
import SubscribeMenu from '../components/SubscribeMenu/SubscribeMenu';

const Home = () => {
  const channels = useSelector((state) => state.channels);
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
