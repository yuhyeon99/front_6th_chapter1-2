import { setupEventListeners } from "./eventManager";
import { createElement } from "./createElement";
import { normalizeVNode } from "./normalizeVNode";
import { updateElement } from "./updateElement";

export function renderElement(vNode, container) {
  // 최초 렌더링시에는 createElement로 DOM을 생성하고
  // 이후에는 updateElement로 기존 DOM을 업데이트한다.
  // 렌더링이 완료되면 container에 이벤트를 등록한다.

  // 1) 이벤트 위임을 단 한 번만 설정
  if (!container.__eventDelegationInstalled) {
    setupEventListeners(container);
    container.__eventDelegationInstalled = true;
  }

  // 2) vNode를 정규화
  const nextVNode = normalizeVNode(vNode);

  // 3) 최초 렌더 vs 업데이트
  if (!container.__prevVNode) {
    const domTree = createElement(nextVNode);
    container.innerHTML = "";
    if (domTree) container.appendChild(domTree);
  } else {
    console.log("Updating existing DOM tree...");
    // 핵심(diff) ------------------------
    updateElement(container.firstChild, nextVNode, container.__prevVNode);
  }

  // 4) 차후 diffing을 위해 이전 VNode 저장
  container.__prevVNode = nextVNode;
}
