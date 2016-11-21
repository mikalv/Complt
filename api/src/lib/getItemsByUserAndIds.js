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
      resolve(itemsFormatted);
    });
  });
}

export default getItemsByUserAndIds;
