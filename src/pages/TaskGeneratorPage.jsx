import React, { useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { TaskContext } from "../Components/TaskContext";
import TaskCard from "../Components/TaskCard";
import Btn from "../Components/Btn";
import { Form, Spinner } from "react-bootstrap";
import img6 from "../images/img6.png";

const TaskGeneratorPage = () => {
  const navigate = useNavigate();
  const { tasks, mainGoal, generateTasks, selectTask, setMainGoal, isLoading } =
    useContext(TaskContext);
  const [text, onChangeText] = useState("Get New Job");
  const handleChange = useCallback((e) => {
    setMainGoal(e.target.value);
  }, []);
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
    <div className="container d-flex justify-content-space-around px-0">
      <div className="row ">
        <div className={`  ${isMobile ? "mb-6 my-4" : "col-md-6"}`}>
          <img
            src={img6}
            alt="Mobile-friendly"
            className="img-fluid d-flex align-items-md-end"
          />
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center py-0">
          <div>
            {tasks.length > 0 ? (
              <>
                <h2 className="text-start mb-4">Choose a Task</h2>
                <div className="d-flex flex-column">
                  {tasks.map((task, index) => (
                    <TaskCard
                      task={task}
                      selectTask={selectTask}
                      key={`${task.id}-${task.challange_short}`}
                      className="justify-content-start"
                    />
                  ))}
                </div>
              </>
            ) : isLoading ? (
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <h4 className="mt-3 text-center">
                    You are closer to your{" "}
                    <span style={{ color: "#EA9C4D" }}> Dreams </span> than you
                    think!
                  </h4>
                </div>{" "}
                <div className="col-auto">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-start mb-2">
                  Ready to Start? <br />
                  Let Us Guide You to
                  <span style={{ color: "#EA9C4D" }}> Success </span>{" "}
                </h1>
                <h3 className="text-start mb-2">
                  Enter Your Goal and Click Generate to Get Started
                </h3>
                <Form className="d-flex flex-column mt-3">
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Enter your main goal or it will generate automaticly"
                      onChange={handleChange}
                      value={mainGoal}
                      className="mb-2"
                    />
                  </Form.Group>
                  <Btn btnName={"Catch Dream"} btnTarget={generateTasks} />
                </Form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskGeneratorPage;
