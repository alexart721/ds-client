export interface Channel {
  id: string;
  name: string;
}

export interface Action {
  type: string,
  payload: Channel[]
}