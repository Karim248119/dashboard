import React from "react";

export default function Button({ title, onClick, className, icon, type }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={` bg-primary p-1 group relative overflow-hidden  border-2 border-primary md:h-10 h-6  text-white hover:text-primary flex justify-center items-center ${className}`}
    >
      <span className="bg-white w-[500px] aspect-square absolute -top-96 -left-[500px] rotate-45 group-hover:top-1/2 group-hover:left-1/2 group-hover:-translate-x-1/2 group-hover:-translate-y-1/2 duration-300"></span>
      <div className="flex justify-center items-center md:gap-2 gap-1 md:text-base text-[10px] uppercase  z-10 ">
        <span>{title}</span>
        <span>{icon && icon}</span>
      </div>
    </button>
  );
}
