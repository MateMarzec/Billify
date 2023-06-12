import { useState } from "react";
import emailjs from "emailjs-com";
import { Mail } from "feather-icons-react";
import { toast } from "react-toastify";
import ContactUs from "../assets/payment.jpg";
import classes from "./Contact.module.css";
import { Send, User } from "feather-icons-react/build/IconComponents";

function Contact() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessageBody] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Email validation regex pattern
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(email)) {
      // Display an error message or handle the validation error in an appropriate way
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

    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: "Billify Contact Info",
      message,
    };

    emailjs
      .send(
        "service_8yaldv7",
        "template_e0f524n",
        templateParams,
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

    setSent(true);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleBodyChange = (e) => {
    setMessageBody(e.target.value);
  };

  return (
    <main>
      <div className={classes.container}>
        <section className={classes.leftSide}>
          <div className={classes.content}>
            <h1>Contact Us</h1>
            {!sent ? (
              <p>
                Please feel free to contact us with your suggestions, feedback,
                or any issues you would like to bring to our attention.
              </p>
            ) : (
              <p>
                Thanks for contacting us, we will try to get back to you as soon
                as possible.
              </p>
            )}
            {!sent ? (
              <form onSubmit={handleSubmit}>
                <>
                  <label htmlFor="userName">Name</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="userName"
                      name="userName"
                      placeholder="John Kowalski"
                      value={name}
                      onChange={handleNameChange}
                      required
                    />
                    <User />
                  </div>
                  <label htmlFor="userEmail">Email</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="userEmail"
                      name="userEmail"
                      placeholder="john@billify.com"
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />
                    <Mail />
                  </div>
                  <label htmlFor="messageBody">Message</label>
                  <div className="input-wrapper">
                    <textarea
                      type="text"
                      id="messageBody"
                      name="messageBody"
                      placeholder="Type your message"
                      value={message}
                      onChange={handleBodyChange}
                      rows={3}
                      required
                    />
                  </div>
                  <button type="submit" className="primary lg">
                    Send <Send />
                  </button>
                </>
              </form>
            ) : (
              <></>
            )}
          </div>
        </section>
        <div className={classes.rightSide}>
          <div>
            <img
              src={ContactUs}
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

export default Contact;
