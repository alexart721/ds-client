import React, { FC } from 'react';
import { MessageData } from '../../types';
import MessageItem from '../MessageItem/MessageItem';

const MessageList: FC<{messages: MessageData[]}> = ({ messages }) => {
  return (
    <div>
      {messages && messages.map(message => (
        <MessageItem message={message} />
      ))}
    </div>
  );
}

export default MessageList;
