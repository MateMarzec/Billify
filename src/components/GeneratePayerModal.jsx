import { Edit2 } from "feather-icons-react";
import { useState } from "react";

function GeneratePayerModal({ isOpen, onClose, onSubmit }) {
  const [payerData, setPayerData] = useState({
    billToName: "",
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
      setPayerData((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [addressName]: value,
        },
      }));
    } else {
      setPayerData((prevState) => ({
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
        <h2>payer Details</h2>
        <p>Please provide following details</p>
        <form>
          <div>
            <label htmlFor="payerName">Full Name</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="payerName"
                name="billToName"
                value={payerData.payToName}
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
                value={payerData.address.addressFirst}
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
                value={payerData.address.addressSecond}
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
                value={payerData.address.addressPostCode}
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
                value={payerData.address.addressCity}
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
                value={payerData.address.addressCountry}
                onChange={handleInputChange}
              />
              <Edit2 />
            </div>
          </div>
          <div className="btn-group">
            <button className="primary" onClick={(e) => onSubmit(e, payerData)}>
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

export default GeneratePayerModal;