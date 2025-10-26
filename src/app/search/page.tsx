"use client";
import Image from "next/image";
import navbarLogo from "@/assets/images/Navbar_logo.png";
import { useEffect, useRef, useState } from "react";
import { Popover } from "@mui/material";
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { FiSearch } from "react-icons/fi";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DateFormater, getDayOfWeek } from "@/utils/common/dateFormater";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImSpinner8 } from "react-icons/im";
import { IoMdArrowBack } from "react-icons/io";
import { GrLinkNext } from "react-icons/gr";
import { useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import bus_offer_test from "@/assets/images/bus-offer-test.png";
import Link from "next/link";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { TbArmchair } from "react-icons/tb";
import { MdOutlineBed } from "react-icons/md";
import { MdOutlineAirlineSeatReclineExtra } from "react-icons/md";
import { MdOutlineNoBackpack } from "react-icons/md";
import { FiSunrise } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";
import { FaMapLocationDot } from "react-icons/fa6";
import { RiBusWifiLine } from "react-icons/ri";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import { FiSun } from "react-icons/fi";
import { FiMoon } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import { TbBottle } from "react-icons/tb";
import { BiBlanket } from "react-icons/bi";
import { PiPlugCharging } from "react-icons/pi";
import { LiaRestroomSolid } from "react-icons/lia";
import { RiBusLine } from "react-icons/ri";
import { GoDash } from "react-icons/go";
import { LuDot } from "react-icons/lu";
import { VscSettings } from "react-icons/vsc";
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

interface ContentsList {
  filterId: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  numbers: number;
}

interface FilterAccordianType {
  isSearchable: boolean;
  title: string;
  contentsList: ContentsList[];
  selected: number;
}

// Filters Accordians component
const FilterAccordian = ({
  isSearchable,
  title,
  contentsList,
  selected,
}: FilterAccordianType) => {
  const [filteredContentsList, setFilteredContentsList] = useState<
    ContentsList[]
  >([...contentsList]);

  const SearchFiltersFromList = (text: string, contList: ContentsList[]) => {
    const filtered = contList.filter((filter: ContentsList) =>
      filter.filterId.toLocaleLowerCase().includes(text.toLocaleLowerCase())
    );
    setFilteredContentsList(filtered);
  };
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        sx={{
          "&.MuiButtonBase-root": {
            gap: "16px",
          },
        }}
      >
        <div className="flex flex-col">
          <span className="text-base font-bold">{title}</span>
          <span className="text-sm text-[#1d1d1da3]">{selected} selected</span>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <ul>
          {isSearchable && (
            <li className="pb-4">
              <input
                type="text"
                className="py-4 px-5 w-full h-full rounded-s-full rounded-e-full bg-[#f2f2f8] placeholder:text-gray-500 outline-none"
                placeholder={"Search " + title.toLocaleLowerCase()}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  SearchFiltersFromList(e.currentTarget.value, contentsList)
                }
              />
            </li>
          )}

          {filteredContentsList &&
            filteredContentsList.map((filter, inx, filterArr) => (
              <li key={filter.filterId}>
                <label
                  htmlFor={filter.filterId}
                  className={`flex items-center gap-x-4 cursor-pointer ${
                    inx === 0 ? "pb-4" : "py-4"
                  } ${
                    inx !== filterArr.length - 1
                      ? "border-b border-b-slate-200"
                      : ""
                  }`}
                >
                  {/* Icon */}
                  {filter.icon && filter.icon}

                  {/* Content */}
                  <div className="flex flex-1 justify-between items-center">
                    {filter.content}
                    <span className="text-xs text-[#1d1d1da3]">
                      {filter.numbers}
                    </span>
                  </div>

                  <Checkbox
                    id={filter.filterId}
                    sx={{
                      // color: "#173c62",
                      "&.Mui-checked": {
                        color: "#173c62",
                      },
                      "&.MuiCheckbox-root": {
                        padding: "0px !important",
                      },
                    }}
                  />
                </label>
              </li>
            ))}
          {filteredContentsList && filteredContentsList.length <= 0 && (
            <li>
              <p className="pb-4 text-center text-[#1d1d1da3]">
                No result found
              </p>
            </li>
          )}
        </ul>
      </AccordionDetails>
    </Accordion>
  );
};

{
  /* Booking seat drawer */
}
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
            <div className="w-full lg:w-1/2 overflow-y-scroll hideScrollBar">
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
              className="hidden lg:block w-1/2 bg-white overflow-y-scroll hideScrollBar rounded-2xl"
              ref={BusInfoParentRef}
            >
              {/* Header */}
              <div className="p-4 mb-4 flex items-start">
                <div className="w-[90%]">
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

                <div className="w-[10%] h-auto flex justify-end md:justify-center order-4 md:order-2">
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
                        <div className="flex flex-col gap-2">
                          <div className="w-auto flex px-2 py-1 rounded-lg items-center gap-x-1 bg-[#adf2b3] mb-2">
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

                  <p className="bg-primary/10 p-4 rounded-lg">
                    This bus has no rest stop
                  </p>
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

