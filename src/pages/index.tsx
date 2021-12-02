import type { NextPage } from 'next';

import { OneDayChat } from '../modules/one-day-chat';
import { ConditionalRendering } from '../common/components';

const Home: NextPage = () => {
  return (
    <ConditionalRendering client>
      <OneDayChat />
    </ConditionalRendering>
  );
};

export default Home;
