import { clean } from '../config/helpers'
import { Student, Classroom } from '../models';
import graphqlWithSchema from '../schema';

describe('belongsTo', function() {

  describe('on a bookshelf belongsTo', function() {
    it('returns associated content', function* () {
      yield clean();
      var student = yield Student.forge().save();
      var homework = yield student.homeworks().create();
      var classroom = yield Classroom.forge().save();
      yield homework.set('classroom_id', classroom.get('id')).save();

      let query = `{
        viewer(id: ${student.get('id')}) {
          homeworks {
            classroom {
              id
            }
          }
        }
      }`

      var results = yield graphqlWithSchema(query);

      expect(results).toEqual({
        data: {
          viewer: {
            homeworks: [
              { classroom: { id: classroom.get('id') } }
            ]
          }
        }
      });
    });
  });
});
