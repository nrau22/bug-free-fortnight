import React, { useState, useEffect } from 'react';
import './Tasks.css'; // <-- import the new CSS

function Tasks({ onBack }) {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => {
        setTasks(data);
        setLoading(false);
      });
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: input })
    });
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
    setInput('');
  };

  const deleteTask = async (id) => {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(task => task.id !== id));
  };

  if (loading) return <div>Loading tasks...</div>;

  return (
    <div className="tasks-container">
      <button className="open-notepad-btn" onClick={onBack}>Back</button>
      <h2 className="tasks-title">📝 Tasks</h2>

      <form className="tasks-form" onSubmit={addTask}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add task..."
          className="tasks-input"
        />
        <button className="tasks-add-btn" type="submit">Add</button>
      </form>

      {tasks.length === 0 ? (
        <div className="task-list-placeholder">
          <p>Task list will appear here.</p>
        </div>
      ) : (
        <ul className="tasks-items">
          {tasks.map(task => (
            <li key={task.id} className="task-item">
              <span>{task.title}</span>
              <button onClick={() => deleteTask(task.id)}>✕</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Tasks;
