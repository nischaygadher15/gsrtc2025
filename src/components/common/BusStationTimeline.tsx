import React, { useEffect, useState } from "react";

export interface TimelineType {
  leftPart: string[];
  rightPart: string[];
}

const BusStationTimeline = ({
  timeLineView,
  timeLineList,
}: {
  timeLineView: "half" | "full";
  timeLineList: TimelineType[];
}) => {
  const [stopList, setStopList] = useState<TimelineType[] | []>([]);
  let firstStop = timeLineList[0];
  let lastStop = timeLineList[timeLineList.length - 1];

  useEffect(() => {
    if (timeLineView === "half") {
      setStopList(timeLineList.slice(1, 3));
    } else {
      setStopList(timeLineList.slice(1, timeLineList.length - 2));
    }
  }, []);
  return (
    <div>
      <table className="mb-6">
        <tbody>
          {/* First element */}
          <tr>
            <td>
              <div className="pe-4 py-3">
                <p className="font-bold text-base text-right">
                  {firstStop.leftPart[0]}
                </p>
                <p className="text-[#1d1d1da3] text-sm text-right">
                  {firstStop.leftPart[1]}
                </p>
              </div>
            </td>
            <td className="bg-[#e6e6e6]">
              <div className="min-w-2 max-w-2 min-h-2 max-h-2 rounded-full bg-[#4b4b4b]"></div>
            </td>
            <td>
              <div className="px-4 py-3">
                <p className="font-bold text-base text-left">
                  {firstStop.rightPart[0]}
                </p>
                <p className="text-[#1d1d1da3] text-sm text-left">
                  {firstStop.rightPart[1]}
                </p>
              </div>
            </td>
          </tr>

          {/* middle element go here */}
          {stopList &&
            stopList.map((place, inx) => (
              <tr key={`timeLineList-place-${inx}`}>
                <td>
                  <div className="pe-4 py-3">
                    <p className="font-bold text-base text-right">
                      {place.leftPart[0]}
                    </p>
                    <p className="text-[#1d1d1da3] text-sm text-right">
                      {place.leftPart[1]}
                    </p>
                  </div>
                </td>
                <td className="bg-[#e6e6e6]">
                  <div className="min-w-2 max-w-2 min-h-2 max-h-2 rounded-full bg-[#4b4b4b]"></div>
                </td>
                <td>
                  <div className="px-4 py-3">
                    <p className="font-bold text-base text-left">
                      {place.rightPart[0]}
                    </p>
                    <p className="text-[#1d1d1da3] text-sm text-left">
                      {place.rightPart[1]}
                    </p>
                  </div>
                </td>
              </tr>
            ))}

          {/* last element */}
          <tr>
            <td>
              <div className="pe-4 py-3">
                <p className="font-bold text-base text-right">
                  {lastStop.leftPart[0]}
                </p>
                <p className="text-[#1d1d1da3] text-sm text-right">
                  {lastStop.leftPart[1]}
                </p>
              </div>
            </td>
            <td className="bg-[#e6e6e6]">
              <div className="min-w-2 max-w-2 min-h-2 max-h-2 rounded-full bg-[#4b4b4b]"></div>
            </td>
            <td>
              <div className="px-4 py-3">
                <p className="font-bold text-base text-left">
                  {lastStop.rightPart[0]}
                </p>
                <p className="text-[#1d1d1da3] text-sm text-left">
                  {lastStop.rightPart[1]}
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BusStationTimeline;
