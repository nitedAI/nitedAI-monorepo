export function validateAndGetJson(item: string) {
  let value: object | boolean = false;
  try {
    value = JSON.parse(item);
  } catch (e) {
    value = false;
  }

  return value;
}
