import React, { useState } from "react";
import { TooltipType } from "./Tooltip.types";

const Tooltip = ({
  content,
  position,
  delay,
  children,
  bgColour,
}: TooltipType) => {
  const [active, setActive] = useState(false);
  let timeout: ReturnType<typeof setTimeout>;

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay || 300);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      className="relative inline-block"
      // When to show the tooltip
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {/* Wrapping */}
      {children ? children : null}
      {active && (
        <div
          style={{ backgroundColor: `${bgColour}` }}
          className={`${
            !position && "bottom-12 -left-10 -translate-y-0"
          } absolute z-50 ${
            position !== "top-left" && "w-[200%]"
          } rounded-2xl p-5 text-center text-base text-white 
          ${
            position === "top-row" &&
            "-right-28 bottom-[4.375rem] flex h-10 w-[250px] translate-y-1/2 items-center justify-center"
          } 
          ${
            position === "right" &&
            "left-full right-auto -translate-x-0 translate-y-1/2"
          } 
          ${
            position === "top-right" &&
            "bottom-20 -left-9 -translate-x-0 translate-y-1/2"
          } 
          ${
            position === "top-left" &&
            "bottom-24 left-auto right-0 w-[300px] translate-x-0 translate-y-1/2"
          } 
          ${
            position === "bottom" &&
            "top-full left-1/2 -translate-x-1/2 translate-y-0"
          }`}
        >
          {content}
          {/* CSS border triangles */}
          <div
            className={`absolute bg-black ${
              position === "right" ? "left-auto right-0" : ""
            } ${position === "left" ? "right-auto left-0" : ""} ${
              position === "top" ? "bottom-0 left-auto" : ""
            } ${
              position === "bottom" ? "top-0 left-auto" : ""
            } pointer-events-none h-0 w-0 border-solid border-transparent ${
              position === "right"
                ? "-ml-px border-l border-r-0 border-t border-b-0"
                : ""
            } ${
              position === "left"
                ? "-mr-px border-r border-l-0 border-t border-b-0"
                : ""
            } ${
              position === "top"
                ? "-mb-px border-b border-t-0 border-l border-r-0"
                : ""
            } ${
              position === "bottom"
                ? "-mt-px border-t border-b-0 border-l border-r-0"
                : ""
            }`}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
