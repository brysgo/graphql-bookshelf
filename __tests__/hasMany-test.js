import {
  knex,
  knexCleaner,
  useGeneratorsWith,
} from '../config/helpers'
import { Subject, Student } from '../models';
import graphqlWithSchema from '../schema';

describe('hasMany', function() {
  // Use generators by default
  it = useGeneratorsWith(pit);

  describe('On a bookshelf belongsToMany', function() {
    it('returns all the associated content', function* () {
      yield knexCleaner.clean(knex);
      var student = yield Student.forge({name: 'Joe Shmoe'}).save();
      var classroom1 = student.classrooms().create();
      var classroom2 = student.classrooms().create();
      var student2 = classroom2.students().create({name: 'Marvin Martian'});


      let query = `{
        viewer {
          classrooms {
            id
          }
        }
      }`

      var classrooms = yield graphqlWithSchema(query);

      expect(classrooms).toEqual({ });
    });
  });
});
