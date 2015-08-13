import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLSchema,
  graphql,
} from 'graphql'
import StudentType from './StudentType'
import Student from '../models/Student'

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
      viewer: {
        type: StudentType,
        args: {
          id: {
            type: GraphQLInt,
            description: 'ID of the current student.'
          }
        },
        description: 'The current student.',
        resolve: (source, {id}) => {
          return Student.where({id}).fetch();
        }
      }
    })
  })
});

export default function() {
  return graphql(schema, ...arguments);
};
