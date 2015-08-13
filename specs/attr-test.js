import { clean } from '../config/helpers'
import { Student, Classroom } from '../models';
import graphqlWithSchema from '../schema';

describe('attr', function() {

  describe('on a bookshelf table attribute', function() {
    it('returns the attribute', function* () {
      yield clean();
      var student = yield Student.forge({name: 'Marty Finklestein'}).save();

      let query = `{
        viewer(id: ${student.get('id')}) {
          name
        }
      }`

      var results = yield graphqlWithSchema(query);

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
