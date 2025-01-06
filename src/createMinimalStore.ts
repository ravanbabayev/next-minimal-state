import { StoreApi, StateSelector } from './types';
import createStore from './store';
import useStore from './useStore';

function createMinimalStore<T>(initialState: T): StoreApi<T> {
  const store = createStore(initialState);

  const useStoreHook = <U>(selector?: StateSelector<T, U>) => {
    return useStore(store, selector);
  };

  return {
    store,
    useStore: useStoreHook,
  };
}

export default createMinimalStore; 