import { Item } from '../dynamoModels';

function verifyItemExists(user, itemId) {
  return new Promise((resolve, reject) => {
    Item.get({ owner: user, id: itemId }, (itemGetError, itemGot) => {
      if (itemGetError) reject('Unable to get item');
      if (itemGot === null || itemGot === undefined) {
        reject('Item does not exist');
      } else {
        resolve(itemGot.attrs);
      }
    });
  });
}

export default verifyItemExists;
