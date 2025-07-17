import { setupEventListeners } from "./eventManager";
import { createElement } from "./createElement";
import { normalizeVNode } from "./normalizeVNode";
import { updateElement } from "./updateElement";

let lastVNode = null;

export function renderElement(vNode, container) {
  // 1. 새 VNode 정규화
  const next = normalizeVNode(vNode);
  const prev = lastVNode;

  // 2. 이미 DOM이 있고, 직전 VNode도 있다 => diff 진행
  if (prev && container.firstChild) {
    updateElement(container, next, prev);
  }
  // 3. 최초 렌더 또는 DOM이 비어 있으면 새로 그린다
  else {
    container.appendChild(createElement(next));
    setupEventListeners(container); // 위임은 처음 한 번
  }

  // 4. 스냅샷 갱신
  lastVNode = next;
}
