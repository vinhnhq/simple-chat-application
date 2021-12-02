import React from 'react';

import { OneDayChatProvider } from './hooks';

import { Menu } from './components/menu';
import { MessageList } from './components/message-list';
import { MessageInput } from './components/message-input';

function OneDayChat() {
  return (
    <OneDayChatProvider>
      <div className="wrapper">
        <div className="container">
          <div className="menu">
            <Menu />
          </div>

          <div className="message">
            <MessageList />
            <MessageInput />
          </div>
        </div>
      </div>

      <style jsx>{`
        .wrapper {
          margin: 0 auto;
          width: 1024px;
          height: 768px;
          box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
            rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
        }

        .container {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .menu {
          height: 100%;
          width: 250px;
          border-right: 2px solid rgba(6, 24, 44, 0.65);
        }

        .message {
          flex: 1;
          height: 100%;
        }
      `}</style>

      <style jsx global>{`
        #__next {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </OneDayChatProvider>
  );
}

export { OneDayChat };
