import getUserId from '../auth';
import authClient from '../authClient';

jest.mock('../authClient');

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
  it('resolves with the output of authClient.tokens.getInfo', () => {
    authClient.tokens.getInfo.mockReturnValueOnce(Promise.resolve({ user_id: 'someUserId' }));
    return getUserId('Bearer sdfsd.sdfsdfsdf.sdfsdf').then((user) => {
      expect(user).toEqual({ user_id: 'someUserId' });
    });
  });
  it('resolves with the output of authClient.tokens.getInfo', () => {
    authClient.tokens.getInfo.mockReturnValueOnce(Promise.reject('There was an error getting the user'));
    return getUserId('Bearer sdfsd.sdfsdfsdf.sdfsdf').catch((error) => {
      expect(error).toEqual('There was an error getting the user');
    });
  });
});
