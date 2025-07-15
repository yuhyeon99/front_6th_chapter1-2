import { flattenChildren } from "../utils/createVNode/flattenChildren";
import { isValidChild } from "../utils/common/validChildren.js";

export function createVNode(type, props, ...children) {
  const flat = flattenChildren(children);
  const normalized = flat.filter(isValidChild);

  return {
    type,
    props,
    children: normalized,
  };
}
