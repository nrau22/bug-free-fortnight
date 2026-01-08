import React, { useState, useEffect } from 'react';
import './App.css';
import ShoppingList from './ShoppingList';
import Tasks from './Tasks';

function HomeScreen({ onOpenShoppingList, onOpenTasks }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => {
        setTasks(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="home-screen">
      <h1 className="home-title">Welcome</h1>
      <div className="task-list-placeholder">
        <span className="task-list-icon">📝</span>
        {loading ? (
          <p>Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p>Task list will appear here.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {tasks.slice(0, 3).map(task => (
              <li key={task.id} style={{ marginBottom: 4, textAlign: 'left' }}>
                {task.title}
              </li>
            ))}
          </ul>
        )}
        <button className="open-notepad-btn" onClick={onOpenTasks} style={{ marginTop: 8 }}>
          View All Tasks
        </button>
      </div>
      <div className="shopping-list-section">
        <h2 className="shopping-list-title">🛒 Shopping List</h2>
        <button className="open-notepad-btn" onClick={onOpenShoppingList}>
          Open Shopping List
        </button>
      </div>
    </div>
  );
}

function App() {
  const [screen, setScreen] = useState('home');

  return (
    <>
      {screen === 'home' && (
        <HomeScreen
          onOpenShoppingList={() => setScreen('shopping')}
          onOpenTasks={() => setScreen('tasks')}
        />
      )}
      {screen === 'shopping' && (
        <ShoppingList onBack={() => setScreen('home')} />
      )}
      {screen === 'tasks' && (
        <Tasks onBack={() => setScreen('home')} />
      )}
    </>
  );
}

export default App;
