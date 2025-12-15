"use client";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import BookingCard from "@/components/common/BookingCard";
import useWindowSize from "@/Hooks/useWindowSize";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Bookings = () => {
  const sessionId = useSelector((state: RootState) => state.session.sessionId);
  const [bookingTab, setBookingTab] = useState<number>(0);
  let winSize = useWindowSize();
  const trips = [1, 2, 3, 4, 5];

  const handleBookingTbs = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue <= 2) setBookingTab(newValue);
  };

  return (
    <div className="myContainer min-h-[300px] flex flex-col justify-center bg-[#f2f2f8]">
      {sessionId ? (
        <div className="md:px-10 lg:px-24">
          <p className="font-semibold text-xl py-7">My Bookings</p>
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
      ) : (
        <div
          className="bg-white rounded-md min-h-[150px] flex justify-center items-center p-4 font-semibold flex-wrap sm:items-center gap-3"
          style={{
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          }}
        >
          <p>Please login to view the profile details</p>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="underline underline-offset-1 text-blue-600"
            >
              Login Now
            </Link>
            <span>OR</span>
            <Link
              href="/"
              className="underline underline-offset-1 text-blue-600"
            >
              Go to home page
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
