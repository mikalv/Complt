import { Root, Item } from '../dynamoModels';
import verifyItemExists from './verifyItemExists';

export default function addItemToRoot(itemToAdd) {
  return verifyItemExists(itemToAdd.owner, 'root')
  .then(root => Item.createAsync(itemToAdd).then((item) => {
    const rootChildren = [
      ...root.children || [],
      item.attrs.id,
    ];
    Root.updateAsync({ id: 'root', owner: itemToAdd.owner, children: rootChildren })
    .then(() => item.attrs);
  }));
}
