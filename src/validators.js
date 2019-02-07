export const required = value => (value ? undefined : 'Required');
export const nonEmpty = value =>
  value.trim() !== '' ? undefined : 'Cannot be empty';
export const isTrimmed = value => {
  if (typeof (value) === 'undefined') {
    return;
  }
  value.trim() === value ? undefined : 'Cannot start or end with whitespace';
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
export const date = value => {
  if (!/\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/.test(value)) {
    return 'please enter a correct date!';
  }
};

// TODO VALIDATE DATES