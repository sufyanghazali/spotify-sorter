import React from "react";

function SortButton({ onClick }) {
  return (
    <button
      className="w-16 p-1 rounded-md bg-blue-600 text-white font-medium"
      onClick={() => onClick()}
    >
      Sort
    </button>
  );
}

export default SortButton;
