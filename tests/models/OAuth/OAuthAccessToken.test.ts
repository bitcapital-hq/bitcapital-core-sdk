import * as hat from "hat";
import { OAuthAccessToken } from "../../../lib";

const TEST_CREDENTIALS = {
  tokenType: "bearer",
  accessToken: hat(),
  refreshToken: hat(),
  expiresIn: 3600,
  user: hat(),
  client: hat()
};

describe("lib.models.OAuthAccessToken", () => {
  it("should instantiate properly", async () => {
    const credentials = new OAuthAccessToken(TEST_CREDENTIALS);
    expect(credentials).toBeTruthy();
    expect(credentials.accessToken).toBe(TEST_CREDENTIALS.accessToken);
    expect(credentials.tokenType).toBe(TEST_CREDENTIALS.tokenType);
    expect(credentials.user).toBe(TEST_CREDENTIALS.user);
  });
});
