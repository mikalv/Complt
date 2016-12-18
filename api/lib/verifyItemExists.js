import { Item, Inbox, Root } from '../dynamoModels';

function verifyItemExists(user, itemId) {
  if (!user || !itemId) return Promise.reject('No user id or no item id was given');
  return Item.getAsync({ owner: user, id: itemId }).then((item) => {
    if (!item) {
      if (itemId === 'inbox') {
        return Inbox.createAsync({ owner: user }).then(inboxCreated => inboxCreated.attrs);
      }
      if (itemId === 'root') {
        return Root.createAsync({ owner: user }).then(rootCreated => rootCreated.attrs);
      }
      return Promise.reject('Item does not exist');
    }
    return item.attrs;
  });
}

export default verifyItemExists;
