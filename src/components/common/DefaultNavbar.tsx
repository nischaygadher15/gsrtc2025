"use client";
import navbarLogo from "@/assets/images/Navbar_logo.png";
import { Drawer, Menu } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import { useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import unityBooking from "@/assets/images/imgi_32_unity_booking.png";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { TbTicketOff } from "react-icons/tb";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { BsTicketDetailed } from "react-icons/bs";
import { RiFontSize } from "react-icons/ri";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import womenSvg from "@/assets/images/female.svg";
import { usePathname } from "next/navigation";

const DefaultNavbar = () => {
  const currentLocation = usePathname();

  // User Account Dropdown
  const [anchor1, setAnchor1] = useState<boolean>(false);
  const handleUserDrawer = () => {
    setAnchor1(true);
  };
  const closeUserDrawer = () => {
    setAnchor1(false);
  };

  // Agent Login Dropdown
  const [anchor2, setAnchor2] = useState<null | HTMLElement>(null);
  const openAnchor2 = Boolean(anchor2);
  const handleClickAnchor2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor2(event.currentTarget);
  };
  const handleCloseAnchor2 = () => {
    setAnchor2(null);
  };

  return (
    <nav
      className={`myContainer ${
        currentLocation !== "/search"
          ? "sticky top-0 left-0 right-0 z-40 flex shadow-md"
          : "relative border-b border-b-slate-200 z-40 hidden lg:flex"
      }  min-w-full bg-white justify-between py-3`}
    >
      <Image
        src={navbarLogo}
        className="w-[300px] h-[50px] lg:w-[385px] lg:h-[64px]"
        alt="GSRTC Navbar LOGO"
      />

      {/* Drawer Navbar */}
      <div className="flex">
        <ul className="list-none !text-xs !font-medium hidden lg:flex items-center gap-x-5">
          <li className="">
            <a
              href="https://yatradham.gujarat.gov.in/Booking"
              className="p-3 rounded-s-full rounded-e-full bg-white hover:bg-slate-200"
            >
              Sharvan Tirth Darshan
            </a>
          </li>
          <li>
            <div className="">
              <button
                type="button"
                id="basic-button"
                aria-controls={openAnchor2 ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openAnchor2 ? "true" : undefined}
                onClick={handleClickAnchor2}
                className="p-3 rounded-s-full rounded-e-full flex items-center outline-none cursor-pointer bg-white hover:bg-slate-200"
              >
                <span className="text-xs">Bus Pass</span>
              </button>
              <Menu
                id="basic-menu"
                anchorEl={anchor2}
                open={openAnchor2}
                disableScrollLock
                onClose={handleCloseAnchor2}
                slotProps={{
                  list: {
                    "aria-labelledby": "basic-button",
                  },
                }}
              >
                <MenuItem onClick={handleCloseAnchor2}>Profile</MenuItem>
                <MenuItem onClick={handleCloseAnchor2}>My account</MenuItem>
                <MenuItem onClick={handleCloseAnchor2}>Logout</MenuItem>
              </Menu>
            </div>
          </li>
          <li>
            <a href="https://www.soutickets.in/#/gsrtc-booking">
              <Image
                src={unityBooking}
                height={32}
                width={42}
                alt="Unity booking"
              />
            </a>
          </li>
          <li className="">
            <button
              type="button"
              onClick={handleUserDrawer}
              className="p-3 rounded-s-full rounded-e-full bg-white hover:bg-slate-200 flex items-center gap-1"
            >
              <AccountCircleOutlinedIcon sx={{ fontSize: 24 }} />
              <span className="text-xs">Account</span>
            </button>
            <Drawer anchor="right" open={anchor1} onClose={closeUserDrawer}>
              <div className="w-[360px]">
                <div className="relative p-4 border-b-[1px] border-slate-200 flex items-center justify-between ">
                  <span className="font-semibold">Account</span>
                  <button
                    type="button"
                    onClick={closeUserDrawer}
                    className="absolute top-1/2 -translate-y-1/2 right-0 cursor-pointer px-3.5 py-2 rounded-s-full rounded-e-full bg-white hover:bg-slate-200"
                  >
                    <CloseIcon sx={{ fontSize: 24 }} />
                  </button>
                </div>

                <div className="px-4">
                  <p className="py-10 font-bold text-[28px] leading-tight tracking-tight text-wrap">
                    Log in to manage your bookings
                  </p>
                  <Link href="/login">
                    <p className="w-full py-3 font-semibold text-center bg-primary text-white rounded-s-full rounded-e-full">
                      GSRCT Log In
                    </p>
                  </Link>
                  <div className="py-5 flex items-center gap-3">
                    <p className="font-medium">Don&apos;t have an account?</p>
                    <Link
                      href="/signup"
                      className="text-sm underline font-bold"
                    >
                      Sign up
                    </Link>
                  </div>
                </div>

                {/* Agent Login */}
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{
                      padding: "4px 16px",
                      borderRadius: 0,
                      fontWeight: 500,
                    }}
                  >
                    <div className="flex items-center gap-x-3">
                      <PersonOutlineOutlinedIcon sx={{ fontSize: 24 }} />
                      <span>Agent Login</span>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ul className="flex flex-col">
                      <li className="p-4 bg-white hover:bg-slate-200">
                        Agent Login
                      </li>
                      <li className="p-4 bg-white hover:bg-slate-200">
                        New Agent Register
                      </li>
                      <li className="p-4 bg-white hover:bg-slate-200">
                        Agent Allotment
                      </li>
                      <li className="p-4 bg-white hover:bg-slate-200">
                        E-Top Status
                      </li>
                    </ul>
                  </AccordionDetails>
                </Accordion>

                <Link href="/buspasslogin">
                  <div className="w-full flex justify-between items-center p-4 font-semibold border-b-1 border-b-slate-400">
                    <div className="flex items-center gap-x-3">
                      <DescriptionOutlinedIcon sx={{ fontSize: 24 }} />
                      <span>Bus pass Login</span>
                    </div>

                    <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
                  </div>
                </Link>

                {/* Wallet */}
                <div className="">
                  <p className="p-4 text-[22px] font-bold leading-tight py-7">
                    Payments
                  </p>

                  <Link href="/wallet">
                    <div className="w-full flex justify-between items-center p-4 pt-0 font-semibold border-b-1 border-b-slate-400">
                      <div className="flex items-center gap-x-3">
                        <AccountBalanceWalletOutlinedIcon
                          sx={{ fontSize: 24 }}
                        />
                        <span>Wallet</span>
                      </div>

                      <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
                    </div>
                  </Link>
                </div>

                {/* More */}
                <div className="">
                  <p className="p-4 text-[22px] font-bold leading-tight py-7">
                    More
                  </p>
                  {/* Offer */}
                  <Link href="/wallet">
                    <div className="w-full flex justify-between items-center p-4 pt-0 font-semibold border-b-1 border-b-slate-400">
                      <div className="flex items-center gap-x-3">
                        <LocalOfferOutlinedIcon sx={{ fontSize: 24 }} />
                        <span>Offer</span>
                      </div>

                      <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
                    </div>
                  </Link>

                  {/* Know about GSRTC */}
                  <Link href="/wallet">
                    <div className="w-full flex justify-between items-center p-4 font-semibold border-b-1 border-b-slate-400">
                      <div className="flex items-center gap-x-3">
                        <InfoOutlinedIcon sx={{ fontSize: 24 }} />
                        <span>Know about GSRTC</span>
                      </div>

                      <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
                    </div>
                  </Link>

                  {/* Help */}
                  <Link href="/wallet">
                    <div className="w-full flex justify-between items-center p-4 font-semibold border-b-1 border-b-slate-400">
                      <div className="flex items-center gap-x-3">
                        <HelpOutlineOutlinedIcon sx={{ fontSize: 24 }} />
                        <span>Help</span>
                      </div>

                      <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
                    </div>
                  </Link>

                  {/* Cancel Ticket */}
                  <Link href="/wallet">
                    <div className="w-full flex justify-between items-center p-4 font-semibold border-b-1 border-b-slate-400">
                      <div className="flex items-center gap-x-3">
                        <TbTicketOff style={{ fontSize: 30 }} />
                        <span>Cancel Ticket</span>
                      </div>

                      <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
                    </div>
                  </Link>

                  {/* Reschedule Ticket */}
                  <Link href="/wallet">
                    <div className="w-full flex justify-between items-center p-4 font-semibold border-b-1 border-b-slate-400">
                      <div className="flex items-center gap-x-3">
                        <CalendarTodayIcon sx={{ fontSize: 24 }} />
                        <span>Reschedule Ticket</span>
                      </div>

                      <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
                    </div>
                  </Link>

                  {/* Search Ticket */}
                  <Link href="/wallet">
                    <div className="w-full flex justify-between items-center p-4 font-semibold border-b-1 border-b-slate-400">
                      <div className="flex items-center gap-x-3">
                        <BsTicketDetailed style={{ fontSize: 30 }} />
                        <span>Search Ticket</span>
                      </div>

                      <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
                    </div>
                  </Link>

                  {/* Langauge */}
                  <Link href="/wallet">
                    <div className="w-full flex justify-between items-center p-4 font-semibold border-b-1 border-b-slate-400">
                      <div className="flex items-center gap-x-3">
                        <RiFontSize style={{ fontSize: 30 }} />
                        <div>
                          <span>Langauge</span>
                          <span>English</span>
                        </div>
                      </div>

                      <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
                    </div>
                  </Link>

                  {/* Notifications */}
                  <Link href="/wallet">
                    <div className="w-full flex justify-between items-center p-4 font-semibold border-b-1 border-b-slate-400">
                      <div className="flex items-center gap-x-3">
                        <NotificationsActiveOutlinedIcon
                          sx={{ fontSize: 24 }}
                        />
                        <span>Notifications</span>
                      </div>

                      <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
                    </div>
                  </Link>

                  {/* State */}
                  <Link href="/wallet">
                    <div className="w-full flex justify-between items-center p-4 font-semibold border-b-1 border-b-slate-400">
                      <div className="flex items-center gap-x-3">
                        <LocalOfferOutlinedIcon sx={{ fontSize: 24 }} />
                        <div>
                          <span>State</span>
                          <span>Gujarat</span>
                        </div>
                      </div>

                      <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
                    </div>
                  </Link>

                  {/* Booking for women */}
                  <Link href="/wallet">
                    <div className="w-full flex justify-between items-center p-4 font-semibold border-b-1 border-b-slate-400 mb-7">
                      <div className="flex items-center gap-x-3">
                        <Image
                          src={womenSvg}
                          height={24}
                          width={24}
                          alt="Booking for women"
                        />
                        <div className="flex flex-col">
                          <span>Booking for women</span>
                          <span className="text-gray-500 text-sm font-normal">
                            {false ? "Yes" : "No"}
                          </span>
                        </div>
                      </div>

                      <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
                    </div>
                  </Link>
                </div>
              </div>
            </Drawer>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default DefaultNavbar;
