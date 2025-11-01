"use client";
import carousle_img_1 from "@/assets/images/carousel-img _1.jpg";
import carousle_img_2 from "@/assets/images/carousel-img _2.jpg";
import carousle_img_3 from "@/assets/images/carousel-img _3.jpg";
import Image, { StaticImageData } from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Popover, Switch } from "@mui/material";
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import womenSvg from "@/assets/images/female.svg";
import { FiSearch } from "react-icons/fi";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DateFormater } from "@/utils/common/dateFormater";
import bus_offer_test from "@/assets/images/bus-offer-test.png";
import bus_whats_new from "@/assets/images/bus_whats_new.webp";
import bus_testimoni from "@/assets/images/bus_testimoni.png";
import getGsrtcApp from "@/assets/images/getGsrtcApp.png";
import topDestImg1 from "@/assets/images/imgi_53_td-1.jpg";
import topDestImg2 from "@/assets/images/imgi_48_td-2.jpg";
import topDestImg3 from "@/assets/images/imgi_49_td-3.jpg";
import topDestImg4 from "@/assets/images/imgi_50_td-4.jpg";
import topDestImg5 from "@/assets/images/imgi_51_td-5.jpg";
import topDestImg6 from "@/assets/images/imgi_52_td-6.jpg";
import { DiAndroid } from "react-icons/di";
import { FaApple } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import NumberFormater from "@/utils/common/numberFormater";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImSpinner8 } from "react-icons/im";
import { useRouter } from "next/navigation";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  //Hero section carousel
  const [heroCarouselRef] = useEmblaCarousel({ loop: true, dragFree: true }, [
    Autoplay({ stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [offersCarouselRef] = useEmblaCarousel({ dragFree: true });
  const [whatNewCarouselRef] = useEmblaCarousel({ dragFree: true });
  const [topDestinationCarousel] = useEmblaCarousel(
    { loop: true, dragFree: true },
    [Autoplay({ stopOnInteraction: false, stopOnMouseEnter: true })]
  );
  const [testimonialsCarouselRef] = useEmblaCarousel({ dragFree: true });

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

  const topDestinations: {
    id: number;
    title: string;
    description: string;
    image: StaticImageData;
  }[] = [
    {
      id: 1,
      title: "Statue Of Unity",
      description:
        "The Statue of Unity is the world's tallest statue, with a height of 182 metres (597 feet), located near Kevadia in the state of Gujarat",
      image: topDestImg1,
    },
    {
      id: 2,
      title: "Swaminarayan Temple",
      description:
        "Swaminarayan Temple is one of the most popular religious sites. One of the most prominent features of the heritage of Swaminarayan is temple architecture",
      image: topDestImg2,
    },
    {
      id: 3,
      title: "Kutch",
      description: `"The White Desert of India" Kutch is probably one of the most beautiful, yet surreal places in India with the vast expanses of the white salt desert.`,
      image: topDestImg3,
    },
    {
      id: 4,
      title: "Sabarmati Ashram",
      description:
        "Sabarmati Ashram (also known as Gandhi Ashram) is located in the Sabarmati suburb of Ahmedabad, Gujarat, adjoining the Ashram Road, on the banks of the River Sabarmati",
      image: topDestImg4,
    },
    {
      id: 5,
      title: "Dwarka, Gujarat",
      description:
        "Dwarakadheesh, is a Hindu temple dedicated to Krishna, who is worshiped here by the name Dwarkadhish, or 'King of Dwarka'.",
      image: topDestImg5,
    },
    {
      id: 6,
      title: "Gir National Park",
      description:
        "Gir National Park and Wildlife Sanctuary, also known as Sasan Gir, is a forest, national park, and wildlife sanctuary near Talala Gir in Gujarat",
      image: topDestImg6,
    },
  ];

  const growingNumbers: {
    link: string;
    icon: ReactNode;
    title: string;
    number: number;
    footerText: string;
    backgroundImg: string;
  }[] = [
    {
      link: "https://play.google.com/store/apps/details?id=com.gsrtc.mobileweb",
      icon: <DiAndroid className="w-11 h-11 text-[#a4c639]" />,
      title: "Android App Downloaded",
      number: 6232351,
      footerText: "As on 15/10/2025",
      backgroundImg: `linear-gradient(to right, #1b0778, #2e1c92, #402eae, #5142ca, #6155e7)`,
    },
    {
      link: "https://apps.apple.com/in/app/gsrtc/id1483621554",
      icon: <FaApple className="w-11 h-11 text-[#a4c639]" />,
      title: "IOS App Downloaded",
      number: 1100282,
      footerText: "As on 15/10/2025",
      backgroundImg: `linear-gradient(to right, #7e1253, #90145c, #a21764, #b4196c, #c71b74)`,
    },
    {
      link: "https://apps.apple.com/in/app/gsrtc/id1483621554",
      icon: <FaWallet className="w-11 h-11 text-[#880014]" />,
      title: "Wallet User Count",
      number: 1225081,
      footerText: "As on 15/10/2025",
      backgroundImg: ` linear-gradient(to right, #b35d00, #c56400, #d76b00, #ea7200, #fd7900)`,
    },
    {
      link: "#",
      icon: <FaUsers className="w-11 h-11 text-[#070080]" />,
      title: "Visitors Count",
      number: 313378669,
      footerText: "Over GSRTC Happy Customers",
      backgroundImg:
        "linear-gradient(to right, #0f4c02, #165f05, #1d730a, #238811, #2a9d17)",
    },
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

  const openJourneyDatePopover = (event: React.MouseEvent<HTMLElement>) => {
    setJourneyDatePop(event.currentTarget);
  };

  const closeJourneyDatePopover = () => {
    setJourneyDatePop(null);
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
    setTimeout(() => {
      router.push("/search");
    }, 1500);
  };

  // watching all search buses inputs
  const jDate = watch("journeyDate");
  const bPoint = watch("boardingPoint");
  const dPoint = watch("destinationPoint");

  return (
    <div className="min-h-screen">
      {/* Home page hero section Carousel */}
      <div className="hidden md:block !overflow-hidden" ref={heroCarouselRef}>
        <div className="flex">
          <div className="min-w-full">
            <Image
              src={carousle_img_1}
              alt="Carousel image 1"
              className="h-[280px]"
            />
          </div>
          <div className="min-w-full">
            <Image
              src={carousle_img_2}
              alt="Carousel image 1"
              className="h-[280px]"
            />
          </div>
          <div className="min-w-full">
            <Image
              src={carousle_img_3}
              alt="Carousel image 1"
              className="h-[280px]"
            />
          </div>
        </div>
      </div>

      {/* Bus search function */}
      <form
        className="md:mx-8 lg:mx-[75px] z-10 bg-white md:-translate-y-[64px] md:shadow-xl rounded-3xl mb-7"
        onClick={(e) => {
          const eleCoord = e.currentTarget.getBoundingClientRect();
          scrollBy({
            top: eleCoord.top - 100,
            behavior: "instant",
          });
        }}
        onSubmit={handleSubmit(onSearchBuses)}
      >
        <p className="md:hidden px-4 pt-5 font-bold text-[22px]">Bus Tickets</p>
        <div className="p-4 pb-0 flex flex-col xl:flex-row gap-4 xl:gap-2">
          <div className="w-full xl:w-[78%] flex flex-col lg:flex-row">
            <div className="w-full lg:w-3/5 flex flex-col md:flex-row">
              {/* Source place */}
              <div className="relative w-full md:w-1/2">
                <button
                  type="button"
                  className="w-full p-2.5 md:p-3.5 border border-b-0 lg:border-b-[1px] rounded-se-2xl md:rounded-se-none rounded-ss-2xl lg:rounded-s-2xl border-slate-400 flex items-center gap-x-2 cursor-pointer outline-none"
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
                          <p className="text-left text-xs text-gray-500">
                            From
                          </p>
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
              <div className="relative w-full md:w-1/2">
                <button
                  type="button"
                  className="w-full p-2.5 md:p-3.5 border-s md:border-s-0 border-e lg:border-e-0 border-t border-b-none lg:border-b md:rounded-se-2xl lg:rounded-se-none border-slate-400 flex items-center gap-x-2 cursor-pointer outline-none"
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
            </div>

            {/* Date Picker */}
            <div className="relative w-full lg:w-2/5">
              <button
                type="button"
                className="w-full p-2.5 md:p-3.5 border rounded-es-2xl lg:rounded-es-none rounded-ee-2xl lg:rounded-e-2xl border-slate-400 flex justify-between gap-x-1.5 items-center cursor-pointer outline-none"
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
          </div>

          {/* Women booking */}
          <div className="relative w-full xl:w-[22%] flex items-center border rounded-2xl border-slate-400">
            <button
              type="button"
              className="w-full p-3.5 pe-0  flex items-center gap-x-2 cursor-pointer outline-none"
              // onClick={openDestPopover}
            >
              <Image
                src={womenSvg}
                height={26}
                width={26}
                alt="Booking for women"
              />
              <div>
                <p className="text-left text-sm text-nowrap font-semibold text-gray-500">
                  Booking for women
                </p>
                <Link
                  href="/"
                  className="block text-left text-xs font-semibold text-blue-600 underline"
                >
                  Know more
                </Link>
              </div>
            </button>

            <Controller
              name="isWomen"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Switch color="primary" checked={value} onChange={onChange} />
              )}
            />
          </div>
        </div>

        {/* Submit button */}
        <div className="flex justify-center md:translate-y-1/2">
          <button
            type="submit"
            className={`p-3 m-4 md:m-0 rounded-s-full rounded-e-full min-w-[300px] w-full md:w-1/4 ${
              loading ? "bg-[#7d7d7d]" : "bg-primary"
            } text-white font-semibold flex items-center justify-center gap-x-2 cursor-pointer outline-none`}
          >
            {!loading ? (
              <FiSearch className="text-2xl" />
            ) : (
              <ImSpinner8 className="text-2xl text-white  animate-spin" />
            )}
            <span>Search buses</span>
          </button>
        </div>
      </form>

      {/* GSRTC Growing Numbers */}
      <div className="myContainer mb-7">
        <p className="font-bold text-[22px] mb-5">GSRTC Growing Numbers</p>

        {/* Numbers */}
        <div className="!overflow-hidden" ref={topDestinationCarousel}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:grid-rows-2 lg:grid-rows-1 gap-2 p-2">
            {growingNumbers &&
              growingNumbers.length > 0 &&
              growingNumbers.map((card, inx) => (
                <a
                  key={`growingNumCard-${inx}`}
                  href={card.link}
                  target="_blank"
                >
                  <div
                    className="w-full h-full flex flex-col justify-center gap-y-4 p-4 rounded-lg shadow-lg"
                    style={{ backgroundImage: card.backgroundImg }}
                  >
                    <div className="flex justify-center">{card.icon}</div>
                    <p className="text-center text-white text-lg">
                      {card.title}
                    </p>
                    <p className="text-center text-white text-2xl font-semibold">
                      {NumberFormater(card.number)}
                    </p>
                    <p className="text-center text-white text-sm">
                      {card.footerText}
                    </p>
                  </div>
                </a>
              ))}
          </div>
        </div>
      </div>

      {/* Top Destination */}
      <div className="myContainer mb-7">
        <p className="font-bold text-[22px] mb-5">Top destinations</p>

        {/* Top destination carousel */}
        <div className="!overflow-hidden" ref={topDestinationCarousel}>
          <div className="flex">
            {topDestinations &&
              topDestinations.map((o, inx) => (
                <a
                  href="#"
                  key={`topDestination-${inx}`}
                  className="relative ms-2"
                >
                  <Image
                    src={o.image}
                    alt="Bus Offer Photo"
                    className="min-w-[300px] min-h-[350px] rounded-2xl"
                  />
                  <div className="absolute inset-0 ps-7 pe-5 z-10 bg-black/60 pt-10 rounded-2xl">
                    <p className="text-[#FF9900] text-center text-4xl font-bold mb-6">
                      {o.id < 10 ? `0${o.id}` : o.id}
                    </p>
                    <p className="text-white text-[22px] font-bold text-center mb-11">
                      {o.title}
                    </p>
                    <p className="text-white text-sm text-center">
                      {o.description}
                    </p>
                  </div>
                </a>
              ))}
          </div>
        </div>
      </div>

      {/* Offer For you section */}
      <div className="myContainer mb-7">
        <div className="flex justify-between items-center mb-5">
          <p className="font-bold text-[22px]">Offer For you</p>
          <a
            href="#"
            className="text-sm hover:bg-primary/90 text-blue-700 hover:text-white font-semibold px-3 py-2 rounded-s-full rounded-e-full cursor-pointer underline"
          >
            View more
          </a>
        </div>

        {/* Offers Carousel */}
        <div className="!overflow-hidden" ref={offersCarouselRef}>
          <div className="flex">
            {offers &&
              offers.map((o, inx) => (
                <a href="#" key={`offer-${inx}`} className="ps-2">
                  <Image
                    src={bus_offer_test}
                    alt="Bus Offer Photo"
                    className="min-w-[300px] min-h-[200px] rounded-2xl"
                  />
                </a>
              ))}
          </div>
        </div>
      </div>

      {/* What's new section */}
      <div className="myContainer mb-7">
        <p className="font-bold text-[22px] mb-5">What&apos;s new</p>

        {/* What's new Carousel */}
        <div className="!overflow-hidden" ref={whatNewCarouselRef}>
          <div className="flex">
            {offers &&
              offers.map((o, inx) => (
                <a href="#" key={`offer-${inx}`} className="ps-2">
                  <Image
                    src={bus_whats_new}
                    alt="bus_whats_new"
                    className="min-w-[300px] min-h-[200px] rounded-2xl"
                  />
                </a>
              ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="myContainer mb-7">
        <p className="font-bold text-[22px] mb-5">Testimonials</p>

        {/* Testimonials Carousel */}
        <div className="!overflow-hidden" ref={testimonialsCarouselRef}>
          <div className="flex">
            {offers &&
              offers.map((o, inx) => (
                <a href="#" key={`offer-${inx}`} className="ps-2">
                  <Image
                    src={bus_testimoni}
                    alt="bus_testimoni"
                    className="min-w-[300px] min-h-[200px] rounded-2xl"
                  />
                </a>
              ))}
          </div>
        </div>
      </div>

      {/* Dowbload GSRTC App */}
      <div className="myContainer mb-7">
        <p className="font-bold text-[22px] mb-5">Get the GSRTC App</p>
        <div className="bg-white shadow-lg rounded-lg p-5 flex flex-col md:flex-row md:justify-between items-center gap-y-5 md:gap-y-0">
          <div className="w-full flex gap-x-4 items-center">
            <Image
              src={getGsrtcApp}
              alt="GetGsrtcAPPIcon"
              className="w-[85px] h-[86px] md:w-[62px] md:h-[61px]"
            />
            <div>
              <p className="font-bold">Rated 4.6 on Play Store</p>
              <p className="text-[#1d1d1da3] text-sm">
                Download for exciting offers!
              </p>
            </div>
          </div>
          <a
            href="#"
            className="w-full md:w-auto min-w-[300px] bg-primary text-sm text-white text-center font-semibold sm:px-24 py-3 rounded-s-full rounded-e-full cursor-pointer"
          >
            Download App
          </a>
        </div>
      </div>
    </div>
  );
}
