import { FC } from 'react';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { MyChannelState } from '../../lib/types';

interface Props {
  channel: MyChannelState,
  onCheck: Function
}
const SubscribeItem: FC<Props> = ({ channel, onCheck }) => {
  const handleChange = (event: CheckboxChangeEvent) => {
    event.preventDefault();
    onCheck(event.target.value);
  };

  return (
    <>
      <div>
        <Checkbox onChange={handleChange} value={channel}>
          <div style={{ fontSize: 'medium' }}>
            #
            {channel.name}
          </div>
        </Checkbox>
      </div>
    </>
  );
};

export default SubscribeItem;
