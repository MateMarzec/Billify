import { useState, useEffect } from "react";
import {
  PDFViewer,
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
} from "@react-pdf/renderer";
import DatePicker from "react-datepicker";
import Select from "react-select";
import {
  ArrowRight,
  Calendar,
  Download,
  Edit2,
  Eye,
  Plus,
} from "feather-icons-react/build/IconComponents";
import Cookies from "js-cookie";
import GenerateItemModal from "../components/GenerateItemModal";
import GeneratePayeeModal from "../components/GeneratePayeeModal";
import GeneratePayerModal from "../components/GeneratePayerModal";
import "react-datepicker/dist/react-datepicker.css";
import classes from "./Generate.module.css";

function Generate() {
  // States
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const [formData, setFormData] = useState({
    title: "",
    date: formattedDate,
    dueDate: "",
    payToName: "",
    payToAddress: {},
    billToName: "",
    billToAddress: {},
    items: [],
    notes: "",
  });
  const [dueDateEnabled, setDueDateEnabled] = useState(false);
  const [formDate, setFormDate] = useState(today);
  const [dueDate, setDueDate] = useState(null);
  const [isPayeeOpen, setIsPayeeOpen] = useState(false);
  const [isPayerOpen, setIsPayerOpen] = useState(false);
  const [isItemOpen, setItemOpen] = useState(false);
  const [payees, setPayees] = useState([]);
  const [payers, setPayers] = useState([]);
  const [items, setItems] = useState([]);

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

  const closeDialog = (e) => {
    e.preventDefault();
    setIsPayeeOpen(false);
    setIsPayerOpen(false);
    setItemOpen(false);
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
      date: date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
    });
  };

  const handleDueDateChange = (date) => {
    setDueDate(date);
    setFormData({
      ...formData,
      dueDate: date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
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
        dueDate: today.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
      });
    }
    setDueDateEnabled(!dueDateEnabled);
  };

  const handleSubmitPayeeDialog = (e, payeeData) => {
    e.preventDefault();
    const newPayee = {
      value: payeeData,
      label: payeeData.payToName,
    };
    setPayees([...payees, newPayee]);
    setIsPayeeOpen(false);
    updateCookies("myPayees", [...payees, newPayee]);
  };

  const handleSubmitPayerDialog = (e, payerData) => {
    e.preventDefault();
    const newPayer = {
      value: payerData,
      label: payerData.billToName,
    };
    setPayers([...payers, newPayer]);
    setIsPayerOpen(false);
    updateCookies("myPayers", [...payers, newPayer]);
  };

  const handleSubmitItemDialog = (e, itemData) => {
    e.preventDefault();
    const newItem = {
      value: itemData,
      label: itemData.itemName,
    };
    setItems([...items, newItem]);
    setItemOpen(false);
    updateCookies("myItems", [...items, newItem]);
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

  //Render
  const renderPdf = () => (
    <Document>
      <Page>
        <View>
          <Text>Title: {formData.title}</Text>
          <Text>Content: {formData.notes}</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <main className={classes.generateWrapper}>
      <div className={classes.container}>
        <section className={classes.leftSide}>
          <div className={classes.content}>
            <h1>Create invoice at lighting speed</h1>
            <p>Fill out the form and generate the invoice in seconds.</p>
            <form>
              <div>
                <label htmlFor="title">Title</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter Invoice Title"
                  />
                  <Edit2 />
                </div>
              </div>

              <div className={classes.datePicker}>
                <label htmlFor="date">Date</label>
                <div className="input-wrapper">
                  <DatePicker
                    selected={formDate}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    todayButton="Today"
                    onChange={(date) => handleDateChange(date)}
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
                    selected={dueDate}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    minDate={today}
                    todayButton="Today"
                    onChange={(date) => handleDueDateChange(date)}
                    disabled={!dueDateEnabled}
                  />
                  <Calendar />
                </div>
              </div>

              <div className={classes.select}>
                <label htmlFor="payer">Payer Details</label>
                <Select
                  onChange={handlePayerSelectChange}
                  className="basic-single"
                  classNamePrefix="select"
                  name="payeeDetails"
                  options={payers}
                />
                <button
                  className="secondary sm"
                  onClick={(e) => openPayerDialog(e)}
                >
                  Add New Payer <Plus />
                </button>
              </div>

              <div className={classes.select}>
                <label htmlFor="payee">Payee Details</label>
                <Select
                  onChange={handlePayeeSelectChange}
                  className="basic-single"
                  classNamePrefix="select"
                  name="payerDetails"
                  options={payees}
                />
                <button
                  className="secondary sm"
                  onClick={(e) => openPayeeDialog(e)}
                >
                  Add New Payee <Plus />
                </button>
              </div>

              <div className={classes.select}>
                <label htmlFor="items">Items & Services</label>
                <Select
                  onChange={handleItemsSelectChange}
                  classNamePrefix="select"
                  name="itemDetails"
                  options={items}
                  isMulti
                />
                <button
                  className="secondary sm"
                  onClick={(e) => openItemDialog(e)}
                >
                  Add New Item or Service <Plus />
                </button>
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
                    placeholder="Notes - any relevant information such as payment methods etc."
                  />
                </div>
              </div>
            </form>
            <div className={classes.btnGroup}>
              <button className="primary">
                <PDFDownloadLink document={renderPdf()} fileName="invoice.pdf">
                  Download PDF <Download />
                </PDFDownloadLink>
              </button>
              <button className="secondary">
                Preview <Eye />
              </button>
            </div>
          </div>
        </section>
        <div className={classes.rightSide}>
          <div className={classes.preview}>
            <div>
              <p>{formData.title}</p>
              <p>{formData.date}</p>
            </div>
            <div>
              <h3>Invoice From</h3>
              <p>{formData.payToName}</p>
              <div>
                {formData.payToAddress &&
                  Object.entries(formData.payToAddress).map(([key, obj]) => (
                    <p key={key}>{obj}</p>
                  ))}
              </div>
            </div>
            <div>
              <h3>Bill To</h3>
              <p>{formData.billToName}</p>
              <div>
                {formData.billToAddress &&
                  Object.entries(formData.billToAddress).map(([key, obj]) => (
                    <p key={key}>{obj}</p>
                  ))}
              </div>
              {formData.dueDate && <p>{formData.dueDate}</p>}
            </div>
            <div>
              <h3>Items</h3>
              {formData.items &&
                Object.entries(formData.items).map(([key, obj]) => (
                  <p key={key}>{obj}</p>
                ))}
            </div>
            <div>
              <h3>Notes</h3>
              <p>{formData.notes}</p>
            </div>
          </div>
        </div>
      </div>

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
    </main>
  );
}

export default Generate;
