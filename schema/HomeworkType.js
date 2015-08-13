import BookshelfType from '../'
import ClassroomType from './ClassroomType'
import StudentType from './StudentType'
import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

export default new GraphQLObjectType(BookshelfType({
  name: 'Homework',
  description: 'Homework submitted by the student.',
  fields: (model) => ({
    id: model.attr({
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the homework.',
    }),
    content: model.attr({
      type: GraphQLString,
      description: 'The body of the homework.',
    }),
    classroom: model.belongsTo({
      type: ClassroomType,
      description: 'The classroom submitted to.',
    }),
    student: model.belongsTo({
      type: StudentType,
      description: 'Author of the homework.',
    }),
    createdAt: model.attr({
      type: GraphQLString,
      description: 'Creation date of the homework.'
    })
  }),
}));
