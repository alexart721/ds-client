import { FC } from 'react';
import { Channel } from '../interface';

interface Props {
  channel: Channel,
}

const ChannelItem: FC<Props> = ({ channel }) => (
  <>
    <div>
      <label htmlFor="channel"># { channel.name }</label>
    </div>
  </>
);

export default ChannelItem;
