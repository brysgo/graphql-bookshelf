
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function (table) {
    table.increments('id');
    table.string('name');
    table.timestamps();
  }).createTable('subjects', function (table) {
    table.increments('id');
    table.string('title').unique().index();
    table.string('description');
    table.timestamps();
  }).createTable('classrooms', function (table) {
    table.increments('id');
    table.integer('subject_id').references('id').inTable('subjects');
    table.timestamps();
  }).createTable('classrooms_students', function (table) {
    table.increments('id');
    table.integer('classroom_id').references('id').inTable('classrooms');
    table.integer('student_id').references('id').inTable('students');
    table.timestamps();
  }).createTable('homeworks', function (table) {
    table.increments('id');
    table.string('content');
    table.integer('classroom_id').references('id').inTable('classrooms');
    table.integer('student_id').references('id').inTable('students');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('homeworks')
    .dropTable('classrooms_students')
    .dropTable('classrooms')
    .dropTable('subjects')
    .dropTable('students');
};
