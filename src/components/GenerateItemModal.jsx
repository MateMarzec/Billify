import { Edit2 } from "feather-icons-react";
import { useState } from "react";

function GenerateItemModal({ isOpen, onClose, onSubmit }) {
  const [itemData, setItemData] = useState({
    itemName: "",
    itemDescription: "",
    itemPrice: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal-dialog">
        <h2>Item or Service Details</h2>
        <p>Please provide following details</p>
        <form>
          <div>
            <label htmlFor="itemName">Item Name</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="itemName"
                name="itemName"
                value={itemData.payToName}
                onChange={handleInputChange}
                required
              />
              <Edit2 />
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
              <Edit2 />
            </div>
          </div>
          <div>
            <label htmlFor="itemPrice">Item Price</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="itemPrice"
                name="itemPrice"
                value={itemData.itemPrice}
                onChange={handleInputChange}
              />
              <Edit2 />
            </div>
          </div>
          <div className="btn-group">
            <button className="primary" onClick={(e) => onSubmit(e, itemData)}>
              Submit Dialog
            </button>
            <button className="secondary" onClick={(e) => onClose(e)}>
              Close Dialog
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default GenerateItemModal;