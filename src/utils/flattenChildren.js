export function flattenChildren(children) {
  const result = [];

  const stack = [...children];
  while (stack.length > 0) {
    const child = stack.shift();

    if (Array.isArray(child)) {
      stack.unshift(...child);
    } else {
      result.push(child);
    }
  }

  return result;
}
