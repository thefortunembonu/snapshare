import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { RiAddLine } from "react-icons/ri";

export const BtnPrimary = () => {
  return (
    <button className="btn-primary flex items-center">
      <span className="hidden md:flex">Create</span>
      <span>
        <RiAddLine />
      </span>
    </button>
  );
};
