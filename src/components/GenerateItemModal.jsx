import React, { useState } from "react";
import { DollarSign, Hash } from "feather-icons-react/build/IconComponents";

function GenerateItemModal({ isOpen, onClose, onSubmit }) {
  const initialItemData = {
    itemName: "",
    itemDescription: "",
    itemPrice: "",
    itemQuantity: 1,
  };

  const [itemData, setItemData] = useState(initialItemData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e, itemData);
    setItemData(initialItemData); // Reset the form inputs
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal-dialog">
        <h2>Item or Service Details</h2>
        <p>Please provide the following details:</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="itemName">
              Item Name<span className="required">*Required</span>
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                id="itemName"
                name="itemName"
                value={itemData.itemName}
                onChange={handleInputChange}
                required
              />
              <Hash />
            </div>
          </div>
          <div>
            <label htmlFor="itemDescription">Item Description</label>
            <div className="input-wrapper">
              <textarea
                type="text"
                id="itemDescription"
                name="itemDescription"
                value={itemData.itemDescription}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
          </div>
          <div>
            <label htmlFor="itemPrice">
              Item Price<span className="required">*Required</span>
            </label>
            <div className="input-wrapper">
              <input
                type="number"
                id="itemPrice"
                name="itemPrice"
                value={itemData.itemPrice}
                onChange={handleInputChange}
              />
              <DollarSign />
            </div>
          </div>
          <div className="btn-group">
            <button className="primary" type="submit">
              Submit Dialog
            </button>
            <button className="secondary" onClick={onClose}>
              Close Dialog
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default GenerateItemModal;
