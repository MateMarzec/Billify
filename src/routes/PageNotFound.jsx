//Libraries
import { Link } from "react-router-dom";
import { ArrowLeft } from "feather-icons-react/build/IconComponents";

//Styles
import classes from "./PageNotFound.module.css";

//Assets
import Payment from "../assets/payment.jpg";

function PageNotFound() {
  return (
    <main>
      <div className={classes.container}>
        <section className={classes.leftSide}>
          <div className={classes.content}>
            <h1>Error 404, page not found.</h1>
            <p>We can't find the page you are looking for.</p>
            <div className={classes.btnGroup}>
              <button className="primary lg" type="button">
                <Link to="/generate">
                  <ArrowLeft />
                  Go Back Home
                </Link>
              </button>
            </div>
          </div>
        </section>
        <div className={classes.rightSide}>
          <div>
            <img
              src={Payment}
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

export default PageNotFound;
