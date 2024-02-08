/**
 * Get the last n items from an array.
 *
 * @param arr - Array to retrieve items from.
 * @param n - Number of items to retrieve.
 * @returns An array containing the last n items.
 */
export function getLastNItems<T>(arr: T[], n: number): T[] {
  const length = arr.length;
  const lastNItems = length >= n ? arr.slice(-n) : arr.slice(0);
  return lastNItems;
}

const myArray: number[] = [1, 2, 3, 4, 5, 6]
getLastNItems(myArray, 2)

export const scrollToBottom = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  })
}