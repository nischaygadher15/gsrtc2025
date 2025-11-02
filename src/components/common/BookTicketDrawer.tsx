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
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

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
  const [passengerGender, setPassengerGender] = useState<"female" | "male">(
    "female"
  );

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

  // Passenger Gender
  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassengerGender((event.target.value as "female") || "male");
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
      <div
        className={`relative min-h-[100vh] max-h-[100vh] lg:max-h-[95vh] lg:min-h-[95vh] rounded-2xl flex flex-col ${
          activeTab === 2 ? "" : "pb-[97px] sm:pb-[70px]"
        }`}
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
            <div className="w-full h-full py-5 px-4 md:px-[75px] flex gap-4">
              <div className="w-full md:w-3/5 flex flex-col gap-y-5">
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
                        type="number"
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

                  {/* Residence */}
                  <div className="flex border rounded-lg justify-between items-center px-3 py-2 cursor-pointer mb-5">
                    <div>
                      <p className="text-sm text-[#1d1d1da3]">
                        State of Residence*
                      </p>
                      <p className="font-semibold opacity-0">Gujarat</p>
                    </div>
                    <IoMdArrowDropdown className="text-lg" />
                  </div>

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
                    <li>
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
                          id="panel1-header"
                        >
                          <div className="flex items-center gap-4">
                            <FaCircleUser className="text-4xl" />
                            <div>
                              <p className="font-bold">Passenger 1</p>
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
                                id="passenger-info-name"
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
                                id="passenger-info-age"
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
                              <p className="text-[#1d1d1da3] mb-1">Gender*</p>
                              <div className="flex gap-x-2">
                                {/* Female */}
                                <label
                                  htmlFor="passengerGenderFemale"
                                  className="w-1/2 ps-4 rounded-s-full rounded-e-full border flex items-center justify-between"
                                >
                                  <p className="font-semibold">Female</p>
                                  <Radio
                                    id="passengerGenderFemale"
                                    sx={{
                                      color: "#173c62",
                                      "&.Mui-checked": {
                                        color: "#173c62",
                                      },
                                    }}
                                    checked={passengerGender === "female"}
                                    onChange={handleGenderChange}
                                    value="female"
                                    name="passenger-gender"
                                  />
                                </label>

                                {/* Male */}
                                <label
                                  htmlFor="passengerGenderMale"
                                  className="w-1/2 ps-4 rounded-s-full rounded-e-full border flex items-center justify-between"
                                >
                                  <p className="font-semibold">Male</p>
                                  <Radio
                                    id="passengerGenderMale"
                                    sx={{
                                      color: "#173c62",
                                      "&.Mui-checked": {
                                        color: "#173c62",
                                      },
                                    }}
                                    checked={passengerGender === "male"}
                                    onChange={handleGenderChange}
                                    value="male"
                                    name="passenger-gender"
                                  />
                                </label>
                              </div>
                            </div>
                          </form>
                        </AccordionDetails>
                      </Accordion>
                    </li>

                    <li>
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
                          id="panel1-header"
                        >
                          <div className="flex items-center gap-4">
                            <FaCircleUser className="text-4xl" />
                            <div>
                              <p className="font-bold">Passenger 1</p>
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
                                id="passenger-info-name"
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
                                id="passenger-info-age"
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
                              <p className="text-[#1d1d1da3] mb-1">Gender*</p>
                              <div className="flex gap-x-2">
                                {/* Female */}
                                <label
                                  htmlFor="passengerGenderFemale"
                                  className="w-1/2 ps-4 rounded-s-full rounded-e-full border flex items-center justify-between"
                                >
                                  <p className="font-semibold">Female</p>
                                  <Radio
                                    id="passengerGenderFemale"
                                    sx={{
                                      color: "#173c62",
                                      "&.Mui-checked": {
                                        color: "#173c62",
                                      },
                                    }}
                                    checked={passengerGender === "female"}
                                    onChange={handleGenderChange}
                                    value="female"
                                    name="passenger-gender"
                                  />
                                </label>

                                {/* Male */}
                                <label
                                  htmlFor="passengerGenderMale"
                                  className="w-1/2 ps-4 rounded-s-full rounded-e-full border flex items-center justify-between"
                                >
                                  <p className="font-semibold">Male</p>
                                  <Radio
                                    id="passengerGenderMale"
                                    sx={{
                                      color: "#173c62",
                                      "&.Mui-checked": {
                                        color: "#173c62",
                                      },
                                    }}
                                    checked={passengerGender === "male"}
                                    onChange={handleGenderChange}
                                    value="male"
                                    name="passenger-gender"
                                  />
                                </label>
                              </div>
                            </div>
                          </form>
                        </AccordionDetails>
                      </Accordion>
                    </li>

                    <li>
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
                          id="panel1-header"
                        >
                          <div className="flex items-center gap-4">
                            <FaCircleUser className="text-4xl" />
                            <div>
                              <p className="font-bold">Passenger 1</p>
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
                                id="passenger-info-name"
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
                                id="passenger-info-age"
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
                              <p className="text-[#1d1d1da3] mb-1">Gender*</p>
                              <div className="flex gap-x-2">
                                {/* Female */}
                                <label
                                  htmlFor="passengerGenderFemale"
                                  className="w-1/2 ps-4 rounded-s-full rounded-e-full border flex items-center justify-between"
                                >
                                  <p className="font-semibold">Female</p>
                                  <Radio
                                    id="passengerGenderFemale"
                                    sx={{
                                      color: "#173c62",
                                      "&.Mui-checked": {
                                        color: "#173c62",
                                      },
                                    }}
                                    checked={passengerGender === "female"}
                                    onChange={handleGenderChange}
                                    value="female"
                                    name="passenger-gender"
                                  />
                                </label>

                                {/* Male */}
                                <label
                                  htmlFor="passengerGenderMale"
                                  className="w-1/2 ps-4 rounded-s-full rounded-e-full border flex items-center justify-between"
                                >
                                  <p className="font-semibold">Male</p>
                                  <Radio
                                    id="passengerGenderMale"
                                    sx={{
                                      color: "#173c62",
                                      "&.Mui-checked": {
                                        color: "#173c62",
                                      },
                                    }}
                                    checked={passengerGender === "male"}
                                    onChange={handleGenderChange}
                                    value="male"
                                    name="passenger-gender"
                                  />
                                </label>
                              </div>
                            </div>
                          </form>
                        </AccordionDetails>
                      </Accordion>
                    </li>
                  </ul>
                </div>

                {/* GSRTC travel insurance */}
                {/* <form></form> */}

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
              <div className="w-2/5 hidden md:block"></div>
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
                  className="w-full min-w-[340px] sm:w-auto py-2 sm:py-3 rounded-s-full rounded-e-full text-center cursor-pointer font-semibold text-white 
              bg-primary outline-none"
                  onClick={() => {
                    setActiveTab((prev) => {
                      if (prev < 2) return prev + 1;
                      else return 0;
                    });
                  }}
                >
                  {(activeTab as number) === 0
                    ? "Select boarding & dropping points"
                    : (activeTab as number) === 1
                    ? "Fill passenger details"
                    : "Continue booking"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Button for seat amount and booking button */}
        <div
          className={`z-[1000] ${
            activeTab === 2 ? "hidden" : "absolute bottom-0 left-0 right-0"
          }  duration-200 w-full flex flex-col sm:flex-row justify-center bg-white sm:items-center gap-x-7 gap-y-1 px-4 py-2.5 sm:py-4 border-t border-t-slate-300`}
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
              className="w-full min-w-[340px] sm:w-auto py-2 sm:py-3 rounded-s-full rounded-e-full text-center cursor-pointer font-semibold text-white 
              bg-primary outline-none"
              onClick={() => {
                setActiveTab((prev) => {
                  if (prev < 2) return prev + 1;
                  else return 0;
                });
              }}
            >
              {(activeTab as number) === 0
                ? "Select boarding & dropping points"
                : (activeTab as number) === 1
                ? "Fill passenger details"
                : "Continue booking"}
            </button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default BookTicketDrawer;
