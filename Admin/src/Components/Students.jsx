import React, { useState } from "react";
import ProjectTable from "../Components/ProjectTable";
import SummaryCard from "../Components/SummaryCard";
import { Task, Work } from "@mui/icons-material";
import { FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./Students.css"; // Make sure to create this CSS file or adjust the path

const Students = ({
  users,
  maleUsers,
  femaleUsers,
  maleCounter,
  femaleCounter,
  searchTerm,
  onSearchChange,
  fetchData,
}) => {
  const [userType, setUserType] = useState("Students");
  const [openModal, setOpenModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) => user.rollNumber && user.rollNumber.toString().includes(searchTerm)
  );

  const filteredMaleUsers = maleUsers.filter(
    (user) => user.rollNumber && user.rollNumber.toString().includes(searchTerm)
  );

  const filteredFemaleUsers = femaleUsers.filter(
    (user) => user.rollNumber && user.rollNumber.toString().includes(searchTerm)
  );

  // Handle edit button click
  const handleEditClick = (user) => {
    setCurrentUser(user);
    setUpdatedData(user);
    setOpenModal(true);
  };

  // Handle update action
  const handleUpdate = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/updateUser/${currentUser._id}`,
        updatedData
      );
      fetchData();
      toast.success("User updated successfully!", {
        pauseOnHover: false,
        autoClose: 3000,
        style: {
          backgroundColor: "#E0F7FA",
        },
      });
      setOpenModal(false);
    } catch (error) {
      console.error("Error updating data", error);
      toast.error("Failed to update user. Please try again.", {
        pauseOnHover: false,
        autoClose: 3000,
        style: {
          backgroundColor: "#FFEBEE",
        },
      });
    }
  };

  // Handle test result change
  const handleTestResultChange = (e) => {
    setUpdatedData({ ...updatedData, isPass: e.target.value });
  };

  return (
    <div className="adminDashboard">
      <h1>Admin Dashboard</h1>
      <div className="summary-cards">
        <SummaryCard
          onClick={() => setUserType("Students")}
          title="Students"
          value={maleCounter + femaleCounter}
          description=""
          icon={<Work />}
        />
        <SummaryCard
          onClick={() => setUserType("Male")}
          title="Males"
          value={`${maleCounter}`}
          description=""
          icon={<Work />}
        />
        <SummaryCard
          onClick={() => setUserType("Female")}
          title="Females"
          value={`${femaleCounter}`}
          description=""
          icon={<Task />}
        />
      </div>

      {userType === "Students" && (
        <>
          <h2>All Students</h2>
          <ProjectTable
            data={filteredUsers}
            header="Student Name"
            rollNumber="Roll Number"
            cnicNumber="CNIC Number"
            phoneNumber="Phone Number"
            isPass="Test Result"
            onEdit={handleEditClick}
          />
        </>
      )}

      {userType === "Male" && (
        <>
          <h2>Males</h2>
          <ProjectTable
            data={filteredMaleUsers}
            header="Student Name"
            rollNumber="Roll Number"
            cnicNumber="CNIC Number"
            phoneNumber="Phone Number"
            isPass="Test Result"
            onEdit={handleEditClick}
          />
        </>
      )}

      {userType === "Female" && (
        <>
          <h2>Females</h2>
          <ProjectTable
            data={filteredFemaleUsers}
            header="Student Name"
            rollNumber="Roll Number"
            cnicNumber="CNIC Number"
            phoneNumber="Phone Number"
            isPass="Test Result"
            onEdit={handleEditClick}
          />
        </>
      )}

      {openModal && (
        <>
          <div
            className="modal-overlay"
            onClick={() => setOpenModal(false)}
          ></div>
          <div className="modal-content">
            <button className="modal-close" onClick={() => setOpenModal(false)}>
              <FaTimes />
            </button>
            <h2>Edit User</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
            >
              <div className="modal-form-grid">
                <div>
                  <label>
                    Name:
                    <input
                      type="text"
                      value={updatedData?.name || ""}
                      onChange={(e) =>
                        setUpdatedData({ ...updatedData, name: e.target.value })
                      }
                      required
                    />
                  </label>
                  <label>
                    Roll Number:
                    <input
                      type="text"
                      value={updatedData?.rollNumber || ""}
                      onChange={(e) =>
                        setUpdatedData({
                          ...updatedData,
                          rollNumber: e.target.value,
                        })
                      }
                      required
                    />
                  </label>
                  <label>
                    CNIC Number:
                    <input
                      type="text"
                      value={updatedData?.cnicNumber || ""}
                      onChange={(e) =>
                        setUpdatedData({
                          ...updatedData,
                          cnicNumber: e.target.value,
                        })
                      }
                      required
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Phone Number:
                    <input
                      type="text"
                      value={updatedData?.phoneNumber || ""}
                      onChange={(e) =>
                        setUpdatedData({
                          ...updatedData,
                          phoneNumber: e.target.value,
                        })
                      }
                      required
                    />
                  </label>
                  <label>
                    Test Result:
                    <select
                      value={updatedData?.isPass || ""}
                      onChange={handleTestResultChange}
                      required
                    >
                      <option value="Pending">Pending</option>
                      <option value="Pass">Pass</option>
                      <option value="Fail">Fail</option>
                    </select>
                  </label>
                </div>
              </div>
              <div className="adminButtonsContainer">
                <button type="button" onClick={() => setOpenModal(false)}>
                  Cancel
                </button>
                <button className="updateButtonAdmin" type="submit">
                  Update
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* Add the ToastContainer to your component */}
      <ToastContainer />
    </div>
  );
};

export default Students;
