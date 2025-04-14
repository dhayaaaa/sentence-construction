import React from "react";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      {/* Top Header */}
      <header className="absolute top-4 left-0 pl-3 pr-3 w-full flex justify-between items-center">
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
      <div className="text-center max-w-md w-full">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Sentence Construction
        </h1>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          Select the correct words to complete the sentence by arranging the
          provided options in the right order.
        </p>
        <div className="flex justify-around mb-4">
          <div className="text-center">
            <p className="text-xs md:text-sm text-gray-500">
              Time Per Question
            </p>
            <span className="font-bold">30 sec</span>
          </div>
          <div className="text-center">
            <p className="text-xs md:text-sm text-gray-500">Total Questions</p>
            <span className="font-bold">10</span>
          </div>
          <div className="text-center">
            <p className="text-xs md:text-sm text-gray-500">Coins</p>
            <span className="font-bold">🪙0</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 items-center justify-center">
          <button
            className="bg-gray-300 px-6 py-2 rounded-lg shadow-lg mb-2 sm:mb-0"
            onClick={handleBackClick}
          >
            Back
          </button>
          <button
            className="bg-purple-500 text-white px-6 py-2 rounded-lg shadow-lg"
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
