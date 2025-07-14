import { flattenChildren } from "../utils/flattenChildren";
import { removeFalsyChildren } from "../utils/normalizeChildren";

export function createVNode(type, props, ...children) {
  const flat = flattenChildren(children);
  const normalized = removeFalsyChildren(flat);

  return {
    type,
    props,
    children: normalized,
  };
}
