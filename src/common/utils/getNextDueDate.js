export const DUE_DATE = 'DUE_DATE';

function getSingleDueDate(date) {
  switch (date.dateType) {
    case DUE_DATE:
      return date.value;
    default:
      return undefined;
  }
}

export default function getNextDueDate(dates = []) {
  if (dates.length === 0) return undefined;
  let nextDueDate = 0;
  dates.forEach((date) => {
    const dueDateValue = getSingleDueDate(date);
    if (dueDateValue < nextDueDate) nextDueDate = dueDateValue;
  });
  if (nextDueDate > 0) return nextDueDate;
  return undefined;
}
