import { Inbox, Item } from '../dynamoModels';

export function verifyInboxExists(user) {
  return new Promise((resolve, reject) => {
    Inbox.get({ owner: user, id: 'inbox' }, (InboxGetError, inboxGot) => {
      if (InboxGetError) reject(InboxGetError);
      if (inboxGot === null) {
        Inbox.create({ owner: user }, (InboxCreateError, inboxCreated) => {
          if (InboxCreateError) reject(InboxCreateError);
          resolve(inboxCreated.attrs);
        });
      } else {
        resolve(inboxGot.attrs);
      }
    });
  });
}

export function addItemToInbox(itemToAdd) {
  return new Promise((resolve, reject) => {
    verifyInboxExists(itemToAdd.owner).then((inbox) => {
      Item.create(itemToAdd, (ItemCreateError, item) => {
        if (ItemCreateError) reject(ItemCreateError);
        const inboxChildren = [
          ...inbox.children || [],
          item.attrs.id,
        ];
        Inbox.update({ id: 'inbox', owner: itemToAdd.owner, children: inboxChildren }, (InboxUpdateError, inboxUpdated) => {
          if (InboxUpdateError) {
            Item.destroy(item, () => {
              reject(InboxUpdateError);
            });
          }
          resolve(item.attrs, inboxUpdated);
        });
      });
    }).catch(reject);
  });
}
