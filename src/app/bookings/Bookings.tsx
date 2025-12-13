"use client";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import BookingCard from "@/components/common/BookingCard";
import useWindowSize from "@/Hooks/useWindowSize";
import defaultUser from "@/assets/images/default-user.svg";
import Image from "next/image";
import { IoSettingsOutline, IoTicketOutline } from "react-icons/io5";

const Bookings = () => {
  const [mainTab, setMainTab] = useState<number>(0);
  const [bookingTab, setBookingTab] = useState<number>(0);
  let winSize = useWindowSize();

  const handleMainTabs = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue <= 2) setMainTab(newValue);
  };

  const handleBookingTbs = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue <= 2) setBookingTab(newValue);
  };

  return (
    <div className="bg-[#f2f2f8]">
      <div className="flex items-stretch">
        <div className="w-[240px] ps-4 py-7">
          {/* User photo */}
          <div className="flex items-center gap-4 mb-7">
            <Image
              src={defaultUser}
              alt="User profile image"
              width={38}
              height={38}
              className=""
            />
            <p className="font-semibold">user@gmail.com</p>
          </div>

          {/* Tabs */}
          <div>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={mainTab}
              onChange={handleMainTabs}
              aria-label="Vertical tabs example"
              sx={{
                "& .Mui-selected": {
                  color: "#173c62 !important",
                },
                "& .MuiTab-root": {
                  padding: "24px 16px",
                  borderBottom: "1px solid #d1d5dc",
                },
              }}
            >
              <Tab
                label={
                  <div className="flex items-center gap-4">
                    <IoTicketOutline className="rotate-y-180 text-[22px]" />
                    <span className="">My Trips</span>
                  </div>
                }
              />
              <Tab
                label={
                  <div className="flex items-center gap-4">
                    <IoSettingsOutline className="rotate-y-180 text-[22px]" />
                    <span className="">My Profile</span>
                  </div>
                }
              />
            </Tabs>
          </div>
        </div>

        {/* Tabs Content */}
        <div className="flex-1">
          {/* My Profile */}
          <div></div>

          {/* My Trip */}
          <div>
            <p className="font-semibold text-xl py-7">My Trips</p>
            <div className="pb-7">
              <div className="mb-7">
                <Tabs
                  value={bookingTab}
                  onChange={handleBookingTbs}
                  aria-label="basic tabs example"
                  variant={winSize > 640 ? "standard" : "fullWidth"}
                  sx={{
                    "& .MuiTab-root": {
                      // marginRight: winSize > 640 ? "100px" : "",
                      textAlign: "left",
                      // padding: 0,
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
                    "& .MuiTabs-list": {
                      gap: "30px",
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

              {/* Cancelled */}
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

              {/* Completed */}
              {bookingTab == 2 && (
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
        </div>
      </div>
    </div>
  );
};

export default Bookings;
