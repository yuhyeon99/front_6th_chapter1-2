import { setupEventListeners } from "./eventManager";
import { createElement } from "./createElement";
import { normalizeVNode } from "./normalizeVNode";
// import { updateElement } from "./updateElement";

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
    // 핵심(diff) ------------------------
    updateElement(container.firstChild, container.__prevVNode, nextVNode);
  }

  // 4) 차후 diffing을 위해 이전 VNode 저장
  container.__prevVNode = nextVNode;
}

export function updateElement(dom, oldVNode, newVNode) {
  // 1. 텍스트 노드 처리
  if (typeof newVNode === "string" || typeof newVNode === "number") {
    if (oldVNode !== newVNode) dom.textContent = String(newVNode);
    return;
  }

  // 2. 타입 비교
  if (oldVNode.type !== newVNode.type) {
    const newDom = createElement(newVNode);
    dom.replaceWith(newDom);
    return;
  }

  // 3. props
  updateProps(dom, oldVNode.props || {}, newVNode.props || {});

  // 4. 자식 노드 처리
  const oldChildren = oldVNode.children || [];
  const newChildren = newVNode.children || [];
  const commonLen = Math.min(oldChildren.length, newChildren.length);

  // 공통 길이까지 재귀 호출
  for (let i = 0; i < commonLen; i++) {
    updateElement(dom.childNodes[i], oldChildren[i], newChildren[i]);
  }

  // 초과 old 제거
  for (let i = oldChildren.length - 1; i >= newChildren.length; i--) {
    dom.removeChild(dom.childNodes[i]);
  }

  // 초과 new 추가
  for (let i = commonLen; i < newChildren.length; i++) {
    dom.appendChild(createElement(newChildren[i]));
  }
}

function updateProps(dom, oldProps, newProps) {
  // 제거된 속성
  Object.keys(oldProps).forEach((key) => {
    if (!(key in newProps)) {
      if (key === "className") dom.removeAttribute("class");
      else if (typeof oldProps[key] === "boolean") {
        dom[key] = false;
        dom.removeAttribute(key);
      } else dom.removeAttribute(key);
    }
  });

  // 새로 추가/변경된 속성
  Object.entries(newProps).forEach(([key, value]) => {
    if (oldProps[key] === value) return; // unchanged

    if (key === "className") {
      if (value) dom.setAttribute("class", value);
      else dom.removeAttribute("class");
    } else if (typeof value === "boolean") {
      dom[key] = value;
      value ? dom.setAttribute(key, "") : dom.removeAttribute(key);
    } else {
      dom.setAttribute(key, value);
    }
  });
}
