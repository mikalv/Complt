import { Item } from '../dynamo/models';

function getItemsByUserAndIds(user, ids = []) {
  return new Promise((resolve, reject) => {
    const idsWithOwner = ids.map(id => ({
      id,
      owner: user,
    }));
    Item.getItems(idsWithOwner, (error, items) => {
      if (error) reject(error);
      const itemsFormatted = items.map(item => item.attrs);
      const itemsOrdered = ids.map(id => itemsFormatted.filter(item => item.id === id)[0]);
      resolve(itemsOrdered);
    });
  });
}

export default getItemsByUserAndIds;