//Bus card
const BusCard = ({ openViewDrawer }: { openViewDrawer: () => void }) => {
  return (
    <div
      className="bg-white flex flex-col rounded-2xl shadow-md p-4"
      onClick={openViewDrawer}
    >
      <div className="w-full flex flex-wrap md:flex-nowrap lg:pb-3 gap-y-4">
        <div className="w-3/4 lg:w-2/5 order-3 md:order-1">
          <p className="flex items-center gap-x-1">
            <span className="text-sm font-semibold">Vrundavan Travels</span>
            <RiBusLine className="text-xl" />
          </p>
          <p className="text-xs text-[#1d1d1da3]">NON A/C Sleeper (2+1)</p>
        </div>

        <div className="w-1/4 lg:w-[10%] flex justify-end md:justify-center order-4 md:order-2">
          <div className="p-[2px] inline-block bg-[#e2eee3]  rounded-lg">
            <p className="px-1 py-[2px] flex items-center rounded-md text-white gap-x-1 bg-[#007b28]">
              <FaStar className="text-xs" />
              <span className="text-xs font-bold">3.9</span>
            </p>
            <p className="text-xs text-black text-center">38</p>
          </div>
        </div>

        <div className="w-3/4 lg:w-2/5 flex justify-start md:justify-center order-1 md:order-3">
          <div className="inline-flex flex-col">
            <p className="inline-flex flex-nowrap gap-x-1 items-center">
              <span className="font-bold">23:00</span>
              <GoDash className="text-slate-500" />
              <span className="font-semibold text-black/70">05:30</span>
            </p>
            <p className="inline-flex flex-nowrap text-xs text-[#1d1d1da3] items-center">
              <span>{"6h 30m"}</span>
              <LuDot />
              <span>{"13 seats(4 Single)"}</span>
            </p>
          </div>
        </div>

        <div className="w-1/4 lg:w-[10%] flex flex-col order-2 md:order-4">
          <p className="font-bold text-right">&#8377;500</p>
          <p className="text-xs text-right text-[#1d1d1da3]">Onwards</p>
        </div>
      </div>

      <div className="hidden lg:flex justify-between items-center pt-3 border-t border-dotted border-t-slate-200">
        <div>
          <ul className="hidden">
            <li className="border-e border-e-slate-200">
              <button
                type="button"
                className="px-4 py-2 text-xs font-semibold rounded-s-full rounded-e-full text-[#5258e4] hover:bg-[#e4ecfd] "
              >
                Boarding/ Dropping Points
              </button>
            </li>
            <li className="border-e border-e-slate-200">
              <button
                type="button"
                className="px-4 py-2 text-xs font-semibold rounded-s-full rounded-e-full text-[#5258e4] hover:bg-[#e4ecfd] "
              >
                Ratings & Reviews
              </button>
            </li>
            <li className="border-e border-e-slate-200">
              <button
                type="button"
                className="px-4 py-2 text-xs font-semibold rounded-s-full rounded-e-full text-[#5258e4] hover:bg-[#e4ecfd] "
              >
                Bus Photos
              </button>
            </li>
            <li className="border-e border-e-slate-200">
              <button
                type="button"
                className="px-4 py-2 text-xs font-semibold rounded-s-full rounded-e-full text-[#5258e4] hover:bg-[#e4ecfd] "
              >
                Cancellation Policies
              </button>
            </li>
          </ul>
        </div>

        <div>
          <button
            type="button"
            className="text-white py-3 px-5 rounded-s-full rounded-e-full font-bold bg-primary cursor-pointer outline-none"
            // onClick={openViewDrawer}
          >
            View seats
          </button>
        </div>
      </div>
    </div>
  );
};

