import getUserId from '../auth';
import authClient from '../authClient';
import isTokenExpired from '../../src/utils/auth';

jest.mock('../authClient').mock('../../src/utils/auth');

isTokenExpired.mockReturnValue(false);

describe('getUserId()', () => {
  it('rejects if it is passed an empty string', () =>
    getUserId('').catch((error) => {
      expect(error).toEqual('Token not found');
    })
  );
  it('rejects if the token does not begin with Bearer', () =>
    getUserId('dfg.dfg.sdfsdf').catch((error) => {
      expect(error).toEqual('Token not found');
    })
  );
  it('rejects if it is only passed a string with Bearer', () =>
    getUserId('Bearer').catch((error) => {
      expect(error).toEqual('Token not found');
    })
  );
  it('rejects if isTokenExpired passes a truthy value', () => {
    isTokenExpired.mockReturnValueOnce(true);
    return getUserId('Bearer sdfsdf.sd.f').catch((error) => {
      expect(error).toEqual('Token incorrect or expired');
    });
  });
  it('resolves with the output of authClient.tokens.getInfo is it is an object', () => {
    authClient.tokens.getInfo.mockReturnValueOnce(Promise.resolve({ user_id: 'someUserId' }));
    return getUserId('Bearer sdfsd.sdfsdfsdf.sdfsdf').then((user) => {
      expect(user).toEqual({ user_id: 'someUserId' });
    });
  });
  it('rejects with the error of authClient.tokens.getInfo', () => {
    authClient.tokens.getInfo.mockReturnValueOnce(Promise.reject('There was an error getting the user'));
    return getUserId('Bearer sdfsd.sdfsdfsdf.sdfsdf').catch((error) => {
      expect(error).toEqual('There was an error getting the user');
    });
  });
  it('rejects if authClient.tokens.getInfo resolves to Unauthorized', () => {
    authClient.tokens.getInfo.mockReturnValueOnce(Promise.resolve('Unauthorized'));
    return getUserId('Bearer sdfsd.sdfsdfsdf.sdfsdf').catch((error) => {
      expect(error).toEqual('Unauthorized');
    });
  });
  it('rejects if authClient.tokens.getInfo resolves to Not enough or too many segments', () => {
    authClient.tokens.getInfo.mockReturnValueOnce(Promise.resolve('Not enough or too many segments'));
    return getUserId('Bearer sdfsd.sdfsdfsdf.sdfsdf').catch((error) => {
      expect(error).toEqual('Unauthorized');
    });
  });
});
