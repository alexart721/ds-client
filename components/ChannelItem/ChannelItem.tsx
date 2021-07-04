import { FC } from 'react';
import { ChannelState } from '../../lib/redux/reducers';

interface Props {
  channel: ChannelState,
}

const ChannelItem: FC<Props> = ({ channel }) => (
  <>
    <div>
      <label htmlFor="channel"># { channel.name }</label>
    </div>
  </>
);

export default ChannelItem;
