/** @author Tolga Malkoc <ghostlexly@gmail.com> */

import React, { useRef, useState } from "react";

export default function LoadingDotsComponent({ className, style, width = 100, height = 100, color = "gray" }) {
  return (
    <div className={`loading ${className}`} style={style}>
      <div className="loader loader--style2" title="1">
        <svg
          version="1.1"
          id="L5"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="-19 0 100 100"
        >
          <circle fill={color} stroke="none" cx="6" cy="50" r="6">
            <animateTransform
              attributeName="transform"
              dur="1s"
              type="translate"
              values="0 15 ; 0 -15; 0 15"
              repeatCount="indefinite"
              begin="0.1"
            />
          </circle>
          <circle fill={color} stroke="none" cx="30" cy="50" r="6">
            <animateTransform
              attributeName="transform"
              dur="1s"
              type="translate"
              values="0 10 ; 0 -10; 0 10"
              repeatCount="indefinite"
              begin="0.2"
            />
          </circle>
          <circle fill={color} stroke="none" cx="54" cy="50" r="6">
            <animateTransform
              attributeName="transform"
              dur="1s"
              type="translate"
              values="0 5 ; 0 -5; 0 5"
              repeatCount="indefinite"
              begin="0.3"
            />
          </circle>
        </svg>
      </div>
      <style jsx>{`
        .loading {
          text-align: center;
          margin: auto;
          height: ${height}px;
          width: ${width}px;
        }
      `}</style>
    </div>
  );
}
