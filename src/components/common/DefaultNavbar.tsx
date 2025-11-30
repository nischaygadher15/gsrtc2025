"use client";
import navbarLogo from "@/assets/images/Logos/gsrtcLogo2.svg";
import { Drawer, Menu, TextField } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
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
import Dialog from "@mui/material/Dialog";
import { IoMdArrowDropdown, IoMdClose } from "react-icons/io";
import ReCAPTCHA from "react-google-recaptcha";
import googleIcon from "@/assets/images/google-sing-In.svg";
import { ImSpinner8 } from "react-icons/im";
import { IoListOutline } from "react-icons/io5";
import { BiHelpCircle } from "react-icons/bi";

const DefaultNavbar = () => {
  const currentLocation = usePathname();
  const CaptchaClientKey = process.env.NEXT_PUBLIC_Recaptcha_client_key;
  if (!CaptchaClientKey) throw new Error("Captcha key do not found!");

  // User Account Dropdown
  const [anchor1, setAnchor1] = useState<boolean>(false);
  const handleUserDrawer = () => {
    setAnchor1(true);
  };
  const closeUserDrawer = () => {
    setAnchor1(false);
  };

  // // Agent Login Dropdown
  // const [anchor2, setAnchor2] = useState<null | HTMLElement>(null);
  // const openAnchor2 = Boolean(anchor2);
  // const handleClickAnchor2 = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchor2(event.currentTarget);
  // };
  // const handleCloseAnchor2 = () => {
  //   setAnchor2(null);
  // };

  //GSRTC Login
  const [gsrtcLoginDialog, setGsrctLoginDialog] = useState<boolean>(false);
  const openGsrctLoginDialog = () => {
    setGsrctLoginDialog(true);
  };

  const closeGsrctLoginDialog = () => {
    setGsrctLoginDialog(false);
  };

  // Recaptch
  const [captchaLoad, setCaptchaLoad] = useState(true);
  const onCaptchSuccess = (capchaToken: string | null) => {
    if (!capchaToken) onCaptchaFailed();
    console.log("Captcha is done.", capchaToken);
  };

  const onCaptchaFailed = () => {
    console.log("Captcha failed!!");
  };

  useEffect(() => {
    if (gsrtcLoginDialog) {
      setCaptchaLoad(true);
      let delayTimer = setTimeout(() => {
        setCaptchaLoad(false);
      }, 250);
    }
  }, [gsrtcLoginDialog]);

  return (
    <nav
      className={`myContainer ${
        currentLocation !== "/search"
          ? "sticky top-0 left-0 right-0 z-40 flex shadow-md"
          : "relative border-b border-b-slate-200 z-40 hidden lg:flex"
      }  min-w-full bg-white justify-between py-3`}
    >
      {/* GSRTC Logo */}
      <div className="lg:min-w-[360px] flex flex-nowrap gap-x-2 items-center">
        <Image
          src={navbarLogo}
          alt="GSRTC Navbar LOGO"
          width={60}
          quality={100}
          unoptimized
          className="object-contain"
          priority
        />
        <div className="">
          <p className="text-xs sm:text-sm text-nowrap font-semibold leading-tight tracking-tight text-[#212153]">
            Gujarat State Road Transport Corporation
          </p>
          <p className="text-sm sm:text-base text-nowrap font-noto-guj font-semibold leading-snug tracking-wider text-[#212153]">
            ગુજરાત રાજ્ય માર્ગ વાહન વ્યવહાર નિગમ
          </p>
          <hr className="border-px border-slate-200 my-[2px]" />
          <p className="text-nowrap text-lg text-[#cc0000] font-semibold font-allura leading-none tracking-widest">
            Steering miles with smiles
          </p>
        </div>
      </div>

      {/* Navbar links */}
      <ul className="list-none !text-xs !font-medium hidden lg:flex justify-end items-center gap-x-2 sm:gap-x-3 xl:gap-x-5">
        <li>
          <Link
            href="/bookings"
            className={`p-3 h-full w-full flex items-center gap-1.5  rounded-s-full rounded-e-full bg-white hover:bg-slate-200 ${
              currentLocation === "/bookings" ? "text-primary" : "text-black"
            }`}
          >
            <IoListOutline className="w-6 h-6" />
            <span>Bookings</span>
          </Link>
        </li>

        <li>
          <Link
            href="#"
            className={`p-3 h-full w-full flex items-center gap-1.5  rounded-s-full rounded-e-full bg-white hover:bg-slate-200 ${
              currentLocation === "/help" ? "text-primary" : "text-black"
            }`}
          >
            <BiHelpCircle className="w-6 h-6" />
            <span>Help</span>
          </Link>
        </li>
        <li className="">
          <a
            href="https://yatradham.gujarat.gov.in/Booking"
            className="p-3 rounded-s-full flex flex-col xl:flex-row xl:items-center gap-1  rounded-e-full bg-white hover:bg-slate-200"
          >
            <span>Sharvan</span>
            <span>Tirth Darshan</span>
          </a>
        </li>
        <li>
          <a
            href="https://www.soutickets.in/#/gsrtc-booking"
            className="p-3 rounded-s-full flex flex-col xl:flex-row xl:items-center gap-1  rounded-e-full bg-white hover:bg-slate-200"
          >
            <span>Unity</span>
            <span>Booking</span>
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
        </li>
      </ul>

      {/* <=============== Drawer and Dialogs ===============> */}

      {/* Account Drawer */}
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
            <button
              type="button"
              onClick={openGsrctLoginDialog}
              className="w-full py-3 font-semibold text-center bg-primary/90 hover:bg-primary text-white rounded-s-full rounded-e-full"
            >
              GSRCT Log In
            </button>
            <div className="py-5 flex items-center gap-3">
              <p className="font-medium">Don&apos;t have an account?</p>
              <button
                type="button"
                className="text-sm underline font-bold hover:bg-slate-200 py-2 px-3 rounded-s-full rounded-e-full"
              >
                Sign up
              </button>
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
                <li className="p-4 bg-white">
                  <p className="w-full py-3 font-semibold text-center bg-primary/90 hover:bg-primary text-white rounded-s-full rounded-e-full">
                    Agent Login
                  </p>
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
                <DescriptionOutlinedIcon sx={{ fontSize: 24 }} />
                <span>Bus pass Login</span>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <ul className="flex flex-col">
                <li className="bg-white">
                  <p className="w-full py-3 font-semibold text-center bg-primary/90 hover:bg-primary text-white rounded-s-full rounded-e-full">
                    Bus pass Login
                  </p>
                  <div className="py-5 flex items-center gap-3">
                    <p className="font-medium">Don&apos;t have an account?</p>
                    <Link
                      href="/signup"
                      className="text-sm underline font-bold hover:bg-slate-200 py-2 px-3 rounded-s-full rounded-e-full"
                    >
                      Sign up
                    </Link>
                  </div>
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>

          {/* Wallet */}
          <div className="">
            <p className="p-4 text-[22px] font-bold leading-tight py-7">
              Payments
            </p>

            <Link href="/wallet">
              <div className="w-full flex justify-between items-center p-4 pt-0 font-semibold border-b-1 border-b-slate-400">
                <div className="flex items-center gap-x-3">
                  <AccountBalanceWalletOutlinedIcon sx={{ fontSize: 24 }} />
                  <span>Wallet</span>
                </div>

                <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
              </div>
            </Link>
          </div>

          {/* More */}
          <div className="">
            <p className="p-4 text-[22px] font-bold leading-tight py-7">More</p>
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
                  <NotificationsActiveOutlinedIcon sx={{ fontSize: 24 }} />
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

      {/* GSRTC Login/Sign up Dialog */}
      <Dialog
        onClose={closeGsrctLoginDialog}
        open={gsrtcLoginDialog}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "16px",
            margin: 0,
          },
        }}
      >
        {captchaLoad && (
          <div className="absolute inset-0 z-[1000] flex justify-center bg-white items-center">
            <ImSpinner8 className="text-primary text-3xl animate-spin" />
          </div>
        )}

        <div className="relative w-xl min-h-[calc(100vh-64px)] max-h-[calc(100vh-64px)] flex flex-col justify-between gap-7 px-4 pt-5 bg-white overflow-y-auto hideScrollBar">
          <form>
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
              <p className="font-bold">GSRTC Login</p>
              <button
                type="button"
                className="rounded-s-full rounded-e-full px-3.5 py-2.5 hover:bg-slate-200 cursor-pointer"
                onClick={closeGsrctLoginDialog}
              >
                <IoMdClose className="text-2xl" />
              </button>
            </div>

            {/* Mobile no. */}
            <div>
              <p className="text-xl font-bold mb-4">
                What's your mobile number?
              </p>
              <div className="flex">
                <button
                  type="button"
                  disabled
                  className="px-3 flex flex-col justify-center border-t border-b border-s rounded-ss-lg rounded-es-lg"
                >
                  <p className="text-xs text-[#1d1d1da3]">Country Code</p>
                  <p className="flex items-center gap-x-1 font-semibold">
                    <span>+91 (IND)</span>
                    <IoMdArrowDropdown className="text-xl" />
                  </p>
                </button>

                <div className="flex-1 border rounded-se-lg rounded-ee-lg">
                  <TextField
                    type="text"
                    id="userMobile"
                    label="Mobile number*"
                    placeholder="Enter mobile no."
                    variant="filled"
                    error={false}
                    sx={{
                      width: "100%",
                      "& .MuiFilledInput-root": {
                        fontWeight: "700 !important",
                        backgroundColor: "white !important",
                        borderTopLeftRadius: "0px",
                        borderTopRightRadius: "8px",
                        borderBottomRightRadius: "8px",
                      },
                      "& .MuiInputLabel-root": {
                        color: "#1d1d1da3 !important",
                      },
                      "& ::before": {
                        display: "none",
                      },
                      "& ::after": {
                        display: "none",
                      },
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Recatcha */}
            <div className="flex justify-center py-5">
              <ReCAPTCHA
                sitekey={CaptchaClientKey}
                onChange={onCaptchSuccess}
                onErrored={onCaptchaFailed}
              />
            </div>

            <button
              type="submit"
              disabled={false}
              // onClick={}
              className="w-full py-3 font-semibold text-center bg-primary/90 hover:bg-primary text-white rounded-s-full rounded-e-full"
            >
              Generate OTP
            </button>

            <p className="flex justify-center items-center gap-2 py-5">
              <span className="w-10 h-0 border border-slate-200"></span>
              <span className="text-sm">or</span>
              <span className="w-10 h-0 border border-slate-200"></span>
            </p>

            <button
              type="button"
              className="flex bg-[#1a73e8]/90 hover:bg-[#1a73e8] p-1 rounded-sm cursor-pointer mx-auto"
            >
              <div className="bg-white p-1.5 rounded-ss-sm rounded-es-sm">
                <Image
                  src={googleIcon}
                  width={24}
                  height={24}
                  alt="Google Sign In Icon"
                />
              </div>

              <p className="flex-1 flex justify-center items-center font-semibold text-white text-sm px-2">
                Sign in with Google
              </p>
            </button>
          </form>

          <div className="w-full p-3 border-t border-t-slate-200">
            <p className="text-sm text-center">By logging in, I agree</p>
            <p className="text-sm flex justify-center items-center gap-2">
              <a href="#" className="text-blue-500">
                Terms & Conditions
              </a>
              <span>&</span>
              <a href="#" className="text-blue-500">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </Dialog>
    </nav>
  );
};

export default DefaultNavbar;
