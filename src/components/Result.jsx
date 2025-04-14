import React from "react";
import Header from "./header";
const Result = ({ score, total, userSelections = [] }) => {
  const percentage = Math.round((score / total) * 100);

  const radius = 70;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
 const handleQuit = () => {
   if (window.confirm("Are you sure want to go Dashboard?")) {
     window.location.href = "/"; // Redirect to home page
   }
 };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-8">
      <Header />
      <div className="w-full max-w-3xl rounded-xl p-8">
        {/* Score circle */}
        <div className="flex justify-center mb-8">
          <svg height={radius * 2} width={radius * 2} className="block">
            {/* Background circle */}
            <circle
              stroke="#e5e7eb"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            {/* Progress arc starting from top */}
            <circle
              stroke="#10b981"
              fill="transparent"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              transform={`rotate(-90 ${radius} ${radius})`} // Rotate only the arc
            />

            {/* Percentage text - perfectly centered */}
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-green-600 font-bold text-5xl"
            >
              {percentage}
            </text>

            {/* Subtext below percentage */}
            <text
              x="50%"
              y="55%"
              dy="1.8em"
              textAnchor="middle"
              className="fill-green-600 font-medium text-sm"
            >
              Overall Score
            </text>
          </svg>
        </div>

        <h2 className="text-3xl font-bold text-center text-green-600 mb-4">
          {score} out of {total} Correct
        </h2>

        <p className="text-center text-gray-700 mb-6">
          While you correctly formed several sentences, there are a couple of
          areas where improvement is needed. Pay close attention to sentence
          structure and word placement to ensure clarity and correctness. Review
          your responses below for more details.
        </p>
        <button
          className=" text-blue-800 border border-blue-800 bg-white hover:bg-blue-800 hover:text-white cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-white dark:hover:bg-blue-700 dark:focus:ring-white"
          onClick={handleQuit}
        >
          Go to Dashboard
        </button>
        <div>
          <button className="bg-white-500 text-black-600 font-semibold py-3 px-4 rounded mb-6 mt-4 cursor-pointer">
            ∨
          </button>
        </div>

        {/* counts */}
        <div className="flex justify-between mb-6 text-center">
          <div className="w-1/2">
            <p className="text-xl font-bold text-green-600">{score}</p>
            <p className="text-gray-600">Correct Answers</p>
          </div>
          <div className="w-1/2">
            <p className="text-xl font-bold text-red-600">{total - score}</p>
            <p className="text-gray-600">Incorrect Answers</p>
          </div>
        </div>

        {/* Answer review */}
        <div className="space-y-6">
          {userSelections.map((entry, index) => {
            const userResponse = entry.selected.join(", ").trim();
            const correctResponse = entry.correct.join(", ").trim();
            const isCorrect = userResponse === correctResponse;

            return (
              <div
                key={index}
                className="border border-gray-300  rounded-md shadow"
              >
                <div className="flex justify-between mb-2 p-2">
                  <p className="bg-gray-100 text-sm font-semibold text-gray-800 mb-2">
                    Prompt
                  </p>
                  <p className="text-md font-semibold p-0.5 text-gray-800 mb-2">
                    {index + 1}/{total}
                  </p>
                </div>
                <p className="text-gray-700 mb-5 ml-5 mr-5">{entry.question}</p>
                <div className="bg-gray-100 ">
                  <div
                    className={`p-4 rounded text-left bg-${
                      isCorrect ? "green-100" : "red-100"
                    } `}
                  >
                    <p
                      className={`text-lg  pb-3.5 gap-1.5 font-semibold flex ${
                        isCorrect ? "text-green-500" : "text-red-500 "
                      }`}
                    >
                      <p className="text-gray-600   ">Your response </p>{" "}
                      {isCorrect ? "Correct" : "Wrong"}
                    </p>
                    <p className="text-sm text-gray-700">
                      {isCorrect ? userResponse : `${userResponse}`}
                    </p>
                  </div>

                  {!isCorrect && (
                    <p className="text-sm text-gray-700 pb-6  pt-3.5">
                      <strong>Correct Answer:</strong> {correctResponse}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Result;
