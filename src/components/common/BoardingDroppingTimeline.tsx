import React, { useState } from "react";
import { TimelineType } from "./BusStationTimeline";
import Radio from "@mui/material/Radio";

const BoardingDroppingTimeline = ({
  timeLineList,
}: {
  timeLineList: TimelineType[];
}) => {
  const handleStopChange = () => {};
  return (
    <div className="w-full">
      <table className="w-full mb-6">
        <tbody>
          {timeLineList &&
            timeLineList.map((place, inx) => (
              <tr
                key={`timeLineList-place-${inx}`}
                className="flex items-center border-b border-b-[#1d1d1da3]"
              >
                <td>
                  <div className="px-4 py-3">
                    <p className="font-bold text-base text-right">
                      {place.leftPart[0]}
                    </p>
                    <p className="text-[#1d1d1da3] text-sm text-right">
                      {place.leftPart[1]}
                    </p>
                  </div>
                </td>

                <td className="flex-1">
                  <div className="px-4 py-3">
                    <p className="font-bold text-base text-left">
                      {place.rightPart[0]}
                    </p>
                    <p className="text-[#1d1d1da3] text-sm text-left">
                      {place.rightPart[1]}
                    </p>
                  </div>
                </td>

                <td className="p-2.5">
                  <Radio onChange={handleStopChange} value="b" />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default BoardingDroppingTimeline;
