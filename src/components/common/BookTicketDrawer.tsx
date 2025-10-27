"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GrLinkNext } from "react-icons/gr";
import useEmblaCarousel from "embla-carousel-react";
import bus_offer_test from "@/assets/images/bus-offer-test.png";
import { FaStar } from "react-icons/fa";
import { PiPlugCharging } from "react-icons/pi";
import { LuDot } from "react-icons/lu";
import Drawer from "@mui/material/Drawer";
import { IoMdClose } from "react-icons/io";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SleeperBus from "@/components/SleeperBusComp/SleeperBus";
import sleeperAvailable from "@/assets/SeatTypes/imgi_14_sl_available.svg";
import sleeperMale from "@/assets/SeatTypes/imgi_16_sl_male.svg";
import sleeperBooked from "@/assets/SeatTypes/imgi_18_sl_booked.svg";
import sleeperSelected from "@/assets/SeatTypes/imgi_20_sl_selected.svg";
import sleeperFemale from "@/assets/SeatTypes/imgi_22_sl_fem.svg";
import bookedSleeperByMale from "@/assets/SeatTypes/imgi_59_bluegreysleeper.webp";
import bookedSleeperByFemale from "@/assets/SeatTypes/imgi_57_pinkgreysleeper.webp";
import seaterAvailable from "@/assets/SeatTypes/imgi_13_seater_available.svg";
import seaterMale from "@/assets/SeatTypes/imgi_15_seater_male.svg";
import seaterBooked from "@/assets/SeatTypes/imgi_17_seater_booked.svg";
import seaterSelected from "@/assets/SeatTypes/imgi_19_seater_selected.svg";
import seaterFemale from "@/assets/SeatTypes/imgi_21_seater_fem.svg";
import bookedSeaterByMale from "@/assets/SeatTypes/imgi_25_seat-male-blocked.webp";
import bookedSeaterByFemale from "@/assets/SeatTypes/imgi_56_seat-fem-blocked.webp";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import BusStationTimeline from "@/components/common/BusStationTimeline";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import { TbBulb } from "react-icons/tb";
import LinearProgress from "@mui/material/LinearProgress";
import { FaChild } from "react-icons/fa6";
import { TbLuggage } from "react-icons/tb";

import { FaDog } from "react-icons/fa6";
import { TbBottleOff } from "react-icons/tb";

import { FaRegClock } from "react-icons/fa";

