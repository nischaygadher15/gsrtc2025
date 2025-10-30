"use client";
import React, { useEffect, useState } from "react";
import { TbSteeringWheel } from "react-icons/tb";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";

interface SeatTheme {
  bed: string;
  pillow: string;
  text: string;
}

type SeatStatus =
  | "available"
  | "availableForMaleOnly"
  | "availableForFemaleOnly"
  | "booked"
  | "selected"
  | "bookedByFemale"
  | "bookedByMale";

export const SleeperSeat = ({
  seatId,
  status,
  text,
}: {
  seatId: string;
  status: SeatStatus;
  text: string;
}) => {
  let [seatStatus, setSeatStatus] = useState<SeatStatus>(status);

  let selectedSeatTheme = {
    bed: "border-2 border-[#007b2d] bg-[#65af80] cursor-pointer",
    pillow: "bg-[#007a2d]",
    text: "text-[#007a2d]",
  };

  let availableSeatTheme = {
    bed: "border border-[#007b2d] cursor-pointer",
    pillow: "bg-[#e2eee3]",
    text: "text-[#1d1d1da3]",
  };

  let availableForMaleOnly = {
    bed: "border-2 border-[#587eee] bg-white cursor-pointer",
    pillow: "bg-[#e4ebf9]",
    text: "text-[#587eee]",
  };

  let availableForFemaleOnly = {
    bed: "border-2 border-[#ff7ac9] bg-white cursor-pointer",
    pillow: "bg-[#ffe3f3]",
    text: "text-[#ff7ac9]",
  };

  const getSeatTheme = (sTheme: SeatStatus): SeatTheme => {
    switch (sTheme) {
      case "available":
        return availableSeatTheme;
      case "selected":
        return selectedSeatTheme;
      case "availableForMaleOnly":
        return availableForMaleOnly;
      case "availableForFemaleOnly":
        return availableForFemaleOnly;
      default:
        return availableSeatTheme;
    }
  };

  const handleSeatOnClick = () => {
    switch (seatStatus) {
      case "available": {
        setSeatStatus("selected");
        break;
      }
      case "selected": {
        setSeatStatus("available");
        break;
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        id={seatId}
        type="button"
        className={`relative w-8 h-[70px] px-1 py-2 rounded-md flex justify-center items-end ${
          getSeatTheme(seatStatus).bed
        }`}
        onClick={handleSeatOnClick}
      >
        {(seatStatus === "availableForMaleOnly" ||
          seatStatus === "bookedByMale") && (
          <FaMale className="absolute top-1/2 left-1/2 -translate-y-1/2 text-[#6a8df0] -translate-x-1/2" />
        )}

        {(seatStatus === "availableForFemaleOnly" ||
          seatStatus === "bookedByFemale") && (
          <FaFemale className="absolute top-1/2 left-1/2 -translate-y-1/2 text-[#ff7ac9] -translate-x-1/2" />
        )}

        <p
          className={`w-5 h-[6px] rounded-sm ${
            getSeatTheme(seatStatus).pillow
          }`}
        ></p>
      </button>
      <p className={`text-[10px] text-center ${getSeatTheme(seatStatus).text}`}>
        {text}
      </p>
    </div>
  );
};

const SleeperBus = () => {
  let lowerDeckSingleSeats: {
    seatId: string;
    status: SeatStatus;
    text: string;
  }[] = [
    {
      seatId: "sleeper-lower-1",
      status: "available",
      text: "₹500",
    },
    {
      seatId: "sleeper-lower-2",
      status: "available",
      text: "₹500",
    },
    {
      seatId: "sleeper-lower-3",
      status: "availableForMaleOnly",
      text: "₹500",
    },
    {
      seatId: "sleeper-lower-4",
      status: "availableForFemaleOnly",
      text: "₹500",
    },
    {
      seatId: "sleeper-lower-5",
      status: "availableForMaleOnly",
      text: "₹500",
    },
    {
      seatId: "sleeper-lower-6",
      status: "available",
      text: "₹500",
    },
  ];

  let lowerDeckDoubleSeats: {
    seatId: string;
    status: SeatStatus;
    text: string;
  }[][] = [
    [
      {
        seatId: "sleeper-lower-1",
        status: "available",
        text: "₹500",
      },
      {
        seatId: "sleeper-lower-2",
        status: "availableForFemaleOnly",
        text: "₹500",
      },
    ],
    [
      {
        seatId: "sleeper-lower-3",
        status: "available",
        text: "₹500",
      },
      {
        seatId: "sleeper-lower-4",
        status: "availableForFemaleOnly",
        text: "₹500",
      },
    ],
    [
      {
        seatId: "sleeper-lower-5",
        status: "available",
        text: "₹500",
      },
      {
        seatId: "sleeper-lower-6",
        status: "availableForFemaleOnly",
        text: "₹500",
      },
    ],
    [
      {
        seatId: "sleeper-lower-7",
        status: "available",
        text: "₹500",
      },
      {
        seatId: "sleeper-lower-8",
        status: "available",
        text: "₹500",
      },
    ],
    [
      {
        seatId: "sleeper-lower-9",
        status: "available",
        text: "₹500",
      },
      {
        seatId: "sleeper-lower-10",
        status: "available",
        text: "₹500",
      },
    ],
    [
      {
        seatId: "sleeper-lower-11",
        status: "available",
        text: "₹500",
      },
      {
        seatId: "sleeper-lower-12",
        status: "available",
        text: "₹500",
      },
    ],
  ];

  return (
    <div className="flex justify-center gap-x-5">
      {/* Lower deck */}
      <div className="w-[180px] bg-white py-4 px-3 rounded-3xl">
        {/* Driver seat */}
        <div className="flex justify-between items-center mb-7">
          <span className="text-sm font-bold">Lower deck</span>
          <TbSteeringWheel className="text-4xl text-[#b0b0b0]" />
        </div>

        {/* Passenger seats */}
        <div className="flex justify-between">
          {/* single seats */}
          <ul className="flex flex-col gap-y-1">
            {lowerDeckSingleSeats &&
              lowerDeckSingleSeats.map((seat, inx) => (
                <li key={`SleeperBus-singleSeat-${inx}`}>
                  <SleeperSeat
                    seatId={seat.seatId}
                    status={seat.status}
                    text={seat.text}
                  />
                </li>
              ))}
          </ul>

          {/* Double seats */}
          <ul className="flex flex-col gap-y-1">
            {lowerDeckDoubleSeats &&
              lowerDeckDoubleSeats.map((seats, inx) => (
                <li
                  key={`SleeperBus-doubleSeat-${inx}`}
                  className="flex gap-x-2"
                >
                  <SleeperSeat
                    seatId={seats[0].seatId}
                    status={seats[0].status}
                    text={seats[0].text}
                  />
                  <SleeperSeat
                    seatId={seats[1].seatId}
                    status={seats[1].status}
                    text={seats[1].text}
                  />
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* Upper deck */}
      <div className="w-[180px] bg-white py-4 px-3 rounded-3xl">
        {/* Driver seat */}
        <div className="flex justify-between items-center mb-7">
          <span className="text-sm font-bold">Upper deck</span>
          <TbSteeringWheel className="text-4xl text-[#b0b0b0] opacity-0" />
        </div>

        {/* Passenger seats */}
        <div className="flex justify-between">
          {/* single seats */}
          <ul className="flex flex-col gap-y-1">
            {lowerDeckSingleSeats &&
              lowerDeckSingleSeats.map((seat, inx) => (
                <li key={`SleeperBus-singleSeat-${inx}`}>
                  <SleeperSeat
                    seatId={seat.seatId}
                    status={seat.status}
                    text={seat.text}
                  />
                </li>
              ))}
          </ul>

          {/* Double seats */}
          <ul className="flex flex-col gap-y-1">
            {lowerDeckDoubleSeats &&
              lowerDeckDoubleSeats.map((seats, inx) => (
                <li
                  key={`SleeperBus-doubleSeat-${inx}`}
                  className="flex gap-x-2"
                >
                  <SleeperSeat
                    seatId={seats[0].seatId}
                    status={seats[0].status}
                    text={seats[0].text}
                  />
                  <SleeperSeat
                    seatId={seats[1].seatId}
                    status={seats[1].status}
                    text={seats[1].text}
                  />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SleeperBus;
