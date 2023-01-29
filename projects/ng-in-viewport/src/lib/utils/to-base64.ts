export const toBase64 = (value: string): string => {
  try {
    const input = globalThis.encodeURI(value);
    return globalThis.btoa(input);
  } catch {
    return value;
  }
};
