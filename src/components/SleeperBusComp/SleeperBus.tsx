import React from "react";
import { TbSteeringWheel } from "react-icons/tb";

export const SleeperSeat = ({
  seatId,
  status,
  text,
}: {
  seatId: string;
  status: string;
  text: string;
}) => {
  return (
    <div className="flex flex-col items-center">
      <button
        id={seatId}
        type="button"
        className="w-8 h-[70px] px-1 py-2 border border-[#007b2d] rounded-md flex justify-center items-end cursor-pointer"
      >
        <p className="w-5 h-[6px] bg-[#e2eee3] rounded-sm"></p>
      </button>
      <p className="text-[#1d1d1da3] text-[10px] text-center">{text}</p>
    </div>
  );
};

const SleeperBus = () => {
  let lowerDeckSingleSeats = [
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
      status: "available",
      text: "₹500",
    },
    {
      seatId: "sleeper-lower-4",
      status: "available",
      text: "₹500",
    },
    {
      seatId: "sleeper-lower-5",
      status: "available",
      text: "₹500",
    },
    {
      seatId: "sleeper-lower-6",
      status: "available",
      text: "₹500",
    },
  ];

  let lowerDeckDoubleSeats = [
    [
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
    ],
    [
      {
        seatId: "sleeper-lower-3",
        status: "available",
        text: "₹500",
      },
      {
        seatId: "sleeper-lower-4",
        status: "available",
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
        status: "available",
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
