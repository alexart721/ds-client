import React, { FC } from 'react';
import { MessageData } from '../../types';

const MessageItem: FC<{message: MessageData}> = ({ message }) => {
  return (
    <>
      <div>{message.messageOwnerName}</div>
      <div>{message.content}</div>
    </>
  )
}

export default MessageItem;
