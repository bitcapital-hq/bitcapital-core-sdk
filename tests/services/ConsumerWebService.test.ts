import { ConsumerWebService } from "../../lib";
import { TEST_USER } from "../models/User/User.test";
import { CRUDWebServiceTest } from "./WebServiceUtil";

describe("lib.services.ConsumerWebService", () => {
  CRUDWebServiceTest("consumers", ConsumerWebService, TEST_USER);
});
