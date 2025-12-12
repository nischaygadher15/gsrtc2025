"use client";
import { FaStar } from "react-icons/fa";
import { RiBusLine } from "react-icons/ri";
import { GoDash } from "react-icons/go";
import { LuDot } from "react-icons/lu";

const BusCard = ({ openViewDrawer }: { openViewDrawer: () => void }) => {
  return (
    <div
      className="bg-white flex flex-col rounded-2xl shadow-md p-4 cursor-pointer"
      onClick={openViewDrawer}
    >
      <div className="w-full flex flex-wrap md:flex-nowrap lg:pb-3 gap-y-4">
        <div className="w-3/4 lg:w-2/5 order-3 md:order-1">
          <p className="flex items-center gap-x-1">
            <span className="text-sm font-semibold">Vrundavan Travels</span>
            <RiBusLine className="text-xl" />
          </p>
          <p className="text-xs text-[#1d1d1da3]">NON A/C Sleeper (2+1)</p>
        </div>

        <div className="w-1/4 lg:w-[10%] flex justify-end md:justify-center order-4 md:order-2">
          <div className="p-[2px] inline-block bg-[#e2eee3]  rounded-lg">
            <p className="px-1 py-[2px] flex items-center rounded-md text-white gap-x-1 bg-[#007b28]">
              <FaStar className="text-xs" />
              <span className="text-xs font-bold">3.9</span>
            </p>
            <p className="text-xs text-black text-center">38</p>
          </div>
        </div>

        <div className="w-3/4 lg:w-2/5 flex justify-start md:justify-center order-1 md:order-3">
          <div className="inline-flex flex-col">
            <p className="inline-flex flex-nowrap gap-x-1 items-center">
              <span className="font-bold">23:00</span>
              <GoDash className="text-slate-500" />
              <span className="font-semibold text-black/70">05:30</span>
            </p>
            <p className="inline-flex flex-nowrap text-xs text-[#1d1d1da3] items-center">
              <span>{"6h 30m"}</span>
              <LuDot />
              <span>{"13 seats(4 Single)"}</span>
            </p>
          </div>
        </div>

        <div className="w-1/4 lg:w-[10%] flex flex-col order-2 md:order-4">
          <p className="font-bold text-right">&#8377;500</p>
          <p className="text-xs text-right text-[#1d1d1da3]">Onwards</p>
        </div>
      </div>

      <div className="hidden lg:flex justify-between items-center pt-3 border-t border-dotted border-t-slate-200">
        <ul className="flex list-none">
          <li className="border-e border-e-slate-200">
            <button
              type="button"
              className="px-4 py-2 text-xs font-semibold rounded-s-full rounded-e-full text-[#5258e4] hover:bg-[#e4ecfd] cursor-pointer"
            >
              Boarding/ Dropping Points
            </button>
          </li>
          <li className="border-e border-e-slate-200">
            <button
              type="button"
              className="px-4 py-2 text-xs font-semibold rounded-s-full rounded-e-full text-[#5258e4] hover:bg-[#e4ecfd] cursor-pointer"
            >
              Ratings & Reviews
            </button>
          </li>
          <li className="border-e border-e-slate-200">
            <button
              type="button"
              className="px-4 py-2 text-xs font-semibold rounded-s-full rounded-e-full text-[#5258e4] hover:bg-[#e4ecfd] cursor-pointer"
            >
              Bus Photos
            </button>
          </li>
          <li className="border-e border-e-slate-200">
            <button
              type="button"
              className="px-4 py-2 text-xs font-semibold rounded-s-full rounded-e-full text-[#5258e4] hover:bg-[#e4ecfd] cursor-pointer"
            >
              Cancellation Policies
            </button>
          </li>
        </ul>

        <div>
          <button
            type="button"
            className="text-white py-3 px-5 rounded-s-full rounded-e-full font-bold bg-primary cursor-pointer outline-none"
            // onClick={openViewDrawer}
          >
            View seats
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusCard;
