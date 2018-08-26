import { BaseModel } from "../../../lib";
import * as uuid from "uuid/v4";

describe("lib.base.BaseModel", () => {
  it("should instantiate a valid BaseModel with an id", async () => {
    const id = uuid();
    const model = new BaseModel({ id, createdAt: new Date().toISOString() });
    expect(model.id).toBe(id);

    expect(await model.isValid()).toBe(true);
  });
});
