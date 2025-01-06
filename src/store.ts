import { Store, Listener, SetState, GetState } from './types';

function createStore<T>(initialState: T): Store<T> {
  let state = initialState;
  const listeners = new Set<Listener<T>>();

  const getState: GetState<T> = () => state;

  const setState: SetState<T> = (partial, replace = false) => {
    const nextState = typeof partial === 'function'
      ? (partial as (state: T) => T)(state)
      : partial;

    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = replace ? (nextState as T) : { ...state, ...nextState };
      listeners.forEach((listener) => listener(state));
    }
  };

  const subscribe = (listener: Listener<T>) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const destroy = () => {
    listeners.clear();
  };

  return {
    getState,
    setState,
    subscribe,
    destroy,
  };
}

export default createStore; 