export const DUE_DATE = 'DUE_DATE';

function getSingleDueDate(date) {
  switch (date.dateType) {
    case DUE_DATE:
      return new Date(date.value).getTime();
    default:
      return undefined;
  }
}

export default function getNextDueDate(dates = []) {
  if (dates.length === 0) return undefined;
  let nextDueDate = Infinity;
  dates.forEach(date => {
    const dueDateValue = getSingleDueDate(date);
    if (dueDateValue < nextDueDate) nextDueDate = dueDateValue;
  });
  if (nextDueDate !== Infinity) return nextDueDate;
  return undefined;
}
