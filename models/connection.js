var bookshelf = require('bookshelf')(require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./graphql_bookshelf.sqlite"
  }
}));
var knex = bookshelf.knex;

module.exports = { bookshelf, knex }
