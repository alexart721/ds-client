import { Socket } from "socket.io-client";

export interface MyChannelState {
  id: string;
  name: string;
}

export interface MyIssueState {
  id: string;
  title: string;
  channelName: string;
}

export interface UserState {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  license: string;
  state: string;
}

export type SocketState = Socket;
