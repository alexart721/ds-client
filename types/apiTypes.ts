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
  _id?: string;
  title: string;
  priority: string;
  status: string;
  issueOwner?: string;
  issueOwnerName?: string;
  issueChannelName?: string;
  patientAge: number;
  patientGender: string;
  patientMedicalIssues: string;
  patientMedications: string;
  patientVitals: Vitals;
  imageUrl?: string;
  issueDescription?: string;
  metaFields?: FieldData[];
  tags?: string[];
  threadMessages?: MessageData[];
  createdAt?: Date;
  imageFile?: {file: {originFileObj: File}};
}

export interface IssueWithChannelId extends Issue {
  channelId: string;
}

export interface Channel {
  _id?: string;
  name: string;
  issues: Issue[];
  archivedIssues: Issue[];
}

export interface Vitals {
  temperature: string;
  heartRate: string;
  bloodPressure: string;
}