export default function processItem(value, isProject) {
  let item;
  if (isProject) {
    item = {
      isProject: true,
      name: '',
      children: [],
      isCompleted: false,
      tags: [],
    };
  } else {
    item = {
      isProject: false,
      name: '',
      isCompleted: false,
      tags: [],
    };
  }
  value.split(' ').forEach((part) => {
    if (part.split('')[0] === '@') {
      item.tags.push(part);
      return;
    }
    item.name += ` ${part}`;
  });
  item.name = item.name.trim();
  if (!item.name) return null;
  return item;
}
