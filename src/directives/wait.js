function bind(el, binding, vNode, oldVNode) {
  const { arg, modifiers, value } = binding;
  const instance = vNode.context.__$waitInstance;
  switch (arg) {
    case 'click':
      if (modifiers.start) {
        el.addEventListener('click', () => instance.start(value), false);
        break;
      }
      if (modifiers.end) {
        el.addEventListener('click', () => instance.end(value), false);
        break;
      }
      if (modifiers.progress) {
        el.addEventListener('click', () => instance.progress(...value), false);
        break;
      }
      break;
    case 'toggle':
      el.addEventListener(
        'click',
        () => {
          const isWaiting = instance.is(value);
          if (!isWaiting) {
            instance.start(value);
          } else {
            instance.end(value);
          }
        },
        false
      );
      break;
  }

  update(el, binding, vNode, oldVNode);
}

function update(el, binding, vNode, oldVNode) {
  const { arg, modifiers, value } = binding;
  const instance = vNode.context.__$waitInstance;

  let isWaiting = instance.is(value);
  if (modifiers.not || ['hidden', 'enabled'].includes(arg)) {
    isWaiting = !isWaiting;
  }

  const originalDisplay = el.style.display === 'none' ? '' : el.style.display;
  switch (arg) {
    case 'visible':
    case 'hidden':
      el.style.display = !isWaiting ? 'none' : originalDisplay;
      break;
    case 'enabled':
    case 'disabled':
      isWaiting
        ? el.setAttribute('disabled', true)
        : el.removeAttribute('disabled');
      break;
  }
}

export default {
  bind,
  update
};
