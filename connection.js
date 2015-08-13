var bookshelf = require('bookshelf')(
  require('knex')(require('./knexfile'))
);
var knex = bookshelf.knex;

module.exports = { bookshelf, knex }
