import { ArrowRight, Book } from "feather-icons-react/build/IconComponents";
import Payment from "../assets/payment.jpg";
import classes from "./Home.module.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      <div className={classes.container}>
        <section className={classes.leftSide}>
          <Link to="/resources/docs" className={classes.versionInfo}>
            <p>
              <span>v0.1</span>Latests Update
            </p>

            <ArrowRight />
          </Link>
          <div className={classes.content}>
            <h1>Create invoice at lighting speed</h1>
            <p>
              Sick of manual invoice creation? Billify can generate them at
              lighting speed.
            </p>
            <div className={classes.btnGroup}>
              <button className="primary lg" type="button">
                <Link to="/generate">
                  Generate Invoice <ArrowRight />
                </Link>
              </button>
              <button className="secondary lg" type="button">
                <Link to="/resources/docs">
                  Resources <Book />
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

export default Home;
