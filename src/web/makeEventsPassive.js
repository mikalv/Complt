// https://github.com/zzarcon/default-passive-events
/* eslint-disable no-param-reassign */
export default () => {
  const supportsPassive = eventListenerOptionsSupported();

  if (supportsPassive) {
    const addEvent = EventTarget.prototype.addEventListener;
    overwriteAddEvent(addEvent);
  }

  function overwriteAddEvent(superMethod) {
    const defaultOptions = {
      passive: true,
      capture: false,
    };
    // eslint-disable-next-line func-names
    EventTarget.prototype.addEventListener = function(type, listener, options) {
      const usesListenerOptions = typeof options === 'object';
      const useCapture = usesListenerOptions ? options.capture : options;

      options = usesListenerOptions ? options : {};
      options.passive = options.passive !== undefined
        ? options.passive
        : defaultOptions.passive;
      options.capture = useCapture !== undefined
        ? useCapture
        : defaultOptions.capture;

      superMethod.call(this, type, listener, options);
    };
  }

  function eventListenerOptionsSupported() {
    let supported = false;
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get() {
          supported = true;
        },
      });
      window.addEventListener('test', null, opts);
    } catch (e) {} // eslint-disable-line no-empty

    return supported;
  }
};
