export default function processItem(value, isProject) {
  let item;
  if (isProject) {
    item = {
      isProject: true,
      name: '',
      children: [],
    };
  } else {
    item = {
      isProject: false,
      name: '',
      isCompleted: false,
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
