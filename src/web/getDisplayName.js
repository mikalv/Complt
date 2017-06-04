const getDisplayName = component =>
  component.displayName ||
  component.name ||
  (typeof component === 'string' ? component : 'Component');

export default getDisplayName;
