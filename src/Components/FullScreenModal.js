import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const FullScreenModal = ({ open, onClose, title, children }) => {
  useEffect(() => {
    if (open) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fullscreen-modal">
      <div className="fullscreen-modal-content">
        <div className="fullscreen-modal-header">
        <button onClick={onClose} className="close-button">
            <FaTimes />
          </button>
        </div>
        <div className="fullscreen-modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FullScreenModal;
