import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

export default function WhiteBtn({ title, className, onClick, removeIcon }) {
  return (
    <button
      onClick={onClick}
      className={`md:py-2 group  w-1/2 md:border-2 border-[0.5px] uppercase flex justify-center items-center  text-white hover:text-primary relative overflow-hidden md:text-sm text-[10px] duration-300 ${className}`}
    >
      <span className="bg-white w-[500px] aspect-square absolute -top-96 -left-[500px] rotate-45 group-hover:top-1/2 group-hover:left-1/2 group-hover:-translate-x-1/2 group-hover:-translate-y-1/2 duration-300"></span>
      <div className="flex justify-center items-center  md:gap-5 gap-2 z-10">
        {title || "take a look"} {!removeIcon && <FaArrowRightLong />}
      </div>
    </button>
  );
}
