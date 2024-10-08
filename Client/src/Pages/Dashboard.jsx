import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import SideBar from "../Components/SideBar";
import Navbar from "../Components/Navbar";
import Information from "../Components/Information";
import ClassDetails from "../Components/ClassDetails"; // Updated import
import NoClasses from "../Components/NoClasses";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import Profile from "../Components/Profile";
import PdfId from "../Components/ID Card/pdfId";
import PassCard from "../Components/Result Cards/PassCard";
import FailCard from "../Components/Result Cards/FailCard";
import PendingCard from "../Components/Result Cards/PendingCard";
import Result from "../Components/Result Cards/Result";
import loadingAnimation from "../Images/Animation - 1722673258330.gif";
import Classes from "../Components/Classes";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pageType, setPageType] = useState("Dashboard");
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const checkWindowSize = () => {
    if (window.innerWidth < 769) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    dispatch(fetchUserData());
    checkWindowSize(); // Check window size on component mount

    window.addEventListener("resize", checkWindowSize); // Add resize event listener

    document.body.classList.add("dashboardBackground");
    return () => {
      document.body.classList.remove("dashboardBackground");
      window.removeEventListener("resize", checkWindowSize); // Clean up event listener
    };
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (user.status === "failed") {
    navigate("/login");
  }

  return (
    <>
      <div className="backgroundOverlay"></div>
      <div
        className={`dashboardContainer ${
          isSidebarOpen ? "dashboardContainerToggled" : ""
        }`}
        style={{ display: loading ? "none" : "block" }}
      >
        <SideBar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          setPageType={setPageType}
          pageType={pageType}
        />
        <Navbar
          user={user.data}
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          setPageType={setPageType}
        />
        {pageType === "Profile" && <Profile user={user.data} />}
        {pageType === "Dashboard" && (
          <>
            <Information user={user.data} />
            <PdfId user={user.data} />
            {user.data.isPass === "Pass" && <PassCard />}
            {user.data.isPass === "Fail" && <FailCard />}
            {user.data.isPass === "Pending" && <PendingCard />}
            {user.data.classAlotted ? (
              <Classes classTiming={user.data.classAlotted} setPageType={setPageType} />
            ) : (
              <NoClasses />
            )}
          </>
        )}
        {pageType === "Results" && <Result user={user.data} />}
        {pageType === "Courses" && (
          user.data.classAlotted ? (
            <ClassDetails course={user.data.classAlotted} />
          ) : (
            <NoClasses />
          )
        )}
      </div>
      <div className="loaderImg" style={{ display: loading ? "flex" : "none" }}>
        <img src={loadingAnimation} height="100" width="100" alt="Loading Animation"></img>
      </div>
    </>
  );
};

export default Dashboard;
