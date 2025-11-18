"use client";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { SlArrowDown } from "react-icons/sl";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import useWindowSize from "@/Hooks/useWindowSize";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Drawer from "@mui/material/Drawer";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { IoMdClose } from "react-icons/io";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useRouter } from "next/navigation";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import Image from "next/image";
import gsrtcAppQR from "@/assets/images/GSRTC_App_QR.svg";
import gStore from "@/assets/images/playstore.svg";
import appStore from "@/assets/images/appstore.svg";

const ViewTicket = () => {
  const router = useRouter();
  const windowSize = useWindowSize();
  const [ticketDrawer, setTicketDrawer] = useState<boolean>(false);
  const [returnTicketDrawer, setReturnTicketDrawer] = useState<boolean>(false);
  const [returnDate, setReturnDate] = useState<Date>(
    new Date(Date.now() + 24 * 60 * 60 * 1000)
  );

  const footerSocialIcons: {
    icon: React.ReactNode;
    link: string;
  }[] = [
    {
      icon: <FaFacebook className="w-10 h-10 text-[#006699]" />,
      link: "https://www.facebook.com/GSRTCOFFICIAL",
    },
    {
      icon: <FaSquareXTwitter className="w-10 h-10 " />,
      link: "https://twitter.com/OfficialGsrtc",
    },
  ];

  const closeReturnDrawer = () => {
    setReturnTicketDrawer(false);
    router.push("/");
  };

  return (
    <div className="w-full h-full myContainer bg-[#f2f2f8] py-10 flex flex-col lg:flex-row gap-7">
      <div className="w-full lg:w-3/4">
        {/* trip details */}
        <div className="relative">
          <Accordion
            expanded={ticketDrawer}
            onChange={(event: React.SyntheticEvent, isExpanded: boolean) => {
              setTicketDrawer(isExpanded);
            }}
            sx={{
              "&.MuiAccordion-root": {
                boxShadow: "0 0 10px rgba(0,0,0,0.3)",
              },
              "& .Mui-expanded": {
                margin: 0,
              },
            }}
          >
            <AccordionSummary
              // expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="confirmed-ticket-accordian"
              className="!p-6 !m-0 bg-white"
            >
              <div className="w-full h-full">
                <div className="flex justify-between mb-7">
                  <div className="flex flex-col sm:flex-row items-start gap-5">
                    <div className="flex flex-col gap-1">
                      <p className="text-5xl text-primary text-center leading-none">
                        20
                      </p>
                      <p className="text-[#1d1d1da3] text-center">Nov 2025</p>
                      <p className="text-xs font-semibold px-1.5 py-1 uppercase bg-green-500 text-white text-semibold">
                        Confirmed
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold">AHMEDABAD - SURAT</p>
                      <p className="font-semibold text-sm">GSRTC</p>
                      <p className="text-[#1d1d1da3] text-sm">
                        Non AC Seater (2+1)
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <a
                      href="/sample.pdf"
                      className="text-right cursor-pointer text-blue-500"
                      download
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.stopPropagation();
                      }}
                    >
                      Print/Download
                    </a>
                    <p className="font-semibold text-right">
                      PNR No: XXXXXXXXX
                    </p>
                    <p className="font-semibold text-right">
                      Trip Code: XXXXXXXXX
                    </p>
                    <p className="font-semibold text-right">
                      Route No: XXXXXXXXX
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-[3fr_2fr_2fr_3fr] grid-rows-2 sm:grid-rows-1">
                  <div className="order-1">
                    <p className=" text-left p-1 text-sm text-[#1d1d1da3]">
                      BOARDING
                    </p>
                    <p className="p-1 font-semibold text-left">AHMEDABAD</p>
                  </div>
                  <div className="order-3 sm:order-1">
                    <p className="text-left sm:text-center p-1 text-sm text-[#1d1d1da3]">
                      DEPATURE
                    </p>
                    <p className="p-1 font-semibold text-left sm:text-center">
                      00:40
                    </p>
                  </div>
                  <div className="order-4 sm:order-3">
                    <p className="text-right sm:text-center p-1 text-sm text-[#1d1d1da3]">
                      PASSENGERS
                    </p>
                    <p className="p-1 font-semibold text-right sm:text-center">
                      2
                    </p>
                  </div>
                  <div className="order-2 sm:order-4">
                    <p className="text-right p-1 text-sm text-[#1d1d1da3]">
                      DROP OFF
                    </p>
                    <p className="p-1 font-semibold text-right">
                      SURAT BUS STATION
                    </p>
                  </div>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              {/* Passenger details */}
              <div className="py-7 border-t border-t-slate-200">
                <p className="font-bold text-center text-[#1d1d1da3]">
                  PASSENGER DETAILS
                </p>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="p-1 text-sm font-semibold text-left">
                        Seat
                      </th>
                      <th className="p-1 text-sm font-semibold text-left">
                        Name
                      </th>
                      <th className="p-1 text-sm font-semibold text-center">
                        Age
                      </th>
                      <th className="p-1 text-sm font-semibold text-center">
                        Gender
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-1 font-semibold text-left">11</td>
                      <td className="p-1 font-semibold text-left">
                        NISCHAY K GADHER
                      </td>
                      <td className="p-1 font-semibold text-center">30</td>
                      <td className="p-1 font-semibold text-center">MALE</td>
                    </tr>
                    <tr>
                      <td className="p-1 font-semibold text-left">12</td>
                      <td className="p-1 font-semibold text-left">
                        MAHADEV AHIR
                      </td>
                      <td className="p-1 font-semibold text-center">26</td>
                      <td className="p-1 font-semibold text-center">MALE</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Fare details */}
              <div className="border-t border-t-slate-200 pt-7 ">
                <p className="font-bold text-center text-[#1d1d1da3]">
                  Fare Details
                </p>
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="w-[80%]">
                        <p className="pt-2 text-sm text-[#1d1d1da3] font-medium">
                          Base Fare
                        </p>
                      </td>
                      <td className="pt-2 w-[20%] text-sm text-[#1d1d1da3] font-medium text-right">
                        &#8377;620
                      </td>
                    </tr>
                    <tr>
                      <td className="w-[80%]">
                        <p className="pt-2 text-sm text-[#1d1d1da3] font-medium">
                          Free Cancellation
                        </p>
                      </td>
                      <td className="pt-2 w-[20%] text-sm text-[#1d1d1da3] font-medium text-right">
                        &#8377;49
                      </td>
                    </tr>
                    <tr>
                      <td className="w-[80%]">
                        <p className="pt-2 text-sm text-[#1d1d1da3] font-medium">
                          Travel Insurance
                        </p>
                      </td>
                      <td className="pt-2 w-[20%] text-sm text-[#1d1d1da3] font-medium text-right">
                        &#8377;30
                      </td>
                    </tr>
                    <tr>
                      <td className="w-[80%] pt-2 pb-4">
                        <p className="text-sm text-[#1d1d1da3] font-medium">
                          GST
                        </p>
                      </td>
                      <td className="w-[20%] pt-2 pb-4 text-sm text-[#1d1d1da3] font-medium text-right">
                        &#8377;30
                      </td>
                    </tr>
                    <tr className="">
                      <td className="w-[80%]">
                        <p className="font-medium">Total Amount Paid</p>
                      </td>
                      <td className="w-[20%] font-bold text-right">
                        &#8377;729.00
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionDetails>
          </Accordion>
          <button
            type="button"
            className="cursor-pointer absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 inline-block p-1.5 bg-white rounded-full border border-slate-200"
            onClick={() => {
              setTicketDrawer(!ticketDrawer);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <SlArrowDown
              className={`text-xl text-[#1d1d1da3] ${
                ticketDrawer ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>
      </div>
      <div className="w-full lg:w-1/4 flex flex-col gap-5">
        {/* Return ticket booking */}
        <div
          className="bg-white p-4 flex flex-col gap-2 rounded"
          style={{
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          }}
        >
          <p>RETURN TRIP</p>
          <p>Surat - Ahmedabad</p>
          <div>
            {windowSize > 1024 ? (
              <div className="flex flex-col xl:flex-row gap-5">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    defaultValue={dayjs(new Date(Date.now()))}
                    sx={{
                      "& .MuiPickersSectionList-root": {
                        padding: "10px 0",
                      },
                      "& .MuiPickersOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                    }}
                  />
                </LocalizationProvider>
                <button
                  type="button"
                  className="min-h-10 rounded-md bg-primary/90 hover:bg-primary text-white px-3"
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  BOOK
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="w-full p-3 rounded-md border flex justify-between items-center focus:outline-1 focus:outline-primary"
                onClick={() => setReturnTicketDrawer(true)}
              >
                <p className="font-semibold">
                  {returnDate.toLocaleDateString()}
                </p>
                <CalendarMonthOutlinedIcon sx={{ fontSize: 30 }} />
              </button>
            )}

            <Drawer
              anchor="bottom"
              open={returnTicketDrawer}
              onClose={() => setReturnTicketDrawer(false)}
              sx={{
                "& .MuiDrawer-paper": {
                  borderTopLeftRadius: "16px",
                  borderTopRightRadius: "16px",
                },
              }}
            >
              <div className="p-4 pb-0 text-right">
                <button
                  type="button"
                  className="rounded-s-full rounded-e-full px-3.5 py-2.5"
                  onClick={() => setReturnTicketDrawer(false)}
                >
                  <IoMdClose className="text-2xl" />
                </button>
              </div>

              <div className="flex-1">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    value={dayjs(returnDate)}
                    sx={{
                      margin: 0,
                      minWidth: "100%",
                      "& .MuiPickersDay-root": {
                        fontSize: 16,
                      },
                      "& .MuiDayCalendar-weekContainer": {
                        justifyContent: "space-around",
                      },
                      "& .MuiDayCalendar-header": {
                        justifyContent: "space-around",
                      },
                      "& .MuiDayCalendar-weekDayLabel": {
                        fontSize: 16,
                      },
                      "& .MuiPickersCalendarHeader-label": {
                        fontSize: 16,
                      },
                      "& .MuiYearCalendar-root": {
                        width: "100%",
                        minHeight: "100%",
                        padding: "0px 20px",
                      },
                      "&.MuiDateCalendar-root": {
                        maxHeight: "100%",
                        height: "100%",
                        padding: "0px 16px",
                      },
                    }}
                    onChange={(date) => {
                      if (date) setReturnDate(date.toDate());
                    }}
                  />
                </LocalizationProvider>

                <div className="px-7 flex justify-between">
                  <button
                    type="button"
                    className="px-5 py-3 text-[#1976d2] text-lg font-semibold"
                    onClick={() => setReturnTicketDrawer(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-5 py-3 text-[#1976d2] text-lg font-semibold"
                    onClick={closeReturnDrawer}
                  >
                    OK
                  </button>
                </div>
              </div>
            </Drawer>
          </div>
        </div>

        {/* Social icons */}
        <div
          className="bg-white p-4 flex flex-col gap-2 rounded"
          style={{
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          }}
        >
          <p className="font-medium">You can follows us on :</p>
          <ul className="flex items-center gap-x-5">
            {footerSocialIcons &&
              footerSocialIcons.map((icon, inx) => {
                return (
                  <li key={`footer-social-icons-${inx}`}>
                    <a href={icon.link} key={`footer-social-icon-${inx}`}>
                      {icon.icon}
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>

        {/* download gsrtc app */}
        <div
          className="bg-white p-4 flex flex-col gap-2 rounded"
          style={{
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          }}
        >
          <p className="font-semibold">Download the App</p>

          <table className="max-w-[400px]">
            <tbody>
              <tr>
                <td className="w-1/2 text-xs text-[#1d1d1da3] px-2.5 py-1">
                  Scan to download
                </td>
                <td className="w-1/2 text-xs text-[#1d1d1da3] px-2.5 py-1">
                  Download the App on
                </td>
              </tr>
              <tr>
                <td className="w-1/2 px-2.5 py-1">
                  <Image
                    src={gsrtcAppQR}
                    alt="GSRTC App QR code"
                    className="min-w-20 min-h-20 w-full h-full"
                  />
                </td>
                <td className="w-1/2 px-2.5 py-1">
                  <div className="flex flex-col gap-1">
                    <a href="https://play.google.com/store/apps/details?id=com.gsrtc.mobileweb&pcampaignid=web_share">
                      <Image
                        src={gStore}
                        alt="Google Play Store"
                        className="w-full h-1/2 min-h-7"
                      />
                    </a>
                    <a href="https://apps.apple.com/in/app/gsrtc/id1483621554">
                      <Image
                        src={appStore}
                        alt="Apple App Store"
                        className="w-full h-1/2 min-h-7"
                      />
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex">
            <div className="flex flex-col gap-3">
              <p></p>
            </div>
            <div>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTicket;
