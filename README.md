# GraphQL + BookshelfJS

[![Join the chat at https://gitter.im/brysgo/graphql-bookshelf](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/brysgo/graphql-bookshelf?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Build Status](https://travis-ci.org/brysgo/graphql-bookshelf.svg?branch=master)](https://travis-ci.org/brysgo/graphql-bookshelf)

[![peerDependency Status](https://david-dm.org/brysgo/graphql-bookshelf/peer-status.svg)](https://david-dm.org/brysgo/graphql-bookshelf#info=peerDependencies)

This is an early version of the `BookshelfType` I wrote to help me link up my Bookshelf models (built on top of Postgres) to my GraphQL schema.
### Install
`npm install --save graphql-bookshelf`

...

`var BookshelfType = require('graphql-bookshelf');`
### Example use...
Use `BookshelfType` inside of `GraphQLObjectType`...
```js
export default new GraphQLObjectType(BookshelfType({
  name: 'Classroom',
  description: 'Need I say more?',
  // ...and an object gets passed into the fields to help with your model.
  fields: (model) => ({
```
Simply wrap with `model.attr()`...
```js
    id: model.attr({
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the classroom.',
      // ...and you don't need to resolve table attributes.
    }),
```
Or wrap with model.belongsTo()...
```js
    subject: model.belongsTo({
      type: SubjectType, // And use the right association type...
      description: 'The subject of the classroom.',
      // And you get one-to-one relationships for free
    }),
```
Use model.hasMany()...
```js
    students: model.hasMany({
      type: new GraphQLList(StudentType), // And make sure you use `GraphQLList`
      description: 'Students in the classroom.',
      // Now you have associated collections for free
    }),
```
Need to do more on your associated collection?
```js
    homeworks: model.hasMany({
      type: new GraphQLList(HomeworkType),
      description: 'Homework submitted to the classroom (latest to oldest).',
      // Define a resolve function...
      resolve: (qb) => {
        // And get a sweet KnexJS query builder
        qb.orderBy('created_at', 'DESC');
      }
    }),
```
Or just leave it alone...
```js
    size: {
      type: GraphQLInt,
      description: 'How many students there are in the class.',
      resolve: (model) => {
        // And do it the old fashioned way
        return model.studentCount();
      },
    }
  }),
}));
```

### Goals & Philosophy

This library is intended to keep it simple. Automatic generation of schema can leave use-cases out, while using bookshelf in every resolve calls for large ammounts of repetitive boilerplate.

Another thing this library could help with is optimization. Turing graphql queries into database calls can be expensive, but using a layer in between can help make those optimizations that would get ugly and repetative in every resolve.

[See this example in action via the tests...](https://github.com/brysgo/graphql-bookshelf/blob/master/schema/ClassroomType.js)

### Contributing
 1. Install sqlite3, clone repo, npm install
 2. Create database in project root by running `sqlite3 graphql_bookshelf.sqlite`
 3. Run migrations, `knex migrate:latest`
 4. Run the tests with `npm test`
 5. When they pass, submit a PR

