import React, { FC } from 'react';
import { ChannelState } from '../../lib/redux/reducers';
import SubscribeItem from '../SubscribeItem/SubscribeItem';

interface Props {
  channels: ChannelState[],
}

const SubscribeMenu: FC<Props> = ({ channels }) => {

  return (
    <div>
      { channels && channels.map( channel => {
                return (
                    <SubscribeItem
                    key = {channel.id}
                    channel = {channel}/>
                )
              })}
    </div>
  );
};

export default SubscribeMenu;