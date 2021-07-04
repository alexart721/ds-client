import ChannelsList from '../ChannelList/ChannelsList';
import { useSelector } from '../../lib/hooks/useTypedSelector';

const ChannelsBar = () => {
  const channels = useSelector((state) => state.channels);

  return (
    <div>
      <ChannelsList channels={channels} />
    </div>
  );
};

export default ChannelsBar;
