import { clean } from '../config/helpers'
import { Student } from '../models';
import graphqlWithSchema from '../schema';

describe('hasMany', function() {

  describe('with a resolve function', function() {
    it('passes a KnexJS query builder through to the resolve', async function () {
      await clean();
      var student = await Student.forge({name: 'Joe Shmoe'}).save();
      var classroom1 = await student.classrooms().create();
      var classroom2 = await student.classrooms().create();

      let query = `{
        viewer(id: ${student.get('id')}) {
          classrooms(id: ${classroom2.get('id')}) {
            id
          }
        }
      }`

      const results = await graphqlWithSchema(query);

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
    it('returns bookshelf belongsToMany associated data', async function () {
      await clean();
      var student = await Student.forge({name: 'Joe Shmoe'}).save();
      var classroom1 = await student.classrooms().create();
      var classroom2 = await student.classrooms().create();
      var student2 = await classroom2.students().create({name: 'Marvin Martian'});

      let query = `{
        viewer(id: ${student.get('id')}) {
          classrooms {
            id
          }
        }
      }`

      const results = await graphqlWithSchema(query);

      expect(results).toEqual({
        data: {
          viewer: {
            classrooms: jasmine.any(Array)
          }
        }
      });
      let { classrooms } = results.data.viewer;

      const stripped = classrooms.map(({id}) => id);
      expect(stripped).toContain(classroom1.get('id'));
      expect(stripped).toContain(classroom2.get('id'));
    });

  });

  describe('with a relay connection type', function() {
    it('returns a connection instead of an array', async function () {
      await clean();
      var student = await Student.forge({name: 'Joe Shmoe'}).save();
      var classroom = await student.classrooms().create();
      var homework1 = await classroom.homeworks().create({content: 'I did it...'});
      var homework2 = await classroom.homeworks().create({content: 'Look!!!'});

      let query = `{
        viewer(id: ${student.get('id')}) {
          classrooms {
            homeworks {
              edges {
                node {
                  content
                }
              }
            }
          }
        }
      }`

      const results = await graphqlWithSchema(query);

      expect(results).toEqual({
        data: {
          viewer: {
            classrooms: [{
              homeworks: {
                edges: jasmine.any(Array)
              }
            }]
          }
        }
      });
      let { edges } = results.data.viewer.classrooms[0].homeworks;
      const stripped = edges.map(({node: {content}}) => content);
      expect(stripped).toContain(homework1.get('content'));
      expect(stripped).toContain(homework2.get('content'));
    });
  });
});
