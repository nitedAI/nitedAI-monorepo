import { validateAndGetJson } from '../validateAndGetJson';

interface DynamicObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export function getSession(key: string | Array<string>): DynamicObject {
  const sessionKey = typeof key === 'string' ? [key] : key;

  const result = {};
  sessionKey.forEach((k) => {
    result[k] = validateAndGetJson(sessionStorage.getItem(k));
  });

  return result;
}
