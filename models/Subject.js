import { bookshelf } from '../connection'
import Classroom from './Classroom'

export default bookshelf.Model.extend({
  tableName: 'subjects',
  classrooms: function() {
    return this.hasMany(Classroom);
  },
});
