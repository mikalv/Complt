import Raven from 'raven-js';

export default function logException(ex, context) {
  Raven.captureException(ex, {
    extra: context,
  });
  /* eslint no-console:0 no-unused-expressions:0 */
  window.console && console.error && console.error(ex, context);
}
