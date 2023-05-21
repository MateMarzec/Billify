import { Search } from "feather-icons-react";
import classes from "./Newsletter.module.css";

function Newsletter() {
  return (
    <aside>
      <div className={classes.container}>
        <p>
          Join <span>1,000+</span> other people
        </p>
        <form>
          <div className="input-wrapper"><input
          className={classes.newsletterEmail}
          type="text"
          id="newsletter"
          name="newsletter"
          placeholder="Enter your email"
        /><Search /></div>
          <button className="primary lg">Subscribe</button>
        </form>
      </div>
    </aside>
  );
}
export default Newsletter;
