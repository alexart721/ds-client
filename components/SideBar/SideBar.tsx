/* eslint-disable prefer-destructuring */
import { Menu, Button } from 'antd';
import Link from 'next/link';
import { useSelector } from '../../lib/hooks/useTypedSelector';
import ChannelItem from '../ChannelItem/ChannelItem';
import MyIssueItem from '../MyIssueItem/MyIssueItem';
import { logoutUser } from '../../services';

const NEXT_PUBLIC_BASE_AUTH_URL = process.env.NEXT_PUBLIC_BASE_AUTH_URL;
const NEXT_PUBLIC_BASE_CLIENT_URL = process.env.NEXT_PUBLIC_BASE_CLIENT_URL;

const SideBar = () => {
  const channels = useSelector((state) => state.channels);
  const issues = useSelector((state) => state.issues);
  const submenuKeys: string[] = ['channelsSub', 'issuesSub'];
  const submenuTitles: string[] = ['Channels', 'My Issues', 'Menu'];

  const handleLogout = async () => {
    await logoutUser(NEXT_PUBLIC_BASE_AUTH_URL);
    localStorage.removeItem('accessToken');
    window.location.assign(NEXT_PUBLIC_BASE_CLIENT_URL as string);
  };

  return (
    <div style={{ width: '14vw', height: '100vh', background: '#001529' }}>
      <Menu
        defaultOpenKeys={submenuKeys}
        mode="inline"
        theme="dark"
      >
        <Menu.SubMenu key={submenuKeys[0]} title={submenuTitles[0]}>
          {channels && channels.map((channel) => (
            <Menu.Item key={channel.id}>
              <Link href="/channel/[channel]" as={`/channel/${channel.name}`} passHref>
                <a>
                  <ChannelItem
                    key={channel.id}
                    channel={channel}
                  />
                </a>
              </Link>
            </Menu.Item>
          ))}
        </Menu.SubMenu>
        <Menu.SubMenu key={submenuKeys[1]} title={submenuTitles[1]}>
          {issues && issues.map((issue) => (
            <Menu.Item key={issue.id}>
              <Link href="/channel/[channel]/[issue]" as={`/channel/${issue.channelName}/${issue.id}`} passHref>
                <a>
                  <MyIssueItem
                    issue={issue}
                  />
                </a>
              </Link>
            </Menu.Item>
          ))}
        </Menu.SubMenu>
        <Menu.SubMenu key="menu" title={submenuTitles[2]}>
          <Menu.Item>
            <Link href="/"><a>Home</a></Link>
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
