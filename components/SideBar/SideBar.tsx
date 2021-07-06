import { useSelector } from '../../lib/hooks/useTypedSelector';
import { Menu } from 'antd';
import Link from 'next/link';
import ChannelItem from '../ChannelItem/ChannelItem';
import MyIssueItem from '../MyIssueItem/MyIssueItem';

const SideBar = () => {
  const channels = useSelector((state) => state.channels);
  const issues = useSelector((state) => state.issues);
  const submenuKeys: string[] = ['channelsSub', 'issuesSub'];
  const submenuTitles: string[] = ['Channels', 'My Issues'];

  return (
    <div style={{ width: "14vw", height: "100vh", background: "#001529" } }>
      <Menu
        defaultOpenKeys={submenuKeys}
        mode="inline"
        theme="dark"
      >
        <Menu.SubMenu key={submenuKeys[0]} title={submenuTitles[0]} >
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
                <Link href="/[channel]/[issue]" as={`/${issue.channelName}/${issue.title}`}>
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
      </Menu>
    </div>
  );
};

export default SideBar;
