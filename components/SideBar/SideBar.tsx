import { Menu, Button } from 'antd';
import Link from 'next/link';
import { useSelector } from '../../lib/hooks/useTypedSelector';
import ChannelItem from '../ChannelItem/ChannelItem';
import MyIssueItem from '../MyIssueItem/MyIssueItem';
import { logoutUser } from '../../services';

const { BASE_AUTH_URL, BASE_CLIENT_URL } = process.env;

const SideBar = () => {
  const channels = useSelector((state) => state.channels);
  const issues = useSelector((state) => state.issues);
  const submenuKeys: string[] = ['channelsSub', 'issuesSub'];
  const submenuTitles: string[] = ['Channels', 'My Issues', 'Menu'];

  const handleLogout = async () => {
    await logoutUser(BASE_AUTH_URL);
    localStorage.removeItem('accessToken');
    window.location.assign(BASE_CLIENT_URL as string);
  };

  return (
    <div style={{ width: '14vw', height: '100vh', background: '#001529', fontFamily: "'Libre Caslon Text', serif" }}>
      <Menu
        defaultOpenKeys={submenuKeys}
        mode="inline"
        theme="dark"
      >
        <Menu.SubMenu key={submenuKeys[0]} title={submenuTitles[0]}>
          {channels && channels.map((channel) => (
            <Menu.Item key={channel.id}>
              <Link href="/channel/[channel]" as={`/channel/${channel.name}`} passHref>
                <ChannelItem
                  key={channel.id}
                  channel={channel}
                />
              </Link>
            </Menu.Item>
          ))}
        </Menu.SubMenu>
        <Menu.SubMenu key={submenuKeys[1]} title={submenuTitles[1]}>
          {issues && issues.map((issue) => (
            <Menu.Item key={issue.id}>
              <Link href="/channel/[channel]/[issue]" as={`/channel/${issue.channelName}/${issue.id}`} passHref>
                <MyIssueItem
                  issue={issue}
                />
              </Link>
            </Menu.Item>
          ))}
        </Menu.SubMenu>
        <Menu.SubMenu key="menu" title={submenuTitles[2]}>
          <Menu.Item>
            <Link href="/">Home</Link>
          </Menu.Item>
          <Menu.Item>
            <Button onClick={handleLogout}>Logout</Button>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
};

export default SideBar;
