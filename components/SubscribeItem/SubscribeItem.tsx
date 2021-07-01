import { FC } from 'react';
import { Checkbox } from 'antd'; 
import { Channel } from '../../interface';

interface Props {
  channel: Channel,
}
const SubscribeItem: FC<Props> = ({ channel }) => (
  <>
    <div>
    <Checkbox>{channel.name}</Checkbox>
    </div>
  </>
);

export default SubscribeItem;
