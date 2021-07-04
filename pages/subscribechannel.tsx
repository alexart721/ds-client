import React from 'react';
import { Button } from 'antd';
import { useSelector } from '../lib/hooks/useTypedSelector';
import ChannelsBar from '../components/ChannelsBar/ChannelsBar';
import NavBar from '../components/NavBar/NavBar';
import SubscribeMenu from '../components/SubscribeMenu/SubscribeMenu';

const SubscribeChannel = () => {
  const channels = useSelector((state) => state.channels);
  return (
    <div style={{display:"flex", flexDirection:"row"}}>
      <ChannelsBar />
      <div style={{display:"flex", flexDirection:"column"}}>
        <NavBar />
        <div style={{height:"100%", display:"flex", flexDirection:"column", alignItems:"flex-start"}}>
          <div style={{margin:"1rem"}}>
            <SubscribeMenu channels={channels}/>
          </div>
          <div style={{margin:"0 1rem"}}>
            <Button type="primary">Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscribeChannel;
