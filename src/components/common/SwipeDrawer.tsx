import React, { useRef, useState } from "react";
import BusAndRouteInfo from "./BusAndRouteInfo";
import { IoIosArrowDown } from "react-icons/io";

const SwipeDrawer = () => {
  let [open, setOpen] = useState(false);
  const BusInfoParentRef = useRef<HTMLDivElement | null>(null);
  return (
    <div
      className={`md:hidden fixed z-[999] bg-white min-h-screen hideScrollBar ${
        open
          ? "inset-0 overflow-y-auto"
          : "-bottom-[calc(100vh-128px)] left-0 right-0 h-[128px] overflow-hidden rounded-xl"
      } duration-300`}
      onClick={() => {
        setOpen(true);
      }}
      ref={BusInfoParentRef}
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

      <BusAndRouteInfo parentRef={BusInfoParentRef} />
    </div>
  );
};

export default SwipeDrawer;
