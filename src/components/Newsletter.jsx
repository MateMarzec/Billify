import React, { useState } from "react";
import emailjs from "emailjs-com";
import { Search } from "feather-icons-react";
import classes from "./Newsletter.module.css";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_8yaldv7",
        "template_ryvhlpm",
        {
          to_email: email,
        },
        "5ACeaeNHitHr5ZX-K"
      )
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });

    setSubmitted(true);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <aside className={classes.newsletter}>
      <div className={classes.container}>
        <p>
          Join <span>1,000+</span> other people
        </p>
          <form onSubmit={handleSubmit}>
          {!submitted ? (
            <>
              <div className="input-wrapper">
                <input
                  className={classes.newsletterEmail}
                  type="email"
                  id="newsletter"
                  name="newsletter"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                <Search />
              </div>
              <button type="submit" className="primary lg">
                Subscribe
              </button>
            </>
            ) : (
              <button type="submit" className="primary lg" disabled>
                Thanks for subscribing!
              </button>
          )}
          </form>
      </div>
    </aside>
  );
}
export default Newsletter;