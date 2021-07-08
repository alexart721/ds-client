import React, { FC } from 'react';
import { MyChannelState } from '../../lib/types';
import SubscribeItem from '../SubscribeItem/SubscribeItem';

interface Props {
  channels: MyChannelState[],
  onCheck: Function,
}

const SubscribeMenu: FC<Props> = ({ channels, onCheck }) => (
  <div>
    { channels && channels.map((channel) => (
      <SubscribeItem
        key={channel.id}
        channel={channel}
        onCheck={onCheck}
      />
    ))}
  </div>
);

export default SubscribeMenu;
