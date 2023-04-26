import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Btn from "../Components/Btn";
import img1 from "../images/img1.png";
import "../App.css";

const MainPage = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const handleStart = useCallback(() => navigate({ pathname: "/tasks" }), []);

  useState(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="main-page">
      <div className="container">
        <div className="row d-flex align-items-md-center">
          <div
            className={`col-md-6 d-block mx-auto  ${
              isMobile ? "mb-6 my-4" : "d-none"
            }`}
          >
            <img
              src={img1}
              alt="Mobile-friendly"
              className="img-fluid d-flex align-items-md-end"
            />
          </div>

          <div
            className="col-md-6 "
            style={isMobile ? { padding: "0px" } : { paddingLeft: "20px" }}
          >
            <div
              className={`text-start ${isMobile ? "mb-4 my-5 pl-5" : "mb-4"}`}
            >
              <h1>
                Unlock Your Potential:
                <br /> Get Started with Our App
              </h1>
              <h2>
                Transform Your<span style={{ color: "#EA9C4D" }}> Dreams </span>{" "}
                <br />
                Into Reality With Dream Catcher
              </h2>
              <p
                className="text-start mb-2"
                style={{ color: "#7A598F", marginTop: "10px" }}
              >
                The Secret to Goal Achievement: A Step-by-Step Plan
              </p>
            </div>
            <Btn btnName={"Start Now"} btnTarget={handleStart} />
          </div>
          <div
            className={`col-md-6 d-block mx-auto  ${
              isMobile ? "d-none" : "mx-md-start"
            }`}
          >
            <img
              src={img1}
              alt="Mobile-friendly"
              className="img-fluid d-flex align-items-md-end"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
