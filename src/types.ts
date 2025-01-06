export type Listener<T> = (state: T) => void;

export type StateSelector<T, U> = (state: T) => U;

export type SetState<T> = (
  partial: T | ((state: T) => T),
  replace?: boolean
) => void;

export type GetState<T> = () => T;

export type Store<T> = {
  getState: GetState<T>;
  setState: SetState<T>;
  subscribe: (listener: Listener<T>) => () => void;
  destroy: () => void;
};

export type StoreApi<T> = {
  store: Store<T>;
  useStore: <U>(selector?: StateSelector<T, U>) => U;
}; 