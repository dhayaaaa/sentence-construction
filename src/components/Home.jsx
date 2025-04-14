import React from "react";
import Header from "./header1";
const Home = ({ onStart, onBack }) => {
  const handleBackClick = () => {
    const confirmQuit = window.confirm(
      "Are you sure you want to quit the test?"
    );
    if (confirmQuit) {
      onBack(); // Call the back function if confirmed
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      {/* Top Header */}
      <header className="absolute top-4 left-4 w-6xl  flex justify-between items-center">
        <h1 className="text-xl font-bold">Sentence Construction</h1>
        <div>
          <nav>
            <ul className="flex space-x-1">
              <li>
                <button className="w-2 h-2 bg-gray-700 rounded-full"></button>
              </li>
              <li>
                <button className="w-2 h-2 bg-gray-700 rounded-full"></button>
              </li>
              <li>
                <button className="w-2 h-2 bg-gray-700 rounded-full"></button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold mb-2">Sentence Construction</h1>
        <p className="text-m text-gray-600 mb-8">
          Select the correct words to complete the sentence by arranging the
          provided options in the right order.
        </p>
        <div className="flex justify-around mb-8">
          <div className="text-center">
            <p className="text-sm text-gray-500">Time Per Question</p>
            <span className="font-bold">30 sec</span>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Total Questions</p>
            <span className="font-bold">10</span>
          </div>
          <div className="text-center ">
            <p className="text-sm text-gray-500">Coins</p>
            <span className="font-bold">0</span>
          </div>
        </div>
        <div className="flex space-x-4 items-center justify-center">
          <button
            className="bg-white-300 px-9 py-2 rounded-lg shadow-lg"
            onClick={handleBackClick}
          >
            Back
          </button>
          <button
            className="bg-purple-500 text-white px-9 py-2 rounded-lg shadow-lg"
            onClick={onStart}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
