import ChannelsList from '../ChannelList/ChannelsList';
import { useSelector } from '../../lib/hooks/useTypedSelector';
import { shallowEqual } from 'react-redux';

const SideBar = () => {
  const channels = useSelector((state) => state.channels);
  console.log(channels);

  return (
    <div>
      <ChannelsList channels={channels} />
    </div>
  );
};

export default SideBar;
