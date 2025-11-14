import React, { ReactElement, useState } from "react";
import { TimelineType } from "./BusStationTimeline";
import Radio from "@mui/material/Radio";
import { RadioGroup } from "@mui/material";

const BoardingDroppingTimeline = ({
  timeLineList,
}: {
  timeLineList: TimelineType[];
}) => {
  // const handleStopChange = () => {};
  return (
    <div className="w-full">
      <RadioGroup
        name="BoardingDroppingPoint"
        defaultValue={"Ujala circle4"}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          console.log("RadioGroup: ", e.target.value);
        }}
      >
        <table className="w-full mb-6">
          <tbody>
            {timeLineList &&
              timeLineList.map((place, inx, Arr) => (
                <tr
                  key={`timeLineList-place-${inx}`}
                  className={`flex items-center cursor-pointer ${
                    inx == 0
                      ? "border-b border-t border-b-slate-300 border-t-slate-300"
                      : inx == Arr.length - 1
                      ? ""
                      : "border-b border-b-slate-300"
                  }`}
                  onClick={(event) => {
                    let radioBtn = event.currentTarget.querySelector("input");
                    if (radioBtn) {
                      radioBtn?.click();
                      // console.log(radioBtn?.value, radioBtn?.checked);
                    }
                  }}
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
                    <Radio
                      // onChange={handleStopChange}
                      value={place.rightPart[0] + inx}
                      id={`boardingPoint-${place.rightPart[0]}-${inx}`}
                      sx={{
                        color: "#173c62",
                        "&.Mui-checked": {
                          color: "#173c62",
                        },
                      }}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </RadioGroup>
    </div>
  );
};

export default BoardingDroppingTimeline;
