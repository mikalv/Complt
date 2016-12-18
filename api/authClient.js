import { AuthenticationClient } from 'auth0';

const authenticationClient = new AuthenticationClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
});

export default authenticationClient;
