process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';
process.env.REACT_APP_AUTH0_DOMAIN = 'complt.auth0.com';
process.env.REACT_APP_AUTH0_CLIENT_ID = 'SlKB0j8GVBIfYVzJicd63jSIO9oeY3q7';
process.env.REACT_APP_COUCH_URL = 'remote';

// Load environment variables from .env file. Surpress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
require('dotenv').config();

const jest = require('jest');
const argv = process.argv.slice(2);

jest.run(argv);