const SearchBus = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  //Arrays
  const boardingPoints: string[] = [
    "Ahmedabad",
    "Gandhinagar",
    "Vadodara",
    "Navsari",
    "Jamnagar",
    "Rajkot",
    "Surat",
    "Bhavnagar",
    "Surendranagar",
    "Junagadh",
    "Nadiad",
    "Patan",
    "Porbandar",
    "Bharuch",
    "Mehsana",
    "Morbi",
    "Gandhidham",
    "Anand",
    "Bhuj",
    "Veraval",
  ];

  // Source popover
  const [fromPlace, setFromPlace] = useState<HTMLElement | null>(null);
  const fromPlacePopInputRef = useRef<HTMLInputElement | null>(null);

  const openFormPopover = (event: React.MouseEvent<HTMLElement>) => {
    setFromPlace(event.currentTarget);
  };

  const closeFromPopover = () => {
    setFromPlace(null);
  };

  useEffect(() => {
    let timer2: ReturnType<typeof setTimeout>;

    const timer1: ReturnType<typeof setTimeout> = setTimeout(() => {
      if (fromPlacePopInputRef.current) fromPlacePopInputRef.current.focus();
      else {
        timer2 = setTimeout(() => {
          if (fromPlacePopInputRef.current)
            fromPlacePopInputRef.current.focus();
          // else
          //   console.log(
          //     "fromPlacePopInputRef.current",
          //     fromPlacePopInputRef.current
          //   );
        }, 300);
      }
    }, 300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [fromPlace]);

  // destination place popover
  const [destPlace, setDestPlace] = useState<HTMLElement | null>(null);
  const destPlacePopInput = useRef<HTMLInputElement | null>(null);

  const openDestPopover = (event: React.MouseEvent<HTMLElement>) => {
    setDestPlace(event.currentTarget);
  };

  const closeDestPopover = () => {
    setDestPlace(null);
  };

  useEffect(() => {
    let timer2: ReturnType<typeof setTimeout>;

    const timer1: ReturnType<typeof setTimeout> = setTimeout(() => {
      if (destPlacePopInput.current) destPlacePopInput.current.focus();
      else {
        timer2 = setTimeout(() => {
          if (destPlacePopInput.current) destPlacePopInput.current.focus();
          // else
          //   console.log("destPlacePopInput.current", destPlacePopInput.current);
        }, 300);
      }
    }, 300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [destPlace]);

  // destination place popover
  const [journeyDatePop, setJourneyDatePop] = useState<HTMLElement | null>(
    null
  );
  const [dateDialog, setDateDialog] = useState<boolean>(false);

  const openJourneyDatePopover = (event: React.MouseEvent<HTMLElement>) => {
    setJourneyDatePop(event.currentTarget);
  };

  const closeJourneyDatePopover = () => {
    setJourneyDatePop(null);
  };

  const handleDateDialog = () => {
    setDateDialog(true);
  };

  const closeDateDialog = () => {
    setDateDialog(false);
  };

  //React-hook-from with Zod validation

  // SearchBuses Form Schema
  const SearchBusSchema = z.object({
    boardingPoint: z
      .string({ error: "Boarding point is required!" })
      .min(1, { message: "Boarding point is required!" }),
    destinationPoint: z
      .string({ error: "Destination point is required!" })
      .min(1, { message: "Destination point is required!" }),
    journeyDate: z
      .date({ error: "Journey Date is required!" })
      .min(new Date(), { message: "Journey Date can't be from past!" }),
    isWomen: z.boolean().optional(),
  });

  type SearchBusDataType = z.infer<typeof SearchBusSchema>;

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    getValues,
    clearErrors,
    control,
    formState: { errors },
  } = useForm<SearchBusDataType>({
    defaultValues: {
      isWomen: false,
    },
    resolver: zodResolver(SearchBusSchema),
  });

  //Handle submit on SearchBuses
  const onSearchBuses = (data: SearchBusDataType) => {
    console.log("Form data: ", data);
    setLoading(true);
  };

  // watching all search buses inputs
  const jDate = watch("journeyDate");
  const bPoint = watch("boardingPoint");
  const dPoint = watch("destinationPoint");

  //Offer carousel
  const [offersCarouselRef] = useEmblaCarousel({ dragFree: true });
  const offers: string[] = [
    "o1",
    "o1",
    "o1",
    "o1",
    "o1",
    "o1",
    "o1",
    "o1",
    "o1",
    "o1",
    "o1",
  ];

  const tagsList: {
    name: string;
    icon: React.ReactNode;
    title: string;
    numbers: number;
  }[] = [
    {
      name: "primoBus",
      icon: <FaRegStar className="text-xl" />,
      title: "Primo Bus",
      numbers: 8,
    },
    {
      name: "ac",
      icon: <TbAirConditioning className="text-xl" />,
      title: "AC",
      numbers: 55,
    },
    {
      name: "sleeper",
      icon: <MdOutlineBed className="text-xl" />,
      title: "SLEEPER",
      numbers: 59,
    },
    {
      name: "singleSeat",
      icon: <TbArmchair className="text-xl" />,
      title: "Single Seats",
      numbers: 60,
    },
    {
      name: "seater",
      icon: <MdOutlineAirlineSeatReclineExtra className="text-xl" />,
      title: "SEATER",
      numbers: 3,
    },
    {
      name: "non_ac",
      icon: <MdOutlineNoBackpack className="text-xl" />,
      title: "NON AC",
      numbers: 43,
    },
    {
      name: "earlyMorning",
      icon: <FiSunrise className="text-xl" />,
      title: "06:00-12:00",
      numbers: 13,
    },
    {
      name: "evening",
      icon: <FiSunset className="text-xl" />,
      title: "18:00-24:00",
      numbers: 53,
    },
    {
      name: "highRatedBuses",
      icon: <RiBusWifiLine className="text-xl" />,
      title: "High Rated Buses",
      numbers: 8,
    },
    {
      name: "livaTracking",
      icon: <FaMapLocationDot className="text-xl" />,
      title: "Live Tracking",
      numbers: 8,
    },
  ];

  const filterList = [
    {
      title: "Departure time from source",
      contentsList: [
        {
          filterId: "morning_6_to_12",
          icon: <FiSunrise className="text-xl" />,
          content: (
            <div>
              <p className="font-medium">06:00-12:00</p>
              <p className="text-sm text-[#1d1d1da3]">Morning</p>
            </div>
          ),
          numbers: 13,
        },
        {
          filterId: "afternoon_12_to_18",
          icon: <FiSun className="text-xl" />,
          content: (
            <div>
              <p className="font-medium">12:00-18:00</p>
              <p className="text-sm text-[#1d1d1da3]">Afternoon</p>
            </div>
          ),
          numbers: 20,
        },
        {
          filterId: "evening_18_to_24",
          icon: <FiSunset className="text-xl" />,
          content: (
            <div>
              <p className="font-medium">18:00-24:00</p>
              <p className="text-sm text-[#1d1d1da3]">Evening</p>
            </div>
          ),
          numbers: 54,
        },
        {
          filterId: "night_00_to_06",
          icon: <FiMoon className="text-xl" />,
          content: (
            <div>
              <p className="font-medium">00:00-06:00</p>
              <p className="text-sm text-[#1d1d1da3]">Afternoon</p>
            </div>
          ),
          numbers: 12,
        },
      ],
      selected: 1,
    },
    {
      title: "Arrival time at destination",
      contentsList: [
        {
          filterId: "arrival_morning_6_to_12",
          icon: <FiSunrise className="text-xl" />,
          content: (
            <div>
              <p className="font-medium">06:00-12:00</p>
              <p className="text-sm text-[#1d1d1da3]">Morning</p>
            </div>
          ),
          numbers: 13,
        },
        {
          filterId: "arrival_afternoon_12_to_18",
          icon: <FiSun className="text-xl" />,
          content: (
            <div>
              <p className="font-medium">12:00-18:00</p>
              <p className="text-sm text-[#1d1d1da3]">Afternoon</p>
            </div>
          ),
          numbers: 20,
        },
        {
          filterId: "arrival_evening_18_to_24",
          icon: <FiSunset className="text-xl" />,
          content: (
            <div>
              <p className="font-medium">18:00-24:00</p>
              <p className="text-sm text-[#1d1d1da3]">Evening</p>
            </div>
          ),
          numbers: 54,
        },
        {
          filterId: "arrival_night_00_to_06",
          icon: <FiMoon className="text-xl" />,
          content: (
            <div>
              <p className="font-medium">00:00-06:00</p>
              <p className="text-sm text-[#1d1d1da3]">Afternoon</p>
            </div>
          ),
          numbers: 12,
        },
      ],
      selected: 1,
    },
    {
      title: "Bus type",
      contentsList: [
        {
          filterId: "busType_AC",
          icon: <TbAirConditioning className="text-xl" />,
          content: (
            <div>
              <p className="font-medium">AC</p>
            </div>
          ),
          numbers: 13,
        },
        {
          filterId: "busType_NON_AC",
          icon: <MdOutlineNoBackpack className="text-xl" />,
          content: (
            <div>
              <p className="font-medium">NON-AC</p>
            </div>
          ),
          numbers: 20,
        },
        {
          filterId: "busType_Seater",
          icon: <MdOutlineAirlineSeatReclineExtra className="text-xl" />,
          content: (
            <div>
              <p className="font-medium">SEATER</p>
            </div>
          ),
          numbers: 54,
        },
        {
          filterId: "busType_Sleeper",
          icon: <MdOutlineBed className="text-xl" />,
          content: (
            <div>
              <p className="font-medium">SLEEPER</p>
            </div>
          ),
          numbers: 12,
        },
      ],
      selected: 1,
    },
    {
      title: "Single window seater/sleeper",
      contentsList: [
        {
          filterId: "singleWindowSeaterOrSleeper",
          icon: <TbArmchair className="text-xl" />,
          content: (
            <div>
              <p className="font-medium">Single Seats</p>
            </div>
          ),
          numbers: 13,
        },
      ],
      selected: 1,
    },
    {
      title: "Bus features",
      contentsList: [
        {
          filterId: "busFeatures_liveTracking",
          icon: <FaMapLocationDot className="text-xl" />,
          content: (
            <div>
              <p className="font-medium">Live Tracking</p>
            </div>
          ),
          numbers: 13,
        },
        {
          filterId: "busFeatures_highRatedBuses",
          icon: <RiBusWifiLine className="text-xl" />,
          content: (
            <div>
              <p className="font-medium">High Rated Buses</p>
            </div>
          ),
          numbers: 13,
        },
        {
          filterId: "busFeatures_deals",
          icon: <MdOutlineLocalOffer className="text-xl" />,
          content: (
            <div>
              <p className="font-medium">Deals</p>
            </div>
          ),
          numbers: 13,
        },
        {
          filterId: "busFeatures_primoBus",
          icon: <FaRegStar className="text-xl" />,
          content: (
            <div>
              <p className="font-medium">Primo Bus</p>
            </div>
          ),
          numbers: 13,
        },
        {
          filterId: "busFeatures_freeCancellation",
          icon: <FiCheckCircle className="text-xl" />,
          content: (
            <div>
              <p className="font-medium">Free Cancellation</p>
            </div>
          ),
          numbers: 13,
        },
        {
          filterId: "busFeatures_volvoBuses",
          icon: <FiCheckCircle className="text-xl" />,
          content: (
            <div>
              <p className="font-medium">Volvo Buses</p>
            </div>
          ),
          numbers: 13,
        },
      ],
      selected: 1,
    },
    {
      title: "Bus operator",
      contentsList: [
        {
          filterId: "busOperator_GSRTC",
          icon: null,
          content: (
            <div>
              <p className="font-medium">GSRTC</p>
            </div>
          ),
          numbers: 13,
        },
        {
          filterId: "busOperator_MHSRTC",
          icon: null,
          content: (
            <div>
              <p className="font-medium">MHSRTC</p>
            </div>
          ),
          numbers: 13,
        },
        {
          filterId: "busOperator_RSRTC",
          icon: null,
          content: (
            <div>
              <p className="font-medium">RSRTC</p>
            </div>
          ),
          numbers: 13,
        },
        {
          filterId: "busOperator_MPSRTC",
          icon: null,
          content: (
            <div>
              <p className="font-medium">MPSRTC</p>
            </div>
          ),
          numbers: 13,
        },
      ],
      isSearchable: true,
      selected: 1,
    },
    {
      title: "Boarding points",
      contentsList: [
        {
          filterId: "boardingPoints_satrasta",
          icon: null,
          content: (
            <div>
              <p className="font-medium">Sat Rasta</p>
            </div>
          ),
          numbers: 13,
        },
        {
          filterId: "boardingPoints_gurudwara",
          icon: null,
          content: (
            <div>
              <p className="font-medium">Gurudwara</p>
            </div>
          ),
          numbers: 13,
        },
        {
          filterId: "boardingPoints_gulabnagar",
          icon: null,
          content: (
            <div>
              <p className="font-medium">Gulabnagar</p>
            </div>
          ),
          numbers: 13,
        },
        {
          filterId: "boardingPoints_townhall",
          icon: null,
          content: (
            <div>
              <p className="font-medium">Town Hall</p>
            </div>
          ),
          numbers: 13,
        },
      ],
      isSearchable: true,
      selected: 1,
    },
    {
      title: "Dropping points",
      contentsList: [
        {
          filterId: "droppingPoints_satrasta",
          icon: null,
          content: (
            <div>
              <p className="font-medium">Sat Rasta</p>
            </div>
          ),
          numbers: 13,
        },
        {
          filterId: "droppingPoints_gurudwara",
          icon: null,
          content: (
            <div>
              <p className="font-medium">Gurudwara</p>
            </div>
          ),
          numbers: 13,
        },
        {
          filterId: "droppingPoints_gulabnagar",
          icon: null,
          content: (
            <div>
              <p className="font-medium">Gulabnagar</p>
            </div>
          ),
          numbers: 13,
        },
        {
          filterId: "droppingPoints_townhall",
          icon: null,
          content: (
            <div>
              <p className="font-medium">Town Hall</p>
            </div>
          ),
          numbers: 13,
        },
      ],
      isSearchable: true,
      selected: 1,
    },
    {
      title: "Amenities",
      contentsList: [
        {
          filterId: "amenitie_waterBottle",
          icon: <TbBottle className="text-xl" />,
          content: (
            <div>
              <p className="font-medium">Water Bottle</p>
            </div>
          ),
          numbers: 13,
        },
        {
          filterId: "amenities_blanket",
          icon: <BiBlanket className="text-xl" />,
          content: (
            <div>
              <p className="font-medium">Blanket</p>
            </div>
          ),
          numbers: 13,
        },
        {
          filterId: "amenities_chargingPoint",
          icon: <PiPlugCharging className="text-xl" />,
          content: (
            <div>
              <p className="font-medium">Charging Point</p>
            </div>
          ),
          numbers: 13,
        },
        {
          filterId: "amenitie_toilet",
          icon: <LiaRestroomSolid className="text-xl" />,
          content: (
            <div>
              <p className="font-medium">Toilet</p>
            </div>
          ),
          numbers: 13,
        },
      ],
      isSearchable: true,
      selected: 1,
    },
    {
      title: "Special bus features",
      contentsList: [
        {
          filterId: "specialBusFeature_freeBusChange",
          icon: null,
          content: (
            <div>
              <p className="font-medium">Free Bus Change</p>
            </div>
          ),
          numbers: 13,
        },
        {
          filterId: "specialBusFeature_highlyRatedByWomen",
          icon: null,
          content: (
            <div>
              <p className="font-medium">Highly rated by women</p>
            </div>
          ),
          numbers: 13,
        },
        {
          filterId: "specialBusFeature_womenTravelling",
          icon: null,
          content: (
            <div>
              <p className="font-medium">Women Travelling</p>
            </div>
          ),
          numbers: 13,
        },
      ],
      selected: 1,
    },
  ];

  const foundBuses = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  // Bus ticket booking drawer
  let [viewDrawer, setViewDrawer] = useState<boolean>(false);
  const openViewDrawer = (): void => {
    setViewDrawer(true);
  };

  const closeViewDrawer = (): void => {
    setViewDrawer(false);
  };

  return (
    <>
      {/* Upper Navbar */}
      <div className="myContainer shadow-sm lg:shadow-none bg-white w-full sticky lg:relative top-0 left-0 right-0 z-40 flex items-center">
        <div className="w-full h-full py-3 lg:pt-4 flex justify-between items-center">
          <div className="flex items-center gap-x-2">
            <div>
              <button
                type="button"
                onClick={() => {
                  router.back();
                }}
                className="p-2 ps-0 cursor-pointer"
              >
                <IoMdArrowBack className="text-2xl" />
              </button>
            </div>
            <div>
              <p className="flex items-center font-semibold gap-x-2 text-sm md:text-base">
                <span>Ahmedabad</span>
                <GrLinkNext className="text-[#1d1d1da3]" />
                <span>Jamnagar</span>
              </p>
              <p className=" text-xs md:text-sm text-[#1d1d1da3]">50 buses</p>
            </div>
          </div>

          <button
            type="button"
            className="lg:hidden flex flex-col"
            onClick={handleDateDialog}
          >
            <span
              className="bg-[#fed9d5] hover:bg-[#f8d3cf] font-bold p-2 rounded-s-full  text-xs md:text-sm rounded-e-full cursor-pointer"
              onClick={() => {
                setValue("journeyDate", new Date(Date.now()));
              }}
            >
              {jDate ? DateFormater(jDate).split(",")[0] : "-"}
            </span>
            <span className=" text-xs md:text-sm text-center text-[#1d1d1da3]">
              {jDate ? getDayOfWeek(jDate) : "-"}
            </span>
          </button>

          <Drawer anchor="bottom" onClose={closeDateDialog} open={dateDialog}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                sx={{ margin: 0, minWidth: "100%" }}
                value={dayjs(jDate)}
                onChange={(date) => {
                  if (date) {
                    console.log("jDate: ", jDate);
                    setValue("journeyDate", date.toDate());
                  }
                  closeDateDialog();
                }}
              />
            </LocalizationProvider>
          </Drawer>
        </div>
      </div>

      {/* Lower Navbar*/}
      <div className="myContainer bg-white w-full sticky top-0 left-0 right-0 font-semibold hidden lg:flex items-center z-40 shadow-md">
        {/* GSRTC Logo */}
        <Image
          src={navbarLogo}
          className="hidden w-[300px] h-[50px] lg:w-[385px] lg:h-[64px]"
          alt="GSRTC Navbar LOGO"
        />

        {/* Bus search function */}
        <form
          className="w-full rounded-3xl"
          onClick={(e) => {
            const eleCoord = e.currentTarget.getBoundingClientRect();
            console.log("eleCoord.top: ", eleCoord.top);
            scrollBy({
              top: eleCoord.top,
              behavior: "instant",
            });
          }}
          onSubmit={handleSubmit(onSearchBuses)}
        >
          <div className="py-4 flex">
            {/* Source place */}
            <div className="relative w-[30%]">
              <button
                type="button"
                className="w-full p-2.5 border rounded-s-2xl border-slate-400 flex items-center gap-x-2 cursor-pointer outline-none"
                onClick={(e) => {
                  openFormPopover(e);
                }}
              >
                <HailOutlinedIcon sx={{ fontSize: 30 }} />
                <div>
                  <p className="text-left text-xs text-gray-500">From</p>
                  <p className="min-h-6 text-left font-bold">
                    {bPoint ?? <span className="">Boarding point</span>}
                  </p>
                </div>
              </button>

              {errors.boardingPoint && (
                <small className="text-red-500 font-medium">
                  {errors.boardingPoint.message}
                </small>
              )}
              <Popover
                open={Boolean(fromPlace)}
                anchorEl={fromPlace}
                disableScrollLock
                onClose={closeFromPopover}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                slotProps={{
                  paper: {
                    style: {
                      width: 386,
                      background: "transparent",
                      borderRadius: 16,
                      maxHeight: "calc(100% - 140px)",
                      overflow: "hidden",
                    },
                  },
                }}
              >
                <div className="max-h-[calc(100vh-140px)] hideScrollBar overflow-y-scroll">
                  <div className="!bg-slate-200/50 flex flex-col gap-y-2">
                    <div className="p-4 bg-white flex items-center gap-x-2">
                      <HailOutlinedIcon sx={{ fontSize: 30 }} />
                      <div>
                        <p className="text-left text-xs text-gray-500">From</p>
                        <input
                          type="text"
                          {...register("boardingPoint")}
                          ref={fromPlacePopInputRef}
                          className="text-left font-bold outline-none"
                          placeholder="Enter Boarding point"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col !bg-white p-4">
                      <p className="font-semibold">Recent Searches</p>
                    </div>

                    <div className="!bg-white">
                      <p className="font-semibold p-4">Popular cities</p>
                      <ul className="flex flex-col ">
                        {boardingPoints &&
                          boardingPoints.length > 0 &&
                          boardingPoints.map((bpc) => (
                            <li key={`boardingPoint-${bpc}`}>
                              <button
                                type="button"
                                className="p-4 w-full h-full text-left hover:bg-[#fed9d5] border-b border-b-slate-200 cursor-pointer"
                                onClick={() => {
                                  setValue("boardingPoint", bpc);
                                  if (bpc) clearErrors("boardingPoint");
                                  closeFromPopover();
                                }}
                              >
                                {bpc}
                              </button>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Popover>
            </div>

            {/* Destination place */}
            <div className="relative w-[30%]">
              <button
                type="button"
                className="w-full p-2.5 border-t border-b border-slate-400 flex items-center gap-x-2 cursor-pointer outline-none"
                onClick={(e) => {
                  openDestPopover(e);
                  // console.log(e.currentTarget.getBoundingClientRect());
                }}
              >
                <LocationOnOutlinedIcon sx={{ fontSize: 30 }} />
                <div>
                  <p className="text-left text-xs text-gray-500">To</p>
                  <p className="min-h-6 text-left font-bold">
                    {dPoint ?? <span className="">Destination point</span>}
                  </p>
                </div>
              </button>

              {errors.destinationPoint && (
                <small className="text-red-500 font-medium">
                  {errors.destinationPoint.message}
                </small>
              )}
              <Popover
                open={Boolean(destPlace)}
                anchorEl={destPlace}
                disableScrollLock
                onClose={closeDestPopover}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                slotProps={{
                  paper: {
                    style: {
                      width: 386,
                      background: "transparent",
                      borderRadius: 16,
                      maxHeight: "calc(100% - 140px)",
                      overflow: "hidden",
                    },
                  },
                }}
              >
                <div className="max-h-[calc(100vh-140px)] hideScrollBar overflow-y-scroll">
                  <div className="!bg-slate-200/50 flex flex-col gap-y-2">
                    <div className="p-4 bg-white flex items-center gap-x-2">
                      <HailOutlinedIcon sx={{ fontSize: 30 }} />
                      <div>
                        <p className="text-left text-xs text-gray-500">To</p>
                        <input
                          type="text"
                          {...register("destinationPoint")}
                          ref={destPlacePopInput}
                          className="text-left font-bold outline-none"
                          placeholder="Enter Destination point"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col !bg-white p-4">
                      <p className="font-semibold">Recent Searches</p>
                    </div>

                    <div className="!bg-white">
                      <p className="font-semibold p-4">Popular cities</p>
                      <ul className="flex flex-col ">
                        {boardingPoints &&
                          boardingPoints.length > 0 &&
                          boardingPoints.map((bpc) => (
                            <li key={`boardingPoint-${bpc}`}>
                              <button
                                type="button"
                                className="p-4 w-full h-full text-left hover:bg-[#fed9d5] border-b border-b-slate-200 cursor-pointer"
                                onClick={() => {
                                  setValue("destinationPoint", bpc);
                                  if (bpc) clearErrors("destinationPoint");
                                  closeDestPopover();
                                }}
                              >
                                {bpc}
                              </button>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Popover>
            </div>

            {/* Date Picker */}
            <div className="relative w-[32%]">
              <button
                type="button"
                className="w-full p-2.5 border border-slate-400 flex justify-between gap-x-1.5 items-center cursor-pointer outline-none"
                onClick={openJourneyDatePopover}
              >
                <div className="flex items-center gap-x-2">
                  <CalendarMonthOutlinedIcon sx={{ fontSize: 30 }} />
                  <div>
                    <p className="text-left text-xs text-gray-500">
                      Date of Journey
                    </p>
                    <p className="min-h-6 text-left font-bold text-nowrap">
                      {jDate ? DateFormater(jDate) : "DD-MM-YYYY"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-x-2 overflow-y-scroll hideScrollBar">
                  <span
                    className="bg-[#fed9d5] hover:bg-[#f8d3cf] font-bold px-3 py-2 rounded-s-full text-sm rounded-e-full cursor-pointer"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      setValue("journeyDate", new Date(Date.now()));
                    }}
                  >
                    Today
                  </span>
                  <span
                    className="bg-[#fed9d5] hover:bg-[#f8d3cf] text-sm font-bold px-3 py-2 rounded-s-full rounded-e-full cursor-pointer"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      setValue(
                        "journeyDate",
                        new Date(Date.now() + 24 * 60 * 60 * 1000)
                      );
                    }}
                  >
                    Tomorrow
                  </span>
                </div>
              </button>

              {errors.journeyDate && (
                <small className="text-red-500 font-medium">
                  {errors.journeyDate.message}
                </small>
              )}

              <Popover
                open={Boolean(journeyDatePop)}
                anchorEl={journeyDatePop}
                disableScrollLock
                onClose={closeJourneyDatePopover}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                slotProps={{
                  paper: {
                    style: {
                      width: 330,
                      background: "white",
                      borderRadius: 16,
                      maxHeight: "calc(100% - 140px)",
                      overflow: "hidden",
                      top: 0,
                      left: 0,
                    },
                  },
                }}
              >
                <div className="max-h-[calc(100vh-140px)] hideScrollBar overflow-y-scroll !bg-transparent">
                  <div className="flex flex-col bg-white">
                    <div className="p-4 flex items-center gap-x-2 border-b-slate-200">
                      <CalendarMonthOutlinedIcon sx={{ fontSize: 30 }} />
                      <div>
                        <p className="text-left text-xs text-gray-500">
                          Date of Journey
                        </p>
                        <p className="text-left font-bold">
                          {getValues("journeyDate")
                            ? DateFormater(getValues("journeyDate"))
                            : "DD-MM-YYYY"}
                        </p>
                      </div>
                    </div>
                    <div className="flex-1">
                      <Controller
                        name="journeyDate"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar
                              sx={{ margin: 0, minWidth: "100%" }}
                              value={dayjs(value)}
                              onChange={(date) => {
                                closeJourneyDatePopover();
                                if (date) onChange(date.toDate());
                              }}
                            />
                          </LocalizationProvider>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </Popover>
            </div>

            {/* Submit button */}
            <div className="flex justify-center w-[8%] max-h-[62px] p-2 border border-s-0 border-slate-400 rounded-se-2xl rounded-ee-2xl">
              <button
                type="submit"
                className={`w-full h-full rounded-s-full rounded-e-full ${
                  loading ? "bg-[#7d7d7d]" : "bg-primary"
                } text-white font-semibold flex items-center justify-center gap-x-2 cursor-pointer outline-none`}
              >
                {!loading ? (
                  <FiSearch className="text-2xl" />
                ) : (
                  <ImSpinner8 className="text-2xl text-white  animate-spin" />
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Buses */}
      <div className="bg-[#f2f2f8]">
        <div className="myContainer border-b border-b-gray-300">
          <div className="max-w-screen w-full py-5 flex gap-x-4">
            {/* Filters */}
            <div className="sticky top-[98px] max-h-[calc(100vh-94px)] overflow-y-scroll hideScrollBar min-w-[272px] max-w-[272px] h-full hidden lg:flex flex-col gap-y-4">
              {/* Advertisement */}
              <div className="w-full min-h-[150px] max-h-[150px] rounded-2xl flex justify-center items-center bg-[#ece9fc] shadow-sm">
                <p className="font-semibold">Advertisement will go here...</p>
              </div>

              {/* Filters */}
              <div className="bg-white rounded-2xl">
                <p className="p-4 text-[20px] font-bold border-b border-b-slate-200">
                  Filter buses
                </p>

                {/* Tags */}
                <ul className="w-full p-4 flex flex-col gap-y-4 border-b border-b-slate-200">
                  {tagsList &&
                    tagsList.map((tag) => (
                      <li key={`tag-${tag.name}`}>
                        <button
                          type="button"
                          className="p-2 border hover:bg-gray-200 border-slate-400 !text-[#1d1d1d] rounded-lg flex items-center gap-1.5 cursor-pointer"
                        >
                          {tag.icon}
                          <span className="text-sm font-medium">
                            {tag.title}&nbsp;({tag.numbers})
                          </span>
                        </button>
                      </li>
                    ))}
                </ul>

                {/* Other filters */}
                {filterList &&
                  filterList.map((filterAcc) => (
                    <FilterAccordian
                      isSearchable={filterAcc?.isSearchable ?? false}
                      key={filterAcc.title}
                      title={filterAcc.title}
                      contentsList={filterAcc.contentsList}
                      selected={filterAcc.selected}
                    />
                  ))}
              </div>
            </div>

            {/* Found Buses */}
            <div className="max-w-full !overflow-hidden flex flex-col">
              {/* Offers Carousel */}
              <div
                className="max-w-full !overflow-hidden"
                ref={offersCarouselRef}
              >
                <div className="flex pb-5">
                  {offers &&
                    offers.map((o, inx) => (
                      <Link
                        href="#"
                        key={`offer-${inx}`}
                        className={`${inx === 0 ? "" : "ps-2"}`}
                      >
                        <Image
                          src={bus_offer_test}
                          alt="Bus Offer Photo"
                          className="min-w-[180px] max-w-[180px] min-h-[150px] max-h-[150px] shadow-md hover:shadow-lg rounded-2xl"
                        />
                      </Link>
                    ))}
                </div>
              </div>

              {/* Tags */}
              <div className="max-w-screen sticky top-[80px] left-0 right-0 flex lg:hidden items-center gap-x-2 p-2 bg-white rounded-lg mb-4">
                <button
                  type="button"
                  className="px-2 py-1 bg-white border border-slate-400 rounded-lg cursor-pointer"
                >
                  <VscSettings className="text-xl" />
                </button>

                <ul className="w-full overflow-x-scroll hideScrollBar  flex lg:hidden gap-x-2">
                  {tagsList &&
                    tagsList.map((tag) => (
                      <li key={`tag-${tag.name}`}>
                        <button
                          type="button"
                          className="px-2 py-1 border hover:bg-gray-200 border-slate-400 !text-[#1d1d1d] rounded-lg flex items-center gap-1.5 cursor-pointer"
                        >
                          {tag.icon}
                          <span className="text-sm font-medium text-nowrap">
                            {tag.title}&nbsp;({tag.numbers})
                          </span>
                        </button>
                      </li>
                    ))}
                </ul>
              </div>

              {/* fonund buses numbers and sort by options */}
              <div className="bg-white rounded-lg px-4 hidden lg:flex justify-between mb-7">
                <p className="font-semibold py-3.5">96 buses found</p>
                <div className="flex gap-x-4">
                  <p className="h-full text-sm font-bold flex items-center">
                    Sort by:
                  </p>
                  <div className="flex gap-x-10">
                    <button
                      type="button"
                      className="h-full cursor-pointer text-sm font-medium text-gray-600 hover:text-black"
                    >
                      Ratings
                    </button>
                    <button
                      type="button"
                      className="h-full cursor-pointer text-sm font-medium text-gray-600 hover:text-black"
                    >
                      Depature Time
                    </button>
                    <button
                      type="button"
                      className="h-full cursor-pointer text-sm font-medium text-gray-600 hover:text-black"
                    >
                      Price
                    </button>
                  </div>
                </div>
              </div>

              {/* List of buses cards */}
              <ul className="w-full flex flex-col gap-y-5">
                {foundBuses &&
                  foundBuses.map((fb, inx) => (
                    <li key={`busCard-${inx}`}>
                      <BusCard openViewDrawer={openViewDrawer} />
                    </li>
                  ))}
              </ul>

              {/* Bus tickert booking drawer */}
              <BookTicketDrawer
                data={{
                  viewDrawer,
                  closeViewDrawer,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBus;
