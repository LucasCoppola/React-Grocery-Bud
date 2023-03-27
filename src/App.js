import React, { useState, useEffect, useRef } from 'react';
import List from './List';
import Alert from './Alert';
import { nanoid } from 'nanoid';

function App() {
  const [item, setItem] = useState({ name: '', id: nanoid() });
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('list')) || []
  );
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(items));
  }, [items]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!item.name) {
      showAlert(true, 'danger', 'please enter value');
    } else {
      const newItem = { ...item, id: nanoid() };
      setItems([...items, newItem]);
      setItem({ name: '', id: nanoid() });
      inputRef.current.focus();
      showAlert(true, 'success', 'item added to the list');
    }
  };

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

  const deleteItem = (id) => {
    const filteredItems = items.filter((item) => item.id !== id);
    setItems(filteredItems);
    inputRef.current.focus();
    showAlert(true, 'danger', 'item removed');
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
      {alert.show && <Alert {...alert} removeAlert={showAlert} items={items} />}
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
