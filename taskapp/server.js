const express = require('express');
const knex = require('knex');
const path = require('path');

// Setup SQLite connection
const db = knex({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, 'data', 'tasks.db')
  },
  useNullAsDefault: true
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure tables exist
async function ensureTables() {
  if (!(await db.schema.hasTable('tasks'))) {
    await db.schema.createTable('tasks', (table) => {
      table.increments('id').primary();
      table.string('title');
      table.boolean('completed').defaultTo(false);
    });
    console.log('Created table: tasks');
  }
  if (!(await db.schema.hasTable('shopping_items'))) {
    await db.schema.createTable('shopping_items', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.boolean('checked').defaultTo(false);
    });
    console.log('Created table: shopping_items');
  }
}

// --- TASKS ENDPOINTS ---

// Get all tasks
app.get('/api/tasks', async (req, res) => {
  const tasks = await db('tasks').select();
  res.json(tasks);
});

// Add a new task
app.post('/api/tasks', async (req, res) => {
  const { title, completed = false } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });
  const [id] = await db('tasks').insert({ title, completed });
  const newTask = await db('tasks').where({ id }).first();
  res.status(201).json(newTask);
});

// Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await db('tasks').where({ id }).del();
  if (deleted) {
    res.json({ id: Number(id) });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// --- SHOPPING LIST ENDPOINTS ---

// Get all shopping items
app.get('/api/shopping_items', async (req, res) => {
  const items = await db('shopping_items').select();
  res.json(items);
});

// Add a shopping item
app.post('/api/shopping_items', async (req, res) => {
  const { name, checked = false } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });
  const [id] = await db('shopping_items').insert({ name, checked });
  const newItem = await db('shopping_items').where({ id }).first();
  res.status(201).json(newItem);
});

// Update a shopping item (check/uncheck)
app.patch('/api/shopping_items/:id', async (req, res) => {
  const { id } = req.params;
  const { checked } = req.body;
  await db('shopping_items').where({ id }).update({ checked });
  const updated = await db('shopping_items').where({ id }).first();
  res.json(updated);
});

// Delete a shopping item
app.delete('/api/shopping_items/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await db('shopping_items').where({ id }).del();
  if (deleted) {
    res.json({ id: Number(id) });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// --- START SERVER ---
ensureTables().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'dist'))); // Adjust path if your React project is elsewhere

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  });
}