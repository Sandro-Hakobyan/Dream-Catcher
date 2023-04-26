import React, { useState, useContext, useEffect } from "react";
import { TaskContext } from "../Components/TaskContext";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Stepper from "../Components/Stepper";
import img3 from "../images/img3.png";

const TaskDetailPage = ({ task }) => {
  const navigate = useNavigate();
  const { selectedTask, taskSteps, isLoading } = useContext(TaskContext);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const stepperDirection = isMobile ? "vertical" : "horizontal";

  return (
    <div>
      <Container className="bg-image">
        <Row>
          <div
            className={`col-md-6 d-block mx-auto  ${
              isMobile ? "mb-6 my-4" : "d-none"
            }`}
          >
            <img
              src={img3}
              alt="Mobile-friendly"
              className="img-fluid d-flex align-items-md-end"
            />
          </div>
          <Col>
            <Row>
              <Col>
                {selectedTask ? (
                  <>
                    <h3>Task Details</h3>
                    <h2>{selectedTask.challange_short}</h2>
                    <h3>Task: {selectedTask.difficulty}</h3>

                    <h5>{selectedTask.challange_description}</h5>
                  </>
                ) : (
                  <h1>First Select Your Goal</h1>
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                {taskSteps.length > 0 && !isLoading ? (
                  <Stepper
                    taskSteps={taskSteps}
                    stepperDirection={stepperDirection}
                  />
                ) : (
                  <>
                    <div className="d-flex justify-content-center">
                      <p style={{ marginRight: "20px" }}>
                        Steps Are Loading...
                      </p>
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                  </>
                )}
              </Col>
            </Row>
          </Col>

          <div
            className={`col-md-6 d-block mx-auto  ${
              isMobile ? "d-none" : "mx-md-start"
            }`}
          >
            <img
              src={img3}
              alt="Mobile-friendly"
              className="img-fluid d-flex align-items-md-end"
            />
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default TaskDetailPage;
