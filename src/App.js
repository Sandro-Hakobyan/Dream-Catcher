import React from "react";
import TaskGeneratorPage from "./pages/TaskGeneratorPage";
import TaskDetailPage from "./pages/TaskDetailPage";
import MainPage from "./pages/MainPage";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/task" element={<TaskDetailPage />} />
      <Route path="/tasks/" element={<TaskGeneratorPage />} />
    </Routes>
  );
};

export default App;
