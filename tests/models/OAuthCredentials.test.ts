import * as hat from 'hat';
import { OAuthCredentials } from '../../lib';

const TEST_CREDENTIALS = {
  token_type: 'bearer',
  access_token: hat(),
  refresh_token: hat(),
  user_id: hat(),
  expires_in: 3600,
};

describe('lib.models.OAuthCredentials', () => {
  it('should instantiate properly', async () => {
    const credentials = new OAuthCredentials(TEST_CREDENTIALS);

    expect(credentials).toBeTruthy();
    expect(credentials.accessToken).toBe(TEST_CREDENTIALS.access_token);
    expect(credentials.refreshToken).toBe(TEST_CREDENTIALS.refresh_token);
    expect(credentials.tokenType).toBe(TEST_CREDENTIALS.token_type);
    expect(credentials.userId).toBe(TEST_CREDENTIALS.user_id);
    expect(credentials.expiresAt).toBeInstanceOf(Date);
    expect(credentials.expiresAt.getTime()).toBeGreaterThan(0);
  });
});
