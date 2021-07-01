import React, { FC } from 'react';
import { Channel } from '../../interface';
import SubscribeItem from '../SubscribeItem/SubscribeItem';
interface Props {
  channels: Channel[],
}

const SubscribeMenu: FC<Props> = ({ channels }) => {

  return (
    <div>
      { channels && channels.map( channel => {
                return (
                    <SubscribeItem
                    key = {channel.id}
                    channel = {channel}/>
                )
              })}   
    </div>
  );
};

export default SubscribeMenu;