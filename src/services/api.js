// services/api.js

export const fetchQuestions = async () => {
  const response = await fetch("question.json"); // Update with correct file path
  if (!response.ok) {
    throw new Error("Failed to load questions");
  }

  const json = await response.json();
  return json; // You can log or inspect this if issues persist
};
