import * as hat from "hat";
import { OAuthClient, OAuthClientStatus, OAuthClientSchema, OAuthClientPlatform } from "../../../lib";

const TEST_CLIENT: OAuthClientSchema = {
  id: hat(),
  clientId: hat(),
  clientSecret: hat(),
  platform: OAuthClientPlatform.API,
  status: OAuthClientStatus.ACTIVE
};

describe("lib.models.OAuthClient", () => {
  it("should instantiate properly", async () => {
    const client = new OAuthClient(TEST_CLIENT);

    expect(client).toBeTruthy();
    expect(client.id).toBe(TEST_CLIENT.id);
    expect(client.clientId).toBe(TEST_CLIENT.clientId);
    expect(client.clientSecret).toBe(TEST_CLIENT.clientSecret);
    expect(client.platform).toBe(TEST_CLIENT.platform);
  });
});
