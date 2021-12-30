// store in a separate module to avoid dependecy/require cycle warning

let registeredStore: unknown;

export default {
  register: (store: unknown) => (registeredStore = store),
  getStore: () => registeredStore,
};
