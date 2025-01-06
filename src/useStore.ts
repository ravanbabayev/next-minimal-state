import { useEffect, useState, useRef } from 'react';
import { Store, StateSelector } from './types';

function useStore<T, U = T>(
  store: Store<T>,
  selector: StateSelector<T, U> = (state: T) => state as unknown as U
): U {
  const [state, setState] = useState(() => selector(store.getState()));
  const selectorRef = useRef(selector);
  selectorRef.current = selector;

  useEffect(() => {
    const unsubscribe = store.subscribe((newState) => {
      const selectedState = selectorRef.current(newState);
      setState(selectedState);
    });

    return () => {
      unsubscribe();
    };
  }, [store]);

  return state;
}

export default useStore; 