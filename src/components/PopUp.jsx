import React from 'react';

const PopUp = ({ visible, onClose, title, facts }) => {
  if (!visible) return null;

  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{title}</h2>
        <ul>
          {facts.map((fact, index) => (
            <li key={index}>{fact}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PopUp;
