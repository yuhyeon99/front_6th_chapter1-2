import { flattenChildren } from "../utils/flattenChildren";
import { normalizeChildren } from "../utils/normalizeChildren";

export function createVNode(type, props, ...children) {
  const flat = flattenChildren(children);
  const normalized = normalizeChildren(flat);

  return {
    type,
    props,
    children: normalized,
  };
}
