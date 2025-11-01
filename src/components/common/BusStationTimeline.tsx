import React from "react";

const BusStationTimeline = () => {
  return (
    <div>
      <ul className="flex flex-col mb-6">
        {/* first element */}
        <li className="flex gap-0">
          <div className="pe-4 py-3">
            <p className="font-bold text-base text-right">23:00</p>
            <p className="text-[#1d1d1da3] text-sm text-right">26 Oct</p>
          </div>
          <div className="mt-6 min-w-2 max-w-2 min-h-full bg-[#e6e6e6]">
            <div className="min-w-2 max-w-2 min-h-2 max-h-2 rounded-full bg-[#4b4b4b]"></div>
          </div>
          <div className="px-4 py-3">
            <p className="font-bold text-base text-left">Samarpan Hospital</p>
            <p className="text-[#1d1d1da3] text-sm text-left">
              Samarpan Hospital, Airport Road
            </p>
          </div>
        </li>

        {/* middle element go here */}
        <li className="flex gap-0">
          <div className="pe-4 py-3">
            <p className="font-bold text-base text-right">23:00</p>
            <p className="text-[#1d1d1da3] text-sm text-right">26 Oct</p>
          </div>
          <div className="min-w-2 max-w-2 min-h-full bg-[#e6e6e6]">
            <div className="mt-6 min-w-2 max-w-2 min-h-2 max-h-2 rounded-full bg-[#4b4b4b]"></div>
          </div>
          <div className="px-4 py-3">
            <p className="font-bold text-base text-left">Samarpan Hospital</p>
            <p className="text-[#1d1d1da3] text-sm text-left">
              Samarpan Hospital, Airport Road
            </p>
          </div>
        </li>

        <li className="flex gap-0">
          <div className="pe-4 py-3">
            <p className="font-bold text-base text-right">23:00</p>
            <p className="text-[#1d1d1da3] text-sm text-right">26 Oct</p>
          </div>
          <div className="min-w-2 max-w-2 min-h-full bg-[#e6e6e6]">
            <div className="mt-6 min-w-2 max-w-2 min-h-2 max-h-2 rounded-full bg-[#4b4b4b]"></div>
          </div>
          <div className="px-4 py-3">
            <p className="font-bold text-base text-left">Samarpan Hospital</p>
            <p className="text-[#1d1d1da3] text-sm text-left">
              Samarpan Hospital, Airport Road
            </p>
          </div>
        </li>

        {/* last element */}
        <li className="flex gap-0">
          <div className="pe-4 py-3">
            <p className="font-bold text-base text-right">23:00</p>
            <p className="text-[#1d1d1da3] text-sm text-right">26 Oct</p>
          </div>
          <div className="min-w-2 max-w-2 h-full bg-[#e6e6e6]">
            <div className="mt-6 min-w-2 max-w-2 min-h-2 max-h-2 rounded-full bg-[#4b4b4b]"></div>
          </div>
          <div className="px-4 py-3">
            <p className="font-bold text-base text-left">Samarpan Hospital</p>
            <p className="text-[#1d1d1da3] text-sm text-left">
              Samarpan Hospital, Airport Road
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default BusStationTimeline;
