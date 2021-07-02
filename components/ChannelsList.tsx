import React, { FC } from 'react';
import { Menu } from 'antd'; 
import ChannelItem from './ChannelItem';
import { ChannelState } from '../lib/redux/reducers';

interface Props {
  channels: ChannelState[],
}

const { SubMenu } = Menu;

const ChannelsList: FC<Props> = ({ channels }) => {
    return (

  <div style={{ width: "14vw", height: "100vh", background: "black" } }>
  
    <div style={{ width: "14vw" }}>
        <Menu
          defaultOpenKeys={['sub1','sub2']}
          mode="inline"
          theme="dark"
        >
          <SubMenu key="sub1" title="Channeles">
              { channels && channels.map( channel => {
                return (
                  <Menu.Item key={channel.id}>
                    <ChannelItem
                    key = {channel.id}
                    channel = {channel}/>
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
  </div>
    )
  };

export default ChannelsList;
