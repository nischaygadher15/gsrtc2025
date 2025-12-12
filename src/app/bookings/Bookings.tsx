"use client";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import BookingCard from "@/components/common/BookingCard";
import useWindowSize from "@/Hooks/useWindowSize";

const Bookings = () => {
  const [bookingTab, setBookingTab] = useState<number>(0);
  let winSize = useWindowSize();

  const handleBookingTbs = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue <= 1) setBookingTab(newValue);
  };

  return (
    <div className="myContainer bg-[#f2f2f8]">
      <div className="py-7">
        <p className="font-semibold text-xl">My Trips</p>

        <div className="my-7">
          <Tabs
            value={bookingTab}
            onChange={handleBookingTbs}
            aria-label="basic tabs example"
            variant={winSize > 640 ? "standard" : "fullWidth"}
            sx={{
              "& .MuiTab-root": {
                marginRight: winSize > 640 ? "100px" : "",
                textAlign: "left",
                padding: 0,
                fontSize: 20,
                textTransform: "capitalize",
                fontWeight: 500,
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#173c62",
              },
              "& .Mui-selected": {
                color: "#173c62 !important",
              },
            }}
          >
            <Tab label="Upcoming" sx={{}} />
            <Tab label="Completed" />
          </Tabs>
        </div>

        {/* Upcoming */}
        {bookingTab == 0 && (
          <ul className="flex flex-col gap-3">
            <li>
              <BookingCard />
            </li>
            <li>
              <BookingCard />
            </li>
            <li>
              <BookingCard />
            </li>
            <li>
              <BookingCard />
            </li>
            <li>
              <BookingCard />
            </li>
          </ul>
        )}

        {/* Completed */}
        {bookingTab == 1 && (
          <ul className="flex flex-col gap-3">
            <li>
              <BookingCard />
            </li>
            <li>
              <BookingCard />
            </li>
            <li>
              <BookingCard />
            </li>
            <li>
              <BookingCard />
            </li>
            <li>
              <BookingCard />
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Bookings;
