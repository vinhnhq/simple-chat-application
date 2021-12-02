import { OneDayChatState } from './state';

import { ActionType, OneDayChatActions, SelectChannel, SelectUser } from './actions';

export function reducer(state: OneDayChatState, action: OneDayChatActions): OneDayChatState {
  switch (action.type) {
    case ActionType.SelectUser:
      return { ...state, currentUser: action.payload.name };

    case ActionType.SelectChannel:
      return {
        ...state,
        currentChannelId: action.payload.id,
      };

    default:
      return state;
  }
}

export const selectUser = (name: string): SelectUser => {
  return {
    type: ActionType.SelectUser,
    payload: { name },
  };
};

export const selectChannel = (id: string): SelectChannel => ({
  type: ActionType.SelectChannel,
  payload: { id },
});
