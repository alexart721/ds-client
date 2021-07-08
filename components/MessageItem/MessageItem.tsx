import React, { FC } from 'react';
import { MessageData } from '../../lib/types';

const MessageItem: FC<{ message: MessageData }> = ({ message }) => (
  <>
    <div>{message.messageOwnerName}</div>
    <div>{message.content}</div>
  </>
);

export default MessageItem;
