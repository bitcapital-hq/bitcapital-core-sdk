import * as hat from "hat";
import { OAuthClientStatus, OAuthClientSchema, OAuthClientPlatform } from "bitcapital-common";

const TEST_CLIENT: OAuthClientSchema = {
  id: hat(),
  clientId: hat(),
  clientSecret: hat(),
  platform: OAuthClientPlatform.API,
  status: OAuthClientStatus.ACTIVE
};
