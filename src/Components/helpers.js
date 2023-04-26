import axios from "axios";

const completePrompt = async (prompt) => {
  const response = await axios.post(
    "https://api.openai.com/v1/completions",
    {
      model: "text-davinci-003",
      prompt: prompt,
      n: 1,
      temperature: 0,
      max_tokens: 1024,
      top_p: 1.0,
      frequency_penalty: 0.5,
      presence_penalty: 0.5,
      stop: "Sure, ",
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
    }
  );

  return response.data.choices[0];
};
export const generateTasksForGoal = async (goal) => {
  const prompt = `Give 3 challenges to ${goal}, in gamified format, and their difficulty levels(Easy/Medium/Hard), 
      in JSON, don't write anything else, only JSON
  
      should be in this format 
      [{
          "id":%ID%,
          "challange_short":%CHALLANGE_SHORT%,
          "challange_description":%CHALLANGE_DESCRIPTION%,
          "difficulty":%DIFFICULTY_LEVEL%
      }]`;

  const response = await completePrompt(prompt);
  const responseJson = response.text;
  const tasks = await JSON.parse(responseJson);

  return tasks;
};

export const generateTaskStepsForTask = async (task) => {
  const prompt = `give me Step by Step plan for a challenge, it's short description is ${task.challange_short}, description is ${task.description}, the difficulty is ${task.challange_description}, 5 steps, in JSON, don't write anything else, only JSON

  should be in this format 
  [
      {
        "description": %STEP_DESCRIPTION%
      },
  ]`;

  const response = await completePrompt(prompt);
  const responseJson = response.text;
  const tasks = await JSON.parse(responseJson);

  return tasks;
};

export const saveTask = (task) => {
  localStorage.setItem("selectedTask", JSON.stringify(task));
};
export const saveSteps = (steps) => {
  localStorage.setItem("steps", JSON.stringify(steps));
};
export const getSavedTask = async () => {
  const taskJson = localStorage.getItem("selectedTask");
  return taskJson && (await JSON.parse(taskJson));
};
export const getSavedSteps = async () => {
  const taskJson = localStorage.getItem("steps");
  return taskJson ? await JSON.parse(taskJson) : [];
};
