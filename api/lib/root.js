import { Root, Item } from '../dynamoModels';

export function verifyRootExists(user) {
  return new Promise((resolve, reject) => {
    Root.get({ owner: user, id: 'root' }, (RootGetError, rootGot) => {
      if (RootGetError) reject(RootGetError);
      if (rootGot === null) {
        Root.create({ owner: user }, (RootCreateError, rootCreated) => {
          if (RootCreateError) reject(RootCreateError);
          resolve(rootCreated.attrs);
        });
      } else {
        resolve(rootGot.attrs);
      }
    });
  });
}

export function addItemToRoot(itemToAdd) {
  return new Promise((resolve, reject) => {
    verifyRootExists(itemToAdd.owner).then((root) => {
      Item.create(itemToAdd, (ItemCreateError, item) => {
        if (ItemCreateError) reject(ItemCreateError);
        const rootChildren = [
          ...root.children || [],
          item.attrs.id,
        ];
        Root.update({ id: 'root', owner: itemToAdd.owner, children: rootChildren }, (RootUpdateError, rootUpdated) => {
          if (RootUpdateError) {
            Item.destroy(item, () => {
              reject(RootUpdateError);
            });
          }
          resolve(item.attrs, rootUpdated);
        });
      });
    }).catch(reject);
  });
}
