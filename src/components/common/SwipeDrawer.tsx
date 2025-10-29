import React, { useState } from "react";
import BusAndRouteInfo from "./BusAndRouteInfo";
import { IoIosArrowDown } from "react-icons/io";

const SwipeDrawer = () => {
  let [open, setOpen] = useState(false);
  return (
    <div
      className={`md:hidden fixed top-[calc(100%-128px)] bottom-0 left-0 right-0 z-[999] bg-white ${
        open
          ? "!top-0 h-screen overflow-scroll"
          : "h-[128px] overflow-hidden rounded-xl"
      } duration-300`}
      onClick={() => {
        setOpen(true);
      }}
    >
      {open ? (
        <div className="">
          <button
            type="button"
            className="p-4"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              event.stopPropagation();
              setOpen(false);
            }}
          >
            <IoIosArrowDown />
          </button>
        </div>
      ) : (
        <div className="py-3 flex justify-center">
          <p className="h-1 w-9 bg-[#b0b0b0] rounded-s-full rounded-e-full"></p>
        </div>
      )}

      <BusAndRouteInfo />
    </div>
  );
};

export default SwipeDrawer;
