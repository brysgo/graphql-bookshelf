import BookshelfType from '../'
import SubjectType from './SubjectType'
import HomeworkType from './HomeworkType'
import StudentType from './StudentType'
import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql'
import {
  connectionDefinitions,
  connectionArgs
} from 'graphql-relay';

export default new GraphQLObjectType(BookshelfType({
  name: 'Classroom',
  description: 'Need I say more?',
  fields: function() {return {
    id: this.attr({
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the classroom.',
    }),
    subject: this.belongsTo({
      type: SubjectType,
      description: 'The subject of the classroom.',
    }),
    students: this.hasMany({
      type: new GraphQLList(StudentType),
      description: 'Students in the classroom.',
    }),
    homeworks: this.hasMany({
      type: connectionDefinitions({nodeType: HomeworkType}).connectionType,
      args: connectionArgs,
      description: 'Homework submitted to the classroom (latest to oldest).',
      resolve: (qb) => {
        qb.orderBy('created_at', 'DESC');
      }
    }),
    size: {
      type: GraphQLInt,
      description: 'How many students there are in the class.',
      resolve: (model) => {
        return model.studentCount();
      },
    }
  }},
}));
