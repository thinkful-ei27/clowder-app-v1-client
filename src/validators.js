export const required = value => (value ? undefined : 'Required');
export const nonEmpty = value =>
  value.trim() !== '' ? undefined : 'Cannot be empty';
export const isTrimmed = value => {
  if (typeof (value) === 'undefined') {
    return;
  }
  return value.trim() === value ? undefined : 'Cannot start or end with whitespace';
};
export const length = length => value => {
  if (typeof (value) === 'undefined') {
    return;
  }
  if (length.min && value.length < length.min) {
    return `Must be at least ${length.min} characters long`;
  }

  if (length.max && value.length > length.max) {
    return `Must be at most ${length.max} characters long`;
  }
};
export const matches = field => (value, allValues) =>
  field in allValues && value.trim() === allValues[field].trim()
    ? undefined
    : 'Does not match';

export const matchesDirty = field => (value, allValues) => {
  console.log('field: ', field, 'value: ', value, 'allValues: ', allValues)
  if (typeof (value) === 'undefined') {
    return;
  }
  if (field in allValues && ((allValues[field].trim().length === 0) || !(value.trim() === allValues[field].trim()))) {
    return 'Does not match';
  }
};
// export const requiredIfDirty = field => (value, allValues) =>
//   field in allValues && value.trim() === allValues[field].trim()
//     ? undefined
//     : 'Does not match';
export const date = value => {
  if (!/\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/.test(value)) {
    return 'please format your date correctly, e.g. 02/03/1989';
  }
};
export const time = value => {
  if (!/\d([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]*/.test(value)) {
    return 'please format your time correctly, e.g. 07:21AM';
  }
};
export const email = value => {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Please enter a valid email address';
  }
};

// TODO VALIDATE DATES