import { isObject } from './is-object';

export const stringify = (input: unknown): string => {
  if (Array.isArray(input)) {
    return `[${input.map(stringify).join(',')}]`;
  }

  if (isObject(input)) {
    return Object.entries(input)
      .sort(([a], [b]) => String(a).localeCompare(String(b)))
      .map(([key, value]) => `${key}:${stringify(value)}`)
      .join('|');
  }

  return String(input);
};
