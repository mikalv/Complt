import { Item } from '../dynamoModels';
import verifyItemExists from './verifyItemExists';

export default function addItemToProject(itemToAdd, projectId) {
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
