"use client";

import Image from "next/image";
import gsrtcLogo from "@/assets/images/gsrtc_logo_900x900.png";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Checkbox, DialogTitle, FormGroup, Popover } from "@mui/material";
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
import { GrLinkNext, GrNext, GrPrevious } from "react-icons/gr";
import { useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import bus_offer_test from "@/assets/images/bus-offer-test.png";
import Link from "next/link";
import { VscSettings } from "react-icons/vsc";
import Drawer from "@mui/material/Drawer";
import FilterAccordian from "../../components/common/FilterAccordian";
import BusCard from "@/components/common/BusCard";
import BookTicketDrawer from "@/components/common/BookTicketDrawer";
import Dialog from "@mui/material/Dialog";
import useWindowSize from "@/Hooks/useWindowSize";
import useScrollPosition from "@/Hooks/useScrollPosition";
import { FaLongArrowAltUp } from "react-icons/fa";
import {
  boardingPoints,
  FilterContentType,
  filterList,
  FilterType,
  tagsList,
} from "@/components/common/SearchPageData";
import { IoCloseSharp } from "react-icons/io5";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link as MuiLink } from "@mui/material";
import { motion, useScroll } from "motion/react";

export interface FilterStateType {
  filterId: string;
  isActive?: boolean;
  foundResults?: number;
  order?: "lowToHigh" | "highToLow" | null;
}

export type FilterStateObjectType = Record<string, FilterStateType>;

const BusListPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const windowSize = useWindowSize();
  const router = useRouter();

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
  const [journeyDateBtn, setJourneyDateBtn] = useState<Date>(
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
    // console.log("jDate: ", journeyDateBtn);
    if (journeyDateBtn) setValue("journeyDate", journeyDateBtn);
  }, [journeyDateBtn]);

  //Offer carousel
  const [offersCarouselRef, offersCarouselAPI] = useEmblaCarousel({
    dragFree: true,
  });
  const offersCarouselScrollNext = useCallback(() => {
    if (offersCarouselAPI) offersCarouselAPI.scrollNext();
  }, [offersCarouselAPI]);
  const offersCarouselScrollPrev = useCallback(() => {
    if (offersCarouselAPI) offersCarouselAPI.scrollPrev();
  }, [offersCarouselAPI]);

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

  const foundBuses = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  // Bus ticket booking drawer
  let [viewDrawer, setViewDrawer] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(0);
  const openViewDrawer = (): void => {
    setViewDrawer(true);
  };

  const closeViewDrawer = (): void => {
    setActiveTab(0);
    setViewDrawer(false);
  };

  const [filterDialog, setFilterDialog] = useState<boolean>(false);
  const [filterActiveTab, setFilterActiveTab] = useState<number>(0);

  const openFilterDialog = (): void => {
    setFilterDialog(true);
  };

  const closeFilterDialog = (): void => {
    setFilterDialog(false);
  };

  const handleActiveFilter = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setFilterActiveTab(newValue);
  };

  //Lower navbar animation
  const { scrollY } = useScroll();
  const [logoTrigger, setLogoTrigger] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      if (latest > 30) {
        setLogoTrigger(true);
      } else {
        setLogoTrigger(false);
      }
    });
  }, [scrollY]);

  const initialFilterStateObject: FilterStateObjectType = {
    sortByRatings: {
      filterId: "sortByRatings",
      order: null,
    },
    sortByDepTime: {
      filterId: "sortByDepTime",
      order: null,
    },
    sortByPrice: {
      filterId: "sortByPrice",
      order: null,
    },
    morning_6_to_12: {
      filterId: "morning_6_to_12",
      isActive: false,
      foundResults: 0,
    },
    afternoon_12_to_18: {
      filterId: "afternoon_12_to_18",
      isActive: false,
      foundResults: 0,
    },
    evening_18_to_24: {
      filterId: "evening_18_to_24",
      isActive: false,
      foundResults: 0,
    },
    night_00_to_06: {
      filterId: "night_00_to_06",
      isActive: false,
      foundResults: 0,
    },
    arrival_morning_6_to_12: {
      filterId: "arrival_morning_6_to_12",
      isActive: false,
      foundResults: 0,
    },
    arrival_afternoon_12_to_18: {
      filterId: "arrival_afternoon_12_to_18",
      isActive: false,
      foundResults: 0,
    },
    arrival_evening_18_to_24: {
      filterId: "arrival_evening_18_to_24",
      isActive: false,
      foundResults: 0,
    },
    arrival_night_00_to_06: {
      filterId: "arrival_night_00_to_06",
      isActive: false,
      foundResults: 0,
    },

    busType_AC: {
      filterId: "busType_AC",
      isActive: false,
      foundResults: 0,
    },
    busType_NON_AC: {
      filterId: "busType_NON_AC",
      isActive: false,
      foundResults: 0,
    },
    busType_Seater: {
      filterId: "busType_Seater",
      isActive: false,
      foundResults: 0,
    },
    busType_Sleeper: {
      filterId: "busType_Sleeper",
      isActive: false,
      foundResults: 0,
    },
    singleWindowSeaterOrSleeper: {
      filterId: "singleWindowSeaterOrSleeper",
      isActive: false,
      foundResults: 0,
    },

    busFeatures_liveTracking: {
      filterId: "busFeatures_liveTracking",
      isActive: false,
      foundResults: 0,
    },
    busFeatures_highRatedBuses: {
      filterId: "busFeatures_highRatedBuses",
      isActive: false,
      foundResults: 0,
    },
    busFeatures_deals: {
      filterId: "busFeatures_deals",
      isActive: false,
      foundResults: 0,
    },
    busFeatures_primoBus: {
      filterId: "busFeatures_primoBus",
      isActive: false,
      foundResults: 0,
    },
    busFeatures_freeCancellation: {
      filterId: "busFeatures_freeCancellation",
      isActive: false,
      foundResults: 0,
    },
    busFeatures_volvoBuses: {
      filterId: "busFeatures_volvoBuses",
      isActive: false,
      foundResults: 0,
    },

    busOperator_GSRTC: {
      filterId: "busOperator_GSRTC",
      isActive: false,
      foundResults: 0,
    },
    busOperator_MHSRTC: {
      filterId: "busOperator_MHSRTC",
      isActive: false,
      foundResults: 0,
    },
    busOperator_RSRTC: {
      filterId: "busOperator_RSRTC",
      isActive: false,
      foundResults: 0,
    },
    busOperator_MPSRTC: {
      filterId: "busOperator_MPSRTC",
      isActive: false,
      foundResults: 0,
    },

    amenitie_waterBottle: {
      filterId: "amenitie_waterBottle",
      isActive: false,
      foundResults: 0,
    },
    amenities_blanket: {
      filterId: "amenities_blanket",
      isActive: false,
      foundResults: 0,
    },
    amenities_chargingPoint: {
      filterId: "amenities_chargingPoint",
      isActive: false,
      foundResults: 0,
    },
    amenitie_toilet: {
      filterId: "amenitie_toilet",
      isActive: false,
      foundResults: 0,
    },

    specialBusFeature_freeBusChange: {
      filterId: "specialBusFeature_freeBusChange",
      isActive: false,
      foundResults: 0,
    },
    specialBusFeature_highlyRatedByWomen: {
      filterId: "specialBusFeature_highlyRatedByWomen",
      isActive: false,
      foundResults: 0,
    },
    specialBusFeature_womenTravelling: {
      filterId: "specialBusFeature_womenTravelling",
      isActive: false,
      foundResults: 0,
    },
  };

  const [filterBoardingPoints, setFilterBoardingPoints] = useState<FilterType>({
    title: "Boarding points",
    contentsList: [],
    isSearchable: true,
  });

  const [filterDroppingPoints, setFilterDroppingPoints] = useState<FilterType>({
    title: "Dropping points",
    contentsList: [],
    isSearchable: true,
  });

  const [noOfActiveFIlter, setNoOfActiveFIlter] = useState<number>(0);

  //filters rendering
  const [filterRender, setFilterRender] = useState<FilterType[]>([]);

  //filters state
  const [filterState, setFilterState] = useState<FilterStateObjectType>({
    ...initialFilterStateObject,
  });

  const clearAllFilters = () => {
    Object.keys(filterState).map((flt) => {
      filterState[flt].isActive = false;
    });

    setFilterState({ ...filterState });
  };

  useEffect(() => {
    // Dynamic boarding points
    boardingPoints.forEach((brdp) => {
      filterBoardingPoints.contentsList.push({
        filterId: `boardingPoints_${brdp.replace(" ", "").toLocaleLowerCase()}`,
        icon: null,
        content: (
          <div>
            <p className="font-medium">{brdp}</p>
          </div>
        ),
      });

      filterState[
        `boardingPoints_${brdp.replace(" ", "").toLocaleLowerCase()}`
      ] = {
        filterId: `boardingPoints_${brdp.replace(" ", "").toLocaleLowerCase()}`,
        isActive: false,
        foundResults: 0,
      };
    });

    // Dynamic dropping points
    boardingPoints.forEach((brdp) => {
      filterDroppingPoints.contentsList.push({
        filterId: `droppingPoints_${brdp.replace(" ", "").toLocaleLowerCase()}`,
        icon: null,
        content: (
          <div>
            <p className="font-medium">{brdp}</p>
          </div>
        ),
      });

      filterState[
        `droppingPoints_${brdp.replace(" ", "").toLocaleLowerCase()}`
      ] = {
        filterId: `boardingPoints_${brdp.replace(" ", "").toLocaleLowerCase()}`,
        isActive: false,
        foundResults: 0,
      };
    });

    setFilterBoardingPoints({ ...filterBoardingPoints });

    setFilterDroppingPoints({ ...filterDroppingPoints });

    setFilterState(filterState);

    setFilterRender([
      ...filterList,
      filterBoardingPoints,
      filterDroppingPoints,
    ]);
  }, []);

  useEffect(() => {
    let active = 0;
    Object.keys(filterState).map((flt) => {
      if (filterState[flt].isActive) {
        active += 1;
      }
    });

    setNoOfActiveFIlter(active);
  }, [filterState]);

  const handleSortByFilterChange = (flt: string) => {
    let tempState = Object.assign({}, filterState);

    if (tempState[flt]?.order === "lowToHigh") {
      tempState[flt].order = "highToLow";
    } else {
      tempState[flt].order = "lowToHigh";
    }

    setFilterState({ ...tempState });
  };

  // Search filters in dialog box
  const SearchFiltersFromList = (text: string, filterTitle: string) => {
    // console.log("Inputs:", text, filterTitle);
    const InitFilterRender = [
      ...filterList,
      filterBoardingPoints,
      filterDroppingPoints,
    ];
    let temp = InitFilterRender.map((item) => ({ ...item }));
    // console.log("temp: ", temp);
    const index = temp.findIndex((flt) => flt.title === filterTitle);
    // console.log("filterList[index]: ", temp[index]);

    const filtered = temp[index].contentsList.filter((flt: FilterContentType) =>
      flt.filterId.toLocaleLowerCase().includes(text.toLocaleLowerCase())
    );
    console.log("filtered", filtered);

    temp[index].contentsList = filtered;
    setFilterRender([...temp]);
  };

  return (
    <div>
      {/* Upper Navbar */}
      <div className="myContainer shadow-sm lg:shadow-none bg-white w-full sticky lg:relative top-0 left-0 right-0 z-40 flex flex-col justify-center">
        <div className="w-full h-full py-2 lg:pt-4 flex justify-between items-center">
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
              {journeyDateBtn && DateFormater(journeyDateBtn).split(",")[0]}
            </span>
            <span className=" text-xs md:text-sm text-center text-[#1d1d1da3]">
              {journeyDateBtn && getDayOfWeek(journeyDateBtn)}
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

      {/* Breadcrums */}
      <div className="myContainer py-2">
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="Search Page breadcrumb"
          sx={{
            "& .MuiBreadcrumbs-ol": {
              fontSize: "12px",
            },
          }}
        >
          <MuiLink underline="hover" key="1" color="inherit" href="/">
            Home
          </MuiLink>
          <MuiLink underline="hover" key="1" color="inherit" href="/">
            Bus Booking
          </MuiLink>
          <MuiLink underline="hover" key="1" color="inherit" href="/">
            <span className="text-black">Ahmedabad to Jamnagar</span>
          </MuiLink>
        </Breadcrumbs>
      </div>

      {/* Lower Navbar*/}
      <div className="myContainer bg-white w-full sticky top-0 left-0 right-0 font-semibold hidden lg:flex justify-between items-center gap-10 z-40 shadow-md">
        {/* GSRTC Logo */}
        <motion.div
          initial={{ marginLeft: "-200px" }}
          animate={logoTrigger ? { marginLeft: 0 } : { marginLeft: "-200px" }}
          transition={{ duration: 0.7 }}
          className=""
        >
          <Image
            src={gsrtcLogo}
            className="max-w-[50px] max-h-[50px] lg:max-w-16 lg:max-h-16"
            alt="GSRTC Navbar LOGO"
            width={64}
            height={64}
          />
        </motion.div>

        {/* Bus search function */}
        <motion.form
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
        </motion.form>
      </div>

      {/* Buses */}
      <div className="lg:px-16 w-full max-w-full bg-[#f2f2f8] border-b border-b-gray-300">
        <div className="w-full py-5 flex gap-x-4">
          {/* Filters */}
          <div className="sticky top-[98px] max-h-[calc(100vh-94px)] overflow-y-scroll hideScrollBar min-w-[272px] max-w-[272px] h-full hidden lg:flex flex-col gap-y-4">
            {/* Advertisement */}
            <div className="w-full min-h-[150px] max-h-[150px] rounded-2xl flex justify-center items-center bg-[#ece9fc] shadow-sm">
              <p className="font-semibold">Advertisement will go here...</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl">
              <div className="min-h-14 px-4 py-2 flex justify-between items-center border-b border-b-slate-200">
                <p className="text-[20px] font-bold">Filter buses</p>

                {noOfActiveFIlter > 0 && (
                  <button
                    type="button"
                    className="px-3 py-2 rounded-s-full rounded-e-full hover:bg-slate-200 font-semibold text-black underline underline-offset-1 text-sm cursor-pointer"
                    onClick={clearAllFilters}
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Tags */}
              <ul className="w-full p-4 flex flex-col gap-y-4">
                {tagsList &&
                  tagsList.map((tag) => (
                    <li key={`tag-${tag.filterId}`}>
                      <button
                        type="button"
                        className={`p-2 border ${
                          filterState[tag.filterId].isActive
                            ? "bg-primary/95 hover:bg-primary text-white"
                            : "hover:bg-gray-200 border-slate-400 !text-[#1d1d1d]"
                        }  rounded-lg flex items-center gap-1.5 cursor-pointer`}
                        onClick={() => {
                          let tempState = Object.assign({}, filterState);
                          tempState[tag.filterId].isActive =
                            !tempState[tag.filterId].isActive;
                          setFilterState(tempState);
                        }}
                      >
                        {tag.icon}
                        <span className="text-sm font-medium">
                          {tag.title}&nbsp;({0})
                        </span>
                        {filterState[tag.filterId].isActive && (
                          <span>
                            <IoMdClose className="text-xl" />
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
              </ul>

              {/* Other filters */}
              {filterRender &&
                filterRender.map((filterAcc) => (
                  <FilterAccordian
                    isSearchable={filterAcc?.isSearchable ?? false}
                    key={filterAcc.title}
                    title={filterAcc.title}
                    contentsList={filterAcc.contentsList}
                    filterStateProps={{ filterState, setFilterState }}
                  />
                ))}
            </div>
          </div>

          {/* Found Buses */}
          <div className="w-full lg:max-w-[calc(100%-272px)] flex flex-col">
            {/* Offers Carousel */}
            <div
              className="relative mx-4 md:mx-8 lg:mx-0 !overflow-hidden mb-5"
              ref={offersCarouselRef}
            >
              <div className="flex">
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

              <button
                type="button"
                onClick={offersCarouselScrollPrev}
                className="absolute top-1/2 -translate-y-1/2 left-5 p-2 rounded-full bg-white/50 hover:bg-white cursor-pointer"
              >
                <GrPrevious className="text-lg sm:text-xl md:text-2xl" />
              </button>
              <button
                type="button"
                onClick={offersCarouselScrollNext}
                className="absolute top-1/2 -translate-y-1/2 right-5 p-2 rounded-full bg-white/50 hover:bg-white cursor-pointer"
              >
                <GrNext className="text-lg sm:text-xl md:text-2xl" />
              </button>
            </div>

            {/* Filters tags from mobile screen */}
            <div className="max-w-screen sticky top-16 md:top-18 left-0 right-0 flex lg:hidden items-center gap-x-2 p-2.5 bg-white lg:rounded-lg mb-4 shadow-md">
              <button
                type="button"
                className="px-2 py-1 bg-white border border-slate-400 rounded-lg cursor-pointer flex items-center gap-1"
                onClick={openFilterDialog}
              >
                <VscSettings className="text-xl text-black" />
                <span className="hidden sm:inline-block text-nowrap text-sm">
                  Filter & Sort
                </span>
              </button>

              <ul className="w-full overflow-x-scroll hideScrollBar  flex lg:hidden gap-x-2">
                {tagsList &&
                  tagsList.map((tag) => (
                    <li key={`tag-${tag.filterId}`}>
                      <button
                        type="button"
                        className={`px-2 py-1 border ${
                          filterState[tag.filterId].isActive
                            ? "bg-primary/95 hover:bg-primary text-white"
                            : "hover:bg-gray-200 border-slate-400 !text-[#1d1d1d]"
                        }  rounded-lg flex items-center gap-1.5 cursor-pointer`}
                        onClick={() => {
                          let tempState = Object.assign({}, filterState);
                          tempState[tag.filterId].isActive =
                            !tempState[tag.filterId].isActive;
                          setFilterState(tempState);
                        }}
                      >
                        {tag.icon}
                        <span className="text-sm font-medium text-nowrap">
                          {tag.title}&nbsp;({0})
                        </span>
                        {filterState[tag.filterId].isActive && (
                          <span>
                            <IoMdClose />
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Filter and sort Dialog */}
            <Dialog
              fullScreen={windowSize < 768 ? true : false}
              onClose={closeFilterDialog}
              open={filterDialog}
              sx={{
                "& .MuiDialog-paper": {
                  borderRadius: windowSize < 768 ? "0px" : "16px",
                },
              }}
            >
              <div
                className={`relative w-full md:min-w-lg md:max-w-lg overflow-hidden flex flex-col ${
                  windowSize < 768 ? "h-full" : "max-h-[calc(100vh-64px)]"
                }`}
              >
                {/* header */}
                <div className="z-999 sticky top-0 left-0 right-0 px-4 py-2 flex justify-between items-center bg-white border-b border-b-slate-200">
                  <p className="font-semibold">Sort and filter buses</p>
                  <button
                    type="button"
                    className="p-2 cursor-pointer"
                    onClick={closeFilterDialog}
                  >
                    <IoCloseSharp className="text-2xl" />
                  </button>
                </div>

                {/* Filters */}
                <div className={`overflow-y-auto flex flex-1`}>
                  {/* Tabs */}
                  <div className="w-1/4 min-w-[125px] bg-[#f2f2f8] overflow-y-auto">
                    <Tabs
                      orientation="vertical"
                      variant="scrollable"
                      value={filterActiveTab}
                      onChange={handleActiveFilter}
                      sx={{
                        "& .MuiTabs-indicator": {
                          backgroundColor: "#173c62 !important",
                          left: 0,
                        },
                        "& .MuiTab-root": {
                          borderBottom: 1,
                          borderRight: 1,
                          borderColor: "divider",
                          textTransform: "none",
                          textAlign: "left",
                          alignItems: "flex-start",
                          fontSize: 12,
                          fontWeight: 600,
                          paddingRight: 0,
                        },
                      }}
                    >
                      {filterRender &&
                        filterRender.map((filter, inx) => (
                          <Tab
                            key={`filter-dialog-${inx}`}
                            label={filter.title}
                            sx={{
                              "&.Mui-selected": {
                                color: "#173c62 !important",
                                backgroundColor: "white",
                                borderRight: "0 !important",
                              },
                            }}
                          />
                        ))}
                    </Tabs>
                  </div>

                  {/* Tab content */}
                  <div className="w-3/4 p-4 overflow-y-auto">
                    {filterRender &&
                      filterRender.map((filter, inx) => (
                        <>
                          {filterActiveTab === inx && (
                            <ul>
                              {filter?.isSearchable && (
                                <li className="pb-4">
                                  <input
                                    type="text"
                                    className="py-4 px-5 w-full h-full rounded-s-full rounded-e-full bg-[#f2f2f8] placeholder:text-gray-500 outline-none"
                                    placeholder={
                                      "Search " +
                                      filter.title.toLocaleLowerCase()
                                    }
                                    onChange={(
                                      e: React.ChangeEvent<HTMLInputElement>
                                    ) =>
                                      SearchFiltersFromList(
                                        e.currentTarget.value,
                                        filter.title
                                      )
                                    }
                                  />
                                </li>
                              )}

                              {filter.contentsList &&
                                filter.contentsList.map(
                                  (flt, inx, filterArr) => (
                                    <li key={flt.filterId}>
                                      <label
                                        htmlFor={`filter-dialog-${flt.filterId}`}
                                        className={`flex items-center gap-x-4 cursor-pointer ${
                                          inx === 0 ? "pb-4" : "py-4"
                                        } ${
                                          inx !== filterArr.length - 1
                                            ? "border-b border-b-slate-200"
                                            : ""
                                        }`}
                                      >
                                        {/* Icon */}
                                        {flt.icon && flt.icon}

                                        {/* Content */}
                                        <div className="flex flex-1 justify-between items-center">
                                          {flt.content}
                                          <span className="text-xs text-[#1d1d1da3]">
                                            {0}
                                          </span>
                                        </div>

                                        <Checkbox
                                          id={`filter-dialog-${flt.filterId}`}
                                          checked={
                                            filterState[flt.filterId].isActive
                                          }
                                          sx={{
                                            // color: "#173c62",
                                            "&.Mui-checked": {
                                              color: "#173c62",
                                            },
                                            "&.MuiCheckbox-root": {
                                              padding: "0px !important",
                                            },
                                          }}
                                          value={flt.filterId}
                                          onChange={(
                                            event: React.ChangeEvent<HTMLInputElement>
                                          ) => {
                                            let tempState = Object.assign(
                                              {},
                                              filterState
                                            );
                                            tempState[flt.filterId].isActive =
                                              event.target.checked;
                                            setFilterState(tempState);
                                          }}
                                        />
                                      </label>
                                    </li>
                                  )
                                )}

                              {filter.contentsList &&
                                filter.contentsList.length <= 0 && (
                                  <li>
                                    <p className="py-4 text-center text-red-700">
                                      No result found
                                    </p>
                                  </li>
                                )}
                            </ul>
                          )}
                        </>
                      ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="w-full flex gap-3 p-3">
                  <button
                    type="button"
                    className="w-1/2 py-3 border rounded-s-full rounded-e-full font-semibold cursor-pointer"
                    onClick={clearAllFilters}
                  >
                    Clear All
                  </button>
                  <button
                    type="button"
                    className="w-1/2 py-3 bg-primary text-white rounded-s-full rounded-e-full font-semibold "
                  >
                    Apply
                  </button>
                </div>
              </div>
            </Dialog>

            {/* found buses numbers and sort by options */}
            <div className="bg-white rounded-lg px-4 hidden lg:flex justify-between mb-7">
              <p className="font-semibold py-3.5">96 buses found</p>
              <div className="flex gap-x-4">
                <p className="h-full text-sm font-bold flex items-center">
                  Sort by:
                </p>
                <div className="flex gap-x-7">
                  <button
                    type="button"
                    className="h-full cursor-pointer text-sm font-medium text-gray-600 hover:text-black flex items-center gap-1 outline-none"
                    onClick={() => handleSortByFilterChange("sortByRatings")}
                  >
                    <span>Ratings</span>

                    <FaLongArrowAltUp
                      className={`${
                        filterState["sortByRatings"].order
                          ? "opacity-100"
                          : "opacity-0"
                      } text-xl text-primary duration-300 transition-all ${
                        filterState["sortByRatings"].order === "highToLow"
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>
                  <button
                    type="button"
                    className="h-full cursor-pointer text-sm font-medium text-gray-600 hover:text-black flex items-center gap-1 outline-none"
                    onClick={() => handleSortByFilterChange("sortByDepTime")}
                  >
                    <span>Depature Time</span>

                    <FaLongArrowAltUp
                      className={`${
                        filterState["sortByDepTime"].order
                          ? "opacity-100"
                          : "opacity-0"
                      } text-xl text-primary duration-300 transition-all ${
                        filterState["sortByDepTime"].order === "highToLow"
                          ? "rotate-180"
                          : "rotate-0"
                      }`}
                    />
                  </button>
                  <button
                    type="button"
                    className="h-full cursor-pointer text-sm font-medium text-gray-600 hover:text-black flex items-center gap-1 outline-none"
                    onClick={() => handleSortByFilterChange("sortByPrice")}
                  >
                    <span>Price</span>

                    <FaLongArrowAltUp
                      className={`${
                        filterState["sortByPrice"].order
                          ? "opacity-100"
                          : "opacity-0"
                      } text-xl text-primary duration-300 transition-all ${
                        filterState["sortByPrice"].order === "highToLow"
                          ? "rotate-180"
                          : "rotate-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* List of buses cards */}
            <ul className="px-4 md:px-8 lg:px-0 w-full flex flex-col gap-y-5">
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
  );
};

export default BusListPage;
