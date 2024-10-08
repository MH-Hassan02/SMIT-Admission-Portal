import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SendEmailsForm.css";

const SendEmailsForm = () => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [venue, setVenue] = useState("");
  const [message, setMessage] = useState("");
  const [venues, setVenues] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/venue/get`);
      setVenues(response.data);
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  };

  const handleSubmit = async (e, gender) => {
    e.preventDefault();

    if (!venue || !date || !time) {
      setHasError(true);
      return;
    }

    const toastId = toast.info("Sending Emails to Students", {
      toastId: "pending-toast",
      pauseOnHover: false,
      autoClose: false,
      style: {
        backgroundColor: "#E0F7FA",
      },
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/sendPlacementEmails`,
        { start, end, venue, gender, date, time }
      );
      if (response.data.message) {
        setMessage(response.data.message);
        setHasError(false);
        toast.update(toastId, {
          render: "Emails Successfully Sent!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          style: {
            backgroundColor: "#E8F5E9",
          },
        });
        setTimeout(() => toast.dismiss(toastId), 3000);
      }
    } catch (error) {
      console.error("Error sending emails:", error);
      setMessage("Failed to send emails");
      toast.update(toastId, {
        render: "Failed to send emails",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        style: {
          backgroundColor: "#FFEBEE",
        },
      });
      setTimeout(() => toast.dismiss(toastId), 3000);
    }
  };

  const handleDropdownFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownBlur = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="send-emails-container">
      <ToastContainer />
      <h2 className="form-heading">Send Placement Emails</h2>
      <form className={`send-emails-form ${isDropdownOpen ? "form-open" : ""}`}>
        <div className="form-group">
          <label htmlFor="start">Initial User Number:</label>
          <input
            type="number"
            id="start"
            name="start"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="end">Last User Number:</label>
          <input
            type="number"
            id="end"
            name="end"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            required
          />
        </div>
        <div className={`form-group ${hasError ? "error" : ""}`}>
          <label htmlFor="venue">Venue:</label>
          <select
            id="venue"
            name="venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            onFocus={handleDropdownFocus}
            onBlur={handleDropdownBlur}
            required
          >
            <option value="">Select Exam Place</option>
            {venues.map((venue) => (
              <option key={venue._id} value={venue.name}>
                {venue.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button
            type="button"
            onClick={(e) => handleSubmit(e, "M")}
            className="send-button"
          >
            Send to Males
          </button>
          <button
            type="button"
            onClick={(e) => handleSubmit(e, "F")}
            className="send-button"
          >
            Send to Females
          </button>
        </div>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default SendEmailsForm;
