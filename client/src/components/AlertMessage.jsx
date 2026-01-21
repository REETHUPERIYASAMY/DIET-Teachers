import React from 'react';
import { Alert } from 'react-bootstrap';

const AlertMessage = ({ show, message, variant, onClose }) => {
  return (
    <div className="alert-container">
      <Alert show={show} variant={variant} onClose={onClose} dismissible>
        {message}
      </Alert>
    </div>
  );
};

export default AlertMessage;