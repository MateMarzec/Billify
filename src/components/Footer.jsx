import { Link } from "react-router-dom";
import Newsletter from "./Newsletter";
import Logo from "/logo.svg";
import classes from "./Footer.module.css";

function Footer() {
  return (
    <div>
      <Newsletter />
      <footer>
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
