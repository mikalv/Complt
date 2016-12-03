import { Item } from '../dynamoModels';
import verifyItemExists from './verifyItemExists';

export default function addItemToProject(itemToAdd, projectId) {
  return new Promise((resolve, reject) => {
    verifyItemExists(itemToAdd.owner, projectId).then((project) => {
      Item.create(itemToAdd, (itemCreateError, itemCreated) => {
        if (itemCreateError) reject('Error creating item');
        Item.update({
          owner: project.owner,
          children: [
            ...project.children,
            itemCreated.attrs.id,
          ],
        }, (projectUpdateError, projectUpdated) => {
          if (projectUpdateError) Item.destroy(itemToAdd, () => reject('Error updating project'));
          resolve(itemCreated.attrs, projectUpdated.attrs);
        });
      });
    }).catch(reject);
  });
}
