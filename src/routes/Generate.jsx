import { useState } from "react";
import {
  PDFViewer,
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
} from "@react-pdf/renderer";
import classes from "./Generate.module.css";
import {
  ArrowRight,
  Calendar,
  Edit2,
  Eye,
  Plus,
} from "feather-icons-react/build/IconComponents";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GeneratePayeeModal from "../components/GeneratePayeeModal";
import GeneratePayerModal from "../components/GeneratePayerModal";
import GenerateItemModal from "../components/GenerateItemModal";

function Generate() {
  const [isPayeeOpen, setIsPayeeOpen] = useState(false);
  const [isPayerOpen, setIsPayerOpen] = useState(false);
  const [isItemOpen, setItemOpen] = useState(false);

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

  const submitPayeeDialog = (e, payeeData) => {
    e.preventDefault();
    console.log(payeeData);
  };

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    dueDate: "",
    payToName: "",
    payToAddress: [],
    billToName: "",
    billToAddress: [],
    items: [
      {
        itemName: "",
        quantity: "",
        rate: "",
        currency: "",
      },
    ],
    notes: "",
  });
  const today = new Date();
  const [dueDateEnabled, setDueDateEnabled] = useState(true);
  const [formDate, setFormDate] = useState(today);
  const [dueDate, setDueDate] = useState(today);

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
                  />
                  <Edit2 />
                </div>
              </div>

              <div>
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

              <div>
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
                {/* payer select */}
                <button
                  className="secondary sm"
                  onClick={(e) => openPayerDialog(e)}
                >
                  Add New Payer <Plus />
                </button>
              </div>

              <div>
                <label htmlFor="payee">Payee Details</label>
                {/* payee select */}
                <button
                  className="secondary sm"
                  onClick={(e) => openPayeeDialog(e)}
                >
                  Add New Payee <Plus />
                </button>
              </div>

              <div>
                <label htmlFor="items">Items & Services</label>
                {/* items select */}
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
                  Download PDF <ArrowRight />
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
        onSubmit={submitPayeeDialog}
      />
      <GeneratePayerModal isOpen={isPayerOpen} onClose={closeDialog} />
      <GenerateItemModal isOpen={isItemOpen} onClose={closeDialog} />
    </main>
  );
}

export default Generate;
