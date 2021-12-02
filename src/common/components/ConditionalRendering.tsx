import { ReactElement, useEffect, useState } from 'react';

export interface ConditionalRenderingProps {
  client?: boolean;
  server?: boolean;
  children: ReactElement;
}

function ConditionalRendering(props: ConditionalRenderingProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted && props.client) {
    return null;
  }

  if (isMounted && props.server) {
    return null;
  }

  return props.children;
}

export { ConditionalRendering };
