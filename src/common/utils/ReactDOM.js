// eslint-disable-next-line import/prefer-default-export
export function findDOMNode(component) {
  return (component && component.base) || component;
}
