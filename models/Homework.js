import { bookshelf } from './connection'
import Classroom from './Classroom'
import Student from './Student'

export default bookshelf.Model.extend({
  tableName: 'homeworks',
  hasTimestamps: ['created_at', 'updated_at'],
  room: function() {
    return this.belongsTo(Classroom);
  },
  student: function() {
    return this.belongsTo(Student, 'student_id');
  },
});
