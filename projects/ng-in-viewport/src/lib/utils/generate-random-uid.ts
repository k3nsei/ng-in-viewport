export function generateRandomUID(prefix = '', length = 8) {
  // Generate a random string of specified length
  const randomPart = [...Array(length)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
  // Return the concatenated prefix and the random string
  return `${prefix}${randomPart}`;
}
