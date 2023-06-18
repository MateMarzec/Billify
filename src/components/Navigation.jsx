import { Link } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  ArrowRight,
} from "feather-icons-react/build/IconComponents";
import Logo from "/logo.svg";
import classes from "./Navigation.module.css";

function Navigation() {
  return (
    <nav className={classes.nav}>
      <div className={classes.container}>
        <div className={classes.leftPanel}>
          <Link to="/" className={classes.logo}>
            <img src={Logo} alt="Billify Logo" />
          </Link>
          <Link to="/">
            <p>Home</p>
          </Link>
          <Link to="/resources/articles">
              <p>Articles</p>
            </Link>
            <Link to="/resources/docs">
              <p>Docs</p>
            </Link>
          <Link to="/contact">
            <p>Contact</p>
          </Link>
        </div>
        <div className={classes.rightPanel}>
          <Link to="/generate">
            <button className="primary" type="button">
              Generate Invoice <ArrowRight />
            </button>
          </Link>
          <Menu />
        </div>
      </div>
    </nav>
  );
}
export default Navigation;
