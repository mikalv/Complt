function itemsToTree(items, topLevelId) {
  if (items.length === 0) return undefined;
  const topLevelItem = items[topLevelId];
  if (topLevelItem === undefined) return topLevelItem;
  const topLevelItemChildren = topLevelItem.children.map(childId => {
    const item = items[childId];
    if (item === undefined) return null;
    if (item.isProject) {
      return itemsToTree(items, item._id);
    }
    return item;
  });
  return {
    ...topLevelItem,
    children: topLevelItemChildren,
  };
}

export default itemsToTree;
