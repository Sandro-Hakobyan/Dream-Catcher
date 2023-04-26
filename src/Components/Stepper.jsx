import React, { useState, useEffect } from "react";
import { CDBStepper, CDBStep, CDBBtn, CDBContainer } from "cdbreact";
import styled from "@emotion/styled";

const Stepper = ({ taskSteps, stepperDirection }) => {
  const [active, setActive] = useState(1);

  const handleNextPrevClick = (a) => {
    setActive(a);
  };
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <CDBContainer>
      <CDBStepper
        direction={stepperDirection}
        activeColor="#666666"
        completeColor="#505050"
        incompleteColor="#666666"
      >
        {taskSteps.map((step, index) => (
          <CDBStep
            id={index + 1}
            name={"Step" + " " + (index + 1)}
            handleClick={() => handleNextPrevClick(index + 1)}
            active={active}
            component={
              <Step
                handleNextPrevClick={handleNextPrevClick}
                step={step}
                index={index + 1}
              />
            }
          />
        ))}
      </CDBStepper>
    </CDBContainer>
  );
};

export default Stepper;

const Step = ({ handleNextPrevClick, step, index }) => {
  return (
    <StepContainer>
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
          borderRadius: "10px",
          background: "#f5f5f5",
          boxShadow: "0px 4px 10px 0 rgba(0, 0, 0, 0.05)",
          padding: "30px",
          boxSizing: "border-box",
        }}
      >
        <FlexColumnContainer>
          <div
            style={{
              textAlign: "center",
              color: "#939393",
              fontSize: "30px",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            Step {index}
          </div>
          <FlexColumnContainer width="100%">
            <h3 style={{ color: "black", marginBottom: "20px" }}>
              {step.description.replace(/^step\s*[1-5]:\s*/gi, "")}
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {index > 1 && index <= 5 ? (
                <CDBBtn
                  className="float-start"
                  circle={false}
                  color="secondary"
                  flat
                  outline
                  onClick={() => {
                    handleNextPrevClick(index - 1);
                  }}
                >
                  Previous
                </CDBBtn>
              ) : null}

              {index >= 1 && index < 5 ? (
                <CDBBtn
                  flat
                  color="secondary"
                  circle={false}
                  onClick={() => handleNextPrevClick(index + 1)}
                >
                  Next
                </CDBBtn>
              ) : null}
            </div>
          </FlexColumnContainer>
        </FlexColumnContainer>
      </div>
    </StepContainer>
  );
};
const isMobile = window.innerWidth < 768 ? true : false;

const FlexColumnContainer = !isMobile
  ? styled("div")`
      display: flex;
      flex-direction: column;
      width: ${(props) => props.width};
      justify-content: ${(props) =>
        props.justifyContent ? props.justifyContent : "center"};
      align-items: ${(props) =>
        props.alignItems ? props.alignItems : "center"};
      box-sizing: border-box;
    `
  : styled("div")`
      padding: "10px";
      display: flex;
      margin-left: "-8px";
      margin-bottom: "-8px";
      background-color: "#fff";
      flex-direction: column;
      justify-content: ${(props) =>
        props.justifyContent ? props.justifyContent : "center"};
      align-items: ${(props) =>
        props.alignItems ? props.alignItems : "center"};
      box-sizing: border-box;
    `;

const StepContainer = isMobile
  ? styled("div")`
  width: :${(isMobile) => (!isMobile ? "100%" : "280%")};
  height: ${(isMobile) => (!isMobile ? "100%" : "150%")};  
margin-left:${(isMobile) => (!isMobile ? "0" : "-90px")};
margin-top:${(isMobile) => (!isMobile ? "30px" : "-10px")};

`
  : styled("div")`
      width: 100%;
      height: 100%;
    `;
