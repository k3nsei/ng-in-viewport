export const toBase64 = (value: string): string => {
  const input = globalThis.encodeURI(value);

  try {
    return globalThis.btoa(input);
  } catch {
    return input;
  }
};
