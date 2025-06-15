import React from "react";
const InfiniteLoop = () => {
  const texts = [
    "|",
    "EAST",
    "OR",
    "WEST",
    "POSTERWEB",
    "IS",
    "BEST",
    "|",
    "BUDGET",
    "FRIENDLY",
    "PLUS",
    "GREAT",
    "QUALITY",
  ];

  return (
    <div className="flex overflow-hidden bg-black lg:h-30 h-auto items-center">
      <ul className="flex animate-infinite-scroll gap-10 lg:py-4 text-white text-xl lg:text-2xl">
        {[...texts, ...texts].map((text, idx) => {
          return (
            <li key={idx} className="text-white">
              {text}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default InfiniteLoop;
