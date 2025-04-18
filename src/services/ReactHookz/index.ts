/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IHookzListener {
  oldState: any;
  run?: (state: any) => void;
}

export interface IHookzStore {
  state: any;
  actions?: any;
  listeners: IHookzListener[];
  setState?: (newState: any, afterUpdateCallback: any) => void;
}

function setState(store: IHookzStore, newState: any, afterUpdateCallback: any) {
  store.state = { ...store.state, ...newState };
  store.listeners.forEach((listener: IHookzListener) => {
    if (listener.run) {
      listener.run(store.state);
    }
  });
  if (afterUpdateCallback) {
    afterUpdateCallback();
  }
}
function useCustom(
  store: IHookzStore,
  React: any,
  mapState: any,
  mapActions: any,
) {
  const [, originalHook] = React.useState(Object.create(null));
  const state = mapState ? mapState(store.state) : store.state;
  const actions = React.useMemo(
    () => (mapActions ? mapActions(store.actions) : store.actions),
    [mapActions, store.actions],
  );

  React.useEffect(() => {
    const newListener: IHookzListener = { oldState: {} };
    newListener.run = mapState
      ? (newState: any) => {
        const mappedState = mapState(newState);
        if (mappedState !== newListener.oldState) {
          newListener.oldState = mappedState;
          originalHook(mappedState);
        }
      }
      : originalHook;
    store.listeners.push(newListener);
    if (newListener.run) {
      newListener.run(store.state);
    }
    return () => {
      store.listeners = store.listeners.filter(
        (listener) => (listener) !== newListener,
      );
    };
  }, []);
  return [state, actions];
}

function associateActions({ store, actions }: { store: any; actions: Record<string, any> }) {
  const associatedActions: Record<string, any> = {};
  Object.keys(actions).forEach((key) => {
    if (typeof actions[key] === "function") {

      associatedActions[key] = actions[key].bind(null, store);
    }
    if (typeof actions[key] === "object") {

      associatedActions[key] = associateActions({
        actions: actions[key],
        store,
      });
    }
  });
  return associatedActions;
}

/**
* React Global Hookz, a simple global state for React with the Hooks API in less than 1kb written in TypeScript
* @param React The imported namespace of your installed React version
* @param initialState Any state object you'd like to use
* @param actions An object of functions setting the state
* @param initializer Optional initialization function
* @see https://github.com/GaryWenneker/react-hookz
*/
const useHookz = <T extends Record<string, any>>(
  React: any,
  initialState: T,
  actions: Record<string, any>,
  initializer?: (store: IHookzStore) => void,
) => {
  const store: IHookzStore = { state: initialState, listeners: [] };
  store.setState = setState.bind(null, store);
  store.actions = associateActions({ store, actions });
  if (initializer) {
    initializer(store);
  }
  return useCustom.bind(null, store, React) as (
    mapState?: (state: T) => any,
    mapActions?: (actions: Record<string, any>) => any,
  ) => [any, any];
};

export default useHookz;
