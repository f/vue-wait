function bind(el, binding, vNode, oldVNode) {
  const { arg, modifiers, value } = binding;
  const instance = vNode.context.__$vueLoadingInstance;
  switch (arg) {
    case 'click':
      if (modifiers.start) {
        el.addEventListener('click', () => instance.startLoading(value), false);
        break;
      }
      if (modifiers.end) {
        el.addEventListener('click', () => instance.endLoading(value), false);
        break;
      }
      break;
    case 'toggle':
      el.addEventListener(
        'click',
        () => {
          const isLoading = instance.isLoading(value);
          if (!isLoading) {
            instance.startLoading(value);
          } else {
            instance.endLoading(value);
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
  const instance = vNode.context.__$vueLoadingInstance;

  let isLoading = instance.isLoading(value);
  if (modifiers.not || ['hidden', 'enabled'].includes(arg)) {
    isLoading = !isLoading;
  }

  const originalDisplay = el.style.display === 'none' ? '' : el.style.display;
  switch (arg) {
    case 'visible':
    case 'hidden':
      el.style.display = !isLoading ? 'none' : originalDisplay;
      break;
    case 'enabled':
    case 'disabled':
      isLoading
        ? el.setAttribute('disabled', true)
        : el.removeAttribute('disabled');
      break;
  }
}

export default {
  bind,
  update
};
