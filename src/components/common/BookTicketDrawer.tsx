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
  // const [activeTab, setActiveTab] = useState<number>(0);
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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
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
      <div
        className="relative min-h-[100vh] max-h-[100vh] lg:max-h-[95vh] lg:min-h-[95vh] rounded-2xl flex flex-col pb-[70px]"
        id="drawerContainer"
      >
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
            className="w-full min-h-full max-h-full overflow-y-hidden bg-[#f2f2f8] pt-6 px-4 sm:px-6 lg:px-12 flex gap-x-7"
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
          </div>
        )}

        {/* Boarding/Dropping points */}
        {activeTab === 1 && (
          <div
            role="tabpanel"
            id="TabPanel-boardDropPoints"
            aria-labelledby="Tab-boardDropPoints"
            className="relative flex-1 w-full min-h-full overflow-y-scroll md:overflow-hidden max-h-full bg-[#f2f2f8] flex flex-col md:flex-row md:justify-center gap-5 px-7 lg:px-0 py-5"
          >
            <div className="w-full min-h-full md:max-h-full md:w-1/2 overflow-y-auto hideScrollBar lg:w-[400px] xl:w-[500px]">
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

            <div className="w-full min-h-full md:w-1/2 lg:w-[400px] xl:w-[500px] overflow-y-auto hideScrollBar">
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

        {/* Button for seat amount and booking button */}
        {/* <div className="z-[1000] absolute bottom-0 left-0 right-0 duration-200 w-full flex flex-col sm:flex-row justify-center bg-white sm:items-center gap-x-7 gap-y-1 px-4 py-2.5 sm:py-4 border-t border-t-slate-300">
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
              className="w-full sm:w-auto py-2 sm:py-3 px-10 rounded-s-full rounded-e-full text-center cursor-pointer font-semibold text-white 
              bg-primary outline-none"
              onClick={() => {
                setActiveTab((prev) => {
                  if (prev < 2) return prev + 1;
                  else return 0;
                });
              }}
            >
              {activeTab === 0 && "Select boarding & dropping points"}
              {activeTab === 1 && "Fill passenger details"}
              {activeTab === 2 && "Continue booking"}
            </button>
          </div>
        </div> */}
      </div>
    </Drawer>
  );
};

export default BookTicketDrawer;
