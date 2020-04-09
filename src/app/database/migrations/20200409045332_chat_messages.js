exports.up = knex => {
  return knex.schema.createTable('chat_messages', table => {
    table.increments('id');
    table
      .integer('user_id')
      .unsigned()
      .notNullable();
    table.string('text', 255).notNullable();
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = knex => {
  return knex.schema.dropTable('chat_messages');
};

exports.config = { transaction: false };
