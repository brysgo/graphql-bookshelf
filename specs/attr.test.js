import { clean } from '../config/helpers'
import { Student, Classroom } from '../models';
import graphqlWithSchema from '../schema';

describe('attr', function() {

  describe('on a bookshelf table attribute', function() {
    it('returns the attribute', async function () {
      await clean();
      var student = await Student.forge({name: 'Marty Finklestein'}).save();

      let query = `{
        viewer(id: ${student.get('id')}) {
          name
        }
      }`

      var results = await graphqlWithSchema(query);

      expect(results).toEqual({
        data: {
          viewer: {
            name: 'Marty Finklestein'
          }
        }
      });
    });
  });
});
