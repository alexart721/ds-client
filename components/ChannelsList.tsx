import React, { FC } from 'react';
import ChannelItem from './ChannelItem';
import { ChannelState } from '../lib/redux/reducers';

interface Props {
  channels: ChannelState[],
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
