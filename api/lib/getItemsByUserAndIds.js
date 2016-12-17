import { Item } from '../dynamoModels';

function getItemsByUserAndIds(user, ids) {
  if (!user || !ids) return Promise.reject('No user id or no item ids were given');
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
