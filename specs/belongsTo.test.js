import { clean } from '../config/helpers'
import { Student, Classroom } from '../models';
import graphqlWithSchema from '../schema';

describe('belongsTo', function() {

  describe('on a bookshelf belongsTo', function() {
    it('returns associated content', async function () {
      await clean();
      var student = await Student.forge().save();
      var homework = await student.homeworks().create();
      var classroom = await Classroom.forge().save();
      await homework.set('classroom_id', classroom.get('id')).save();

      let query = `{
        viewer(id: ${student.get('id')}) {
          homeworks {
            classroom {
              id
            }
          }
        }
      }`

      var results = await graphqlWithSchema(query);

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
