import { Globe, Home, User, X } from "feather-icons-react/build/IconComponents";
import { useState, useEffect } from "react";

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
      <>
        <div className="modal-backdrop" onClick={onClose}></div>
        <div className="modal-dialog">
          <h2>Modify {modifyData.length > 0 ? modifyData[0] : ""} Details</h2>
          {modifyData.length > 1 && (
            <>
              {Object.entries(modifyData[1]).map(([key, obj]) => (
                <div key={key}>
                  <p>{obj.label}</p>
                  {dataToModify[0] === "Items" && (
                    <input
                    type="number"
                    name={obj.label}
                    onChange={(e) => onQuantityUpdate(obj.label, e.target.value)}
                    />
                  )}
                  <span onClick={() => onRemove(modifyData[0], obj.label)}>
                    <X />
                  </span>
                </div>
              ))}
            </>
          )}
        </div>
      </>
    );
  }
}

export default ModifyDetails;
