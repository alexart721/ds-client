import React, { FC } from 'react';
import Link from 'next/link';
import { Menu } from 'antd'; 
import ChannelItem from '../ChannelItem/ChannelItem';
import { MyChannelState } from '../../lib/redux/reducers';

interface Props {
  channels: MyChannelState[],
}

const { SubMenu } = Menu;

const ChannelsList: FC<Props> = ({ channels }) => {
  return (
    <div style={{ width: "14vw", height: "100vh", background: "#001529" } }>
      <Menu
        defaultOpenKeys={['sub1','sub2']}
        mode="inline"
        theme="dark"
      >
        <SubMenu key="sub1" title="Channels" >
            { channels && channels.map( channel => {
              return (
                <Menu.Item key={channel.id}>
                  <Link href="/channel/[channel]" as={`/channel/${channel.name}`}>
                    <a>
                      <ChannelItem 
                        channel = {channel}
                      />
                    </a>
                  </Link>
                </Menu.Item>
              )
            })}    
        </SubMenu>
        <SubMenu key="sub2" title="Direct Messages">
          <Menu.Item key="9">Alex</Menu.Item>
          <Menu.Item key="10">Ryan</Menu.Item>
          <Menu.Item key="11">Jibi</Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  )
};

export default ChannelsList;
