import ChannelsList from '../ChannelList/ChannelsList';
import MyIssuesList from '../MyIssuesList/MyIssuesList';
import { useSelector } from '../../lib/hooks/useTypedSelector';
import { Menu } from 'antd';

const { SubMenu } = Menu;

const SideBar = () => {
  const channels = useSelector((state) => state.channels);
  const issues = useSelector((state) => state.issues);
  console.log(channels);

  return (
    <div style={{ width: "14vw", height: "100vh", background: "#001529" } }>
      <Menu
        defaultOpenKeys={['sub1','sub2']}
        mode="inline"
        theme="dark"
      >
        <SubMenu key="sub1" title="Channels" >
          <ChannelsList channels={channels} />
        </SubMenu>
        <SubMenu key="sub2" title="My Issues" >
          <MyIssuesList issues={issues} />
        </SubMenu>
      </Menu>
    </div>
  );
};

export default SideBar;
