import React from "react";

function SaveButton({ onClick, isSorted }) {
  return (
    <button
      className="w-16 p-1 rounded-md bg-slate-400 text-white font-medium"
      onClick={() => onClick()}
    >
      Save
    </button>
  );
}

export default SaveButton;
