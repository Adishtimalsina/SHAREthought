import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const Contact = () => {
  const navigate = useNavigate();
  const [userValues, setUserValues] = useState("");

  //destructing values from userValues
  const { name, email, message } = userValues;

  const handleChange = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    setUserValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userValues);
  };

  const sentMessage = () => {
    const token = localStorage.getItem("token");
    if (!name & !email & !message) {
      toast.error("Please fill out all the required fields");
    } else if (!token) {
      toast.error("Please login to send a message to the team", {
        position: "top-right",
        autoClose: 2000,
      });
      return setTimeout(() => {
        navigate("/Login");
      }, 2000);
    } else {
      toast.success("your message has been successfully sent to the team");
      setUserValues("");
      return setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };
  return (
    <div className="contact">
      <div className="contactForm shadow-lg">
        <div className="head">
          <h1>Contact Us</h1>
          <h3>Fill up the form below to send us a message.</h3>
        </div>
        <form className="mt-5" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              placeholder="John Doe"
              rows="2"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Johndoe@gmail.com"
              required
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              phone Number
            </label>
            <input
              type="number"
              className="form-control"
              id="phoneNumber"
              placeholder="+1 (555) 1234-567"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Your Message
            </label>
            <textarea
              className="form-control"
              id="message"
              rows="6"
              required
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="sendMessage">
            <button
              className="btn btn-primary"
              type="submit"
              onClick={sentMessage}
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Contact;
