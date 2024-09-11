import React from "react";
import "./GroupModal.css";

const GroupModal = ({ title, message, onClose }) => {
  return (
    <div className="group-modal-overlay">
      <div className="group-modal-container">
        <h2 className="group-modal-title">{title}</h2>
        <p className="group-modal-message">{message}</p>
        <button className="group-modal-button" onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
};

export default GroupModal;
