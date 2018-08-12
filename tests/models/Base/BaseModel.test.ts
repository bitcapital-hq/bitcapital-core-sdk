import { BaseModel } from "../../../lib";

describe("lib.base.BaseModel", () => {
  it("should instantiate a valid BaseModel with an id", async () => {
    const model = new BaseModel({ id: "test", createdAt: new Date().toISOString() });
    expect(model.id).toBe("test");
  });
});
