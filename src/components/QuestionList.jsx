import React, { useState, useEffect } from "react";
import Question from "./Question";
import ResultPage from "./Result"; // New result component
import questionData from "../../public/question.json";

const QuestionList = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setQuestions(questionData.data.questions);
  }, []);

  const handleAnswer = (selectedWords) => {
    const current = questions[currentIndex];
    const isCorrect =
      JSON.stringify(selectedWords) === JSON.stringify(current.correctAnswer);

    if (isCorrect) setScore((prev) => prev + 1);

    setUserAnswers((prev) => [
      ...prev,
      {
        question: current.question,
        selected: selectedWords,
        correct: current.correctAnswer,
        isCorrect,
      },
    ]);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowResult(true); // Move to result page
    }
  };

  const finishQuiz = () => {
    setShowResult(true); // Force the result page
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setUserAnswers([]);
    setShowResult(false);
  };

  return (
    <>
      {!showResult && questions.length > 0 ? (
        <Question
          key={questions[currentIndex].questionId}
          question={questions[currentIndex]}
          onAnswer={handleAnswer}
          onNext={handleNext}
          questions={questions}
          currentIndex={currentIndex}
          onFinish={finishQuiz}
        />
      ) : (
        <ResultPage
          score={score}
          total={questions.length}
          answers={userAnswers}
          onRetry={resetQuiz}
        />
      )}
    </>
  );
};

export default QuestionList;
