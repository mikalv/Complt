import { Inbox, Item } from '../dynamoModels';
import verifyItemExists from './verifyItemExists';

export default function addItemToInbox(itemToAdd) {
  return verifyItemExists(itemToAdd.owner, 'inbox')
  .then(inbox => Item.createAsync(itemToAdd).then((item) => {
    const inboxChildren = [
      ...inbox.children || [],
      item.attrs.id,
    ];
    Inbox.updateAsync({ id: 'inbox', owner: itemToAdd.owner, children: inboxChildren })
    .then(() => item.attrs);
  }));
}
