const db = require('./knex');

async function init() {
  // Tasks table
  const tasksExists = await db.schema.hasTable('tasks');
  if (!tasksExists) {
    await db.schema.createTable('tasks', (table) => {
      table.increments('id').primary();
      table.string('title');
      table.boolean('completed').defaultTo(false);
    });
    console.log('Tasks table created.');
  } else {
    console.log('Tasks table already exists.');
  }

  // Shopping list table
  const shoppingExists = await db.schema.hasTable('shopping_items');
  if (!shoppingExists) {
    await db.schema.createTable('shopping_items', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.boolean('checked').defaultTo(false);
    });
    console.log('Shopping items table created.');
  } else {
    console.log('Shopping items table already exists.');
  }

  process.exit();
}

init();