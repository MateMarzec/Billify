import ContactUs from "../assets/payment.jpg";
import classes from "./Generate.module.css";

function Generate() {
  return (
    <main className={classes.generateWrapper}>
      <div className={classes.container}>
        <section className={classes.leftSide}>
          <div className={classes.content}>
            <h1>Form</h1>
          </div>
        </section>
        <div className={classes.rightSide}>
          <div className={classes.preview}></div>
        </div>
      </div>
    </main>
  );
}

export default Generate;
