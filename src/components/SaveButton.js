import React from "react";

function SaveButton({ onClick, sorted }) {
  return (
    <button
      className={`w-16 p-1 mr-1 rounded-md text-white bg-slate-400 ${
        sorted ? "opacity-50 " : "font-medium"
      }`}
      onClick={() => onClick()}
      disabled={sorted}
    >
      Save
    </button>
  );
}

export default SaveButton;
