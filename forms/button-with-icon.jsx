/** @author Tolga Malkoc <ghostlexly@gmail.com> */

import React from "react";

export default function ButtonWithIcon({ loading = false, className, icon: Icon, label, onClick }) {
  if (loading === false) {
    return (
      <button
        onClick={onClick}
        type="button"
        className={
          "flex items-center justify-center px-6 py-2 text-sm font-medium transition-colors duration-300 transform rounded-md focus:outline-none " +
          className
        }
      >
        <Icon />

        <span className="hidden mx-2 sm:inline">{label}</span>
      </button>
    );
  } else {
    return (
      <button
        type="button"
        className={
          "flex items-center justify-center px-6 py-2 mx-2 text-sm font-medium transition-colors duration-300 transform rounded-md focus:outline-none cursor-not-allowed" +
          className
        }
        disabled
      >
        <svg
          className="animate-spin mr-3 mb-1 h-4 w-4 text-white inline"
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
    );
  }
}
