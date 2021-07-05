import React, { FC } from 'react';
import { MyChannelState } from '../../lib/redux/reducers';
import SubscribeItem from '../SubscribeItem/SubscribeItem';

interface Props {
  channels: MyChannelState[],
  onCheck: Function,
}

const SubscribeMenu: FC<Props> = ({ channels, onCheck }) => {
  return (
    <div>
      { channels && channels.map( channel => {
        return (
            <SubscribeItem
            key = {channel.id}
            channel = {channel}
            onCheck={onCheck}/>
        )
      })}
    </div>
  );
};

export default SubscribeMenu;