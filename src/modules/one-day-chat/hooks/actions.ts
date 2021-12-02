export enum ActionType {
  SelectUser,
  SelectChannel,
  SendMessage,
}

export interface SelectUser {
  type: ActionType.SelectUser;
  payload: { name: string };
}

export interface SelectChannel {
  type: ActionType.SelectChannel;
  payload: { id: string };
}

export type OneDayChatActions = SelectUser | SelectChannel;
