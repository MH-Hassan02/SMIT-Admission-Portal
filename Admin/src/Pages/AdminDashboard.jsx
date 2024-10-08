import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../Components/Layout";
import Students from "../Components/Students";
import SendEmailsForm from "../Components/SendEmailsForm";
import Courses from "../Components/Courses";
import VenueForm from "../Components/VenueForm";
import { useNavigate } from "react-router-dom";
import loadingAnimation from "../Images/Animation - 1722673258330.gif";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [maleUsers, setMaleUsers] = useState([]);
  const [femaleUsers, setFemaleUsers] = useState([]);
  const [maleCounter, setMaleCounter] = useState(0);
  const [femaleCounter, setFemaleCounter] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("Students");
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/admin/check-auth`,
          { withCredentials: true }
        );
        if (response.status !== 200) {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const getData = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/allUsers`
      );
      setUsers(getData.data.users);
      setMaleUsers(getData.data.maleUsers);
      setFemaleUsers(getData.data.femaleUsers);
      setMaleCounter(getData.data.maleCounter[0].sequenceValue);
      setFemaleCounter(getData.data.femaleCounter[0].sequenceValue);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching data", error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "Students":
        return (
          <Students
            users={users}
            maleUsers={maleUsers}
            femaleUsers={femaleUsers}
            maleCounter={maleCounter}
            femaleCounter={femaleCounter}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            fetchData={fetchData}
          />
        );
      case "Test Venue":
        return <SendEmailsForm />;
      case "Courses":
        return <Courses />;
      case "Add Venue":
        return <VenueForm />;
      default:
        return null;
    }
  };

  return (
    <>
      {loading ? (
        <div className="loaderImg">
          <img src={loadingAnimation} height="100" width="100" alt="Loading Animation" />
        </div>
      ) : (
        <>
          <Layout
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onTabChange={setSelectedTab}
            selectedTab={selectedTab}
          />
          {renderContent()}
        </>
      )}
    </>
  );
};

export default AdminDashboard;
