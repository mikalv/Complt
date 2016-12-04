import { Item, Inbox, Root } from '../dynamoModels';

function verifyItemExists(user, itemId) {
  return Item.getAsync({ owner: user, id: itemId }).then((item) => {
    if (item === null || item === undefined) {
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
