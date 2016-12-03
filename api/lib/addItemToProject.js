import { Item } from '../dynamoModels';

function verifyProjectExists(user, projectId) {
  return new Promise((resolve, reject) => {
    Item.get({ owner: user, id: projectId }, (projectGetError, projectGot) => {
      if (projectGetError) reject('Unable to get project');
      if (projectGot === null) {
        reject('Project does not exist');
      } else {
        resolve(projectGot.attrs);
      }
    });
  });
}


export default function addItemToProject(itemToAdd, projectId) {
  return new Promise((resolve, reject) => {
    verifyProjectExists(itemToAdd.owner, projectId).then((project) => {
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