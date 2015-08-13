import { bookshelf } from '../connection'
import Classroom from './Classroom'
import Homework from './Homework'

export default bookshelf.Model.extend({
  tableName: 'students',
  classrooms: function() {
    return this.belongsToMany(Classroom);
  },
  homeworks: function() {
    return this.hasMany(Homework, 'student_id');
  },
});
