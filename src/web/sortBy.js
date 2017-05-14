export default function(array, getSortByValue) {
  return array.slice(0).sort((a, b) => {
    const av = getSortByValue(a);
    const bv = getSortByValue(b);
    return av < bv ? -1 : av > bv ? 1 : 0; // eslint-disable-line no-nested-ternary
  });
}
