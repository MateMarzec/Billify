//Libraries
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Book } from "feather-icons-react/build/IconComponents";

//Styles
import classes from "./Home.module.css";

//Assets
import Payment from "../assets/payment.jpg";

function Home() {
  return (
    <main>
      <div className={classes.container}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 0.3,
            delay: 0.1,
          }}
          className={classes.leftSide}
        >
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
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 0.3,
            delay: 0.1,
          }}
          className={classes.rightSide}
        >
          <div>
            <img
              src={Payment}
              alt="One person holding card reader and the other parson paying with card"
            />
          </div>
          <div />
          <div />
        </motion.div>
      </div>
    </main>
  );
}
export default Home;
