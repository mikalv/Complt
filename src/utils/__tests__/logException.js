import Raven from 'raven-js';
import logException from '../logException';

jest.mock('raven-js');

global.console.error = jest.fn();

describe('logException', () => {
  it('calls Raven.captureException correctly', () => {
    logException(new Error('Some error'), { otherProperty: true });
    expect(Raven.captureException).toBeCalledWith(new Error('Some error'), { extra: { otherProperty: true } });
  });
  it('calls console.error correctly', () => {
    logException(new Error('Some error'), { otherProperty: true });
    expect(global.console.error).toBeCalledWith(new Error('Some error'), { otherProperty: true });
  });
});
