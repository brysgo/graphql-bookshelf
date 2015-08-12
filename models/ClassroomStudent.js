import { bookshelf } from './connection'
import Classroom from './Classroom'
import Student from './Student'

export default bookshelf.Model.extend({
  tableName: 'classrooms_students',
  classroom: function() {
    return this.belongsTo(Classroom);
  },
  student: function() {
    return this.belongsTo(Student);
  }
});
