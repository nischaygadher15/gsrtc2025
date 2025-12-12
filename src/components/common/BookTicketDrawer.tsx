"use client";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { GrLinkNext } from "react-icons/gr";
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
import SwipeDrawer from "./SwipeDrawer";
import BusAndRouteInfo from "./BusAndRouteInfo";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TimelineType } from "./BusStationTimeline";
import BoardingDroppingTimeline from "./BoardingDroppingTimeline";
import { FaPlus } from "react-icons/fa6";
import TextField from "@mui/material/TextField";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import Switch from "@mui/material/Switch";
import { FaCircleUser } from "react-icons/fa6";
import Radio from "@mui/material/Radio";
import { redirect, useRouter } from "next/navigation";
import Dialog from "@mui/material/Dialog";
import RadioGroup from "@mui/material/RadioGroup";

const BookTicketDrawer = ({
  data,
}: {
  data: {
    viewDrawer: boolean;
    activeTab: number;
    setActiveTab: Dispatch<SetStateAction<number>>;
    closeViewDrawer: () => void;
  };
}) => {
  let { viewDrawer, closeViewDrawer, activeTab, setActiveTab } = data;
  const [windowSize, setWindowSize] = useState<number>(0);
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
  const BusInfoParentRef = useRef<HTMLDivElement | null>(null);
  let BusBoardingPoints: TimelineType[] = [
    {
      leftPart: ["05:15", "15 Nov"],
      rightPart: ["Sanathal Circle", "Sanathal Circle"],
    },
    {
      leftPart: ["05:20", "15 Nov"],
      rightPart: ["Ujala circle", "Ujala Circle"],
    },
    {
      leftPart: ["05:25", "15 Nov"],
      rightPart: ["Iskon Cross Road", "Iskon Cross Road"],
    },
    {
      leftPart: ["05:15", "15 Nov"],
      rightPart: ["Sanathal Circle", "Sanathal Circle"],
    },
    {
      leftPart: ["05:20", "15 Nov"],
      rightPart: ["Ujala circle", "Ujala Circle"],
    },
    {
      leftPart: ["05:25", "15 Nov"],
      rightPart: ["Iskon Cross Road", "Iskon Cross Road"],
    },
    {
      leftPart: ["05:20", "15 Nov"],
      rightPart: ["Ujala circle", "Ujala Circle"],
    },
    {
      leftPart: ["05:25", "15 Nov"],
      rightPart: ["Iskon Cross Road", "Iskon Cross Road"],
    },
  ];

  interface PassengerInfo {
    name: string;
    age: number;
    gender: "male" | "female";
  }

  const passengers: PassengerInfo[] = [
    {
      name: "Ram",
      age: 30,
      gender: "male",
    },
    {
      name: "Sita",
      age: 30,
      gender: "female",
    },
    {
      name: "Laxman",
      age: 26,
      gender: "male",
    },
  ];

  const [passengerInfo, setPassengerInfo] = useState<PassengerInfo[]>([
    ...passengers,
  ]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Window size listener
  useEffect(() => {
    const listenWindowSize = () => {
      // console.log(window.innerWidth);
      setWindowSize(window.innerWidth);
    };

    listenWindowSize();

    window.addEventListener("resize", listenWindowSize);

    return () => {
      window.removeEventListener("resize", listenWindowSize);
    };
  }, []);

  // Passenger Gender
  const handleGenderChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    passengerInfo[index].gender = event.target.value as "male" | "female";
    setPassengerInfo([...passengerInfo]);
  };

  // Trip summary
  const [sourcePlace, setSourcePlace] = useState({
    leftPart: ["21:45", "19 Nov"],
    rightPart: ["Ahmedabad", "Gita Mandir"],
  });

  const [destPlace, setDestPlace] = useState({
    leftPart: ["05:10", "20 Nov"],
    rightPart: ["Jamnagar", "Sat rasta"],
  });

  const [travelTime, setTravelTime] = useState("7h 25min");

  //Contact Info: State
  interface StateInfoType {
    id: number;
    state: string;
    code: string;
  }

  const indiaStatesAndUTs: StateInfoType[] = [
    { id: 0, state: "Andhra Pradesh", code: "AP" },
    { id: 1, state: "Arunachal Pradesh", code: "AR" },
    { id: 2, state: "Assam", code: "AS" },
    { id: 3, state: "Bihar", code: "BR" },
    { id: 4, state: "Chhattisgarh", code: "CG" },
    { id: 5, state: "Goa", code: "GA" },
    { id: 6, state: "Gujarat", code: "GJ" },
    { id: 7, state: "Haryana", code: "HR" },
    { id: 8, state: "Himachal Pradesh", code: "HP" },
    { id: 9, state: "Jharkhand", code: "JH" },
    { id: 10, state: "Karnataka", code: "KA" },
    { id: 11, state: "Kerala", code: "KL" },
    { id: 12, state: "Madhya Pradesh", code: "MP" },
    { id: 13, state: "Maharashtra", code: "MH" },
    { id: 14, state: "Manipur", code: "MN" },
    { id: 15, state: "Meghalaya", code: "ML" },
    { id: 16, state: "Mizoram", code: "MZ" },
    { id: 17, state: "Nagaland", code: "NL" },
    { id: 18, state: "Odisha", code: "OD" },
    { id: 19, state: "Punjab", code: "PB" },
    { id: 20, state: "Rajasthan", code: "RJ" },
    { id: 21, state: "Sikkim", code: "SK" },
    { id: 22, state: "Tamil Nadu", code: "TN" },
    { id: 23, state: "Telangana", code: "TS" },
    { id: 24, state: "Tripura", code: "TR" },
    { id: 25, state: "Uttar Pradesh", code: "UP" },
    { id: 26, state: "Uttarakhand", code: "UK" },
    { id: 27, state: "West Bengal", code: "WB" },
    // Union Territories
    { id: 28, state: "Andaman and Nicobar Islands", code: "AN" },
    { id: 29, state: "Chandigarh", code: "CH" },
    { id: 30, state: "Dadra and Nagar Haveli and Daman and Diu", code: "DN" },
    { id: 31, state: "Delhi", code: "DL" },
    { id: 32, state: "Jammu and Kashmir", code: "JK" },
    { id: 33, state: "Ladakh", code: "LA" },
    { id: 34, state: "Lakshadweep", code: "LD" },
    { id: 35, state: "Puducherry", code: "PY" },
  ];
  const [contactInfoState, setContactInfoState] = useState<boolean>(false);
  const [stateName, setStateName] = useState<string>("Select state");
  const [filteredStatesList, setFilteredStatesList] =
    useState<StateInfoType[]>(indiaStatesAndUTs);

  const closeStateDialog = () => {
    setContactInfoState(false);
    setFilteredStatesList(indiaStatesAndUTs);
  };

  const SearchStatesList = (text: string, contList: StateInfoType[]) => {
    const filtered: StateInfoType[] = contList.filter(
      (states) =>
        states.state.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
        states.code.toLocaleLowerCase().includes(text.toLocaleLowerCase())
    );
    setFilteredStatesList(filtered);
  };

  return (
    <Dialog fullScreen open={viewDrawer} onClose={closeViewDrawer}>
      <div
        className={`relative h-full w-full overflow-hidden rounded-2xl flex flex-col`}
        id="drawerContainer"
      >
        <div className="z-[999] sticky top-0 left-0 right-0">
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
          <div>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant={windowSize < 640 ? "scrollable" : "standard"}
              centered={windowSize > 640 ? true : false}
              allowScrollButtonsMobile
              scrollButtons
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
          </div>
        </div>

        {/* Tab content: Select Seat */}
        {activeTab === 0 && (
          <div
            role="tabpanel"
            id="TabPanel-selectSeat"
            aria-labelledby="Tab-selectSeat"
            className="relative w-full min-h-full max-h-full overflow-y-hidden bg-[#f2f2f8] pt-6 px-4 sm:px-6 lg:px-12 flex gap-x-7"
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
              className="hidden md:block w-1/2 rounded-2xl overflow-y-scroll hideScrollBar"
              ref={BusInfoParentRef}
            >
              <BusAndRouteInfo parentRef={BusInfoParentRef} />
            </div>

            <SwipeDrawer />

            {/* Button for seat amount and booking button */}
            <div
              className={`fixed z-[1000] bottom-0 left-0 right-0 duration-200 w-full flex flex-col sm:flex-row justify-center bg-white sm:items-center gap-x-7 gap-y-1 px-4 py-2.5 sm:py-4 border-t border-t-slate-300`}
            >
              <div className="flex justify-between items-center gap-x-7">
                <p className="text-sm font-semibold">1 seat</p>
                <button
                  type="button"
                  className="flex items-center gap-x-2 cursor-pointer"
                >
                  <span className="font-bold text-2xl">&#8377;{500}</span>
                  <span className="border-2 border-slate-500 rounded">
                    <FaPlus className="text-slate-500 text-sm" />
                  </span>
                </button>
              </div>

              <div>
                <button
                  type="button"
                  className="w-full sm:min-w-[340px] py-2 sm:py-3 rounded-s-full rounded-e-full text-center cursor-pointer font-semibold text-white 
              bg-primary outline-none"
                  onClick={() => {
                    setActiveTab((prev) => {
                      if (prev < 2) return prev + 1;
                      else return prev;
                    });
                  }}
                >
                  Select boarding & dropping points
                </button>
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
            className="relative flex-1 overflow-y-scroll hideScrollBar bg-[#f2f2f8] flex flex-col md:flex-row md:justify-center gap-5 px-7 lg:px-0 py-5"
          >
            <div className="w-full h-auto md:w-1/2 lg:w-[400px] xl:w-[500px]">
              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="boardingPoint-panel-content"
                  id="boardingPoint-panel-header"
                  className="!rounded-ss-2xl !rounded-se-2xl"
                >
                  <div className="">
                    <p className="font-bold">Boarding points</p>
                    <p className="text-[#1d1d1da3] text-sm">
                      Select Boarding Point
                    </p>
                  </div>
                </AccordionSummary>
                <AccordionDetails className="!p-0">
                  <BoardingDroppingTimeline timeLineList={BusBoardingPoints} />
                </AccordionDetails>
              </Accordion>
            </div>

            <div className="w-full h-auto md:w-1/2 lg:w-[400px] xl:w-[500px]">
              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="droppingPoint-panel-content"
                  id="droppingPoint-panel-header"
                >
                  <div className="">
                    <p className="font-bold">Dropping points</p>
                    <p className="text-[#1d1d1da3] text-sm">
                      Select Dropping Point
                    </p>
                  </div>
                </AccordionSummary>
                <AccordionDetails className="!p-0">
                  <BoardingDroppingTimeline timeLineList={BusBoardingPoints} />
                </AccordionDetails>
              </Accordion>
            </div>

            {/* Button for seat amount and booking button */}
            <div
              className={`z-[1000] fixed bottom-0 left-0 right-0 duration-200 w-full flex flex-col sm:flex-row justify-center bg-white sm:items-center gap-x-7 gap-y-1 px-4 py-2.5 sm:py-4 border-t border-t-slate-300`}
            >
              <div className="flex justify-between items-center gap-x-7">
                <p className="text-sm font-semibold">1 seat</p>
                <button
                  type="button"
                  className="flex items-center gap-x-2 cursor-pointer"
                >
                  <span className="font-bold text-2xl">&#8377;{500}</span>
                  <span className="border-2 border-slate-500 rounded">
                    <FaPlus className="text-slate-500 text-sm" />
                  </span>
                </button>
              </div>

              <div>
                <button
                  type="button"
                  className="w-full sm:min-w-[340px] py-2 sm:py-3 rounded-s-full rounded-e-full text-center cursor-pointer font-semibold text-white 
              bg-primary outline-none"
                  onClick={() => {
                    setActiveTab((prev) => {
                      if (prev < 2) return prev + 1;
                      else return prev;
                    });
                  }}
                >
                  Fill passenger details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Passenger Information */}
        {activeTab === 2 && (
          <div
            role="tabpanel"
            id="TabPanel-passengerInfo"
            aria-labelledby="Tab-passengerInfo"
            className="flex-1 overflow-y-scroll hideScrollBar bg-[#f2f2f8]"
          >
            <div className="py-5 px-4 md:px-[32px] xl:px-[75px] flex flex-col md:flex-row gap-4">
              <div className="order-2 md:order-1 w-full md:w-3/5 flex flex-col gap-y-5">
                {/* Contact details form */}
                <form className="w-full p-4 rounded-2xl shadow-md bg-white">
                  <div className="mb-3">
                    <p className="text-xl font-bold">Contact details</p>
                    <p className="text-sm text-[#1d1d1da3]">
                      Ticket details will be sent to
                    </p>
                  </div>
                  {/* Phone no. */}
                  <div className="flex mb-4">
                    <button
                      type="button"
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
                        id="contact-info-phone"
                        label="Phone*"
                        placeholder="Enter phone no."
                        variant="filled"
                        error={true}
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
                  {/* Email */}
                  <div className="mb-4 border rounded-lg">
                    <TextField
                      type="text"
                      id="contact-info-email-id"
                      label="Email ID"
                      variant="filled"
                      placeholder="Enter email id"
                      sx={{
                        width: "100%",
                        "& .MuiFilledInput-root": {
                          fontWeight: "700 !important",
                          backgroundColor: "white !important",
                          borderRadius: "8px !important",
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

                  {/* State */}
                  <button
                    type="button"
                    className="w-full flex border rounded-lg justify-between items-center px-3 py-2 cursor-pointer mb-5"
                    onClick={() => {
                      setContactInfoState(true);
                    }}
                  >
                    <div className="w-full">
                      <p className="text-sm text-left text-[#1d1d1da3]">
                        State of Residence*
                      </p>
                      <p className="text-left font-bold">{stateName}</p>
                    </div>
                    <IoMdArrowDropdown className="text-lg" />
                  </button>

                  {/* State Dialog */}
                  <Dialog
                    fullScreen={windowSize > 640 ? false : true}
                    onClose={closeStateDialog}
                    open={contactInfoState}
                    sx={{
                      "& .MuiDialog-paper": {
                        overflow: "hidden",
                        borderRadius: windowSize > 640 ? "16px" : "0px",
                      },
                    }}
                  >
                    <div className="relative w-full sm:w-lg overflow-y-auto hideScrollBar">
                      <div className="sticky top-0 left-0 right-0 bg-white z-[1000] shadow-sm p-4">
                        <div className="flex justify-between items-center mb-7">
                          <p className="font-bold">Select state of residence</p>
                          <button
                            type="button"
                            className="rounded-s-full rounded-e-full px-3.5 py-2.5 bg-slate-200 hover:bg-slate-300"
                            onClick={closeStateDialog}
                          >
                            <IoMdClose className="text-2xl" />
                          </button>
                        </div>
                        <input
                          type="text"
                          className="py-4 px-5 w-full h-full rounded-s-full rounded-e-full bg-[#f2f2f8] placeholder:text-gray-500 outline-none"
                          placeholder="Search for state"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            SearchStatesList(
                              e.currentTarget.value,
                              indiaStatesAndUTs
                            )
                          }
                        />
                      </div>
                      <RadioGroup
                        name="radio-buttons-state"
                        value={
                          indiaStatesAndUTs.find((st) => st.state == stateName)
                            ?.code
                        }
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          setStateName(() => {
                            let index = indiaStatesAndUTs.findIndex(
                              (state) => state.code == event.target.value
                            );
                            return indiaStatesAndUTs[index].state;
                          });
                        }}
                      >
                        <ul className="">
                          {filteredStatesList &&
                            filteredStatesList.map((st, inx, stArr) => (
                              <li key={`state-code-${st.id}`}>
                                <label
                                  htmlFor={`state-options-${st.id}`}
                                  className={`flex justify-between items-center font-medium cursor-pointer px-4 py-2.5 ${
                                    inx !== stArr.length - 1
                                      ? "border-b border-b-slate-200"
                                      : ""
                                  }`}
                                >
                                  <span>{st.state}</span>
                                  <Radio
                                    id={`state-options-${st.id}`}
                                    onClick={closeStateDialog}
                                    value={st.code}
                                    sx={{
                                      color: "#173c62",
                                      "&.Mui-checked": {
                                        color: "#173c62",
                                      },
                                    }}
                                  />
                                </label>
                              </li>
                            ))}

                          {filteredStatesList &&
                            filteredStatesList.length <= 0 && (
                              <li>
                                <p className="px-4 py-5 text-center font-semibold">
                                  No state found
                                </p>
                              </li>
                            )}
                        </ul>
                      </RadioGroup>
                    </div>
                  </Dialog>

                  {/* WhatsApp commumication */}
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                      <FaWhatsapp className="text-[#25d366] text-4xl" />
                      <span className="text-sm">
                        Send booking details and trip updates on WhatsApp
                      </span>
                    </div>
                    <Switch
                      defaultChecked
                      sx={{
                        "& .Mui-checked": {
                          color: "#173c62 !important",
                        },
                        "& .MuiSwitch-track": {
                          backgroundColor: "#173c62 !important",
                        },
                      }}
                    />
                  </div>
                </form>

                {/* Passengers details */}
                <div className="w-full p-4 rounded-2xl shadow-md bg-white">
                  <p className="text-xl font-bold mb-4">Passenger details</p>

                  {/* List for passenger info. from accordian */}
                  <ul>
                    {passengers &&
                      passengers.map((passenger, inx) => (
                        <li key={`passengerInfo-${inx}`}>
                          <Accordion
                            defaultExpanded
                            sx={{
                              "&.MuiAccordion-root": {
                                boxShadow: "none !important",
                              },
                              "& .MuiAccordionSummary-root": {
                                padding: "0px !important",
                              },
                            }}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1-content"
                              id={`pasenger-accordian-${inx}`}
                            >
                              <div className="flex items-center gap-4">
                                <FaCircleUser className="text-4xl" />
                                <div>
                                  <p className="font-bold">
                                    Passenger {inx + 1}
                                  </p>
                                  <p className="text-sm text-[#1d1d1da3]">
                                    Male seat · Seat H, Upper Deck
                                  </p>
                                </div>
                              </div>
                            </AccordionSummary>
                            <AccordionDetails className="!p-0">
                              <form>
                                {/* Name */}
                                <div className="mb-4 border rounded-lg">
                                  <TextField
                                    type="text"
                                    // id="passenger-info-name"
                                    label="Name*"
                                    variant="filled"
                                    placeholder="Enter name"
                                    sx={{
                                      width: "100%",
                                      "& .MuiFilledInput-root": {
                                        fontWeight: "700 !important",
                                        backgroundColor: "white !important",
                                        borderRadius: "8px !important",
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

                                {/* Age */}
                                <div className="mb-4 border rounded-lg">
                                  <TextField
                                    type="text"
                                    // id="passenger-info-age"
                                    label="Age*"
                                    variant="filled"
                                    placeholder="Enter age"
                                    sx={{
                                      width: "100%",
                                      "& .MuiFilledInput-root": {
                                        fontWeight: "700 !important",
                                        backgroundColor: "white !important",
                                        borderRadius: "8px !important",
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

                                {/* Gender */}
                                <div className="">
                                  <p className="text-[#1d1d1da3] mb-1">
                                    Gender*
                                  </p>
                                  <div className="flex gap-x-2">
                                    {/* Female */}
                                    <label
                                      htmlFor={`passengerGenderFemale-${inx}`}
                                      className="w-1/2 ps-4 rounded-s-full rounded-e-full border flex items-center justify-between cursor-pointer"
                                    >
                                      <p className="font-semibold">Female</p>
                                      <Radio
                                        id={`passengerGenderFemale-${inx}`}
                                        sx={{
                                          color: "#173c62",
                                          "&.Mui-checked": {
                                            color: "#173c62",
                                          },
                                        }}
                                        checked={
                                          passengerInfo[inx].gender === "female"
                                        }
                                        onChange={(
                                          event: React.ChangeEvent<HTMLInputElement>
                                        ) => handleGenderChange(event, inx)}
                                        value="female"
                                        name={`passenger-gender-${inx}`}
                                      />
                                    </label>

                                    {/* Male */}
                                    <label
                                      htmlFor={`passengerGenderMale-${inx}`}
                                      className="w-1/2 ps-4 rounded-s-full rounded-e-full border flex items-center justify-between cursor-pointer"
                                    >
                                      <p className="font-semibold">Male</p>
                                      <Radio
                                        id={`passengerGenderMale-${inx}`}
                                        sx={{
                                          color: "#173c62",
                                          "&.Mui-checked": {
                                            color: "#173c62",
                                          },
                                        }}
                                        checked={
                                          passengerInfo[inx].gender === "male"
                                        }
                                        onChange={(
                                          event: React.ChangeEvent<HTMLInputElement>
                                        ) => handleGenderChange(event, inx)}
                                        value="male"
                                        name={`passenger-gender-${inx}`}
                                      />
                                    </label>
                                  </div>
                                </div>
                              </form>
                            </AccordionDetails>
                          </Accordion>
                        </li>
                      ))}
                  </ul>
                </div>

                {/* Term and conditions */}
                <div className="mb-5">
                  <p className="text-center text-sm mb-4">
                    By clicking 'Continue booking', I accept
                  </p>
                  <p className="text-sm flex justify-center items-center gap-x-7">
                    <a href="#" className="underline font-bold text-blue-700">
                      Terms & conditions
                    </a>
                    <a href="#" className="underline font-bold text-blue-700">
                      Privacy policy
                    </a>
                  </p>
                </div>
              </div>

              <div className="order-1 md:order-2 w-full md:w-2/5">
                {/* Trip summary */}
                <div className="bg-white p-5 rounded-2xl shadow-md">
                  <div className="mb-4">
                    <p className="font-bold text-lg">
                      Shree Pramukhraj Travels
                    </p>
                    <p className="text-sm text-[#1d1d1da3]">
                      1 · NON A/C Sleeper (2+1)
                    </p>
                  </div>

                  <div className="border-b border-b-slate-200">
                    <table className="mb-6">
                      <tbody>
                        {/* Source place */}
                        <tr>
                          <td>
                            <div className="pe-3 py-3">
                              <p className="font-bold text-base text-left">
                                {sourcePlace.leftPart[0]}
                              </p>
                              <p className="font-medium text-xs text-left">
                                {sourcePlace.leftPart[1]}
                              </p>
                            </div>
                          </td>
                          <td className="bg-[#e6e6e6]">
                            <div className="min-w-2 max-w-2 min-h-2 max-h-2 rounded-full bg-[#4b4b4b]"></div>
                          </td>
                          <td>
                            <div className="px-4 py-3">
                              <p className="font-bold text-base text-left">
                                {sourcePlace.rightPart[0]}
                              </p>
                              <p className="font-medium text-xs text-left">
                                {sourcePlace.rightPart[1]}
                              </p>
                            </div>
                          </td>
                        </tr>

                        {/* Trip duration */}
                        <tr>
                          <td>
                            <p className="pe-3 py-3 text-xs text-left text-[#1d1d1da3]">
                              {travelTime}
                            </p>
                          </td>
                          <td className="bg-[#e6e6e6]"></td>
                          <td></td>
                        </tr>

                        {/* destination place */}
                        <tr>
                          <td>
                            <div className="pe-3 py-3">
                              <p className="font-bold text-base text-left">
                                {destPlace.leftPart[0]}
                              </p>
                              <p className="font-medium text-xs text-left">
                                {destPlace.leftPart[1]}
                              </p>
                            </div>
                          </td>
                          <td className="bg-[#e6e6e6]">
                            <div className="min-w-2 max-w-2 min-h-2 max-h-2 rounded-full bg-[#4b4b4b]"></div>
                          </td>
                          <td>
                            <div className="px-4 py-3">
                              <p className="font-bold text-base text-left">
                                {destPlace.rightPart[0]}
                              </p>
                              <p className="font-medium text-xs text-left">
                                {destPlace.rightPart[1]}
                              </p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="py-4">
                    <p className="font-bold">Seat details</p>
                    <p className="text-sm text-[#1d1d1da3] mb-3">4</p>
                    <ul className="w-full flex flex-wrap gap-2">
                      <li>
                        <p className="px-1.5 py-1 text-xs rounded-md bg-[#e2eee3]">
                          6 · Upper deck
                        </p>
                      </li>
                      <li>
                        <p className="px-1.5 py-1 text-xs rounded-md bg-[#e2eee3]">
                          6 · Upper deck
                        </p>
                      </li>
                      <li>
                        <p className="px-1.5 py-1 text-xs rounded-md bg-[#e2eee3]">
                          6 · Upper deck
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Button for seat amount and booking button */}
            <div
              className={`z-[1000] duration-200 w-full flex flex-col sm:flex-row justify-center bg-white sm:items-center gap-x-7 gap-y-1 px-4 py-2.5 sm:py-4 border-t border-t-slate-300`}
            >
              <div className="flex justify-between items-center gap-x-7">
                <p className="text-sm font-semibold">1 seat</p>
                <button
                  type="button"
                  className="flex items-center gap-x-2 cursor-pointer"
                >
                  <span className="font-bold text-2xl">&#8377;{500}</span>
                  <span className="border-2 border-slate-500 rounded">
                    <FaPlus className="text-slate-500 text-sm" />
                  </span>
                </button>
              </div>

              <div>
                <button
                  type="button"
                  className="w-full sm:min-w-[340px] py-2 sm:py-3 rounded-s-full rounded-e-full text-center cursor-pointer font-semibold text-white 
              bg-primary outline-none"
                  onClick={() => {
                    redirect("/checkout");
                  }}
                >
                  Continue to checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default BookTicketDrawer;
