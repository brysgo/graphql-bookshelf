import BookshelfType from '../'
import ClassroomType from './ClassroomType'
import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

export default new GraphQLObjectType(BookshelfType({
  name: 'Subject',
  description: 'A field of study.',
  fields: (model) => ({
    id: model.attr({
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the topic.',
    }),
    title: model.attr({
      type: GraphQLString,
      description: 'The unique name of the subject.',
    }),
    description: model.attr({
      type: GraphQLString,
      description: 'Description of the field.',
    }),
    classrooms: model.hasMany({
      type: new GraphQLList(ClassroomType),
      description: 'Classrooms on this subject',
    })
  }),
}));
