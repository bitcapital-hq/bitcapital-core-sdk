bitcapital-core-sdk
===================

A multi-platform SDK for accessing the Bitcapital Core services in JS and TS environments.


## Getting started (From GitHub)

Install as a project dependency using Yarn, remember to specify the desired version.
```bash
yarn add "github:bitcapital-hq/bitcapital-core-sdk#1.3.0";
```

Or use NPM:
```bash
npm install "git+https://github.com/bitcapital-hq/bitcapital-core-sdk.git#1.3.0";
```


## Getting started (From source)

Install the dependencies and make sure everything is OK by running the automated tests.
```bash
yarn install
yarn test
```

Prepare the changes for publishing using the Typescript compiler
```bash
yarn run build
```

## Configuring your Client 

To start using this SDK you need both a Client ID and a Client Secret, emitted by
the Bitcapital Core Team. If you don't have yours yet, contact them at [https://bitcapital.com.br/developers](https://bitcapital.com.br/developers).

Configure your Bitcapital SDK instance.

```typescript
import Bitcapital from 'bitcapital-core-sdk';

// Initialize the session instance to authenticate
// using the Bitcapital Core OAuth 2.0 provider.
const bitcapital = Bitcapital.initialize({
  // Instance URL for REST API calls
  baseURL: 'https://your-instance.btcore.app',
  // Credentials for OAuth 2.0 requests
  clientId: '< YOUR CLIENT_ID HERE >',
  clientSecret: '< YOUR CLIENT_SECRET HERE >',
});

try {
  // Authenticate a user with email and password from Bitcapital Core
  // If succeeds and available, the credentials will be stored in the 
  // session instance and in the local storage (for browser environments).
  const user = await bitcapital.session().password({
    email: 'user@example.com',
    password: '12345678',
  });

  // The session returns the user info and credentials
  console.log(user.credentials.accessToken);

  // To logout and clear the current credentials, use the "destroy" action
  await bitcapital.session().destroy();

} catch(exception) {
  // Something went wront, probably credentials are invalid
  console.error(exception);
}
```


## Accessing library modules


Library modules:
* **bitcapital.assets():** Handles asset creation, emition and destruction.
* **bitcapital.consumers():** Creates, updates, validates and deactivates consumer accounts.
* **bitcapital.domains():** Creates, updates and removes domains from the network.
* **bitcapital.payments():** Send payments between wallets and access its history.
* **bitcapital.users():** Manages user accounts in the network.
* **bitcapital.wallets():** Creates, updates and deactivates wallets in the network.

Internal Modules:
* **bitcapital.session():** Manages credentials in the SDK.
* **bitcapital.oauth():** Manages authentication in the Bitcapital OAuth 2.0 provider.

Utility Modules:
* **bitcapital.sign():** Handles requests signature. Automatically called in required API requests.

## Documentation

### Library Reference

Full API specification is located at: [https://sdk.btcore.app](https://sdk.btcore.app).

### Using a Custom Session

The SDK comes with a built-in set of Storage providers: Memory and Local. In NodeJS environments, only Memory is available.

To override the default storage for your platform, pass it in the Session constructor:

```typescript
// Initialize a custom session with desired storage
const session = Session.initialize({
  storage: new StorageUtil('session', new MemoryStorage()),
  oauth: {
    baseURL: data.baseURL,
    clientId: data.clientId,
    clientSecret: data.clientSecret,
  },
  http: {
    baseURL: data.baseURL,
    clientId: data.clientId,
    clientSecret: data.clientSecret,
  }
});

// Initialize bitcapital service with specified credentials
const bitcapital = Bitcapital.initialize({
  // Pass your custom session instance
  session,
  // Other initialization configs...
  baseURL: data.baseURL,
  clientId: data.clientId,
  clientSecret: data.clientSecret,
});
```

**Creating a custom Storage provider** 

To implement another Storage mechanism, extend the `StorageUtilEngine` interface.

```typescript
import { StorageUtilEngine } from "bitcapital-core-sdk";

export default class MemoryStorage implements StorageUtilEngine {
  protected data: any = {};

  async setItem(key: string, value: string): Promise<any> {
    this.data[key] = value;
    return value;
  }
  async getItem(key: string): Promise<any> {
    return this.data[key];
  }
  async removeItem(key: string): Promise<void> {
    delete this.data[key];
  }
  async clear(): Promise<void> {
    this.data = {};
  }
}
```

# LICENSE

UNLICENSED
