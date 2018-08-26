import { DomainWebService } from "../../lib";
import { TEST_DOMAIN } from "../models/Domain/Domain.test";
import { CRUDWebServiceTest } from "./WebServiceUtil";

describe("lib.services.DomainWebService", () => {
  CRUDWebServiceTest("domains", DomainWebService, TEST_DOMAIN);
});
