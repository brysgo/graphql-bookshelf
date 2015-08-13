import { bookshelf, knex } from '../connection'
import Student from './Student'
import Subject from './Subject'
import Homework from './Homework'

export default bookshelf.Model.extend({
  tableName: 'classrooms',
  subject: function() {
    return this.belongsTo(Subject);
  },
  students: function() {
    return this.belongsToMany(Student);
  },
  homeworks: function() {
    return this.hasMany(Homework);
  },
  studentCount: function() {
    return knex('classrooms_students').where({
      classroom_id: this.get('id')
    }).count('id').then((total) => total[0].count)
  }
});
