import React, { FC } from 'react';
import ChannelItem from './ChannelItem';
import { Channel } from '../interface';

interface Props {
  channels: Channel[],
}

const ChannelsList: FC<Props> = ({ channels }) => (
  <>
    <div>
      { channels && channels.map( channel => {
        return (
          <ChannelItem
          key = {channel.id}
          channel = {channel}/>
        )
      })}
    </div>
  </>
);

export default ChannelsList;
