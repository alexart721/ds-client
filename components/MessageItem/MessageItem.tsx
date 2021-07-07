import React, { FC } from 'react';
import { MessageData } from '../../types';

const MessageItem: FC<{message: MessageData}> = ({ message }) => {
  return (
    <div>
      <div>{message.messageOwnerName}</div>
      <div>{message.content}</div>
    </div>
  )
}

export default MessageItem;
