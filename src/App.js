import React, { useState, useEffect, useRef } from 'react';
import List from './List';
import Alert from './Alert';
import { nanoid } from 'nanoid';

function App() {
  const [item, setItem] = useState({ name: '', id: nanoid() });
  const [items, setItems] = useState([]);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!item) {
      console.log('no item');
    } else {
      const newItem = { ...item, id: nanoid() };
      setItems([...items, newItem]);
      setItem({ name: '', id: nanoid() });
      inputRef.current.focus();
    }
  };

  const deleteItem = (id) => {
    const filteredItems = items.filter((item) => item.id !== id);
    setItems(filteredItems);
    inputRef.current.focus();
  };

  const renderItems = items.map((item) => {
    return (
      <List
        key={item.id}
        name={item.name}
        handleDelete={() => deleteItem(item.id)}
      />
    );
  });

  return (
    <section>
      <h1>Grocery Bud</h1>
      <form>
        <input
          type="text"
          className="form-input"
          name="item"
          onChange={(e) => setItem({ ...item, name: e.target.value })}
          value={item.name}
          ref={inputRef}
        />
        <button className="form-btn" onClick={handleSubmit}>
          Add Item
        </button>
      </form>
      <div className="items">{renderItems}</div>
    </section>
  );
}

export default App;
