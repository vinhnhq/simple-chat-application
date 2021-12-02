import { useEffect, useRef } from 'react';

const noop = () => {};

function useInterval(callback: Function, delay: number | null) {
  const savedCallback = useRef<Function>(noop);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export { useInterval };
