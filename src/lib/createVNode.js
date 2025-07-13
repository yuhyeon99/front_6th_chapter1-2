import { flattenChildren } from "../utils/flattenChildren";

export function createVNode(type, props, ...children) {
  return {
    type,
    props,
    children: flattenChildren(children),
  };
}
