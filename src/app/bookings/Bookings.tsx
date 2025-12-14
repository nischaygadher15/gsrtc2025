"use client";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import BookingCard from "@/components/common/BookingCard";
import useWindowSize from "@/Hooks/useWindowSize";
import Link from "next/link";

const Bookings = () => {
  const [bookingTab, setBookingTab] = useState<number>(0);
  let winSize = useWindowSize();
  const trips = [1, 2, 3, 4, 5];

  const handleBookingTbs = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue <= 2) setBookingTab(newValue);
  };

  return (
    <div className="myContainer bg-[#f2f2f8]">
      <div className="md:px-10 lg:px-24">
        <p className="font-semibold text-xl py-7">My Trips</p>
        <div className="pb-7">
          <div className="mb-7">
            <Tabs
              value={bookingTab}
              onChange={handleBookingTbs}
              variant={winSize > 640 ? "standard" : "scrollable"}
              scrollButtons={"auto"}
              sx={{
                "& .MuiTab-root": {
                  textAlign: "left",
                  fontSize: 18,
                  textTransform: "capitalize",
                  fontWeight: 500,
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#173c62",
                },
                "& .Mui-selected": {
                  color: "#173c62 !important",
                },
                "& .MuiTabs-list": {
                  gap: winSize > 640 ? "30px" : "20px",
                },
              }}
            >
              <Tab label="Upcoming" />
              <Tab label="Cancelled" />
              <Tab label="Completed" />
            </Tabs>
          </div>

          {/* Upcoming */}
          {bookingTab == 0 && (
            <ul className="flex flex-col gap-4">
              {trips &&
                trips.map((trip) => (
                  <li key={`upcomming-${trip}`}>
                    <Link href={`/ticket/view/${trip}`}>
                      <BookingCard />
                    </Link>
                  </li>
                ))}
            </ul>
          )}

          {/* Cancelled */}
          {bookingTab == 1 && (
            <ul className="flex flex-col gap-4">
              {trips &&
                trips.map((trip) => (
                  <li key={`cancelled-${trip}`}>
                    <Link href={`/ticket/view/${trip}`}>
                      <BookingCard />
                    </Link>
                  </li>
                ))}
            </ul>
          )}

          {/* Completed */}
          {bookingTab == 2 && (
            <ul className="flex flex-col gap-4">
              {trips &&
                trips.map((trip) => (
                  <li key={`completed-${trip}`}>
                    <Link href={`/ticket/view/${trip}`}>
                      <BookingCard />
                    </Link>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
