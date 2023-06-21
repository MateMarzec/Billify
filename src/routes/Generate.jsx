//Libraries
import { useState, useEffect } from "react";
import classNames from "classnames";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { motion } from "framer-motion";
import {
  Calendar,
  Download,
  Edit2,
  Eye,
  Minus,
  Plus,
  X,
} from "feather-icons-react/build/IconComponents";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

//Components
import GenerateItemModal from "../components/GenerateItemModal";
import GeneratePayeeModal from "../components/GeneratePayeeModal";
import GeneratePayerModal from "../components/GeneratePayerModal";
import ModifyDetails from "../components/ModifyDetails";

//Styles
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import classes from "./Generate.module.css";

//Assets
import InterRegular from "../assets/fonts/Inter-Regular.ttf";
import InterMedium from "../assets/fonts/Inter-Bold.ttf";

function Generate() {
  // States
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const currency = [
    { value: "$", label: "British Pounds (GBP)" },
    { value: "PLN", label: "Polish Zloty (PLN)" },
    { value: "£", label: "US Dollars (USD)" },
  ];

  const [formData, setFormData] = useState({
    title: "",
    date: formattedDate,
    dueDate: "",
    payToName: "",
    payToAddress: {},
    billToName: "",
    billToAddress: {},
    items: [],
    currency: "£",
    notes: "",
    totalAmount: 0,
  });
  const [dueDateEnabled, setDueDateEnabled] = useState(false);
  const [formDate, setFormDate] = useState(today);
  const [dueDate, setDueDate] = useState(null);
  const [isPayeeOpen, setIsPayeeOpen] = useState(false);
  const [isPayerOpen, setIsPayerOpen] = useState(false);
  const [isItemOpen, setItemOpen] = useState(false);
  const [isModifyOpen, setModifyOpen] = useState(false);
  const [payees, setPayees] = useState([]);
  const [payers, setPayers] = useState([]);
  const [items, setItems] = useState([]);
  const [dataToModify, setDataToModify] = useState();
  const [isPreviewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    let savedPayees = [];
    let savedPayers = [];
    let savedItems = [];

    if (Cookies.get("myPayees")) {
      savedPayees = JSON.parse(Cookies.get("myPayees"));
    }
    if (Cookies.get("myPayers")) {
      savedPayers = JSON.parse(Cookies.get("myPayers"));
    }
    if (Cookies.get("myItems")) {
      savedItems = JSON.parse(Cookies.get("myItems"));
    }

    setPayees(savedPayees);
    setPayers(savedPayers);
    setItems(savedItems);
  }, []);

  useEffect(() => {
    // Calculate the total amount when the items array or item prices change
    const calculateTotalAmount = () => {
      const totalPrice = formData.items.reduce((total, item) => {
        return total + Number(item.itemPrice);
      }, 0);

      setFormData((prevFormData) => ({
        ...prevFormData,
        totalAmount: totalPrice,
      }));
    };

    calculateTotalAmount(); // Initial calculation

    // Add event listener to items array and item prices
    const unsubscribe = formData.items.map((item) => {
      return () => {
        // No specific listener, just trigger calculation on item changes
        calculateTotalAmount();
      };
    });

    return () => {
      // Clean up the event listener when component unmounts
      unsubscribe.forEach((unsubscribeFn) => {
        unsubscribeFn();
      });
    };
  }, [formData.items]);

  useEffect(() => {}, [formData.items]);

  // Actions
  const openPayeeDialog = (e) => {
    e.preventDefault();
    setIsPayeeOpen(true);
  };

  const openPayerDialog = (e) => {
    e.preventDefault();
    setIsPayerOpen(true);
  };

  const openItemDialog = (e) => {
    e.preventDefault();
    setItemOpen(true);
  };

  const openModifyDetails = (e, dataType) => {
    e.preventDefault();

    if (dataType === "Payees") {
      setDataToModify(["Payees", [...payees]]);
    } else if (dataType === "Payers") {
      setDataToModify(["Payers", [...payers]]);
    } else if (dataType === "Items") {
      setDataToModify(["Items", [...items]]);
    }

    setModifyOpen(true);
  };

  const closeDialog = (e) => {
    e.preventDefault();
    setIsPayeeOpen(false);
    setIsPayerOpen(false);
    setItemOpen(false);
    setModifyOpen(false);
  };

  // Handlers
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date) => {
    setFormDate(date);
    setFormData({
      ...formData,
      date: date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    });
  };

  const handleDueDateChange = (date) => {
    setDueDate(date);
    setFormData({
      ...formData,
      dueDate: date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    });
  };

  const handleCheckboxChange = () => {
    if (dueDateEnabled) {
      setDueDate(null);
      setFormData({
        ...formData,
        dueDate: "",
      });
    } else {
      setDueDate(today);
      setFormData({
        ...formData,
        dueDate: today.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      });
    }
    setDueDateEnabled(!dueDateEnabled);
  };

  const handleSubmitPayeeDialog = (e, payeeData) => {
    e.preventDefault();
    if (
      !payeeData.payToName ||
      !payeeData.address.addressFirst ||
      !payeeData.address.addressCity ||
      !payeeData.address.addressPostCode ||
      !payeeData.address.addressCountry
    ) {
      toast.error("Please fill out all required inputs.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      const isExistingPayee = payees.some(
        (payee) => payee.label === payeeData.payToName
      );
      if (isExistingPayee) {
        toast.error("There is already existing payee with the same name.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        const newPayee = {
          value: payeeData,
          label: payeeData.payToName,
        };
        setPayees([...payees, newPayee]);
        setIsPayeeOpen(false);
        updateCookies("myPayees", [...payees, newPayee]);
      }
    }
  };

  const handleSubmitPayerDialog = (e, payerData) => {
    e.preventDefault();
    if (
      !payerData.billToName ||
      !payerData.address.addressFirst ||
      !payerData.address.addressCity ||
      !payerData.address.addressPostCode ||
      !payerData.address.addressCountry
    ) {
      toast.error("Please fill out all required inputs.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      const isExistingPayer = payers.some(
        (payer) => payer.label === payerData.billToName
      );
      if (isExistingPayer) {
        toast.error("There is already existing payer with the same name.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        const newPayer = {
          value: payerData,
          label: payerData.billToName,
        };
        setPayers([...payers, newPayer]);
        setIsPayerOpen(false);
        updateCookies("myPayers", [...payers, newPayer]);
      }
    }
  };

  const handleSubmitItemDialog = (e, itemData) => {
    e.preventDefault();
    if (!itemData.itemName || !itemData.itemPrice) {
      toast.error("Please fill out all required inputs.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      const isExistingItem = items.some(
        (item) => item.label === itemData.itemName
      );
      if (isExistingItem) {
        toast.error("There is already existing item with the same name.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        const newItem = {
          value: itemData,
          label: itemData.itemName,
        };
        setItems([...items, newItem]);
        setItemOpen(false);
        updateCookies("myItems", [...items, newItem]);
      }
    }
  };

  const handleItemsRemove = (dataType, dataToRemove) => {
    if (dataType === "Payees") {
      const updatedData = payees.filter((item) => item.label !== dataToRemove);
      setPayees([...updatedData]);
      updateCookies("myPayees", [...updatedData]);
    } else if (dataType === "Payers") {
      const updatedData = payers.filter((item) => item.label !== dataToRemove);
      setPayers([...updatedData]);
      updateCookies("myPayers", [...updatedData]);
    } else if (dataType === "Items") {
      const updatedData = items.filter((item) => item.label !== dataToRemove);
      setItems([...updatedData]);
      updateCookies("myItems", [...updatedData]);
    }
    setModifyOpen(false);
  };

  const handleQuantityUpdate = (itemLabel, newQuantity) => {
    setFormData((prevFormData) => {
      const updatedData = prevFormData.items.map((item) => {
        if (item.itemName === itemLabel) {
          return { ...item, itemQuantity: newQuantity };
        }
        return item;
      });

      return {
        ...prevFormData,
        items: updatedData,
      };
    });
  };

  const updateCookies = (type, data) => {
    Cookies.set(type, JSON.stringify(data));
  };

  const handlePayeeSelectChange = (e) => {
    setFormData({
      ...formData,
      payToName: e.value.payToName,
      payToAddress: e.value.address,
    });
  };

  const handlePayerSelectChange = (e) => {
    setFormData({
      ...formData,
      billToName: e.value.billToName,
      billToAddress: e.value.address,
    });
  };

  const handleItemsSelectChange = (e) => {
    const selectedItems = e.map((item) => item.value);
    setFormData({
      ...formData,
      items: selectedItems,
    });
  };

  const handleCurrencySelectChange = (e) => {
    setFormData({
      ...formData,
      currency: e.value,
    });
  };

  const handleOpenPreview = () => {
    setPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setPreviewOpen(false);
  };

  // Register font
  Font.register({ family: "Inter", src: InterRegular });
  Font.register({ family: "Inter-600", src: InterMedium });

  //Render
  const renderPdf = () => (
    <Document>
      <Page
        wrap
        style={{ padding: 16, display: "flex", flexDirection: "column" }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <Text style={styles.title}>{formData.title}</Text>
          <Text style={styles.date}>{formData.date}</Text>
        </View>
        <View
          style={{ display: "flex", flexDirection: "column", marginBottom: 24 }}
        >
          <Text style={styles.heading}>Invoice From:</Text>
          <Text style={styles.text}>{formData.payToName}</Text>
          {Object.entries(formData.payToAddress).map(([key, obj]) => (
            <Text style={styles.text} key={key}>
              {obj}
            </Text>
          ))}
        </View>
        <View
          style={{ display: "flex", flexDirection: "column", marginBottom: 24 }}
        >
          <Text style={styles.heading}>Bill To:</Text>
          <Text style={styles.text}>{formData.billToName}</Text>
          {Object.entries(formData.billToAddress).map(([key, obj]) => (
            <Text key={key} style={styles.text}>
              {obj}
            </Text>
          ))}
          {formData.dueDate && (
            <Text style={styles.date}>Due: {formData.dueDate}</Text>
          )}
        </View>
        <View
          style={{ display: "flex", flexDirection: "column", marginBottom: 24 }}
        >
          <Text style={styles.heading}>Items:</Text>
          <View>
            <View style={styles.row}>
              <Text style={styles.columnFirst}>Name</Text>
              <Text style={styles.columnFirst}>Description</Text>
              <Text style={styles.columnFirstLast}>Price</Text>
              <Text style={styles.columnFirstLast}>Quantity</Text>
              <Text style={styles.columnFirstLast}>Total Price</Text>
            </View>
            {Object.values(formData.items).map((item, index) => (
              <View key={index} style={styles.row}>
                <Text style={styles.column}>{item.itemName}</Text>
                <Text style={styles.column}>{item.itemDescription}</Text>
                {formData.currency === "£" ? (
                  <Text style={styles.columnLast}>
                    {formData.currency}
                    {item.itemPrice}
                  </Text>
                ) : (
                  <Text style={styles.columnLast}>
                    {item.itemPrice}
                    {formData.currency}
                  </Text>
                )}
                <Text style={styles.columnLast}>{item.itemQuantity}</Text>
                {formData.currency === "£" ? (
                  <Text style={styles.columnLast}>
                    {formData.currency}
                    {item.itemPrice * item.itemQuantity}
                  </Text>
                ) : (
                  <Text style={styles.columnLast}>
                    {item.itemPrice * item.itemQuantity}
                    {formData.currency}
                  </Text>
                )}
              </View>
            ))}
            {formData.totalAmount > 0 && (
              <View style={styles.row}>
                <Text style={styles.columnFirst}></Text>
                <Text style={styles.columnFirst}></Text>
                <Text style={styles.columnFirst}></Text>
                <Text style={styles.columnFirstLast}>Total Amount</Text>
                {formData.currency === "£" && (
                  <Text style={styles.columnFirstLastSum}>
                    {formData.currency}
                    {formData.totalAmount}
                  </Text>
                )}
                {formData.currency !== "£" && (
                  <Text style={styles.columnFirstLastSum}>
                    {formData.totalAmount}
                    {formData.currency}
                  </Text>
                )}
              </View>
            )}
          </View>
        </View>
        <View style={{ display: "flex", flexDirection: "column" }}>
          {formData.notes && <Text style={styles.heading}>Notes:</Text>}
          <Text style={styles.text}>{formData.notes}</Text>
        </View>
      </Page>
    </Document>
  );

  const styles = StyleSheet.create({
    title: {
      fontFamily: "Inter-600",
      fontSize: 30,
      lineHeight: 1.2,
    },
    heading: {
      fontFamily: "Inter-600",
      fontSize: 20,
      lineHeight: 1.4,
      marginBottom: 2,
    },
    date: {
      fontFamily: "Inter",
      fontSize: 12,
      color: "#000000a3",
      marginBottom: 1,
      lineHeight: 1.4,
    },
    text: {
      fontFamily: "Inter",
      fontSize: 12,
      color: "#000000a3",
      marginBottom: 1,
      lineHeight: 1.4,
    },
    row: {
      display: "flex",
      flexDirection: "row",
      gap: 4,
      marginBottom: 6,
    },
    column: {
      flex: 1,
      fontFamily: "Inter",
      fontSize: 12,
      color: "#000000a3",
      lineHeight: 1.4,
    },
    columnFirst: {
      flex: 1,
      fontFamily: "Inter",
      fontSize: 12,
      color: "#000000",
      lineHeight: 1.4,
    },
    columnFirstLast: {
      flex: 1,
      fontFamily: "Inter",
      fontSize: 12,
      color: "#000000",
      textAlign: "right",
      lineHeight: 1.4,
    },
    columnFirstLastSum: {
      flex: 1,
      fontFamily: "Inter",
      fontSize: 12,
      color: "#000000a3",
      textAlign: "right",
      lineHeight: 1.4,
    },
    columnLast: {
      flex: 1,
      fontFamily: "Inter",
      fontSize: 12,
      color: "#000000a3",
      textAlign: "right",
      lineHeight: 1.4,
    },
  });

  const validateForm = () => {
    toast.error(
      "Please fill-out the form and provide all necessary information.",
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      }
    );
  };

  return (
    <main className={classes.generateWrapper}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
          duration: 0.3,
          delay: 0.1,
        }}
        className={classes.container}
      >
        <section className={classes.leftSide}>
          <div className={classes.content}>
            <h1>Create invoice at lighting speed</h1>
            <p>Fill out the form and generate the invoice in seconds.</p>
            <form>
              <div>
                <label htmlFor="title">
                  Invoice Title<span className="required">*Required</span>
                </label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter Invoice Title"
                    maxLength={30}
                  />
                  <Edit2 />
                </div>
              </div>

              <div className={classes.datePicker}>
                <label htmlFor="date">Date</label>
                <div className="input-wrapper">
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={formDate}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    todayButton="Today"
                    onChange={(date) => handleDateChange(date)}
                    onFocus={(e) => (e.target.readOnly = true)}
                  />
                  <Calendar />
                </div>
              </div>

              <div className={classes.datePicker}>
                <label htmlFor="dueDate">Due Date</label>
                <input
                  type="checkbox"
                  checked={dueDateEnabled}
                  onChange={handleCheckboxChange}
                />
                <div className="input-wrapper">
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={dueDate}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    minDate={today}
                    todayButton="Today"
                    onChange={(date) => handleDueDateChange(date)}
                    disabled={!dueDateEnabled}
                    onFocus={(e) => (e.target.readOnly = true)}
                  />
                  <Calendar />
                </div>
              </div>

              <div className={classes.select}>
                <label htmlFor="payee">
                  Invoice From<span className="required">*Required</span>
                </label>
                <Select
                  onChange={handlePayeeSelectChange}
                  className="basic-single"
                  classNamePrefix="select"
                  name="payerDetails"
                  options={payees}
                />
                <div className={classes.btnGroup}>
                  <button
                    className="secondary sm"
                    onClick={(e) => openPayeeDialog(e)}
                  >
                    Add New <Plus />
                  </button>
                  {payees.length > 0 && (
                    <button
                      className="secondary sm"
                      onClick={(e) => openModifyDetails(e, "Payees")}
                    >
                      Remove <Minus />
                    </button>
                  )}
                </div>
              </div>

              <div className={classes.select}>
                <label htmlFor="payer">
                  Bill To<span className="required">*Required</span>
                </label>
                <Select
                  onChange={handlePayerSelectChange}
                  className="basic-single"
                  classNamePrefix="select"
                  name="payeeDetails"
                  options={payers}
                />
                <div className={classes.btnGroup}>
                  <button
                    className="secondary sm"
                    onClick={(e) => openPayerDialog(e)}
                  >
                    Add New <Plus />
                  </button>
                  {payers.length > 0 && (
                    <button
                      className="secondary sm"
                      onClick={(e) => openModifyDetails(e, "Payers")}
                    >
                      Remove <Minus />
                    </button>
                  )}
                </div>
              </div>

              <div className={classes.select}>
                <label htmlFor="items">
                  Items & Services<span className="required">*Required</span>
                </label>
                <Select
                  onChange={handleItemsSelectChange}
                  classNamePrefix="select"
                  name="itemDetails"
                  options={items}
                  isMulti
                />
                <div className={classes.btnGroup}>
                  <button
                    className="secondary sm"
                    onClick={(e) => openItemDialog(e)}
                  >
                    Add New <Plus />
                  </button>
                  {items.length > 0 && (
                    <button
                      className="secondary sm"
                      onClick={(e) => openModifyDetails(e, "Items")}
                    >
                      Remove or Change Quantity
                    </button>
                  )}
                </div>
              </div>

              <div className={classes.select}>
                <label htmlFor="currency">Currency</label>
                <Select
                  onChange={handleCurrencySelectChange}
                  classNamePrefix="select"
                  name="currency"
                  options={currency}
                  defaultValue={currency[0]}
                />
              </div>

              <div>
                <label htmlFor="notes">Notes</label>
                <div className="input-wrapper">
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={4}
                    maxLength={200}
                    placeholder="Notes - any relevant information such as payment methods etc. (Max 200 characters)"
                  />
                </div>
              </div>
            </form>
            <div className={classes.btnGroup}>
              {formData.title.length > 0 &&
              formData.payToName.length > 0 &&
              formData.billToName.length > 0 &&
              formData.items.length > 0 ? (
                <button className="primary">
                  <PDFDownloadLink
                    document={renderPdf()}
                    fileName="invoice.pdf"
                  >
                    Download PDF <Download />
                  </PDFDownloadLink>
                </button>
              ) : (
                <button className="primary" onClick={validateForm}>
                  Download PDF <Download />
                </button>
              )}
              <button className="secondary" onClick={() => handleOpenPreview()}>
                Preview <Eye />
              </button>
            </div>
          </div>
        </section>
        <section
          className={classNames(classes.rightSide, {
            [classes.rightSideOpen]: isPreviewOpen,
          })}
        >
          <div className={classes.preview}>
            <span onClick={() => handleClosePreview()}>
              <X />
            </span>
            <div>
              {formData.title ? (
                <h2>{formData.title}</h2>
              ) : (
                <h2>Invoice Title</h2>
              )}
              <p>{formData.date}</p>
            </div>
            <div>
              <h3>Invoice From:</h3>
              {formData.payToName ? (
                <p>{formData.payToName}</p>
              ) : (
                <p>Full Name</p>
              )}
              <div>
                {Object.keys(formData.payToAddress).length === 0 ? (
                  <p>Address</p>
                ) : (
                  Object.entries(formData.payToAddress).map(([key, obj]) => (
                    <p key={key}>{obj}</p>
                  ))
                )}
              </div>
            </div>
            <div>
              <h3>Bill To:</h3>
              {formData.billToName ? (
                <p>{formData.billToName}</p>
              ) : (
                <p>Full Name</p>
              )}
              <div>
                {Object.keys(formData.billToAddress).length === 0 ? (
                  <p>Address</p>
                ) : (
                  Object.entries(formData.billToAddress).map(([key, obj]) => (
                    <p key={key}>{obj}</p>
                  ))
                )}
              </div>
              {formData.dueDate && <p>Due: {formData.dueDate}</p>}
            </div>
            <div className={classes.items}>
              <h3>Items & Services:</h3>
              {Object.keys(formData.items).length === 0 ? (
                <p>No Items & Services</p>
              ) : (
                <>
                  <p>
                    <span>Name</span>
                    <span>Description</span>
                    <span>Price</span>
                    <span>Quantity</span>
                    <span>Total Price</span>
                  </p>
                  {Object.values(formData.items).map((item, index) => (
                    <p key={index}>
                      <span>{item.itemName}</span>
                      <span>{item.itemDescription}</span>
                      {formData.currency === "£" && (
                        <span>
                          {formData.currency}
                          {item.itemPrice}
                        </span>
                      )}
                      {formData.currency !== "£" && (
                        <span>
                          {item.itemPrice}
                          {formData.currency}
                        </span>
                      )}
                      <span>{item.itemQuantity}</span>
                      {formData.currency === "£" && (
                        <span>
                          {formData.currency}
                          {item.itemPrice * item.itemQuantity}
                        </span>
                      )}
                      {formData.currency !== "£" && (
                        <span>
                          {item.itemPrice * item.itemQuantity}
                          {formData.currency}
                        </span>
                      )}
                    </p>
                  ))}
                </>
              )}
              {formData.totalAmount > 0 && (
                <p>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span className={classes.total}>Total Amount</span>
                  <span>
                    {formData.currency === "£" && (
                      <span>
                        {formData.currency}
                        {formData.totalAmount}
                      </span>
                    )}
                    {formData.currency !== "£" && (
                      <span>
                        {formData.totalAmount}
                        {formData.currency}
                      </span>
                    )}
                  </span>
                </p>
              )}
            </div>
            {formData.notes && (
              <div>
                <h3>Notes:</h3>
                <p>{formData.notes}</p>
              </div>
            )}
          </div>
        </section>
      </motion.div>

      <GeneratePayeeModal
        isOpen={isPayeeOpen}
        onClose={closeDialog}
        onSubmit={handleSubmitPayeeDialog}
      />

      <GeneratePayerModal
        isOpen={isPayerOpen}
        onClose={closeDialog}
        onSubmit={handleSubmitPayerDialog}
      />

      <GenerateItemModal
        isOpen={isItemOpen}
        onClose={closeDialog}
        onSubmit={handleSubmitItemDialog}
      />

      <ModifyDetails
        isOpen={isModifyOpen}
        onClose={closeDialog}
        dataToModify={dataToModify}
        onRemove={handleItemsRemove}
        onQuantityUpdate={handleQuantityUpdate}
      />
    </main>
  );
}
export default Generate;
