import { useSelector } from '../../lib/hooks/useTypedSelector';
import { useRouter } from 'next/router';
import { Menu } from 'antd';
import Link from 'next/link';
import ChannelItem from '../ChannelItem/ChannelItem';
import MyIssueItem from '../MyIssueItem/MyIssueItem';
import { BASE_AUTH_URL, BASE_CLIENT_URL, logoutUser } from '../../services';

const SideBar = () => {
  const router = useRouter();
  const channels = useSelector((state) => state.channels);
  const issues = useSelector((state) => state.issues);
  const submenuKeys: string[] = ['channelsSub', 'issuesSub'];
  const submenuTitles: string[] = ['Channels', 'My Issues', 'Menu'];

  const handleLogout = async () => {
    const logout = confirm('Are you sure you want to logout now?');
    if (logout) {
      await logoutUser(BASE_AUTH_URL);
      localStorage.removeItem('accessToken');
      window.location.assign(BASE_CLIENT_URL);
    }
  };

  return (
    <div style={{ width: "14vw", height: "100vh", background: "#001529", fontFamily:"'Libre Caslon Text', serif" } }>
      <Menu
        defaultOpenKeys={submenuKeys}
        mode="inline"
        theme="dark"
      >
        <Menu.SubMenu key={submenuKeys[0]} title={submenuTitles[0]}>
          {channels && channels.map(channel => (
              <Menu.Item key={channel.id}>
                <Link href="/channel/[channel]" as={`/channel/${channel.name}`}>
                  <a>
                    <ChannelItem
                      key={channel.id}
                      channel={channel}
                    />
                  </a>
                </Link>
              </Menu.Item>
            )
          )}
        </Menu.SubMenu>
        <Menu.SubMenu key={submenuKeys[1]} title={submenuTitles[1]} >
          {issues && issues.map(issue => {
            return (
              <Menu.Item key={issue.id}>
                <Link href="/channel/[channel]/[issue]" as={`/channel/${issue.channelName}/${issue.id}`}>
                  <a>
                    <MyIssueItem
                      issue={issue}
                    />
                  </a>
                </Link>
              </Menu.Item>
            )
          })}
        </Menu.SubMenu>
        <Menu.SubMenu key='menu' title={submenuTitles[2]} >
          <Menu.Item >
            <Link href='/'><a>Home</a></Link>
          </Menu.Item>
          <Menu.Item >
            <div onClick={handleLogout}>Logout</div>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
};

export default SideBar;
