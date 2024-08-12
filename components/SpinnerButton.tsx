import React from "react";
import { FaSpinner } from "react-icons/fa6";

type ButtonType = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  loading: boolean;
  children: React.ReactNode;
};

function SpinnerButton({ onClick, loading, children }: ButtonType) {
  return (
    <button disabled={loading} className="btn-primary mt-4" onClick={onClick}>
      <>
        {loading ? (
          <div className="flex justify-center py-2 ">
            <FaSpinner className="animate-spin" />
          </div>
        ) : (
          children
        )}
      </>
    </button>
  );
}

export default SpinnerButton;
