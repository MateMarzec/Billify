//Libraries
import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, ArrowRight, X } from "feather-icons-react/build/IconComponents";

//Styles
import classes from "./Navigation.module.css";

//Assets
import Logo from "/logo.svg";

function Navigation() {
  //State for mobile menu
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  //Handle mobile menu toggle
  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  //Hide mobile menu on link click
  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
  };

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
          <Menu onClick={handleMobileMenuToggle} />
        </div>
      </div>
      <div
        className={`${classes.containerMobile} ${
          isMobileMenuOpen ? classes.openContainerMobile : ""
        }`}
      >
        <X onClick={handleMobileMenuToggle} />
        <Link to="/" onClick={handleMobileLinkClick}>
          <p>Home</p>
        </Link>
        <Link to="/resources/articles" onClick={handleMobileLinkClick}>
          <p>Articles</p>
        </Link>
        <Link to="/resources/docs" onClick={handleMobileLinkClick}>
          <p>Docs</p>
        </Link>
        <Link to="/contact" onClick={handleMobileLinkClick}>
          <p>Contact</p>
        </Link>
        <div>
          <Link to="/generate" onClick={handleMobileLinkClick}>
            <button className="primary" type="button">
              Generate Invoice <ArrowRight />
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
