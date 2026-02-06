"use client";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { SlArrowDown } from "react-icons/sl";
import { useEffect, useRef, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import useWindowSize from "@/Hooks/useWindowSize";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Drawer from "@mui/material/Drawer";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { IoMdClose, IoMdStar } from "react-icons/io";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useRouter } from "next/navigation";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import Image from "next/image";
import gsrtcAppQR from "@/assets/images/GSRTC_App_QR.svg";
import gStore from "@/assets/images/playstore.svg";
import appStore from "@/assets/images/appstore.svg";
import { LuDot } from "react-icons/lu";
import { MdChatBubbleOutline, MdOutlineEmail } from "react-icons/md";
import customerCare from "@/assets/images/customer-assistance.jpg";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import toast from "react-hot-toast";
import { IoCall } from "react-icons/io5";
import { UserStateType } from "@/types/user/user.type";
import { setUser } from "@/redux/slices/user/user.slice";
import { setSession } from "@/redux/slices/session/sessionSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";

interface TagType {
  tagTitle: string;
  isActive: boolean;
}

const ViewTicket = ({
  data,
}: {
  data: {
    session_id: string | null;
    user: UserStateType | null;
  };
}) => {
  const router = useRouter();
  const windowSize = useWindowSize();
  const dispatch = useDispatch<AppDispatch>();
  const customerFeedbackMsg = useRef<HTMLTextAreaElement>(null);
  const [tripRate, setTripRate] = useState<number>(0);
  const [tagList, setTagList] = useState<TagType[]>([]);
  const [returnTicketDrawer, setReturnTicketDrawer] = useState<boolean>(false);
  const [returnDate, setReturnDate] = useState<Date>(
    new Date(Date.now() + 24 * 60 * 60 * 1000),
  );
  const userData = useSelector((state: RootState) => state.user.data);

  const RatingState: {
    status: string;
    color: string;
  }[] = [
    {
      status: "Very poor",
      color: "text-red-600",
    },
    {
      status: "Poor",
      color: "text-red-500",
    },
    {
      status: "Okay",
      color: "text-blue-600",
    },
    {
      status: "Good",
      color: "text-green-500",
    },
    {
      status: "Excellent",
      color: "text-green-600",
    },
  ];

  const footerSocialIcons: {
    icon: React.ReactNode;
    link: string;
  }[] = [
    {
      icon: (
        <FaFacebook className="w-10 h-10 text-[#006699]/95 hover:text-[#006699]" />
      ),
      link: "https://www.facebook.com/GSRTCOFFICIAL",
    },
    {
      icon: (
        <FaSquareXTwitter className="w-10 h-10 text-black/90 hover:text-black" />
      ),
      link: "https://twitter.com/OfficialGsrtc",
    },
  ];

  const initFeedbackTagState: Record<string, TagType[]> = {
    poor: [
      { tagTitle: "Bus Location was wrong", isActive: false },
      { tagTitle: "Boarding Point Location was wrong", isActive: false },
      { tagTitle: "Bus Location on map did not update", isActive: false },
      { tagTitle: "Estimated time of Arrival was wrong", isActive: false },
      { tagTitle: "Any Other", isActive: false },
    ],
    okay: [
      { tagTitle: "Bus Location accuracy", isActive: false },
      { tagTitle: "Boarding Point Location accuracy", isActive: false },
      {
        tagTitle: "Bus Location on map need to be update faster",
        isActive: false,
      },
      {
        tagTitle: "Estimated time of arrival can be more accurate",
        isActive: false,
      },
      { tagTitle: "Any Other", isActive: false },
    ],

    good: [
      { tagTitle: "Bus Location accuracy", isActive: false },
      { tagTitle: "Correct Boarding Point Location", isActive: false },
      {
        tagTitle: "Bus Location on map updated at good frequency",
        isActive: false,
      },
      { tagTitle: "Estimated time of arrival was accurate", isActive: false },
      { tagTitle: "Any Other", isActive: false },
    ],
  };

  const [customerFeedbacks, setCustomerFeedbacks] =
    useState<Record<string, TagType[]>>(initFeedbackTagState);

  const closeReturnDrawer = () => {
    setReturnTicketDrawer(false);
    router.push("/");
  };

  const handleTripRate = (newValue: number | null) => {
    if (newValue) {
      setTripRate(newValue);
      if (newValue < 3) setTagList(customerFeedbacks.poor);
      else if (newValue == 3) {
        setTagList(customerFeedbacks.okay);
      } else setTagList(customerFeedbacks.good);
    }
  };

  const handleFeedbackTag = (rate: number, tagTitle: string) => {
    let rateStatus = rate < 3 ? "poor" : rate == 3 ? "okay" : "good";
    customerFeedbacks[rateStatus].map((tag) => {
      if (tag.tagTitle === tagTitle) {
        tag.isActive = !tag.isActive;
      }
    });
    setCustomerFeedbacks({ ...customerFeedbacks });
  };

  const handleFeedbackSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let selectedTags: string[] = [];

    // Calclated selected tags
    Object.keys(customerFeedbacks).map((key) => {
      customerFeedbacks[key].map((tag) => {
        if (tag.isActive) {
          selectedTags.push(tag.tagTitle);
        }
      });
    });

    const feedbackData: {
      feedbackRate: number;
      feedbackTags: string[];
      feedbackMsg?: string;
    } = {
      feedbackRate: tripRate,
      feedbackTags: selectedTags,
    };

    if (
      customerFeedbackMsg.current &&
      customerFeedbackMsg.current.value.length > 0
    ) {
      feedbackData["feedbackMsg"] = customerFeedbackMsg.current.value;
    }

    console.log("Feedback: ", feedbackData);

    toast.success("Thank you for valuable feedback");

    clearFeedbackTags();

    if (customerFeedbackMsg.current) {
      customerFeedbackMsg.current.value = "";
    }
  };

  const clearFeedbackTags = () => {
    Object.keys(customerFeedbacks).map((key) => {
      customerFeedbacks[key].map((tag) => {
        tag.isActive = false;
      });
    });

    setCustomerFeedbacks({ ...customerFeedbacks });
  };

  useEffect(() => {
    if (
      data.user &&
      data.session_id &&
      (!userData.id || !userData.user_email)
    ) {
      dispatch(setUser(data.user));
      dispatch(setSession(data.session_id));
    }
  }, []);

  useEffect(() => {
    clearFeedbackTags();
  }, [tripRate]);

  return (
    <div className="w-full h-full myContainer bg-[#f2f2f8] py-10 flex flex-col lg:flex-row gap-7">
      <div className="w-full lg:w-3/4 flex flex-col gap-y-5">
        {/* Ticket & Fairs Details */}
        <div
          className="p-4 bg-white rounded-sm"
          style={{
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          }}
        >
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
                <p className="text-[#1d1d1da3] text-sm">Non AC Seater (2+1)</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-right">
                <a
                  href="/sample.pdf"
                  className="inline-block px-3 py-1 rounded-sm text-right cursor-pointer bg-primary/95 hover:bg-primary text-white  mb-4"
                  download
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.stopPropagation();
                  }}
                >
                  Download
                </a>
              </p>
              <p className="font-semibold text-right">PNR No: XXXXXXXXX</p>
              <p className="font-semibold text-right">Ref. No: XXXXXXXXX</p>
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
              <p className="p-1 font-semibold text-right sm:text-center">2</p>
            </div>
            <div className="order-2 sm:order-4">
              <p className="text-right p-1 text-sm text-[#1d1d1da3]">
                DROP OFF
              </p>
              <p className="p-1 font-semibold text-right">SURAT BUS STATION</p>
            </div>
          </div>

          {/* Passenger details */}
          <div className="py-7 border-t border-t-slate-200">
            <p className="font-bold text-center text-[#1d1d1da3]">
              PASSENGER DETAILS
            </p>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-1 text-sm font-semibold text-left">Seat</th>
                  <th className="p-1 text-sm font-semibold text-left">Name</th>
                  <th className="p-1 text-sm font-semibold text-center">Age</th>
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
                  <td className="p-1 font-semibold text-left">MAHADEV AHIR</td>
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
                    <p className="text-sm text-[#1d1d1da3] font-medium">GST</p>
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
        </div>

        {/* Live Tracking */}
        <div
          className="p-4 bg-white rounded-sm"
          style={{
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          }}
        >
          <p className="text-xl font-semibold mb-4">Live Tracking</p>

          <table className="mx-auto border border-collapse">
            <tbody>
              <tr className="border">
                <td className="border px-4 py-2 font-semibold">Route</td>
                <td className="border px-4 py-2">Jamnagar - Ahmedabad</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">Bus No.</td>
                <td className="border px-4 py-2">GJ 10 XX XXXX</td>
              </tr>
              <tr>
                <td colSpan={2} className="border px-4 py-2 text-center">
                  <button
                    type="button"
                    className="w-full sm:w-[240px] rounded-s-full rounded-e-full py-2 cursor-pointer bg-primary/95 hover:bg-primary rounded text-center text-white"
                  >
                    Track your bus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Customer Care */}
        <div
          className="p-4 bg-white rounded-sm"
          style={{
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          }}
        >
          <p className="text-xl font-semibold mb-4">Customer Care</p>

          <Image
            src={customerCare}
            width={100}
            height={150}
            alt="Customer Care Logo"
            className="mx-auto"
          />

          <p className="text-lg font-semibold text-center my-5">
            Need any help?
          </p>

          <p className="text-sm flex justify-center items-center mb-4">
            <span>24x7 support</span>
            <span>
              <LuDot />
            </span>
            <span>Quick resolution</span>
            <span>
              <LuDot />
            </span>
            <span>Multilingual</span>
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-5 mb-5">
            <a
              href="tel:1800233666666"
              className="w-full sm:w-[200px] rounded-s-full rounded-e-full px-10 bg-primary/95 hover:bg-primary text-center text-white flex justify-center items-center gap-4 py-2 cursor-pointer"
            >
              <IoCall className="text-xl" />
              <span>Call us</span>
            </a>
            <a
              href="mailto:feedback@gsrtc.in"
              className="w-full sm:w-[200px] rounded-s-full rounded-e-full px-10 bg-primary/95 hover:bg-primary text-center text-white flex justify-center items-center gap-4 py-2 cursor-pointer"
            >
              <MdOutlineEmail className="text-xl" />
              <span>Mail us</span>
            </a>
          </div>
        </div>

        {/* Trip Rating */}
        <div
          className="p-4 bg-white rounded-sm"
          style={{
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          }}
        >
          <p className="text-xl font-semibold mb-4">Rate this trip</p>

          <div className="flex flex-col items-center gap-y-3 mb-4">
            <Rating
              name="tripRatting"
              value={tripRate}
              size="large"
              precision={1}
              // getLabelText={getLabelText}
              onChange={(event, newVaule) => handleTripRate(newVaule)}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
              sx={{
                "& .MuiSvgIcon-root": {
                  width: "45px",
                  height: "45px",
                },
              }}
            />

            <p className="flex items-center gap-2">
              <span className="flex items-center text-sm leading-none">
                <IoMdStar className="text-xl text-[#faaf00]" />
                {tripRate}
              </span>
              <span className="text-sm leading-none">-</span>
              <span
                className={`text-sm leading-none ${
                  RatingState[tripRate - 1]?.color
                }`}
              >
                {RatingState[tripRate - 1]?.status ?? "No rating"}
              </span>
            </p>
          </div>

          {/* Feedback form */}
          {tripRate > 0 && (
            <form className="" onSubmit={handleFeedbackSubmit}>
              <p className="font-semibold mb-3">
                {tripRate < 3 && "What did you not like?"}

                {tripRate == 3 && "What can be improved?"}

                {tripRate > 3 && "What do you like?"}
              </p>

              <ul className="flex flex-col gap-3 mb-4">
                {tagList &&
                  tagList.map((tag, inx) => (
                    <li key={`feedback-tag-${inx}`}>
                      <button
                        type="button"
                        className={`inline py-1 px-1.5 text-xs border rounded-sm cursor-pointer ${
                          tag.isActive
                            ? "bg-primary text-white border-primary font-semibold"
                            : "border-black/80 text-black bg-white"
                        }`}
                        onClick={() =>
                          handleFeedbackTag(tripRate, tag.tagTitle)
                        }
                      >
                        {tag.tagTitle}
                      </button>
                    </li>
                  ))}
              </ul>

              <textarea
                name="customerFeedback"
                rows={4}
                className="p-3 w-full border rounded-md text-sm mb-5"
                placeholder="Tell us more about your experience (optional)"
                ref={customerFeedbackMsg}
              />

              <div className="text-center">
                <button
                  type="submit"
                  className="w-full sm:w-[240px] py-2 bg-primary/95 hover:bg-primary text-white rounded-s-full rounded-e-full cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
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
          <p className="text-xl font-semibold mb-4">Return trip</p>
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
          <p className="text-xl font-semibold mb-4">You can follows us on :</p>
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
          className="bg-white p-4 flex flex-col gap-4 items-center rounded"
          style={{
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          }}
        >
          <p className="w-full text-xl font-semibold">Download the App</p>

          <table className="max-w-[400px]">
            <tbody>
              <tr>
                <td className="w-1/2 text-xs text-center text-[#1d1d1da3] px-2.5 py-1">
                  Scan to download
                </td>
                <td className="w-1/2 text-xs text-center text-[#1d1d1da3] px-2.5 py-1">
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
