import { useCallback, useMemo, useReducer } from 'react';
import { useLazyQuery } from '@apollo/client';

import { IMessage } from '../../../interfaces';
import { FETCH_MORE_MESSAGES, FETCH_LATEST_MESSAGES } from '../../../query';

interface State {
  messages: IMessage[];
}

export type Action = {
  type: 'loaded';
  payload: { messages: IMessage[] };
};

const initialState: State = {
  messages: [],
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'loaded':
      const { payload } = action;

      return {
        ...state,
        messages: payload.messages,
      };

    default:
      return state;
  }
}

function useMessageList({ currentChannelId }: { currentChannelId: string }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [fetchLatestMessages, flmState] = useLazyQuery<{ fetchLatestMessages: IMessage[] }>(FETCH_LATEST_MESSAGES, {
    fetchPolicy: 'network-only',
    variables: { channelId: currentChannelId },
    onCompleted({ fetchLatestMessages }) {
      dispatch({ type: 'loaded', payload: { messages: fetchLatestMessages || [] } });
    },
  });

  const [fetchMoreMessages, fmmState] = useLazyQuery<{ fetchMoreMessages: IMessage[] }>(FETCH_MORE_MESSAGES, {
    fetchPolicy: 'network-only',
    onCompleted({ fetchMoreMessages }) {
      const { messages } = state;

      const newMessages = fetchMoreMessages || [];
      const updatedMessage = fmmState.variables?.old ? [...messages, ...newMessages] : [...newMessages, ...messages];

      dispatch({ type: 'loaded', payload: { messages: updatedMessage } });
    },
  });

  const loadLatest = useCallback(() => fetchLatestMessages(), [fetchLatestMessages]);

  const loadMore = useCallback(
    (old: boolean) => {
      const { messages } = state;

      fetchMoreMessages({
        variables: {
          old: old,
          channelId: currentChannelId,
          messageId: old ? messages[messages.length - 1].messageId : messages[0].messageId,
        },
      });
    },
    [currentChannelId, fetchMoreMessages, state]
  );

  return useMemo(
    () => ({
      state: {
        ...state,
        loading: fmmState.loading || flmState.loading,
        error: fmmState.error || flmState.error,
      },

      loadLatest,
      loadMore,
    }),
    [flmState.error, flmState.loading, fmmState.error, fmmState.loading, loadLatest, loadMore, state]
  );
}

export { useMessageList };
