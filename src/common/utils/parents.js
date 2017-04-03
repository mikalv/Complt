export function getSingleParent(id, items) {
  return items.find(item => item.isProject === true && item.children.includes(id));
}

export function getParents(items) {
  const parents = {};
  items.forEach((item) => {
    if (
      item.isProject === false ||
      !Array.isArray(item.children) ||
      item.children.length === 0
    ) {
      return;
    }
    item.children.forEach((id) => {
      parents[id] = item;
    });
  });
  return items.map((item) => {
    if (item._id === 'inbox' || item._id === 'root') return item;
    const parent = parents[item._id];
    if (parent == null) return item;
    return {
      ...item,
      parent,
    };
  });
}
