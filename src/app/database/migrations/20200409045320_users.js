exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id');
    table.string('username', 255).notNullable();
    table
      .string('email', 255)
      .notNullable()
      .unique();
    table.string('password', 255).notNullable();
    table
      .string('token', 255)
      .notNullable()
      .unique();
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp('updated_at')
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};

exports.config = { transaction: false };
