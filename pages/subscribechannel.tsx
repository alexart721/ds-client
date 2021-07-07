import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import SideBar from '../components/SideBar/SideBar';
import NavBar from '../components/NavBar/NavBar';
import SubscribeMenu from '../components/SubscribeMenu/SubscribeMenu';
import { getSubscribeChannels } from '../services';
import { Channel } from '../types';
import { addChannelsToUser, MyChannelState } from '../lib/redux/reducers';
import { store } from '../lib/redux/store';

const initialChannels: MyChannelState[] = [];
const initialChosenChannels: MyChannelState[] = [];

const SubscribeChannel: React.FC = () => {
  const [availChannels, setAvailChannels] = useState(initialChannels);
  const [chosenChannels, setChosenChannels] = useState(initialChosenChannels);

  const getChannels = async () => {
    let subscribeChannels = await getSubscribeChannels().then(res => res.json());
    subscribeChannels = subscribeChannels.map((channel: Channel) => ({ id: channel._id, name: channel.name }));
    const currentChannels = store.getState().channels;
    const currentChannelIds = currentChannels.map(channel => channel.id);
    subscribeChannels = subscribeChannels.filter((channel: MyChannelState) => !currentChannelIds.includes(channel.id));
    setAvailChannels(oldChannels => oldChannels.concat(subscribeChannels));
    store.subscribe(() => {
      const currentChannels = store.getState().channels;
      const currentChannelIds = currentChannels.map(channel => channel.id);
      const currentAvailChannels = availChannels.length === 0 ? subscribeChannels : availChannels;
      const newAvailChannels = currentAvailChannels.filter((channel: MyChannelState) => !currentChannelIds.includes(channel.id));
      setAvailChannels(newAvailChannels);
    });
  };

  useEffect(() => {
    getChannels();
  }, []);


  const onSubmit = () => {
    store.dispatch(addChannelsToUser(chosenChannels));
    const chosenChannelIds = chosenChannels.map(channel => channel.id);
    const newAvailChannels = availChannels.filter((channel: MyChannelState) => !chosenChannelIds.includes(channel.id));
    setAvailChannels(newAvailChannels);
    setChosenChannels(initialChosenChannels);
  }

  const onCheck = (channel: MyChannelState) => {
    setChosenChannels(oldChannels => oldChannels.concat(channel));
  }

  return (
    <div style={{display:"flex", flexDirection:"row",
                fontFamily: "'Libre Caslon Text', serif", backgroundColor:"rgba(228, 253, 248, 0.75)"}}>
      <SideBar />
      <div style={{display:"flex", flexDirection:"column"}}>
        <NavBar />
        <div style={{height:"100%", display:"flex", flexDirection:"column", alignItems:"flex-start"}}>
          <div style={{margin:"1rem"}}>
            <SubscribeMenu channels={availChannels} onCheck={onCheck}/>
          </div>
          <div style={{margin:"0 1rem"}}>
            <Button onClick={onSubmit} type="primary">Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscribeChannel;
