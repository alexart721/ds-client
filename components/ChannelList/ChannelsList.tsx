import React, { FC } from 'react';
import Link from 'next/link';
import { Menu } from 'antd';
import ChannelItem from '../ChannelItem/ChannelItem';
import { MyChannelState } from '../../lib/redux/reducers';

interface Props {
  channels: MyChannelState[],
}


const ChannelsList: FC<Props> = ({ channels }) => {
  return (
    <>
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
    </>
  )
};

export default ChannelsList;
