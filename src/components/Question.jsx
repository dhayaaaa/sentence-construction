import React, { useEffect, useState } from "react";

const Question = ({
  question,
  onAnswer,
  onNext,
  questions,
  currentIndex,
  onFinish,
}) => {
  const [filledWords, setFilledWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const blanksCount = question.question.split("___________").length - 1;

  useEffect(() => {
    setFilledWords(Array(blanksCount).fill(null));
    setSelectedWords([]);
    setTimeLeft(30);
    setIsTimeUp(false);
    setIsAnswered(false);
  }, [question, blanksCount]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setIsTimeUp(true);
          handleSubmit(); // Automatically submit when timer finishes
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Clear timer on unmount
  }, [question]); // Timer resets when a new question is passed

  const handleSelectWord = (word) => {
    const emptyIndex = filledWords.findIndex((w) => w === null);
    if (emptyIndex === -1 || isTimeUp || isAnswered) return;

    const newFilled = [...filledWords];
    newFilled[emptyIndex] = word;
    setFilledWords(newFilled);
    setSelectedWords([...selectedWords, word]);
  };

  const handleRemoveWord = (index) => {
    const wordToRemove = filledWords[index];
    if (!wordToRemove || isTimeUp || isAnswered) return;

    const newFilled = [...filledWords];
    newFilled[index] = null;
    setFilledWords(newFilled);
    setSelectedWords(selectedWords.filter((w) => w !== wordToRemove));
  };

  const handleSubmit = () => {
    if (!isAnswered) {
      onAnswer(filledWords);
      setIsAnswered(true);
    }

    // Always go to the next question or finish, regardless of answered state
    if (currentIndex === questions.length - 1) {
      setTimeout(() => {
        onFinish(); // <- Ensure this gets called
      }, 500);
    } else {
      setTimeout(onNext, 500);
    }
  };
 const handleQuit = () => {
   if (window.confirm("Are you sure you want to quit?")) {
     window.location.href = "/"; // Redirect to home page
   }
 };
  const parts = question.question.split("_____________");

  const isWordSelected = (word) => selectedWords.includes(word);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-lg shadow-md">
        {/* Background Timer Progress Overlay */}
        <div
          className="absolute top-0 left-0 h-full z-0 rounded-sm transition-[width] duration-200 ease-in-out animate-shimmer"
          style={{
            width: `${(timeLeft / 30) * 100}%`,
            backgroundImage:
              "linear-gradient(90deg, #f8f8f8,#F8F8F8, #f0f0f0 )",
            backgroundSize: "200% 100%",
            boxShadow: "0 70px 10px 2px #F5F5F5",
            borderRadius: "inherit",
          }}
        ></div>

        <div className="relative bg-grey p-6 z-10">
          <div className="flex justify-between mb-4">
            <p className="text-lg font-bold text-black">{timeLeft}s</p>
            <button
              className="text-gray-500 hover:text-black border p-1 rounded"
              onClick={handleQuit}
            >
              Quit
            </button>
          </div>

          <div className="flex justify-center mb-5 mt-10">
            <div className="flex w-full max-w-2xl gap-1">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-1 rounded transition-all duration-300 ${
                    i === currentIndex
                      ? "bg-orange-500"
                      : i < currentIndex
                      ? "bg-orange-300"
                      : "bg-gray-300"
                  }`}
                ></div>
              ))}
            </div>
          </div>

          <p className="text-center text-m text-black mb-10">
            Select the missing words in the correct order
          </p>

          <p className="text-lg mb-6 text-black flex flex-wrap gap-2">
            {parts.map((part, index) => (
              <React.Fragment key={index}>
                <span>{part}</span>
                {index < blanksCount && (
                  <button
                    onClick={() => handleRemoveWord(index)}
                    className={`min-w-[120px] px-0 py-0 text-center transition-all duration-200 cursor-pointer ${
                      filledWords[index]
                        ? "bg-white text-black border border-blue-600 rounded"
                        : "border-b-2 border-gray-400 text-transparent"
                    }`}
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {filledWords[index] || "_".repeat(10)}
                  </button>
                )}
              </React.Fragment>
            ))}
          </p>

          {/* Word Options */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 justify-center my-4">
            {question.options.map((word, index) => {
              const selected = isWordSelected(word);
              return (
                <button
                  key={`${word}-${index}`}
                  onClick={() => handleSelectWord(word)}
                  className={`px-1 py-1 w-full border border-gray-400 rounded transition-all duration-550 ${
                    selected
                      ? "invisible"
                      : "bg-white-500 text-black hover:bg-blue-600"
                  }`}
                  disabled={isTimeUp || isAnswered || selected}
                >
                  {word}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <div className="flex justify-end mt-6">
            <button
              className={` border border-gray-400 text-gray-500 px-2 py-1 rounded text-4xl flex items-center justify-center ${
                filledWords.includes(null) || isTimeUp || isAnswered
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={handleSubmit}
              disabled={filledWords.includes(null) || isTimeUp || isAnswered}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
