import { Observable } from '../../lib';

jest.useFakeTimers();

describe('lib.utils.Observable', () => {
  it('should call its listeners properly synchronously', async () => {
    let called = false;

    const obs = new Observable({ async: false });
    obs.subscribe({
      update() {
        called = true;
      },
    });

    // This will be called async
    await obs.notify('test');

    // Fast-forward until all timers have been executed
    expect(called).toBe(true);
  });

  it('should call its listeners properly', async () => {
    let called = false;

    const obs = new Observable();
    obs.subscribe({
      update() {
        called = true;
      },
    });

    // This will be called async
    await obs.notify('test');

    // Fast-forward until all timers have been executed
    jest.runAllTimers();
    expect(called).toBe(true);
  });

  it('should not be called after unsubscription', async () => {
    let called = false;

    const obs = new Observable();
    const observer = {
      update() {
        called = true;
      },
    };

    // This will be called async
    obs.subscribe(observer);
    expect(obs.unsubscribe(observer)).toBe(true);
    await obs.notify('test');

    // Fast-forward until all timers have been executed
    jest.runAllTimers();
    expect(called).toBe(false);
    expect(obs.unsubscribe(observer)).toBe(false);
  });
});
