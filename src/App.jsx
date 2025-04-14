import React, { useState } from "react";
import { fetchQuestions } from "./services/api";
import Home from "./components/Home";
import Question from "./components/Question";
import Result from "./components/Result";

const areAnswersEqual = (a = [], b = []) => {
  if (a.length !== b.length) return false;
  return a.every((val, idx) => val === b[idx]);
};

const App = () => {
  const [step, setStep] = useState("home"); // "home" | "quiz" | "result"
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userSelections, setUserSelections] = useState([]);

  const resetQuiz = () => {
    setStep("home");
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setUserSelections([]);
  };

  const handleStart = async () => {
    try {
      const response = await fetchQuestions();
      console.log("Fetched Response: ", response); // Log the entire response

      const fetchedQuestions = response.data?.questions || []; // Fixed the path to questions
      console.log("Fetched Questions: ", fetchedQuestions); // Log the questions

      if (fetchedQuestions && fetchedQuestions.length > 0) {
        setQuestions(fetchedQuestions);
        setCurrentIndex(0);
        setScore(0);
        setUserSelections([]);
        setStep("quiz");
      } else {
        alert("No questions found.");
        setStep("home"); // Ensure the user returns to home if no questions found
      }
    } catch (err) {
      console.error("Failed to fetch questions:", err);
      alert("Failed to load quiz. Please try again later.");
    }
  };

  const handleAnswer = (selectedWords) => {
    const currentQuestion = questions[currentIndex];
    const isCorrect = areAnswersEqual(
      selectedWords,
      currentQuestion.correctAnswer
    );

    if (isCorrect) setScore((prev) => prev + 1);

    setUserSelections((prev) => [
      ...prev,
      {
        question: currentQuestion.question,
        selected: selectedWords,
        correct: currentQuestion.correctAnswer,
        isCorrect,
      },
    ]);
  };

  const handleNext = () => {
    if (currentIndex === questions.length - 1) {
      setStep("result");
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="App">
      {step === "home" && <Home onStart={handleStart} onBack={resetQuiz} />}
      {step === "quiz" && questions.length > 0 && (
        <Question
          key={currentIndex}
          question={questions[currentIndex]}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onFinish={() => setStep("result")}
          questions={questions}
          currentIndex={currentIndex}
        />
      )}
      {step === "result" && (
        <Result
          score={score}
          total={questions.length}
          userSelections={userSelections}
          onRetry={handleStart}
          onBack={resetQuiz}
        />
      )}
    </div>
  );
};

export default App;
