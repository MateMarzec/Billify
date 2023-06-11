import { Edit2 } from "feather-icons-react";
import { Globe, Home, User } from "feather-icons-react/build/IconComponents";
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
            <label htmlFor="payeeName">Full Name<span>*Required</span></label>
            <div className="input-wrapper">
              <input
                type="text"
                id="payeeName"
                name="payToName"
                value={payeeData.payToName}
                onChange={handleInputChange}
                required
              />
              <User />
            </div>
          </div>
          <div>
            <label htmlFor="firstLine">Address First Line<span>*Required</span></label>
            <div className="input-wrapper">
              <input
                type="text"
                id="firstLine"
                name="address.addressFirst"
                value={payeeData.address.addressFirst}
                onChange={handleInputChange}
                required
              />
              <Home />
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
              <Home />
            </div>
          </div>
          <div>
            <label htmlFor="postCode">Post Code<span>*Required</span></label>
            <div className="input-wrapper">
              <input
                type="text"
                id="postCode"
                name="address.addressPostCode"
                value={payeeData.address.addressPostCode}
                onChange={handleInputChange}
                required
              />
              <Home />
            </div>
          </div>
          <div>
            <label htmlFor="city">City<span>*Required</span></label>
            <div className="input-wrapper">
              <input
                type="text"
                id="city"
                name="address.addressCity"
                value={payeeData.address.addressCity}
                onChange={handleInputChange}
                required
              />
              <Home />
            </div>
          </div>
          <div>
            <label htmlFor="country">Country<span>*Required</span></label>
            <div className="input-wrapper">
              <input
                type="text"
                id="country"
                name="address.addressCountry"
                value={payeeData.address.addressCountry}
                onChange={handleInputChange}
                required
              />
              <Globe />
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
