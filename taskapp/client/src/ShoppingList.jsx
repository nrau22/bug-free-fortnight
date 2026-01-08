import React, { useEffect, useState } from 'react';
import './ShoppingList.css'; // <-- import the new CSS

function ShoppingList({ onBack }) {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/shopping_items');
      if (!res.ok) throw new Error('Failed to fetch items');
      const data = await res.json();
      setItems(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to load items');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const res = await fetch('/api/shopping_items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: input })
      });
      if (!res.ok) throw new Error('Failed to add item');
      const newItem = await res.json();
      setItems([...items, newItem]);
      setInput('');
    } catch (err) {
      console.error(err);
      setError('Failed to add item');
    }
  };

  const toggleChecked = async (id, checked) => {
    try {
      const res = await fetch(`/api/shopping_items/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ checked: !checked })
      });
      if (!res.ok) throw new Error('Failed to update item');
      const updated = await res.json();
      setItems(items.map(item => item.id === id ? updated : item));
    } catch (err) {
      console.error(err);
      setError('Failed to update item');
    }
  };

  const deleteItem = async (id) => {
    try {
      const res = await fetch(`/api/shopping_items/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete item');
      setItems(items.filter(item => item.id !== id));
    } catch (err) {
      console.error(err);
      setError('Failed to delete item');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="shopping-list-container">
      <button className="open-notepad-btn" onClick={onBack}>Back</button>
      <h2 className="shopping-list-title">🛒 Shopping List</h2>

      <form className="shopping-list-form" onSubmit={addItem}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add item..."
          className="shopping-list-input"
        />
        <button className="shopping-list-add-btn" type="submit">Add</button>
      </form>

      {error && <div className="shopping-list-error">{error}</div>}

      <ul className="shopping-list-items">
        {items.map(item => (
          <li
            key={item.id}
            className={`shopping-list-item ${item.checked ? 'checked' : ''}`}
          >
            <input
              type="checkbox"
              checked={!!item.checked}
              onChange={() => toggleChecked(item.id, item.checked)}
              className="shopping-list-checkbox"
            />
            <span>{item.name}</span>
            <button onClick={() => deleteItem(item.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
