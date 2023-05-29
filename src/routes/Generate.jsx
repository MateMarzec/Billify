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
import { Eye } from "feather-icons-react/build/IconComponents";

function Generate() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
              <label htmlFor="title">Title</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              <label htmlFor="title">Title</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              <label htmlFor="content">Content</label>
              <div className="input-wrapper">
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                />
              </div>
            </form>
            <div className={classes.btnGroup}>
              <button className="primary lg">
                <PDFDownloadLink document={renderPdf()} fileName="invoice.pdf">
                  Download PDF
                </PDFDownloadLink>
              </button>
              <button className="secondary lg">
                {" "}
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
    </main>
  );
}

export default Generate;
