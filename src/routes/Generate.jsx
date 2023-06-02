import { useState } from "react";
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
import GenerateItemModal from "../components/GenerateItemModal";
import GeneratePayeeModal from "../components/GeneratePayeeModal";
import GeneratePayerModal from "../components/GeneratePayerModal";
import "react-datepicker/dist/react-datepicker.css";
import classes from "./Generate.module.css";

function Generate() {
  //States
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    dueDate: "",
    payToName: "",
    payToAddress: "",
    billToName: "",
    billToAddress: "",
    items: [],
    notes: "",
  });
  let selectedItems = [];
  const today = new Date();
  const [dueDateEnabled, setDueDateEnabled] = useState(true);
  const [formDate, setFormDate] = useState(today);
  const [dueDate, setDueDate] = useState(today);
  const [isPayeeOpen, setIsPayeeOpen] = useState(false);
  const [isPayerOpen, setIsPayerOpen] = useState(false);
  const [isItemOpen, setItemOpen] = useState(false);
  const [payees, setPayees] = useState([]);
  const [payers, setPayers] = useState([]);
  const [items, setItems] = useState([]);

  //Actions
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

  //Handlers
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = () => {
    if (dueDateEnabled) {
      setDueDate(null);
    } else {
      setDueDate(today);
    }
    setDueDateEnabled(!dueDateEnabled);
    dueDateEnabled(null);
  };

  const handleSubmitPayeeDialog = (e, payeeData) => {
    e.preventDefault();
    const newPayee = {
      value: payeeData,
      label: payeeData.payToName,
    };
    setPayees([...payees, newPayee]);
    setIsPayeeOpen(false);
  };

  const handleSubmitPayerDialog = (e, payerData) => {
    e.preventDefault();
    const newPayer = {
      value: payerData,
      label: payerData.billToName,
    };
    setPayers([...payers, newPayer]);
    setIsPayerOpen(false);
  };

  const handleSubmitItemDialog = (e, itemData) => {
    e.preventDefault();
    const newItem = {
      value: itemData,
      label: itemData.itemName,
    };
    setPayees([...items, newItem]);
    setItemOpen(false);
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
    selectedItems = e.map((item) => item.value);
    console.log(selectedItems);
    setFormData({
      ...formData,
      items: selectedItems,
    });
    console.log(formData.items)
  };

  //Render
  const renderPdf = () => (
    <Document>
      <Page>
        <View>
          <Text>Title: {formData.title}</Text>
          <Text>Content: {formData.content}</Text>
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
                    onChange={(date) => setFormDate(date)}
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
                    onChange={(date) => setDueDate(date)}
                    disabled={!dueDateEnabled}
                  />
                  <Calendar />
                </div>
              </div>

              <div>
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

              <div>
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

              <div>
                <label htmlFor="items">Items & Services</label>
                <Select
                  onChange={handleItemsSelectChange}
                  classNamePrefix="select"
                  name="itemDetails"
                  options={payees}
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
                <label htmlFor="content">Notes</label>
                <div className="input-wrapper">
                  <textarea
                    id="content"
                    name="content"
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
              <PDFViewer>{renderPdf()}</PDFViewer>
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
