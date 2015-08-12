var knex = require('../models/connection').knex;
var knexCleaner = require('knex-cleaner');
require('babel-runtime/regenerator');
import co from 'co';

function useGeneratorsWith(pit) {
  return (msg, fn) => pit(msg, co.wrap(fn))
}

export default {
  knex,
  knexCleaner,
  useGeneratorsWith,
}
