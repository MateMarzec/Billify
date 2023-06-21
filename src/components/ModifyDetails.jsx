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
  const [modifyData, setModifyData] = useState([]);

  useEffect(() => {
    setModifyData(dataToModify || []);
  }, [dataToModify]);

  // Check if the component is currently being rendered
  if (!isOpen) {
    return null;
  } else {
    // Render the component without any state updates
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
