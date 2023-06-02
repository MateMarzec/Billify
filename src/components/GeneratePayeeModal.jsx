import { Edit2 } from "feather-icons-react";
import { useState } from "react";

function GeneratePayeeModal({ isOpen, onClose, onSubmit }) {
  const [payeeData, setPayeeData] = useState({
    payToName: "",
    addressFirst: "",
    addressSecond: "",
    addressPostCode: "",
    addressCity: "",
    addressCountry: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPayeeData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (!isOpen) {
    return null;
  }

  return (
    <dialog open>
      <div>
        <h2>Dialog Title</h2>
        <p>Dialog content goes here.</p>
        <form>
          <div>
            <label htmlFor="title1">Title</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="title1"
                name="payToName"
                value={payeeData.payToName}
                onChange={handleInputChange}
              />
              <Edit2 />
            </div>
          </div>
          <div>
            <label htmlFor="title2">Title</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="title2"
                name="addressFirst"
                value={payeeData.addressFirst}
                onChange={handleInputChange}
              />
              <Edit2 />
            </div>
          </div>
          <div>
            <label htmlFor="title3">Title</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="title3"
                name="addressSecond"
                value={payeeData.addressSecond}
                onChange={handleInputChange}
              />
              <Edit2 />
            </div>
          </div>
          <div>
            <label htmlFor="title4">Title</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="title4"
                name="addressPostCode"
                value={payeeData.addressPostCode}
                onChange={handleInputChange}
              />
              <Edit2 />
            </div>
          </div>
          <div>
            <label htmlFor="title5">Title</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="title5"
                name="addressCity"
                value={payeeData.addressCity}
                onChange={handleInputChange}
              />
              <Edit2 />
            </div>
          </div>
          <div>
            <label htmlFor="title5">Title</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="title5"
                name="addressCountry"
                value={payeeData.addressCountry}
                onChange={handleInputChange}
              />
              <Edit2 />
            </div>
          </div>
          <button onClick={(e) => onSubmit(e, payeeData)}>Submit Dialog</button>
          <button onClick={(e) => onClose(e)}>Close Dialog</button>
        </form>
      </div>
    </dialog>
  );
}

export default GeneratePayeeModal;
