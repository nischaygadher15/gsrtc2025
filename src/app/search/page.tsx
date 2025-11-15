"use client";
import Image from "next/image";
import navbarLogo from "@/assets/images/Navbar_logo.png";
import gsrtcLogo from "@/assets/images/gsrtc_logo_900x900.png";
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
import { IoMdArrowBack, IoMdClose } from "react-icons/io";
import { GrLinkNext } from "react-icons/gr";
import { useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import bus_offer_test from "@/assets/images/bus-offer-test.png";
import Link from "next/link";
import { FaRegStar } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { TbArmchair } from "react-icons/tb";
import { MdOutlineBed } from "react-icons/md";
import { MdOutlineAirlineSeatReclineExtra } from "react-icons/md";
import { MdOutlineNoBackpack } from "react-icons/md";
import { FiSunrise } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";
import { FaMapLocationDot } from "react-icons/fa6";
import { RiBusWifiLine } from "react-icons/ri";
import { FiSun } from "react-icons/fi";
import { FiMoon } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import { TbBottle } from "react-icons/tb";
import { BiBlanket } from "react-icons/bi";
import { PiPlugCharging } from "react-icons/pi";
import { LiaRestroomSolid } from "react-icons/lia";

import { VscSettings } from "react-icons/vsc";
import Drawer from "@mui/material/Drawer";
import FilterAccordian from "../../components/common/FilterAccordian";
import BusCard from "@/components/common/BusCard";
import BookTicketDrawer from "@/components/common/BookTicketDrawer";
import Dialog from "@mui/material/Dialog";

const SearchBus = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState<number>(0);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const router = useRouter();

  // Window size listener
  useEffect(() => {
    const listenWindowSize = () => {
      // console.log(window.innerWidth);
      setWindowSize(window.innerWidth);
    };

    const handleScrolling = () => {
      let position = window.scrollY;
      setScrollPosition(position);
    };

    listenWindowSize();
    handleScrolling();

    window.addEventListener("resize", listenWindowSize);
    window.addEventListener("scroll", handleScrolling);

    return () => {
      window.removeEventListener("resize", listenWindowSize);
      window.removeEventListener("scroll", handleScrolling);
    };
  }, []);

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
  const [jorneyDateBtn, setJourneyDateBtn] = useState<Date>(
    new Date(Date.now())
  );

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

  useEffect(() => {
    // console.log("jDate: ", jorneyDateBtn);
    if (jorneyDateBtn) setValue("journeyDate", jorneyDateBtn);
  }, [jorneyDateBtn]);

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
  const [activeTab, setActiveTab] = useState<number>(0);
  const openViewDrawer = (): void => {
    setViewDrawer(true);
  };

  const closeViewDrawer = (): void => {
    setActiveTab(0);
    console.log("helooooooooo");
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
            <span className="bg-[#fed9d5] hover:bg-[#f8d3cf] font-bold p-2 rounded-s-full  text-xs md:text-sm rounded-e-full cursor-pointer">
              {jorneyDateBtn && DateFormater(jorneyDateBtn).split(",")[0]}
            </span>
            <span className=" text-xs md:text-sm text-center text-[#1d1d1da3]">
              {jorneyDateBtn && getDayOfWeek(jorneyDateBtn)}
            </span>
          </button>

          {windowSize >= 768 && windowSize <= 1024 && (
            <Dialog
              onClose={closeDateDialog}
              open={dateDialog}
              sx={{
                "& .MuiDialog-paper": {
                  borderRadius: "16px",
                },
              }}
            >
              <div className="w-md">
                <div className="p-4 pb-0 text-right">
                  <button
                    type="button"
                    className="rounded-s-full rounded-e-full px-3.5 py-2.5"
                    onClick={closeDateDialog}
                  >
                    <IoMdClose className="text-2xl" />
                  </button>
                </div>

                <div className="flex-1">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                      defaultValue={dayjs(new Date())}
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
                          padding: "0px 16px 30px 16px",
                        },
                      }}
                      value={dayjs(jDate)}
                      onChange={(date) => {
                        if (date) {
                          setJourneyDateBtn(date.toDate());
                        }
                        closeDateDialog();
                      }}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </Dialog>
          )}

          {windowSize < 768 && (
            <Drawer
              anchor="bottom"
              onClose={closeDateDialog}
              open={dateDialog}
              sx={{
                "& .MuiDrawer-paper": {
                  borderRadius: "16px",
                },
              }}
            >
              <div className="p-4 pb-0 text-right">
                <button
                  type="button"
                  className="rounded-s-full rounded-e-full px-3.5 py-2.5"
                  onClick={closeDateDialog}
                >
                  <IoMdClose className="text-2xl" />
                </button>
              </div>

              <div className="flex-1">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    defaultValue={dayjs(new Date())}
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
                        padding: "0px 16px 30px 16px",
                      },
                    }}
                    value={dayjs(jDate)}
                    onChange={(date) => {
                      if (date) {
                        setJourneyDateBtn(date.toDate());
                      }
                      closeDateDialog();
                    }}
                  />
                </LocalizationProvider>
              </div>
            </Drawer>
          )}
        </div>
      </div>

      {/* Lower Navbar*/}
      <div className="myContainer bg-white w-full sticky top-0 left-0 right-0 font-semibold hidden lg:flex justify-between items-center gap-16 z-40 shadow-md">
        {/* GSRTC Logo */}
        <div
          className={`${
            scrollPosition >= 100 ? "" : "hidden"
          } duration-200 transition-all`}
        >
          <Image
            src={gsrtcLogo}
            className="max-w-[50px] max-h-[50px] lg:max-w-16 lg:max-h-16"
            alt="GSRTC Navbar LOGO"
            width={64}
            height={64}
          />
        </div>

        {/* Bus search function */}
        <form
          className="w-full rounded-3xl"
          onClick={(e) => {
            const eleCoord = e.currentTarget.getBoundingClientRect();
            // console.log("eleCoord.top: ", eleCoord.top);
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
                    className="hidden xl:block bg-[#fed9d5] hover:bg-[#f8d3cf] text-sm font-bold px-3 py-2 rounded-s-full rounded-e-full cursor-pointer"
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
                    <div className="p-4 pb-0 flex items-center gap-x-2 border-b-slate-200">
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
                              defaultValue={dayjs(new Date())}
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
                                  padding: "0px 16px 30px 16px",
                                },
                              }}
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

              {/* found buses numbers and sort by options */}
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

              {/* Bus ticket booking drawer */}
              <BookTicketDrawer
                data={{
                  viewDrawer,
                  activeTab,
                  setActiveTab,
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
