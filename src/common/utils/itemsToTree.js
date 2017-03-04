function itemsToTree(items, topLevelId) {
  if (items.length === 0) return undefined;
  const topLevelItem = items.find(item => item._id === topLevelId);
  const topLevelItemChildren = topLevelItem.children.map((childId) => {
    const item = items.find(itemInFind => itemInFind._id === childId);
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
