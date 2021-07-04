import { FC } from 'react';
import { Checkbox } from 'antd';
import { MyChannelState } from '../../lib/redux/reducers';

interface Props {
  channel: MyChannelState,
}
const SubscribeItem: FC<Props> = ({ channel }) => (
  <>
    <div>
      <Checkbox><div style={{fontSize:"large"}}>#{channel.name}</div></Checkbox>
    </div>
  </>
);

export default SubscribeItem;
