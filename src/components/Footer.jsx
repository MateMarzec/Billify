import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Newsletter from "./Newsletter";
import Logo from "/logo.svg";
import classes from "./Footer.module.css";

function Footer() {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Newsletter />
      <footer className={classes.footer}>
        <div className={classes.container}>
          <Link to="/">
            <img src={Logo} alt="Billify Logo" />
          </Link>
          <a
            className={classes.author}
            href="https://matt-design.co/"
            target="_blank"
          >
            <p>Author: MattDesign</p>
          </a>
          <p className={classes.note}>©2023 Billify</p>
        </div>
      </footer>
    </div>
  );
}
export default Footer;
