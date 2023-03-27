import React, { useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

const Alert = ({ type, msg, removeAlert, items }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [items]);

  return (
    <div className={`alert alert-${type}`}>
      <span>
        {type === 'success' ? (
          <FaCheck className="check" />
        ) : (
          <AiOutlineExclamationCircle className="exclamation" />
        )}
      </span>
      <h3>{msg}</h3>
    </div>
  );
};
export default Alert;
