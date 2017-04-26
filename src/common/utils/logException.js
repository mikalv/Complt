export default function logException(ex, context) {
  import('raven-js').then(Raven => {
    Raven.captureException(ex, {
      extra: context,
    });
  });
  /* eslint no-console:0 no-unused-expressions:0 */
  window.console && console.error && console.error(ex, context);
}
