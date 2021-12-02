import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { useOneDayChatState } from '../../hooks';
import { FETCH_LATEST_MESSAGES, POST_MESSAGE } from '../../query';

function MessageInput() {
  const [message, setMessage] = useState('');

  const {
    state: { currentUser, currentChannelId },
  } = useOneDayChatState();

  const [postMessage, { loading, error }] = useMutation(POST_MESSAGE, {
    refetchQueries: [FETCH_LATEST_MESSAGES],
  });

  const handleSend = () => {
    postMessage({
      variables: {
        channelId: currentChannelId,
        text: message,
        userId: currentUser,
      },
    });
  };

  if (loading) {
    return <h4>post message loading...</h4>;
  }

  if (error) {
    console.log(error);
  }

  return (
    <div className="container">
      <input
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="type your message here..."
      />
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
