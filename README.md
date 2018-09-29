bitcapital-core-sdk
===================

A multi-platform SDK for accessing the Bitcapital Core services in JS and TS environments.


## Getting started (From GitHub)

Install as a project dependency using Yarn.
```bash
yarn add "github:nxtep-io/bitcapital-core-sdk#1.0.0";
```

Or use NPM:
```bash
npm install "git+https://github.com/nxtep-io/bitcapital-core-sdk.git#1.0.0";
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
  // Base instance URL for REST API calls
  http: {
    baseURL: 'https://your-instance.btcore.app',
  },
  // Base instance URL for OAuth 2.0 requests
  oauth: {
    baseURL: 'https://your-instance.btcore.app',
    clientId: '< YOUR CLIENT_ID HERE >',
    clientSecret: '< YOUR CLIENT_SECRET HERE >',
  }
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

The session is a singleton, so you may access the authentication state
at any time, in any context, getting its current instance. It is also
an observable, so it can be watched for changes:

```typescript
import { Observer } from 'bitcapital-core-sdk';

// Gets the current session instance
const session = bitcapital.session();

// Shows the current user instance, if any
console.log(session.current);

// Prepare a new session observer (typescript notation)
const observer: Observer = {
  update(event: string, data: User) {
    if(event === Session.EVENT_SESSION_CHANGED) {
      console.log('User instance has changed in Session', { user: data });
    }
  }
};

// Start listening to session changes, such as credentials
// expiration or a refreshed access token.
session.subscribe(observer);

// ...

// Eventually, you can also stop listening to its changes
session.unsubscribe(observer);
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

## Documentation

Full API specification is in the Roadmap with the highest priority, all code is being prepared for TS Docs.