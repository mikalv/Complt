process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';
process.env.REACT_APP_API_URL = 'https://8lq0gtonr5.execute-api.us-east-1.amazonaws.com/dev/graphql';
process.env.REACT_APP_AUTH0_DOMAIN = 'oakapp.auth0.com';
process.env.REACT_APP_AUTH0_CLIENT_ID = 'GfMoEkzkCGYB9p1cyQ042XyVshskXt8p';

// Load environment variables from .env file. Surpress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
require('dotenv').config({silent: true});

const jest = require('jest');
const argv = process.argv.slice(2);

jest.run(argv);
