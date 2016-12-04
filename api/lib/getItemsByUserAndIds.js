import { Item } from '../dynamoModels';

function getItemsByUserAndIds(user, ids = []) {
  const idsWithOwner = ids.map(id => ({
    id,
    owner: user,
  }));
  return Item.getItemsAsync(idsWithOwner).then((items) => {
    const itemsFormatted = items.map(item => item.attrs);
    const itemsOrdered = ids.map(id => itemsFormatted.filter(item => item.id === id)[0]);
    return itemsOrdered;
  });
}

export default getItemsByUserAndIds;
