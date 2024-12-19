import React from 'react';
import PropTypes from 'prop-types';

const PopUp = ({ visible = false, onClose = () => {}, title = '', facts = [] }) => {
  if (!visible) return null;

  console.log('PopUp Props:', { title, facts }); // Log the props received by PopUp

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

PopUp.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  facts: PropTypes.arrayOf(PropTypes.string),
};

export default PopUp;
