import Bitcapital from "../lib";

describe("lib.Bitcapital", () => {
  it("should have a valid initialization interface", async () => {
    // Initialize bit capital instance
    const bitcapital = Bitcapital.initialize({
      baseURL: "http://localhost:3000",
      clientId: "test",
      clientSecret: "test"
    });

    // Check bit capital utility methods
    expect(bitcapital.status).toBeDefined();
    expect(bitcapital.current).toBeDefined();

    // Check bit capital authentication services
    expect(bitcapital.session()).toBeDefined();
    expect(bitcapital.oauth()).toBeDefined();
    expect(bitcapital.users()).toBeDefined();

    // Check bit capital web services
    expect(bitcapital.assets()).toBeDefined();
    expect(bitcapital.consumers()).toBeDefined();
    expect(bitcapital.domains()).toBeDefined();
    expect(bitcapital.payments()).toBeDefined();
    expect(bitcapital.wallets()).toBeDefined();
  });
});
