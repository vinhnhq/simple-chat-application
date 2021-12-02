import React from 'react';

import { useOneDayChatState, selectChannel, selectUser } from '../../hooks';

function Menu() {
  const {
    state: { users, currentUser, channels, currentChannelId },
    dispatch,
  } = useOneDayChatState();

  return (
    <div className="container">
      <div>
        <h4>1. Choose your user</h4>
        <select value={currentUser} onChange={(event) => dispatch(selectUser(event.target.value))}>
          {users.map((user) => (
            <option key={user} value={user}>
              {user}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h4>2. Choose your channel</h4>
        <ul>
          {channels.map((c) => (
            <li
              key={c.id}
              onClick={() => dispatch(selectChannel(c.id))}
              className={c.id === currentChannelId ? 'selected' : ''}
            >
              {c.name}
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          padding: 0 1rem;
          flex-direction: column;
          margin-top: 52px;
        }

        h4 {
          margin: 0;
          padding: 1em 0;
        }

        select {
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
        }

        select:hover {
          cursor: pointer;
        }

        select:focus {
          width: 100%;
        }

        ul {
          margin: 0;
          padding: 0;
          list-style-type: none;
        }

        ul li {
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
          opacity: 0.3;
        }

        ul li.selected {
          opacity: 1;
        }

        ul li:hover {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

export { Menu };
