import React, { useState } from "react";
import BusAndRouteInfo from "./BusAndRouteInfo";
import { IoIosArrowDown } from "react-icons/io";

const SwipeDrawer = () => {
  let [open, setOpen] = useState(false);
  return (
    <div
      className={`md:hidden absolute bottom-0 left-0 right-0 z-[999] bg-white ${
        open
          ? "h-screen overflow-scroll"
          : "h-[128px] overflow-hidden rounded-xl"
      }`}
      onClick={() => {
        setOpen(true);
      }}
    >
      <div className="py-3 flex justify-center">
        <p className="h-1 w-9 bg-[#b0b0b0] rounded-s-full rounded-e-full"></p>
      </div>

      <div className="pt-4 px-4 flex justify-center">
        <button
          type="button"
          onClick={() => {
            setOpen(true);
          }}
        >
          <IoIosArrowDown />
        </button>
      </div>

      <BusAndRouteInfo />
    </div>
  );
};

export default SwipeDrawer;
