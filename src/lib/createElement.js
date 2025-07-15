// import { addEvent } from "./eventManager";

export function createElement(vNode) {
  // 1. null, undefined, boolean -> 빈 텍스트 노드
  if (vNode === null || vNode === undefined || typeof vNode === "boolean") {
    return document.createTextNode("");
  }

  // 2. string, number -> 텍스트 노드
  //    - 숫자, 문자열은 텍스트 노드로 변환
  //    - 숫자는 문자열로 변환하여 처리
  //    - 문자열은 그대로 사용
  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(String(vNode));
  }
}

// function updateAttributes($el, props) {}
