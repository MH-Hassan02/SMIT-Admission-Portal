import React from "react";
import "./ClassDetails.css";
import InstructorImage from "../Images/College Student.png";

const ClassDetails = ({ course }) => {
  const [courseName, classDays, classCampus] = course.split(" / ");
  return (
    <>
      <div className="classDetailsMain">
        <div className="classDetailsImageContainer">
          <img
            className="classDetailsImage"
            src={InstructorImage}
            alt="Teacher's Image"
          />
        </div>
        <div className="classDetailsText">
          <div className="classDetailsSect">
            <div className="fieldContainer">
              <span>Course Name:</span>
              <p>{courseName}</p>
            </div>
            {/* <div className="fieldContainer">
              <span>Instructor:</span>
              <p>Teacher Name</p>
            </div> */}
            <div className="fieldContainer">
              <span>Class Days:</span>
              <p>{classDays}</p>
            </div>
            {/* <div className="fieldContainer">
              <span>Class Timing:</span>
              <p>Timing</p>
            </div> */}
            <div className="fieldContainer">
              <span>Campus:</span>
              <p>{classCampus}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassDetails;
