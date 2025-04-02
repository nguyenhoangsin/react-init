/**
 * Sets an item to localStorage after serializing it to JSON.
 * If the value is not an object or string, it will not be saved.
 * @param key The key to store the item under.
 * @param value The value to store, which can be an object or string.
 */
export function setItemToLocalStorage(key: string, value: unknown) {
  if (typeof window !== 'undefined') {
    try {
      // Check if the value is an object (excluding null)
      if (typeof value === 'object' && value !== null) {
        const serializedValue = JSON.stringify(value); // Serialize the object to a JSON string
        localStorage.setItem(key, serializedValue); // Store the serialized value
      } else if (typeof value === 'string') {
        // If the value is a string, directly store it
        localStorage.setItem(key, value);
      } else {
        console.error(
          'Invalid value type. Only objects and strings are allowed.',
        );
      }
    } catch (error) {
      console.error('Error setting item to localStorage', error);
    }
  }
}

/**
 * Gets an item from localStorage and parses it if it is a valid JSON string.
 * If the value is not valid JSON, it will return the raw string.
 * @param key The key to retrieve the item from localStorage.
 * @returns The parsed value, or raw string if it can't be parsed, or null if the item doesn't exist.
 */
export function getItemFromLocalStorage<T>(key: string): T | null | void {
  if (typeof window !== 'undefined') {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        // Try parsing the value as JSON if it's a valid JSON string
        try {
          return JSON.parse(item) as T; // Return parsed value
        } catch (error) {
          // If the item is not valid JSON, return the raw string
          return item as unknown as T;
        }
      }
      return null; // Return null if the item doesn't exist in localStorage
    } catch (error) {
      console.error('Error getting item from localStorage', error);
      return null;
    }
  }
}

/**
 * Removes an item from localStorage.
 * @param key The key to remove from localStorage.
 */
export function removeItemFromLocalStorage(key: string) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(key); // Remove the item from localStorage
    } catch (error) {
      console.error('Error removing item from localStorage', error);
    }
  }
}

export default {
  setItem: setItemToLocalStorage,
  getItem: getItemFromLocalStorage,
  removeItem: removeItemFromLocalStorage,
};
