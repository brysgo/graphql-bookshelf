import BookshelfType from '../'
import SubjectType from './SubjectType'
import HomeworkType from './HomeworkType'
import StudentType from './StudentType'
import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql'

export default new BookshelfType({
  name: 'Classroom',
  description: 'Need I say more?',
  fields: (model) => ({
    id: model.attr({
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the classroom.',
    }),
    subject: model.belongsTo({
      type: SubjectType,
      description: 'The subject of the classroom.',
    }),
    students: model.hasMany({
      type: new GraphQLList(StudentType),
      description: 'Students in the classroom.',
    }),
    homeworks: model.hasMany({
      type: new GraphQLList(HomeworkType),
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
  }),
});
