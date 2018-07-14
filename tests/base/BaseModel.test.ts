import { BaseModel } from '../../lib';

describe('lib.base.BaseModel', () => {
  it('should instantiate a valid BaseModel with an id', async () => {
    const model = new BaseModel({ id: 'test' });
    expect(model.id).toBe('test');
  });
  it('should instantiate a valid BaseModel with an _id', async () => {
    const model = new BaseModel({ _id: 'test' });
    expect(model.id).toBe('test');
  });
  it('should prioritize simple id over _id', async () => {
    const model = new BaseModel({ id: 'test1', _id: 'test2' });
    expect(model.id).toBe('test1');
  });
});
