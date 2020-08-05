/** Filter an object by its values, using a filter function */
export const filterByValue = (obj, func) =>
  Object.fromEntries(Object.entries(obj).filter(([_, value]) => func(value)));

/** Filter an object by its keys, using a filter function */
export const filterByKey = (obj, func) =>
  Object.fromEntries(Object.entries(obj).filter(([key, _]) => func(key)));
