import dateCreate from 'sugar-date/date/create';
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
  const date = value.match(/!([\s\S]+?)!/);
  let valueWithoutDate;
  if (date) {
    const parsedDate = dateCreate(date[1]);
    if (parsedDate.toString() === 'Invalid Date') valueWithoutDate = value;
    else {
      valueWithoutDate = `${value.substring(0, date.index).trim()} ${value.substring(date.index + date[0].length).trim()}`;
      item.dates.push({
        dateType: DUE_DATE,
        value: parsedDate.toString(),
      });
    }
  } else valueWithoutDate = value;
  valueWithoutDate.split(' ').forEach((part) => {
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
