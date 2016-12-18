import { Item } from '../dynamoModels';
import verifyItemExists from './verifyItemExists';

export default function addItemToProject(itemToAdd, projectId) {
  if (!itemToAdd || !projectId) return Promise.reject('No item or no project id was given');
  return verifyItemExists(itemToAdd.owner, projectId).then(project =>
    Item.createAsync(itemToAdd).then(itemCreated =>
      Item.updateAsync({
        id: projectId,
        owner: project.owner,
        children: [
          ...project.children || [],
          itemCreated.attrs.id,
        ],
      }).then(() => itemCreated.attrs)
    )
  );
}
