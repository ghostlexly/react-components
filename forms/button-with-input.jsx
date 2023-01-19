/** @author Tolga Malkoc <ghostlexly@gmail.com> */

import { useState } from "react";
import React from "react";

export default function ButtonWithInput({ name, label, placeholder, onClick, loading, onKeyDown }) {
  const [text, setText] = useState("");

  return (
    <div className="flex items-center justify-center">
      <div className="min-w-[33vh] md:min-w-[400px] flex flex-col p-1.5 overflow-hidden border rounded-lg lg:flex-row focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
        <input
          className="w-full px-3 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
          type="text"
          name={name}
          placeholder={placeholder}
          aria-label={placeholder}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
        />

        {!loading && (
          <button
            onClick={() => onClick(text)}
            className="px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-primary-600 rounded-md hover:bg-primary-400 focus:bg-primary-400 focus:outline-none"
          >
            {label}
          </button>
        )}

        {loading && (
          <button
            onClick={() => onClick(text)}
            className="px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-primary-600 rounded-md hover:bg-primary-400 focus:bg-primary-400 focus:outline-none cursor-not-allowed"
            disabled
          >
            <svg
              className="animate-spin mb-1 h-4 w-4 text-white inline"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
