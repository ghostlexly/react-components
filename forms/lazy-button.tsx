/** @author Tolga Malkoc <ghostlexly@gmail.com> */

import React from "react";

/**
 * Add a submit button with a spinner for loading purpose.
 *
 *
 * Usage:
 *  (loading should be true or false)
 *  <LazyButton loading={loading} label={"Submit"} style={{width: "150px", margin: "auto"}} onClick={onSubmit} />
 *
 * @param props
 * @returns {*}
 * @constructor
 */
export default function LazyButton({
  loading,
  label,
  style = null as React.CSSProperties,
  onClick,
  className,
  type = "button" as React.ButtonHTMLAttributes<HTMLButtonElement>["type"],
}) {
  if (loading === false) {
    return (
      <button style={style} onClick={onClick} className={className} type={type}>
        {label}
      </button>
    );
  } else {
    return (
      <button style={style} className={"cursor-not-allowed opacity-75 " + className} disabled>
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
