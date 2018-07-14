import * as hat from 'hat';
import MockAdapter from 'axios-mock-adapter';
import { UserWebService, OAuthCredentials, User } from '../../lib';

const TEST_CREDENTIALS = {
  token_type: 'bearer',
  access_token: hat(),
  refresh_token: hat(),
  user_id: hat(),
  expires_in: 3600,
};

const TEST_USER = {
  _id: hat(),
  name: 'Test User',
  email: 'user@test.com',
};

describe('lib.services.UserWebService', () => {
  it('should have a valid lib interface', async () => {
    expect(UserWebService).toBeTruthy();
    expect(UserWebService.getInstance).toBeInstanceOf(Function);
  });

  it('should instantiate a simple UserWebService directly', async () => {
    const user = new UserWebService({ baseURL: 'http://localhost:3000/test_url' });
    expect(user).toBeTruthy();
    expect((user as any).client).toBeTruthy();
  });

  it('should instantiate a simple singleton UserWebService', async () => {
    const user = UserWebService.getInstance({ baseURL: 'http://localhost:3000/test_url' });
    expect(user).toBeTruthy();
    expect((user as any).client).toBeTruthy();
    expect((UserWebService as any).instance).toEqual(user);
  });

  describe('Success user instance', () => {
    let user: UserWebService;

    beforeEach(async () => {
      // This sets the mock adapter on the default instance
      user = new UserWebService({
        baseURL: 'http://localhost:3000/test_url',
      });

      const mock = new MockAdapter((user as any).client);

      // Mock all requests to a simple success
      mock.onGet('/users/me').reply(200, TEST_USER);
    });

    it('should get an user with a mocked instance', async () => {
      const response = await user.me(new OAuthCredentials(TEST_CREDENTIALS));
      expect(response).toBeInstanceOf(User);
      expect(response.credentials).toBeInstanceOf(OAuthCredentials);
    });
  });
});
