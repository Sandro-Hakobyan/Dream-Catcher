import React, { useState, createContext, useEffect } from "react";
import {
  generateTasksForGoal,
  generateTaskStepsForTask,
  saveTask,
  getSavedTask,
  saveSteps,
  getSavedSteps,
} from "./helpers";

export const TaskContext = createContext(null);

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState();
  const [taskSteps, setTaskSteps] = useState([]);
  const [mainGoal, setMainGoal] = useState("");

  const [error, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const initialTask = await getSavedTask();
      setSelectedTask(initialTask);
      const initialSteps = await getSavedSteps();
      setTaskSteps(initialSteps);
    })();
  }, []);

  const generateTasks = async () => {
    try {
      setIsLoading(true);
      const tasks = await generateTasksForGoal(mainGoal);
      setIsLoading(false);
      setTasks(tasks);
    } catch (error) {
      console.log(error);
      setError(
        "Something is wrong with server, but not with Your goals ;), Try again later"
      );
    }
  };

  const generateTaskSteps = async (task) => {
    try {
      setIsLoading(true);
      const steps = await generateTaskStepsForTask(task);
      setIsLoading(false);
      setTaskSteps(steps);
      saveSteps(steps);
    } catch (error) {
      console.log(error);
      setError(
        "Something is wrong with server, but not with Your goals ;), Try again later"
      );
    }
  };

  const selectTask = (task) => {
    saveTask(task);
    setSelectedTask(task);
    generateTaskSteps(task);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        selectedTask,
        taskSteps,
        mainGoal,
        error,
        isLoading,
        setMainGoal,
        generateTasks,
        generateTaskSteps,
        selectTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
