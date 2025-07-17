const eventMap = new WeakMap();

export function setupEventListeners(root) {
  const allEventTypes = [
    "click",
    "dblclick",
    "mousedown",
    "mouseup",
    "mouseover",
    "mouseout",
    "mousemove",
    "contextmenu",
    "keydown",
    "keyup",
    "keypress",
    "focus",
    "blur",
    "change",
    "input",
    "submit",
  ];

  allEventTypes.forEach((type) => {
    root.addEventListener(type, (e) => {
      // 이벤트가 발생한 대상에서 위로 올라가며 matching handler 실행
      let target = e.target;
      while (target && target !== root) {
        const typeMap = eventMap.get(target);
        if (typeMap) {
          const handlers = typeMap.get(type);
          if (handlers) {
            handlers.forEach((fn) => fn(e));
          }
        }
        // 이벤트가 발생한 대상의 부모로 이동
        target = target.parentElement;
      }
    });
  });
}

export function addEvent(element, eventType, handler) {
  if (!eventMap.has(element)) {
    eventMap.set(element, new Map());
  }
  const typeMap = eventMap.get(element);

  if (!typeMap.has(eventType)) {
    typeMap.set(eventType, new Set());
  }
  typeMap.get(eventType).add(handler);
}

export function removeEvent(element, eventType, handler) {
  const typeMap = eventMap.get(element);
  if (!typeMap) return;
  const handlers = typeMap.get(eventType);
  if (!handlers) return;

  handlers.delete(handler);

  if (handlers.size === 0) {
    typeMap.delete(eventType);
  }

  if (typeMap.size === 0) {
    eventMap.delete(element);
  }
}
