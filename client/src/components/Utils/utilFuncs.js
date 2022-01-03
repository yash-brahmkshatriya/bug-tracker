import { useEffect, useState } from 'react';

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);
  return debouncedValue;
};

export const filterByProperty = (arr, prop, match) => {
  if (
    !Array.isArray(arr) ||
    arr.length === 0 ||
    Object.keys(arr[0]).indexOf(prop) < 0
  )
    return arr;
  const searchRegex = new RegExp(`^.*${match}.*`, 'i');
  if (Array.isArray(arr[0][prop])) {
    return arr.filter(
      (elem) => elem[prop].filter((pe) => searchRegex.test(pe)).length > 0
    );
  } else if (typeof prop === 'string' || typeof prop === 'number') {
    return arr.filter((elem) => searchRegex.test(elem[prop]));
  }
};

export const sortByProperty = (arr, prop, sortDir) => {
  if (!arr || !Array.isArray(arr) || Object.keys(arr[0]).indexOf(prop) < 0)
    return arr;
  if (typeof arr[0][prop] === 'string' || typeof arr[0][prop] === 'number') {
    const arr2 = arr.sort((e1, e2) => {
      return e1[prop].toLowerCase() > e2[prop].toLowerCase() ? 1 : -1;
    });
    return arr2;
  } else return arr;
};
