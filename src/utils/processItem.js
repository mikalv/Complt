export default function processItem(value, type) {
  let item;
  if (type === 'Project') {
    item = {
      __typename: 'Project',
      name: '',
    };
  } else {
    item = {
      __typename: 'Task',
      name: '',
      tags: [],
    };
  }
  if (item.tags) {
    const valueParts = value.split(' ');
    valueParts.forEach((part) => {
      if (part.startsWith('@')) {
        item.tags.push(part);
        return;
      }
      item.name += ` ${part}`;
    });
  } else item.name = value;
  item.name = item.name.trim();
  if (!item.name) return null;
  return item;
}