const BookTicketDrawer = ({
  data,
}: {
  data: { viewDrawer: boolean; closeViewDrawer: () => void };
}) => {
  let { viewDrawer, closeViewDrawer } = data;
  const [windowSize, setWindowSize] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [activeTabBusInfo, setActiveTabBusInfo] = useState<number>(0);
  const knowYourSeatType = [
    {
      seatType: "Available",
      seater: seaterAvailable,
      sleeper: sleeperAvailable,
    },
    {
      seatType: "Available only for male passenger",
      seater: seaterMale,
      sleeper: sleeperMale,
    },
    {
      seatType: "Already booked",
      seater: seaterBooked,
      sleeper: sleeperBooked,
    },
    {
      seatType: "Selected by you",
      seater: seaterSelected,
      sleeper: sleeperSelected,
    },
    {
      seatType: "Available only for female passenger",
      seater: seaterFemale,
      sleeper: sleeperFemale,
    },
    {
      seatType: "Booked by female passenger",
      seater: bookedSeaterByFemale,
      sleeper: bookedSleeperByFemale,
    },
    {
      seatType: "Booked by male passenger",
      seater: bookedSeaterByMale,
      sleeper: bookedSleeperByMale,
    },
  ];
  const [BusPhotosCarouselRef] = useEmblaCarousel({ dragFree: true });
  const BusInfoParentRef = useRef<HTMLDivElement | null>(null);
  const BusInfoSectionsRef = useRef<HTMLDivElement | null>(null);

  const busPhotos: string[] = ["o1", "o1", "o1", "o1", "o1"];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleBusInfoTabChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setActiveTabBusInfo(newValue);
  };

  // Window size listener
  useEffect(() => {
    const listenWindowSize = () => {
      console.log(window.innerWidth);
      setWindowSize(window.innerWidth);
    };

    listenWindowSize();

    window.addEventListener("resize", listenWindowSize);

    return () => {
      window.removeEventListener("resize", listenWindowSize);
    };
  }, []);

  // Intersection Observer
  useEffect(() => {
    if (!BusInfoSectionsRef.current) return;

    let activeBusInfoSectionObservers: IntersectionObserver[] = [];

    Array.from(BusInfoSectionsRef.current.children).map((section, inx) => {
      let observer = new IntersectionObserver(
        (entries) => {
          console.log("intersecting divs", entries);
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              console.log("Div is intersecting", inx, entry);
              setActiveTabBusInfo(inx);
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(section);
      activeBusInfoSectionObservers.push(observer);
    });

    return () => {
      activeBusInfoSectionObservers.forEach((observer) =>
        observer.disconnect()
      );
    };
  }, [BusInfoSectionsRef]);

  //Bus Route maker from array
  const BusRoute = [
    "Gandhinagar (Gujarat)",
    "Ahmedabad",
    "Chotila",
    "Rajkot (Gujarat)",
    "Padadhri",
    "Dhrol",
    "Sonyal",
    "Falla",
    "Jambuda",
    "Dared",
    "Jamnagar",
    "Changa",
    "Lath",
    "Haripar Aarikhana",
    "Murila",
    "Lalpur (Rajasthan)",
    "Govana (Gujarat)",
    "Bhangor (Gujarat)",
    "Sanosari",
    "Gop",
    "Dharmagarh",
    "Verad",
    "Tran Patiya (Gujarat)",
    "Fatehpur (Gujarat)",
    "Bhanvad",
    "Rupamora (Gujarat)",
    "Mota Gundala",
  ];

  const MakeBusRouteString = (cityList: string[]) => {
    return cityList.map((city, inx) => (
      <p key={`busRoute-city-${city}`} className="flex items-center gap-x-1">
        <span id={`busRoute-city-${city}`}>{city}</span>
        {inx < cityList.length - 1 && (
          <MdOutlineKeyboardDoubleArrowRight className="text-[#1d1d1da3]" />
        )}
      </p>
    ));
  };

  const ScrollElementIntoView = (element: HTMLElement) => {
    if (BusInfoParentRef.current && element) {
      const containerTop = BusInfoParentRef.current.getBoundingClientRect().top;
      const elementTop = element.getBoundingClientRect().top;

      const scrollOffset =
        elementTop - containerTop + BusInfoParentRef.current.scrollTop - 40;

      BusInfoParentRef.current.scrollTo({
        top: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  // Review and Ratings
  let reviewStarts: { star: number; percentage: number }[] = [
    { star: 5, percentage: 52 },
    { star: 4, percentage: 16 },
    { star: 3, percentage: 9 },
    { star: 2, percentage: 7 },
    { star: 1, percentage: 16 },
  ];
  return (
    <Drawer
      anchor={"bottom"}
      open={viewDrawer}
      onClose={closeViewDrawer}
      slotProps={{
        paper: {
          sx: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          },
        },
      }}
    >
      <div className="max-h-[100vh] lg:max-h-[95vh] rounded-2xl flex flex-col">
        {/* Header */}
        <div className="w-full border-slate-200 min-h-20 max-h-20 p-4 flex justify-start items-center gap-x-2">
          <div>
            <button
              type="button"
              onClick={closeViewDrawer}
              className="px-3 py-2 rounded-s-full rounded-e-full bg-white hover:bg-[#f2f2f8] cursor-pointer"
            >
              <IoMdClose className="text-2xl" />
            </button>
          </div>
          <div>
            <p className="flex items-center font-semibold gap-x-2 text-sm md:text-base">
              <span>Ahmedabad</span>
              <GrLinkNext className="text-[#1d1d1da3]" />
              <span>Jamnagar</span>
            </p>
          </div>
        </div>

        {/* Drawer Main Tabs */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant={windowSize < 640 ? "scrollable" : "standard"}
          centered={windowSize > 640 ? true : false}
          // allowScrollButtonsMobile
          // scrollButtons
          sx={{
            "&.MuiTabs-root": {
              borderTop: "1px solid #e2e8f0",
              borderBottom: "1px solid #e2e8f0",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#173c62",
            },
          }}
        >
          <Tab
            id="Tab-selectSeat"
            aria-controls="TabPanel-selectSeat"
            disableRipple
            label="1. Select seats"
            sx={{
              "&.MuiTab-root": {
                fontWeight: "bold",
                textTransform: "capitalize",
              },
              "&.Mui-selected": {
                color: "#173c62",
              },
            }}
          />
          <Tab
            id="Tab-boardDropPoints"
            aria-controls="TabPanel-boardDropPoints"
            label="2. Board/Drop point"
            disableRipple
            sx={{
              "&.MuiTab-root": {
                fontWeight: "bold",
                textTransform: "capitalize",
              },
              "&.Mui-selected": {
                color: "#173c62",
              },
            }}
          />
          <Tab
            id="Tab-passengerInfo"
            aria-controls="TabPanel-passengerInfo"
            label="3. Passenger Info"
            disableRipple
            sx={{
              "&.MuiTab-root": {
                fontWeight: "bold",
                textTransform: "capitalize",
              },
              "&.Mui-selected": {
                color: "#173c62",
              },
            }}
          />
        </Tabs>

        {/* Tab content: Select Seat */}
        {activeTab === 0 && (
          <div
            role="tabpanel"
            id="TabPanel-selectSeat"
            aria-labelledby="Tab-selectSeat"
            className="w-full min-h-full max-h-full overflow-y-hidden bg-[#f2f2f8] pt-6 px-4 sm:px-12 flex gap-x-7"
          >
            {/* Seats */}
            <div className="w-full md:w-1/2 overflow-y-scroll hideScrollBar">
              {/* Bus deck */}
              <SleeperBus />

              {/* Seat types information */}
              <div>
                <p className="font-bold text-center mt-7 mb-5">
                  Know your seat types
                </p>

                <table
                  id="knowYourSeatTypes"
                  className="w-full bg-transparent mb-7"
                >
                  <thead>
                    <tr>
                      <th className="w-1/2">Seat Types</th>
                      <th className="w-1/4">Seater</th>
                      <th className="w-1/4">Sleeper</th>
                    </tr>
                  </thead>
                  <tbody>
                    {knowYourSeatType &&
                      knowYourSeatType.map((trow, inx) => (
                        <tr key={`knowYourSeatType-row-${inx}`}>
                          <td>{trow.seatType}</td>
                          <td>
                            <Image
                              src={trow.seater}
                              className="max-w-[30px] mx-auto"
                              alt="SeaterSeatPhoto"
                            />
                          </td>
                          <td>
                            <Image
                              src={trow.sleeper}
                              className="mx-auto"
                              alt="SleeperSeatPhoto"
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bus and route information */}
            <div
              className="hidden md:block w-1/2 bg-white overflow-y-scroll hideScrollBar rounded-2xl"
              ref={BusInfoParentRef}
            >
              {/* Header */}
              <div className="p-4 mb-4 flex items-start">
                <div className="flex-1 flex flex-col">
                  <p className="font-bold">Shree Pramukhraj Travels</p>
                  <p className="text-sm flex items-center">
                    <span className="text-[#1d1d1da3]">23:20 - 05:50</span>
                    <LuDot className="text-[#1d1d1da3]" />
                    <span className="text-[#1d1d1da3]">Thu 30 Oct</span>
                  </p>
                  <p className="text-sm text-[#1d1d1da3]">
                    NON A/C Sleeper (2+1)
                  </p>
                </div>

                <div className="h-auto flex justify-end md:justify-center order-4 md:order-2">
                  <div className="p-[2px] inline-block bg-[#e2eee3] rounded-lg">
                    <p className="px-1 py-[2px] flex items-center rounded-md text-white gap-x-1 bg-[#007b28]">
                      <FaStar className="text-xs" />
                      <span className="text-xs font-bold">3.9</span>
                    </p>
                    <p className="text-xs text-black text-center">38</p>
                  </div>
                </div>
              </div>

              {/* Bus photos */}
              <div className="!overflow-hidden ms-4" ref={BusPhotosCarouselRef}>
                <div className="flex">
                  {busPhotos &&
                    busPhotos.map((bus, inx) => (
                      <a
                        href="#"
                        key={`offer-${inx}`}
                        className={inx === 0 ? "ps-0 py-2" : "ps-2 py-2"}
                      >
                        <Image
                          src={bus_offer_test}
                          alt="Bus Offer Photo"
                          className="min-w-[245px] max-w-[245px] min-h-[160px] max-h-[160px] rounded-2xl"
                        />
                      </a>
                    ))}
                </div>
              </div>

              {/* Bus Information Tabs */}
              <div className="w-full sticky top-0 bg-white z-10">
                <Tabs
                  value={activeTabBusInfo}
                  variant="scrollable"
                  scrollButtons
                  allowScrollButtonsMobile
                  onChange={handleBusInfoTabChange}
                  aria-label="Bus info tabs"
                  sx={{
                    "&.MuiTabs-root": {
                      borderBottom: "1px solid #e2e8f0",
                    },
                    "& .MuiTabs-indicator": {
                      backgroundColor: "#173c62",
                    },
                  }}
                >
                  <Tab
                    component="a"
                    onClick={(
                      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                    ) => {
                      event.preventDefault();
                      let element = document.getElementById("busRoute");
                      if (element) ScrollElementIntoView(element);
                    }}
                    label="Bus route"
                    disableRipple
                    sx={{
                      "&.MuiTab-root": {
                        fontWeight: "bold",
                        textTransform: "capitalize",
                      },
                      "&.Mui-selected": {
                        color: "#173c62",
                      },
                    }}
                  />
                  <Tab
                    component="a"
                    onClick={(
                      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                    ) => {
                      event.preventDefault();
                      let element = document.getElementById("boardingPoint");
                      if (element) ScrollElementIntoView(element);
                    }}
                    label="Boarding point"
                    disableRipple
                    sx={{
                      "&.MuiTab-root": {
                        fontWeight: "bold",
                        textTransform: "capitalize",
                      },
                      "&.Mui-selected": {
                        color: "#173c62",
                      },
                    }}
                  />
                  <Tab
                    component="a"
                    onClick={(
                      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                    ) => {
                      event.preventDefault();
                      let element = document.getElementById("droppingPoint");
                      if (element) ScrollElementIntoView(element);
                    }}
                    label="Dropping point"
                    disableRipple
                    sx={{
                      "&.MuiTab-root": {
                        fontWeight: "bold",
                        textTransform: "capitalize",
                      },
                      "&.Mui-selected": {
                        color: "#173c62",
                      },
                    }}
                  />
                  <Tab
                    component="a"
                    onClick={(
                      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                    ) => {
                      event.preventDefault();
                      let element = document.getElementById("restStop");
                      if (element) ScrollElementIntoView(element);
                    }}
                    label="Rest stop"
                    disableRipple
                    sx={{
                      "&.MuiTab-root": {
                        fontWeight: "bold",
                        textTransform: "capitalize",
                      },
                      "&.Mui-selected": {
                        color: "#173c62",
                      },
                    }}
                  />
                  <Tab
                    component="a"
                    onClick={(
                      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                    ) => {
                      event.preventDefault();
                      let element = document.getElementById("amenities");
                      if (element) ScrollElementIntoView(element);
                    }}
                    label="Amenities"
                    disableRipple
                    sx={{
                      "&.MuiTab-root": {
                        fontWeight: "bold",
                        textTransform: "capitalize",
                      },
                      "&.Mui-selected": {
                        color: "#173c62",
                      },
                    }}
                  />
                  <Tab
                    component="a"
                    onClick={(
                      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                    ) => {
                      event.preventDefault();
                      let element = document.getElementById("reviewsRating");
                      if (element) ScrollElementIntoView(element);
                    }}
                    label="Rating and reviews"
                    disableRipple
                    sx={{
                      "&.MuiTab-root": {
                        fontWeight: "bold",
                        textTransform: "capitalize",
                      },
                      "&.Mui-selected": {
                        color: "#173c62",
                      },
                    }}
                  />
                  <Tab
                    component="a"
                    onClick={(
                      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                    ) => {
                      event.preventDefault();
                      let element = document.getElementById("bookingPolicy");
                      if (element) ScrollElementIntoView(element);
                    }}
                    label="Booking policy"
                    disableRipple
                    sx={{
                      "&.MuiTab-root": {
                        fontWeight: "bold",
                        textTransform: "capitalize",
                      },
                      "&.Mui-selected": {
                        color: "#173c62",
                      },
                    }}
                  />
                </Tabs>
              </div>

              <div ref={BusInfoSectionsRef}>
                {/* Bus Route */}
                <div
                  className="px-4 py-6 border-b border-b-gray-200"
                  id="busRoute"
                >
                  <div className="mb-4">
                    <p className="font-bold text-xl">Bus route</p>
                    <p className="text-sm text-[#1d1d1da3]">6 hr 40 min</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-1">
                    {MakeBusRouteString(BusRoute)}
                  </div>
                </div>

                {/* Boarding points */}
                <div
                  id="boardingPoint"
                  className="px-4 py-6 border-b border-b-gray-200"
                >
                  <div className="mb-4">
                    <p className="font-bold text-xl">Boarding Points</p>
                    <p className="text-sm text-[#1d1d1da3]">Jamnagar</p>
                  </div>

                  {/* Boarding point timeline */}
                  <BusStationTimeline />
                </div>

                {/* Dropping points */}
                <div
                  id="droppingPoint"
                  className="px-4 py-6 border-b border-b-gray-200"
                >
                  <div className="mb-4">
                    <p className="font-bold text-xl">Dropping Points</p>
                    <p className="text-sm text-[#1d1d1da3]">Jamnagar</p>
                  </div>

                  {/* Dropping point timeline */}
                  <BusStationTimeline />
                </div>

                {/* Rest stops */}
                <div
                  id="restStop"
                  className="px-4 py-6 border-b border-b-gray-200"
                >
                  <div className="mb-4">
                    <p className="font-bold text-xl">Rest stop</p>
                  </div>

                  <div>
                    <div className="mb-5">
                      <p className="font-bold">Hotel Honest</p>
                      <div className="flex items-center">
                        <span className="text-[#1d1d1da3] text-sm">
                          02:15 PM
                        </span>
                        <LuDot />
                        <span className="text-red-500 text-sm">
                          15 Min stop
                        </span>
                      </div>
                    </div>

                    <ul>
                      <li>
                        <p className="text-sm font-semibold mb-4">
                          Traveler experience
                        </p>
                        <div className="flex gap-1">
                          <div className="w-auto flex px-2 py-1 rounded-lg items-center gap-x-1 bg-[#adf2b3]">
                            <FaThumbsUp className="text-sm" />
                            <span className="text-xs font-medium">
                              Food Quality
                            </span>
                          </div>
                          <div className="w-auto flex px-2 py-1 rounded-lg items-center gap-x-1 bg-[#e6e6e6]">
                            <FaThumbsDown className="text-sm" />
                            <span className="text-xs font-medium">
                              Food Quality
                            </span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* <p className="bg-primary/10 p-4 rounded-lg">
                    This bus has no rest stop
                  </p> */}
                </div>

                {/* Amenities */}
                <div
                  id="amenities"
                  className="px-4 py-6 border-b border-b-gray-200"
                >
                  <div className="mb-4">
                    <p className="font-bold text-xl">2 amenities</p>
                  </div>

                  <ul className="flex flex-col gap-y-4">
                    <li>
                      <div className="flex items-center gap-x-3">
                        <PiPlugCharging className="text-2xl" />
                        <span className="text-sm font-medium">
                          Charging Point
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center gap-x-3">
                        <TbBulb className="text-2xl" />
                        <span className="text-sm font-medium">
                          Reading light
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Rate  and Review */}
                <div
                  className="px-4 py-6 border-b border-b-gray-200"
                  id="reviewsRating"
                >
                  <div className="mb-4 flex justify-between">
                    <p className="font-bold text-xl">Ratings & reviews</p>
                    <div className="flex flex-col items-end gap-y-1">
                      <p className="text-[#007b28] flex items-center gap-x-1">
                        <FaStar className="text-lg" />
                        <span className="font-bold text-xl leading-none">
                          4.4
                        </span>
                      </p>
                      <p className="text-xs text-[1d1d1da3]">44 Ratings</p>
                    </div>
                  </div>

                  {/* Stars with percentage */}
                  <table className="w-full mb-5" id="ratePercentageTable">
                    <tbody>
                      {reviewStarts &&
                        reviewStarts.map((ele, inx) => (
                          <tr key={`reviewStar-${ele.star}`}>
                            <td className="text-sm font-medium">{ele.star}</td>
                            <td className="w-[100%]">
                              <div className="flex items-center ps-[2px]">
                                <FaStar className="text-sm" />
                                <LinearProgress
                                  variant="determinate"
                                  value={ele.percentage}
                                  sx={{
                                    width: "100%",
                                    margin: "0px 16px",
                                    "&.MuiLinearProgress-root": {
                                      backgroundColor: "#e6e6e6",
                                      borderRadius: "10px",
                                      height: "6px",
                                    },
                                    "& .MuiLinearProgress-bar1": {
                                      backgroundColor: "#4b4b4b",
                                    },
                                  }}
                                />
                              </div>
                            </td>
                            <td className="text-sm text-right font-medium">
                              {ele.percentage}%
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>

                  <div className="mb-5">
                    <p className="text-sm font-semibold mb-4">
                      Loved by travelers
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      <li>
                        <p className="text-xs font-semibold px-2 py-1 rounded-lg bg-[#adf2b3]">
                          Staff behavior&nbsp;(9)
                        </p>
                      </li>
                      <li>
                        <p className="text-xs font-semibold px-2 py-1 rounded-lg bg-[#adf2b3]">
                          Staff behavior&nbsp;(9)
                        </p>
                      </li>
                      <li>
                        <p className="text-xs font-semibold px-2 py-1 rounded-lg bg-[#adf2b3]">
                          Staff behavior&nbsp;(9)
                        </p>
                      </li>
                      <li>
                        <p className="text-xs font-semibold px-2 py-1 rounded-lg bg-[#adf2b3]">
                          Staff behavior&nbsp;(9)
                        </p>
                      </li>
                      <li>
                        <p className="text-xs font-semibold px-2 py-1 rounded-lg bg-[#adf2b3]">
                          Staff behavior&nbsp;(9)
                        </p>
                      </li>
                      <li>
                        <p className="text-xs font-semibold px-2 py-1 rounded-lg bg-[#adf2b3]">
                          Staff behavior&nbsp;(9)
                        </p>
                      </li>
                      <li>
                        <p className="text-xs font-semibold px-2 py-1 rounded-lg bg-[#adf2b3]">
                          Staff behavior&nbsp;(9)
                        </p>
                      </li>
                      <li>
                        <p className="text-xs font-semibold px-2 py-1 rounded-lg bg-[#adf2b3]">
                          Staff behavior&nbsp;(9)
                        </p>
                      </li>
                    </ul>
                  </div>

                  <button
                    type="button"
                    className="w-full rounded-s-full rounded-e-full py-3 text-center font-semibold bg-primary/10 hover:bg-primary/20 cursor-pointer text-sm"
                  >
                    Read all 8 reviews
                  </button>
                </div>

                {/* Cancellation policy */}
                <div
                  className="px-4 py-6 border-b border-b-gray-200"
                  id="bookingPolicy"
                >
                  <p className="font-bold text-xl mb-4">Cancellation policy</p>
                  <table id="cancellationTable" className="w-full mb-4">
                    <thead>
                      <tr>
                        <th className="w-3/4 bg-[#f2f2f8]">
                          Time before travel
                        </th>
                        <th className="w-1/4 bg-[#f2f2f8]">Deduction</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Before 29th Oct 01:00 PM</td>
                        <td>₹97 (15%)</td>
                      </tr>
                      <tr>
                        <td>From 29th Oct 01:00 PM Until 30th Oct 01:00 AM</td>
                        <td>₹130 (20%)</td>
                      </tr>
                      <tr>
                        <td>From 30th Oct 01:00 AM Until 30th Oct 09:00 AM</td>
                        <td>₹324 (50%)</td>
                      </tr>
                      <tr>
                        <td>From 30th Oct 09:00 AM Until 30th Oct 01:00 PM</td>
                        <td>₹648 (100%)</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="flex flex-col gap-y-4">
                    <p className="text-xs text-[1d1d1da3]">
                      * Cancellation charges are computed on a per seat basis.
                      Above cancellation fare is calculated based on seat fare
                      of ₹ 648
                    </p>
                    <p className="text-xs text-[1d1d1da3]">
                      * Cancellation charges are calculated based on service
                      start date + time at :30-10-2025 13:00
                    </p>
                    <p className="text-xs text-[1d1d1da3]">
                      * Ticket cannot be cancelled after scheduled bus departure
                      time from the first boarding point
                    </p>
                    <p className="text-xs text-[1d1d1da3]">
                      * Note: Cancellation charges mentioned above are excluding
                      GST
                    </p>
                    <p className="text-xs text-[1d1d1da3]">
                      * For group bookings cancellation of individual seats is
                      not allowed.
                    </p>
                  </div>
                </div>

                {/* Date change policy */}
                <div className="px-4 py-6 border-b border-b-gray-200">
                  <p className="font-bold text-xl mb-4">Cancellation policy</p>

                  <table id="dateChangePolicyTable" className="w-full mb-4">
                    <thead>
                      <tr>
                        <th className="w-3/4 bg-[#f2f2f8]">
                          Time before travel
                        </th>
                        <th className="w-1/4 bg-[#f2f2f8]">
                          Date change charges
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Before 30th Oct 07:00 AM</td>
                        <td>FREE</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Other policies */}
                <div className="px-4 py-6 border-b border-b-gray-200">
                  <p className="font-bold text-xl mb-4">Other policies</p>

                  <ul className="flex flex-col gap-y-7">
                    <li>
                      <div className="flex gap-4">
                        <FaChild className="text-2xl w-6 h-6" />
                        <p className="flex flex-col">
                          <span className="text-sm font-bold">
                            Child passenger policy
                          </span>
                          <span className="text-[#1d1d1da3] text-sm">
                            Children above the age of 5 will need a ticket
                          </span>
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="flex gap-4">
                        <TbLuggage className="text-2xl min-w-6 min-h-6" />
                        <p className="flex flex-col">
                          <span className="text-sm font-bold">
                            Luggage policy
                          </span>
                          <span className="text-[#1d1d1da3] text-sm">
                            2 pieces of luggage will be accepted free of charge
                            per passenger. Excess items will be chargeable
                            Excess baggage over 20 kgs per passenger will be
                            chargeable
                          </span>
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="flex gap-4">
                        <FaDog className="text-2xl min-w-6 min-h-6" />
                        <p className="flex flex-col">
                          <span className="text-sm font-bold">Pets Policy</span>
                          <span className="text-[#1d1d1da3] text-sm">
                            Pets are not allowed
                          </span>
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="flex gap-4">
                        <TbBottleOff className="text-2xl min-w-6 min-h-6" />
                        <p className="flex flex-col">
                          <span className="text-sm font-bold">
                            Liquor Policy
                          </span>
                          <span className="text-[#1d1d1da3] text-sm">
                            Carrying or consuming liquor inside the bus is
                            prohibited. Bus operator reserves the right to
                            deboard drunk passengers.
                          </span>
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="flex gap-4">
                        <FaRegClock className="text-2xl min-w-6 min-h-6" />
                        <p className="flex flex-col">
                          <span className="text-sm font-bold">
                            Pick up time policy
                          </span>
                          <span className="text-[#1d1d1da3] text-sm">
                            Bus operator is not obligated to wait beyond the
                            scheduled departure time of the bus. No refund
                            request will be entertained for late arriving
                            passengers.
                          </span>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Boarding/Dropping points */}
        {activeTab === 1 && (
          <div
            role="tabpanel"
            id="TabPanel-boardDropPoints"
            aria-labelledby="Tab-boardDropPoints"
          >
            Boarding / Dropping points
          </div>
        )}

        {/* Passenger Information */}
        {activeTab === 2 && (
          <div
            role="tabpanel"
            id="TabPanel-passengerInfo"
            aria-labelledby="Tab-passengerInfo"
          >
            Passanger Information
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default BookTicketDrawer;
