export default function processItem(value, isProject = false) {
  const item = {
    isProject,
    name: '',
    isCompleted: false,
    tags: [],
  };
  if (isProject) item.children = [];
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
