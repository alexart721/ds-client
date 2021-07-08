import { FC } from 'react';
import { MyChannelState } from '../../lib/types';

interface Props {
  channel: MyChannelState,
}

const ChannelItem: FC<Props> = ({ channel }) => (
  <div>
    <label htmlFor="channel">
      #
      { channel.name }
    </label>
  </div>
);

export default ChannelItem;
