import React from "react";

function GeneratePayerModal({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <dialog open>
      <div>
        <h2>Dialog Title</h2>
        <p>Dialog content goes here.</p>
        <button onClick={onClose}>Close Dialog</button>
      </div>
    </dialog>
  );
}

export default GeneratePayerModal;
