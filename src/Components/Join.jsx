import React from "react";
import mark from "../assets/mark.svg";

const Join = () => {
  return (
    <div className="flex xsm:hidden justify-center items-center  my-5">
      <span className="flex flex-col gap-1 text-[48px] items-center justify-center font-bold">
        Join us today to
        <span className="flex gap-2">
          explore partnership
          <span className="flex flex-col  w-fit">
            opportunities
            <img src={mark} className="w-[367px]" />
          </span>
        </span>
      </span>
    </div>
  );
};

export default Join;
