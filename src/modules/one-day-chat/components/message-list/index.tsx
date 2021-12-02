import React, { useEffect, useMemo } from 'react';

import { toLocaleTimeString } from '../../../../../src/common/utils';

import { useOneDayChatState } from '../../hooks';

import { useMessageList } from './hooks/useMessageList';

function MessageList() {
  const {
    state: { channels, currentChannelId, currentUser },
  } = useOneDayChatState();

  const { state, loadLatest, loadMore } = useMessageList({ currentChannelId });

  const currChannel = useMemo(
    () => channels.find((channel) => channel.id === currentChannelId),
    [channels, currentChannelId]
  );

  useEffect(() => {
    loadLatest();
  }, [currentChannelId, loadLatest]);

  if (state.error) {
    console.error(state.error);
  }

  return (
    <div className="container">
      <h4 className="title">{currChannel?.name}</h4>

      <div className="message">
        <button onClick={() => loadMore({ old: true })}>Read More</button>

        <div className="content">
          {state.messages.map((m) => (
            <div key={m.messageId} className={`message-line ${m.userId === currentUser ? 'my-message' : ''}`}>
              <div className="message-item">
                <span>{toLocaleTimeString(m.datetime)}</span>
                <p>{m.text}</p>
                <span>{m.userId}</span>
                <div>{m.messageId}</div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => loadMore({ old: false })}>Read More</button>
      </div>

      <style jsx>{`
        .loading {
          padding: 1em;
        }

        .container {
          height: 75%;
        }

        .title {
          margin: 0;
          padding: 1em;
          border-bottom: 2px solid rgba(6, 24, 44, 0.65);
        }

        .message {
          height: 100%;
          padding: 1em;
        }

        .content {
          padding: 1em;
          display: flex;
          overflow-y: scroll;
          height: calc(100% - 10em);
          flex-direction: column-reverse;
          border: 1px solid rgba(6, 24, 44, 0.65);
        }

        .message-line {
          display: flex;
        }

        .message-item {
          width: 50%;
          padding: 1em;
          background-color: #ccc;
          border-radius: 0.5em;
          margin-bottom: 0.5em;
        }

        .message-line.my-message .message-item {
          margin-left: auto;
        }

        button {
          cursor: pointer;
          width: 216px;
          font: inherit;
          border-radius: 0;
          display: inline-block;
          border: thin solid black;
          background-color: white;
          line-height: 1.5em;
          margin: 0;
          padding: 0.5em 1em;
          appearance: none;
          margin: 0.5em 0;
        }
      `}</style>
    </div>
  );
}

export { MessageList };
