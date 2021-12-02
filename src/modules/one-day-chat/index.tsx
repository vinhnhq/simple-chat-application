import React, { Fragment } from 'react';

import { Menu } from './components/menu';
import { MessageInput } from './components/message-input';
import { MessageList } from './components/message-list';

function OneDayChat() {
  return (
    <Fragment>
      <Menu />
      <MessageList />
      <MessageInput />
    </Fragment>
  );
}

export { OneDayChat };
