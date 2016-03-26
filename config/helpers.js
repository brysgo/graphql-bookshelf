export function clean() {
  return [
    'students',
    'classrooms',
    'classrooms_students',
    'homeworks',
    'subjects'
  ].reduce((promise, table) =>
    promise.then(knex(table).delete('*'))
  , Promise.resolve());
}