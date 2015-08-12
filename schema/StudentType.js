import BookshelfType from '../'
import ClassroomType from './ClassroomType'
import HomeworkType from './HomeworkType'
import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList
} from 'graphql'

export default new BookshelfType({
  name: 'Student',
  description: 'A humble student.',
  fields: (model) => ({
    id: model.attr({
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the student.',
    }),
    homeworks: model.hasMany({
      type: new GraphQLList(HomeworkType),
      description: 'All the homework the student has submitted.',
    }),
    classrooms: model.hasMany({
      type: new GraphQLList(ClassroomType),
      description: 'The classes the student is in.',
      args: {
        id: {
          type: GraphQLInt,
          description: 'Optional ID of a class.'
        }
      },
      resolve: (qb, modelInstance, {id}) => {
        if (id) {
          qb.where({room_id: id});
        }
      }
    })
  }),
});
