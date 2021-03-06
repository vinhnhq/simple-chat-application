import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { usePersistentState } from '../../../../../src/common/hooks';

import { useOneDayChatState } from '../../hooks';
import { FETCH_LATEST_MESSAGES, POST_MESSAGE } from '../../query';

function MessageInput() {
  const {
    state: { currentUser, currentChannelId },
  } = useOneDayChatState();

  const [error, setError] = useState('');
  const [message, setMessage] = usePersistentState<string>(currentUser, '');

  const [postMessage, postMessageState] = useMutation(POST_MESSAGE, {
    refetchQueries: [FETCH_LATEST_MESSAGES],
    onCompleted: () => {
      setError('');
      setMessage('');
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSend = () => {
    if (message.trim() === '') {
      return;
    }

    const payload = {
      variables: { text: message, userId: currentUser, channelId: currentChannelId },
    };

    postMessage(payload);
  };

  return (
    <div className="container">
      <input
        value={message}
        placeholder="type your message here..."
        onChange={(event) => setMessage(event.target.value)}
      />
      {error && <p>{error}</p>}
      <button onClick={handleSend}>Send Message</button>

      <style jsx>{`
        .container {
          padding: 1em;
          margin-top: 1em;
        }

        input {
          width: 100%;
          font: inherit;
          border-radius: 0;
          display: inline-block;
          border: thin solid black;
          background-color: white;
          line-height: 1.5em;
          margin: 0;
          padding: 0.5em 1em;
          appearance: none;
          margin-bottom: 0.5em;
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
          display: block;
        }
      `}</style>
    </div>
  );
}

export { MessageInput };
