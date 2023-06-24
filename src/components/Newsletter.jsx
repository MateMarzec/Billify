//Libraries
import { useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import { Mail } from "feather-icons-react/build/IconComponents";

//Styles
import classes from "./Newsletter.module.css";

function Newsletter() {
  //State for the email input & submitted status
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  //Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    //Email validation regex pattern
    const emailRegex = /^\S+@\S+\.\S+$/;

    //Check if email is valid
    if (!emailRegex.test(email)) {
      //If email is invalid, show error toast
      toast.error(
        "Invalid Email Address. Please enter a valid email address.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
      return;
    }

    //Send email
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
        toast.success("Email sent successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        toast.error(
          "Error sending email: " + error + "please try again later.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      });

    setSubmitted(true);
  };

  //Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <aside className={classes.newsletter}>
      <div className={classes.container}>
        <p>
          Join <span>other</span> people and get the latest updates.
        </p>
        <form onSubmit={handleSubmit}>
          {!submitted ? (
            <>
              <div className="input-wrapper">
                <input
                  className={classes.newsletterEmail}
                  type="text"
                  id="newsletter"
                  name="newsletter"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                <Mail />
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
