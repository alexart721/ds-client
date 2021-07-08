import React, { FC } from 'react';
import { MessageData } from '../../lib/types';

<<<<<<< HEAD
const MessageItem: FC<{message: MessageData}> = ({ message }) => {
  return (
    <div>
      <div>{message.messageOwnerName}</div>
      <div>{message.content}</div>
    </div>
  )
}
=======
const MessageItem: FC<{ message: MessageData }> = ({ message }) => (
  <>
    <div>{message.messageOwnerName}</div>
    <div>{message.content}</div>
  </>
);
>>>>>>> main

export default MessageItem;
