import { FC } from 'react';

interface Props {
  channel: {
    id: string,
    name: string,
  },
}

const ChannelItem: FC<Props> = ({ channel }) => (
  <>
    <div>
      <label htmlFor="channel">{ channel.name }</label>
    </div>
  </>
);

export default ChannelItem;
