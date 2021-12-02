export interface OneDayChatState {
  users: string[];
  channels: OneDayChatChannel[];

  currentUser: string;
  currentMessage: string;
  currentChannelId: string;
}

export interface OneDayChatChannel {
  id: string;
  name: string;
}

const users = ['Sam', 'Russell', 'Joyse'];
const channels = [
  { id: '1', name: 'General Channel' },
  { id: '2', name: 'Technology Channel' },
  { id: '3', name: 'LGTM Channel' },
];

export const initialOneDayChatState: OneDayChatState = {
  users: users,
  channels: channels,

  currentMessage: '',
  currentUser: users[0],
  currentChannelId: channels[0].id,
};
