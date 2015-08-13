import { clean } from '../config/helpers'
import { Student } from '../models';
import graphqlWithSchema from '../schema';

describe('hasMany', function() {

  describe('with a resolve function', function() {
    it('passes a KnexJS query builder through to the resolve', function* () {
      yield clean();
      var student = yield Student.forge({name: 'Joe Shmoe'}).save();
      var classroom1 = yield student.classrooms().create();
      var classroom2 = yield student.classrooms().create();

      let query = `{
        viewer(id: ${student.get('id')}) {
          classrooms(id: ${classroom2.get('id')}) {
            id
          }
        }
      }`

      var results = yield graphqlWithSchema(query);

      expect(results).toEqual({
        data: {
          viewer: {
            classrooms: [ { id: classroom2.get('id') } ]
          }
        }
      });
    });
  });

  describe('without a resolve function', function() {
    it('returns bookshelf belongsToMany associated data', function* () {
      yield clean();
      var student = yield Student.forge({name: 'Joe Shmoe'}).save();
      var classroom1 = yield student.classrooms().create();
      var classroom2 = yield student.classrooms().create();
      var student2 = yield classroom2.students().create({name: 'Marvin Martian'});

      let query = `{
        viewer(id: ${student.get('id')}) {
          classrooms {
            id
          }
        }
      }`

      var results = yield graphqlWithSchema(query);

      expect(results).toEqual({
        data: {
          viewer: {
            classrooms: jasmine.any(Array)
          }
        }
      });
      let { classrooms } = results.data.viewer;

      expect(classrooms).toContain({ id: classroom1.get('id') });
      expect(classrooms).toContain({ id: classroom2.get('id') });
    });

    it('returns bookshelf hasMany associated data', function* () {
      yield clean();
      var student = yield Student.forge({name: 'Joe Shmoe'}).save();
      var classroom = yield student.classrooms().create();
      var homework1 = yield classroom.homeworks().create({content: 'I did it...'});
      var homework2 = yield classroom.homeworks().create({content: 'Look!!!'});

      let query = `{
        viewer(id: ${student.get('id')}) {
          classrooms {
            homeworks {
              content
            }
          }
        }
      }`

      var results = yield graphqlWithSchema(query);

      expect(results).toEqual({
        data: {
          viewer: {
            classrooms: [
              { homeworks: jasmine.any(Array) }
            ]
          }
        }
      });
      let { homeworks } = results.data.viewer.classrooms[0];

      expect(homeworks).toContain({ content: homework1.get('content') });
      expect(homeworks).toContain({ content: homework2.get('content') });
    });
  });
});
