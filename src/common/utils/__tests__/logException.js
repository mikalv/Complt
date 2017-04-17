import Raven from 'raven-js';
import logException from '../logException';

jest.mock('raven-js');

global.console.error = jest.fn();

describe('logException', () => {
  it('calls Raven.captureException correctly', (done) => {
    logException(new Error('Some error'), { otherProperty: true });
    setTimeout(() => {
      expect(Raven.captureException).toBeCalledWith(new Error('Some error'), { extra: { otherProperty: true } });
      done();
    }, 100);
  });
  it('calls console.error correctly', () => {
    logException(new Error('Some error'), { otherProperty: true });
    expect(global.console.error).toBeCalledWith(new Error('Some error'), { otherProperty: true });
  });
});
