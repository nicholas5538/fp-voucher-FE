export const getLocalStorageItem = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const setLocalStorageItem = (key: string, value: string): void => {
  return localStorage.setItem(key, value);
};
