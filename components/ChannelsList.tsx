import React, { FC } from 'react';
import ChannelItem from './ChannelItem';

interface Props {
  channels: [{
    id: string,
    name: string,
  }],
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
