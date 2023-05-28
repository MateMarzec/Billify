import ContactUs from "../assets/payment.jpg";
import classes from "./Contact.module.css";

function Contact() {
  return (
    <main>
      <div className={classes.container}>
        <section className={classes.leftSide}>
          <div className={classes.content}>
            <h1>Contact Us</h1>
          </div>
        </section>
        <div className={classes.rightSide}>
          <div>
            <img
              src={ContactUs}
              alt="One person holding card reader and the other parson paying with card"
            />
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
    </main>
  );
}

export default Contact;
