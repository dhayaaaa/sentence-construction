import React from "react";

const Header = () => {
  return (
    <header className="bg-gray-100 shadow-md w-full">
      <div className="max-w-10xl px-4 py-3 flex justify-between items-center">
        <h1 className="text-1xl font-bold text-gray-800">
          Sentence Construction
        </h1>
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
  );
};

export default Header;
