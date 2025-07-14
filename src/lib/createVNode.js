import { flattenChildren } from "../utils/createVNode/flattenChildren";
import { removeFalsyChildren } from "../utils/createVNode/normalizeChildren";

export function createVNode(type, props, ...children) {
  const flat = flattenChildren(children);
  const normalized = removeFalsyChildren(flat);

  return {
    type,
    props,
    children: normalized,
  };
}
