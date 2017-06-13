import { parse } from 'chrono-node';
import { DUE_DATE } from './getNextDueDate';

export default function processItem(value, isProject = false) {
  const item = {
    isProject,
    name: '',
    isCompleted: false,
    tags: [],
    dates: [],
  };
  if (isProject) item.children = [];
  const parsedDate = parse(value);
  let valueWithoutDate = value;
  if (parsedDate.length > 0) {
    if (parsedDate[0].start) {
      item.dates.push({
        dateType: DUE_DATE,
        value: parsedDate[0].start.date().toISOString(),
      });
      valueWithoutDate = `${value
        .substring(0, parsedDate[0].index)
        .trim()} ${value
        .substring(parsedDate[0].index + parsedDate[0].text.length)
        .trim()}`;
    }
  }
  valueWithoutDate.split(' ').forEach(part => {
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
