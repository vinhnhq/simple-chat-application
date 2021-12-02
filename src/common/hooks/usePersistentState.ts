import { useEffect, useState } from 'react';

function usePersistentState(key: string, defaultValue: string | object) {
  const [state, setState] = useState<string | null>(() => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export { usePersistentState };
