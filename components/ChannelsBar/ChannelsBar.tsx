import ChannelsList from '../ChannelsList';
import { useSelector } from 'react-redux';
import { Channel } from '../../interface';

const ChannelsBar = () => {
  const channels = useSelector((state: Channel[]) => state);

  return (
    <div>
      <ChannelsList channels={channels} />
    </div>
  );
};

export default ChannelsBar;
