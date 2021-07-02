import ChannelsList from '../ChannelsList';
import { useSelector } from 'react-redux';
import { ChannelState } from '../../lib/redux/reducers';

const ChannelsBar = () => {
  const channels = useSelector((state: ChannelState[]) => state);

  return (
    <div>
      <ChannelsList channels={channels} />
    </div>
  );
};

export default ChannelsBar;
