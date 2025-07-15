import { isValidChild } from "../utils/common/validChildren";

export function normalizeVNode(vNode) {
  if (vNode === null || vNode === undefined || typeof vNode === "boolean") {
    return "";
  }

  if (typeof vNode === "string" || typeof vNode === "number") {
    return String(vNode);
  }

  if (typeof vNode.type === "function") {
    // vNode가 함수형 컴포넌트일 경우, 해당 컴포넌트를 호출해서 그 결과를 다시 정규화.
    return normalizeVNode(vNode.type({ ...vNode.props, children: vNode.children }));
  }

  return {
    type: vNode.type,
    props: vNode.props,
    children: vNode.children.map(normalizeVNode).filter(isValidChild),
  };
}
