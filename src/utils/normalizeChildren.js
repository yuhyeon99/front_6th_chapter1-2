export function normalizeChildren(children) {
  return children.filter((child) => child !== undefined && child !== null && child !== false);
}
