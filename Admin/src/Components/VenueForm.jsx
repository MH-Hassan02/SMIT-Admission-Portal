import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './VenueForm.css';

const VenueForm = () => {
    const [venueName, setVenueName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/venue/add`, { name: venueName });
            toast.success("Venue added successfully!", {
                pauseOnHover: false,
                autoClose: 3000,
                style: {
                  backgroundColor: "#E0F7FA",
                },
              });
            setVenueName('');
        } catch (error) {
            toast.error("Failed to add venue. Please try again.", {
                pauseOnHover: false,
                autoClose: 3000,
                style: {
                  backgroundColor: "#FFEBEE",
                },
              });
        }
    };

    return (
        <div className="venue-form-container">
            <h2 className="venue-form-heading">Add Test Venue</h2>
            <form onSubmit={handleSubmit} className="venue-form">
                <div className="form-group">
                    <label htmlFor="venueName" className="venue-form-label">Venue Name</label>
                    <input
                        type="text"
                        id="venueName"
                        className="venue-form-input"
                        value={venueName}
                        onChange={(e) => setVenueName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button-venue">Add Venue</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default VenueForm;
