import React, { FC } from 'react';
import { MessageData } from '../../lib/types';
import MessageItem from '../MessageItem/MessageItem';

const MessageList: FC<{ messages: MessageData[] }> = ({ messages }) => (
  <div>
    {messages && messages.map((message) => (
      <MessageItem message={message} key={message.content} />
    ))}
  </div>
);

export default MessageList;
