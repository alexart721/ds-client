import { FC } from 'react';
import { Checkbox } from 'antd';
import { ChannelState } from '../../lib/redux/reducers';

interface Props {
  channel: ChannelState,
}
const SubscribeItem: FC<Props> = ({ channel }) => (
  <>
    <div>
    <Checkbox>{channel.name}</Checkbox>
    </div>
  </>
);

export default SubscribeItem;