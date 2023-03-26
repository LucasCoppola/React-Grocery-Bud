import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

const List = ({ name, handleDelete }) => {
  const [isChecked, setIsChecked] = useState(false);

  const styles = {
    textDecoration: isChecked ? 'line-through' : 'none',
  };

  return (
    <div className="single-item">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      <p style={styles}>{name}</p>
      <button onClick={handleDelete}>
        <FaTrash />
      </button>
    </div>
  );
};

export default List;
