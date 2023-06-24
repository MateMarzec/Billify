//Libraries
import { useState, useEffect } from "react";
import { X } from "feather-icons-react/build/IconComponents";

//Styles
import classes from "./ModifyDetails.module.css";

function ModifyDetails({
  isOpen,
  onClose,
  dataToModify,
  onRemove,
  onQuantityUpdate,
}) {
  //State for the form inputs
  const [modifyData, setModifyData] = useState([]);

  //Listen to changes in dataToModify
  useEffect(() => {
    setModifyData(dataToModify || []);
  }, [dataToModify]);

  //If form is open, render the form
  if (!isOpen) {
    return null;
  } else {
    return (
      <div className={classes.modifyData}>
        <div className="modal-backdrop" onClick={onClose}></div>
        <div className="modal-dialog">
          <h2>Modify {modifyData.length > 0 ? modifyData[0] : ""} Details</h2>
          {modifyData.length > 1 && (
            <>
              {Object.entries(modifyData[1]).map(([key, obj]) => (
                <div key={key} className={classes.modifyContainer}>
                  <div>
                    <p>{obj.label}</p>
                    {dataToModify[0] === "Items" && (
                      <input
                        className={classes.input}
                        type="number"
                        name={obj.label}
                        onChange={(e) =>
                          onQuantityUpdate(obj.label, e.target.value)
                        }
                      />
                    )}
                  </div>
                  <span onClick={() => onRemove(modifyData[0], obj.label)}>
                    <X />
                  </span>
                </div>
              ))}
            </>
          )}
          <button className="btn primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }
}

export default ModifyDetails;
