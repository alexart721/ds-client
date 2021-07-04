import { MyChannelState, MyIssueState } from '../lib/redux/reducers';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  license: string;
  state: string;
  status: string;
  roles: string;
  channels: MyChannelState[];
  dmChannels: Object[];
  issueMeta: MyIssueState[];
}

export interface FieldData {
  name: string;
  type: string;
  data: string;
}

export interface MessageData {
  messageOwner: string;
  content: string;
}

export interface Issue {
  _id: string;
  title: string;
  priority: string;
  status: string;
  issueOwner: string;
  patientAge: number;
  patientGender: string;
  patientMedicalIssues: string;
  patientMedications: string;
  patientVitals: object;
  metaFields: FieldData[];
  tags: string[];
  threadMessages: MessageData[];
}

export interface IssueWithChannelId extends Issue {
  channelId: string;
}

export interface Channel {
  name: string,
  issues: Issue[],
  archivedIssues: Issue[],
}