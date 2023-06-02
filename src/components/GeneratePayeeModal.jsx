import { Edit2 } from "feather-icons-react";
import { useState } from "react";

function GeneratePayeeModal({ isOpen, onClose, onSubmit }) {
  const [payeeData, setPayeeData] = useState({
    payToName: "",
    address: {
      addressFirst: "",
      addressSecond: "",
      addressPostCode: "",
      addressCity: "",
      addressCountry: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const addressName = name.split(".")[1];
      setPayeeData((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [addressName]: value,
        },
      }));
    } else {
      setPayeeData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal-dialog">
        <h2>Payee Details</h2>
        <p>Please provide following details</p>
        <form>
          <div>
            <label htmlFor="payeeName">Full Name</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="payeeName"
                name="payToName"
                value={payeeData.payToName}
                onChange={handleInputChange}
                required
              />
              <Edit2 />
            </div>
          </div>
          <div>
            <label htmlFor="firstLine">Address First Line</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="firstLine"
                name="address.addressFirst"
                value={payeeData.address.addressFirst}
                onChange={handleInputChange}
                required
              />
              <Edit2 />
            </div>
          </div>
          <div>
            <label htmlFor="secondLine">Address Second Line</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="secondLine"
                name="address.addressSecond"
                value={payeeData.address.addressSecond}
                onChange={handleInputChange}
              />
              <Edit2 />
            </div>
          </div>
          <div>
            <label htmlFor="postCode">Post Code</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="postCode"
                name="address.addressPostCode"
                value={payeeData.address.addressPostCode}
                onChange={handleInputChange}
                required
              />
              <Edit2 />
            </div>
          </div>
          <div>
            <label htmlFor="city">City</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="city"
                name="address.addressCity"
                value={payeeData.address.addressCity}
                onChange={handleInputChange}
                required
              />
              <Edit2 />
            </div>
          </div>
          <div>
            <label htmlFor="country">Country</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="country"
                name="address.addressCountry"
                value={payeeData.address.addressCountry}
                onChange={handleInputChange}
              />
              <Edit2 />
            </div>
          </div>
          <div className="btn-group">
            <button className="primary" onClick={(e) => onSubmit(e, payeeData)}>
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

export default GeneratePayeeModal;
