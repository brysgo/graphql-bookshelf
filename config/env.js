import regeneratorRuntime from 'babel-runtime/regenerator';
global.regeneratorRuntime = regeneratorRuntime;

global.knex = require('../connection').knex;
