export function setItemToLocalStorage(key: string, value: unknown) {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Error setting item to localStorage', error);
  }
}

export function getItemFromLocalStorage<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    console.error('Error getting item from localStorage', error);
    return null;
  }
}

export function removeItemFromLocalStorage(key: string) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing item from localStorage', error);
  }
}

export default {
  setItem: setItemToLocalStorage,
  getItem: getItemFromLocalStorage,
  removeItem: removeItemFromLocalStorage,
};
