// import { addEvent } from "./eventManager";

export function createElement(vNode) {
  // 1. null, undefined, boolean -> 빈 텍스트 노드
  if (vNode === null || vNode === undefined || typeof vNode === "boolean") {
    return document.createTextNode("");
  }
}

// function updateAttributes($el, props) {}
