export function isObjectEmpty(val) {
  return !!val && Object.keys(val).length === 0 && val.constructor === Object;
}
