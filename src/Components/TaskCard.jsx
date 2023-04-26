import React, { useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const TaskCard = ({ task, selectTask }) => {
  const navigate = useNavigate();

  const handleSelect = useCallback(() => {
    navigate({
      pathname: "/task",
    });
    selectTask(task);
  }, []);

  const ref = useRef(null);

  useEffect(() => {
    const card = ref.current;
    card.addEventListener("mousemove", (e) => {
      let rect = e.target.getBoundingClientRect();
      let x = e.clientX - rect.left;
      card.style.setProperty("--x", x + "deg");
    });

    return () => {
      card.removeEventListener("mousemove", (e) => {
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        card.style.setProperty("--x", x + "deg");
      });
    };
  }, [ref]);

  return (
    <div className="task-card">
      <a ref={ref} onClick={handleSelect}>
        <>
          <i></i>
          <i></i>
          <div>
            <h5>
              Task {task.id}:{" "}
              <span style={{ color: "#EA9C4D" }}>{task.difficulty} </span>
            </h5>
            <h4>{task.challange_short}</h4>
            <p>{task.challange_description}</p>
          </div>
        </>
      </a>
    </div>
  );
};

export default TaskCard;
