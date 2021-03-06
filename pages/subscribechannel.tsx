import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import SideBar from '../components/SideBar/SideBar';
import NavBar from '../components/NavBar/NavBar';
import SubscribeMenu from '../components/SubscribeMenu/SubscribeMenu';
import { getSubscribeChannels } from '../services';
import { Channel, MyChannelState } from '../lib/types';
import { addChannelsToUser } from '../lib/redux/reducers';
import { store } from '../lib/redux/store';

const initialChannels: MyChannelState[] = [];
const initialChosenChannels: MyChannelState[] = [];

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface Props {
  userName: string,
}

const SubscribeChannel: React.FC<Props> = ({ userName }) => {
  const [availChannels, setAvailChannels] = useState(initialChannels);
  const [chosenChannels, setChosenChannels] = useState(initialChosenChannels);

  const getChannels = async () => {
    let subscribeChannels = await getSubscribeChannels(NEXT_PUBLIC_BASE_URL)
      .then((res) => res.json());
    subscribeChannels = subscribeChannels
      .map((channel: Channel) => ({ id: channel._id, name: channel.name }));
    const currentChannels = store.getState().channels;
    const currentChannelIds = currentChannels.map((channel) => channel.id);
    subscribeChannels = subscribeChannels
      .filter((channel: MyChannelState) => !currentChannelIds.includes(channel.id));
    setAvailChannels((oldChannels) => oldChannels.concat(subscribeChannels));
    store.subscribe(() => {
      const subscribeCurrentChannels = store.getState().channels;
      const subscribeCurrentChannelIds = subscribeCurrentChannels.map((channel) => channel.id);
      const currentAvailChannels = availChannels.length === 0 ? subscribeChannels : availChannels;
      const newAvailChannels = currentAvailChannels
        .filter((channel: MyChannelState) => !subscribeCurrentChannelIds.includes(channel.id));
      setAvailChannels(newAvailChannels);
    });
  };

  useEffect(() => {
    getChannels();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = () => {
    store.dispatch(addChannelsToUser(chosenChannels));
    const chosenChannelIds = chosenChannels.map((channel) => channel.id);
    const newAvailChannels = availChannels
      .filter((channel: MyChannelState) => !chosenChannelIds.includes(channel.id));
    setAvailChannels(newAvailChannels);
    setChosenChannels(initialChosenChannels);
  };

  const onCheck = (channel: MyChannelState) => {
    setChosenChannels((oldChannels) => oldChannels.concat(channel));
  };

  return (
    <div style={{ display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#d0e4f7',
      color: '#103456' }}
    >
      <SideBar />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <NavBar userName={userName} />
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{ margin: '1rem 3rem' }}>
            <SubscribeMenu channels={availChannels} onCheck={onCheck} />
          </div>
          <div style={{ margin: '0 3rem' }}>
            <Button onClick={onSubmit} type="primary">Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribeChannel;
