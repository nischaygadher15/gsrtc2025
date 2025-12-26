"use client";
import carousle_img_1 from "@/assets/images/carousel-img _1.jpg";
import carousle_img_2 from "@/assets/images/carousel-img _2.jpg";
import carousle_img_3 from "@/assets/images/carousel-img _3.jpg";
import carousle_img_4 from "@/assets/images/carousel-img _4.jpg";
import carousle_img_5 from "@/assets/images/carousel-img _5.jpg";
import Image, { StaticImageData } from "next/image";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  CircularProgress,
  Popover,
  Snackbar,
  Switch,
  Tab,
  Tabs,
} from "@mui/material";
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
import { useRouter } from "next/navigation";
import Dialog from "@mui/material/Dialog";
import { IoMdClose } from "react-icons/io";
import Drawer from "@mui/material/Drawer";
import useWindowSize from "@/Hooks/useWindowSize";
import { GrNext, GrPrevious } from "react-icons/gr";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import offerImg1 from "@/assets/images/offers/imgi_10_Android-iOS.png";
import offerImg2 from "@/assets/images/offers/imgi_11_Android-iOS.png";
import offerImg3 from "@/assets/images/offers/imgi_12_296x200.png";
import offerImg4 from "@/assets/images/offers/imgi_38_Android-iOS-296-200.png";
import offerImg5 from "@/assets/images/offers/imgi_43_Android-iOS-296x200.png";
import { MdOutlineLocalOffer } from "react-icons/md";
import whatsNew1 from "@/assets/images/whatsnew/imgi_20_btt_app_card.png";
import whatsNew2 from "@/assets/images/whatsnew/imgi_21_FlexiTicket.png";
import whatsNew3 from "@/assets/images/whatsnew/imgi_42_Banner-1.webp";
import whatsNew4 from "@/assets/images/whatsnew/imgi_46_rap.webp";
import whatsNew5 from "@/assets/images/whatsnew/imgi_47_referAndEarn.webp";

export default function Home() {
  const windowSize = useWindowSize();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  //Hero section carousel
  const [heroCarouselRef, heroCarouselAPI] = useEmblaCarousel(
    { loop: true, dragFree: true },
    [Autoplay({ stopOnInteraction: false, stopOnMouseEnter: true })]
  );
  const heroCarouselRefScrollNext = useCallback(() => {
    if (heroCarouselAPI) heroCarouselAPI.scrollNext();
  }, [heroCarouselAPI]);
  const heroCarouselRefScrollPrev = useCallback(() => {
    if (heroCarouselAPI) heroCarouselAPI.scrollPrev();
  }, [heroCarouselAPI]);

  //Offers carousel
  const [offersCarouselRef, offersCarouselAPI] = useEmblaCarousel({
    dragFree: true,
  });
  const offersCarouselScrollNext = useCallback(() => {
    if (offersCarouselAPI) offersCarouselAPI.scrollNext();
  }, [offersCarouselAPI]);
  const offersCarouselScrollPrev = useCallback(() => {
    if (offersCarouselAPI) offersCarouselAPI.scrollPrev();
  }, [offersCarouselAPI]);

  //What's new carousel
  const [whatNewCarouselRef, whatNewCarouselAPI] = useEmblaCarousel({
    dragFree: true,
  });
  const whatNewCarouselScrollNext = useCallback(() => {
    if (whatNewCarouselAPI) whatNewCarouselAPI.scrollNext();
  }, [whatNewCarouselAPI]);
  const whatNewCarouselScrollPrev = useCallback(() => {
    if (whatNewCarouselAPI) whatNewCarouselAPI.scrollPrev();
  }, [whatNewCarouselAPI]);

  //Top destination carousel
  const [topDestinationCarousel, topDestinationCarouselAPI] = useEmblaCarousel(
    { loop: true, dragFree: true },
    [Autoplay({ stopOnInteraction: false, stopOnMouseEnter: true })]
  );
  const topDestinationCarouselScrollNext = useCallback(() => {
    if (topDestinationCarouselAPI) topDestinationCarouselAPI.scrollNext();
  }, [topDestinationCarouselAPI]);
  const topDestinationCarouselScrollPrev = useCallback(() => {
    if (topDestinationCarouselAPI) topDestinationCarouselAPI.scrollPrev();
  }, [topDestinationCarouselAPI]);

  // Testimonials Carousel
  const [testimonialsCarouselRef, testimonialsCarouselAPI] = useEmblaCarousel({
    dragFree: true,
  });
  const testimonialsCarouselScrollNext = useCallback(() => {
    if (testimonialsCarouselAPI) testimonialsCarouselAPI.scrollNext();
  }, [testimonialsCarouselAPI]);
  const testimonialsCarouselScrollPrev = useCallback(() => {
    if (testimonialsCarouselAPI) testimonialsCarouselAPI.scrollPrev();
  }, [testimonialsCarouselAPI]);

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

  interface OffersDataType {
    title: string;
    validTill: Date;
    offerCode: string;
    bgImage: StaticImageData;
  }

  const offers: OffersDataType[] = [
    {
      title: "Save up to Rs 300 on bus tickets",
      validTill: new Date("03/06/2026"),
      offerCode: "FESTIVE300",
      bgImage: offerImg1,
    },
    {
      title: "Save up to Rs 300 on bus tickets",
      validTill: new Date("12/31/2025"),
      offerCode: "SHAADI300",
      bgImage: offerImg2,
    },
    {
      title: "Save up to Rs 500 on bus tickets",
      validTill: new Date("12/31/2025"),
      offerCode: "RED500",
      bgImage: offerImg3,
    },
    {
      title: "Enjoy 10% off on Karnataka routes.",
      validTill: new Date("12/06/2026"),
      offerCode: "NAMMA101",
      bgImage: offerImg4,
    },
    {
      title: "Get upto Rs 400 on bus tickets",
      validTill: new Date("12/31/2025"),
      offerCode: "STUDENT",
      bgImage: offerImg5,
    },
  ];

  const whatsNew = [whatsNew1, whatsNew2, whatsNew3, whatsNew4, whatsNew5];

  const testimonials: {
    cusName: string;
    text: string;
  }[] = [
    {
      text: "Comfortable and great journey",
      cusName: "Ravi Kumar",
    },
    {
      text: "On time journey and cheap ticket",
      cusName: "Vishva devi",
    },
    {
      text: "Safest journey of India",
      cusName: "Anil Sharma",
    },
    {
      text: "Cool journey and supportive staff",
      cusName: "Rekha Ahir",
    },
    {
      text: "I like this journey, I will try again sometime",
      cusName: "Gopal Kher",
    },
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

  const busSearchBox = useRef<HTMLFormElement | null>(null);

  // Source popover
  const [fromPlace, setFromPlace] = useState<HTMLElement | null>(null);
  const [fromPlaceDialog, setFromPlaceDialog] = useState<boolean>(false);
  const fromPlacePopInputRef = useRef<HTMLInputElement | null>(null);
  const [filteredBrdPoints, setFilteredBrdPoints] =
    useState<string[]>(boardingPoints);

  const openFormPopover = (event: React.MouseEvent<HTMLElement>) => {
    setFromPlace(event.currentTarget);
  };

  const closeFromPopover = () => {
    setFromPlace(null);
    setFilteredBrdPoints(boardingPoints);
  };

  const closeFromDialog = () => {
    setFromPlaceDialog(false);
    setFilteredBrdPoints(boardingPoints);
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
  const [destPlaceDialog, setDestPlaceDialog] = useState<boolean>(false);
  const destPlacePopInput = useRef<HTMLInputElement | null>(null);
  const [filteredDestPoints, setFilteredDestPoints] =
    useState<string[]>(boardingPoints);

  const openDestPopover = (event: React.MouseEvent<HTMLElement>) => {
    setDestPlace(event.currentTarget);
  };

  const closeDestPopover = () => {
    setDestPlace(null);
    setFilteredDestPoints(boardingPoints);
  };

  const closeDestDialog = () => {
    setDestPlaceDialog(false);
    setFilteredDestPoints(boardingPoints);
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

  useEffect(() => {
    if (errors["boardingPoint"] || errors["destinationPoint"]) {
      toast.error("Destination and Source is required !!", {
        position: "bottom-center",
      });
    } else {
      if (errors["journeyDate"]) {
        toast.error(errors["journeyDate"].message as string, {
          position: "bottom-center",
        });
      }
    }
  }, [errors]);

  //Handle submit on SearchBuses
  const onSearchBuses = async (data: SearchBusDataType) => {
    setLoading(true);
    console.log("Form data: ", data);
    router.push("/search");
  };

  // watching all search buses inputs
  const jDate = watch("journeyDate");
  const bPoint = watch("boardingPoint");
  const dPoint = watch("destinationPoint");
  const [journeyDate, setJourneyDate] = useState<boolean>(false);

  // FAQs tabs
  const [faqActiveTab, setFAQActiveTab] = useState<number>(0);

  const handleFAQTabs = (event: React.SyntheticEvent, newValue: number) => {
    setFAQActiveTab(newValue);
  };

  const FAQs = {
    general: [
      {
        q: "Can I track the location of my booked bus online?",
        a: `Yes, you can track your bus online by using our bus tracking app feature called “Track My Bus”. This feature allows passengers and their families to track the live bus location. You may follow your bus on a map and use the information to plan your trip to the boarding point and to get off at the correct stop. Family and friends may also check the bus position to schedule pick-ups and ensure safety.`,
      },
      {
        q: "What are the advantages of bus ticket booking with redBus?",
        a: `There are many advantages of booking bus tickets online with redBus. redBus is India's leading bus ticket booking platform, where you can book private or government-owned buses. redBus allows you to find the different types of buses, choose the preferred bus seats, and find your nearest boarding and dropping points. You can also filter the buses based on timings, like morning, evening, etc.
        `,
      },
      {
        q: "Why book bus tickets online on redBus?",
        a: `
        Booking bus tickets online on redBus is increasingly becoming the preferred choice for travellers due to its numerous advantages over traditional methods. With redBus, customers can book their bus tickets effortlessly from the comfort of their homes, avoiding the inconvenience of standing in long lines at bus stations or travel agencies. Online bus booking offers the luxury of comparing different bus schedules and operators and presents various discount offers and exclusive deals, resulting in significant savings. Payment security is another notable feature of online booking, which ensures that your financial information is well-protected against fraud. Additionally, customers can pick their seats, providing a customized travel experience. Online bus booking platforms give real-time updates about any changes in the bus timetable, including delays or cancellations, enabling better planning. The convenience doesn't stop here; travellers can even compare onboard amenities like charging points or snacks, further enhancing the travel experience.
        `,
      },
      {
        q: "Do I need to create an account on the redBus site to book bus ticket?",
        a: `
        No, you don’t have to create an account on the redBus site to book bus ticket. But it is advisable to make one to accelerate the process next time you want to book bus tickets. Also, redBus has many discounts and bus booking offers that you can easily access if you have an account with us.
        `,
      },
      {
        q: "Does bus booking online cost me more?",
        a: `
        Not at all! The bus ticket price is the same as you would get from the bus operator/ counter of any bus ticket agency. redbus reduces the travel budget by comparing the bus ticket prices among various operators, making it a more cost-effective choice. Therefore, online bus booking is increasingly recognized as a more convenient, efficient, and economical mode of securing travel arrangements.
        `,
      },
      {
        q: "How can I get the discounts on the bus booking?",
        a: `
        To get a discount on bus booking, please visit https://www.redbus.in/offers and check the available offers. Copy the coupon code and paste it during checkout to avail of the discount.
        `,
      },
      {
        q: "What's New in Bus Booking on redBus?",
        a: `
        Primo Bus Ticket: redBus has launched Primo bus services, where passengers can enjoy travelling in high-rated buses with best-in-class services. While looking for bus tickets on the desired route, customers can check the Primo tag to choose this excellent service. From hygiene standards to on-time service and comfort, passengers can benefit from the online bus booking experience from Primo buses.
        `,
      },
      {
        q: "Can I book a Government bus ticket on redBus?",
        a: `
        Yes, you can book government bus tickets on redBus. redBus has extended its bus booking services to many RTCs in India. Some of these RTCs are Andhra Pradesh State Road Transport Corporation (APSRTC), Assam State Transport Corporation (ASTC), Bihar State Tourism Development Corporation (BSTDC), Himachal Road Transport Corporation (HRTC), Jammu and Kashmir State Road Transport Corporation (JKSRTC), Kerala RTC, Kadamba Transport Corporation (KTCL), Patiala and the East Punjab States Union (PEPSU), Odisha State Road Transport Corporation (OSRTC), Rajasthan State Road Transport Corporation (RSRTC), South Bengal State Transport Corporation (SBSTC), Uttarakhand Transport Corporation (UTC), West Bengal Transport Corporation WBTC (CTC), North Bengal State Transport Corporation (NBSTC), Chandigarh Transport Undertaking (CTU), Gujarat State Road Transport Corporation (GSRTC), Telangana State Road Transport Corporation (TSRTC), Uttar Pradesh State Road Transport Corporation (UPSRTC).
        `,
      },
    ],
    ticketRelated: [
      {
        q: "How can I book bus tickets on redBus?",
        a: `Bus ticket Booking is effortless on redBus. To book the bus tickets, go to the main page and enter your source city and destination city in the “From” and “To” fields, respectively. Enter the travel date and hit the search button. Now, you will see the bus list available on the given bus route. You can use the filter option, such as duration, fare, bus type, etc., to rearrange the list accordingly. This makes it easier for customers to book their bus tickets online with redBus.
        `,
      },
      {
        q: "Can I change the date of my journey after I have booked bus ticket?",
        a: `Yes, you can change the journey date after booking a bus ticket on redBus by clicking the “Reschedule” icon if your travel plan might get interrupted while booking. Bus operators with the “Reschedule icon” next to it offer rescheduling of the bus ticket in case your initially selected date is not viable for travel.
        `,
      },
      {
        q: "Is it mandatory to take a printout of the ticket?",
        a: `It depends on the bus operator you have booked your online bus tickets with. Even mTickets are available on redBus. For operators that support mTickets, the SMS that is sent to your mobile can be produced at the time of boarding and you will be allowed to travel. For operators that do not support m-Tickets, it is a must to take a printout of the e-ticket and produce it at the time of boarding. The e-ticket is sent to the email ID provided at the time of boarding. To know which operators are m-Ticket-enabled, look for the m-Ticket icon under the m-Ticket column while searching for buses.`,
      },
      {
        q: "I've lost my ticket. What should I do now?",
        a: `A copy of the bus ticket would have been sent to you by email when you booked bus ticket online. Please take a printout of that mail and produce it at the time of boarding. If you have not received the ticket e-mail, please call any of our call centers and our executive will resend you a copy by mail.`,
      },
      {
        q: "What is an m-Ticket?",
        a: `An m-Ticket is an SMS that is sent to your mobile on booking bus tickets with select private bus operators. This SMS has the TIN number and the PNR number along with other ticket related information. It can be used to board the bus. Please note that not all operators accept mTickets. To know which operators are m-Ticket enabled, look for the mTicket icon under the mTicket column while searching for buses.`,
      },
      {
        q: "I didn't receive my mTicket. Can you resend it?",
        a: `You can generate your mTicket online. To generate m-Ticket online click on the Print/SMS ticket link on the redbus home page on www.redBus.in. Enter your TIN number mentioned on the e-ticket we emailed you. Choose the SMS option and click on Submit. In case you don't have a copy of the e-ticket either, contact our call center and our executive will assist you.`,
      },
      {
        q: "I entered the wrong mobile number while bus booking. Can I get my m-Ticket on a different number?",
        a: `Yes, you can get the m-Ticket on the different numbers.To get the M-Ticket on the different number please contact redBus call center and our customer executive will send you the mTicket on your desired number.`,
      },
    ],
    paymentRelated: [
      {
        q: "Is it safe to use my credit or debit card to book bus tickets on redBus?",
        a: `Transactions on redBus are very safe. We employ the best-in-class security and the transactions done are secure. Apart from being certified by Verisign, redBus uses Secure Socket Layers (SSL) data encryption. Using SSL ensures that the information exchanged with us is never transmitted unencrypted, thus protecting the information from being viewed by unauthorized individuals.`,
      },
      {
        q: "Does the owner of the credit card/debit card with which the bus ticket is purchased need to be one of the passengers?",
        a: `Not at all! A passenger can use any debit or credit card to pay for the bus ticket, not necessarily their own. However, please note that the passenger in whose name the ticket is booked should carry a proof of his identity (along with the ticket) at the time of boarding the bus.`,
      },
      {
        q: "What are the different payment options available on Bus Ticket booking?",
        a: (
          <ul className="list-disc ps-7">
            <li>
              There are many payment modes available to book buses on the redBus
              website and app. Some of these payment modes that are available
              for the bus ticket booking process are:Debit Card/Credit Card/ATM
              Cards (Visa, MasterCard, Maestro & Rupay)
            </li>
            <li>
              Net Banking (HDFC Bank, ICICI Bank, Indian Bank, Axis Bank, SBI
              and all major banks)
            </li>
            <li>UPI (Google Pay, Amazon Pay, PhonePe)</li>
            <li>Book Now, Pay Later (Simple)</li>
            <li>
              Wallets (Paytm) Make sure to check the coupon code to get the
              discounts on bus booking online, redBus offers a lot of redDeals
              to book the bus ticket on budget.
            </li>
          </ul>
        ),
      },
    ],
    cancellationRefund: [
      {
        q: "Can I cancel my bus ticket online?",
        a: `Yes you can cancel bus tickets online, Most of the tickets can be canceled online. However, there are some bus tickets that can only be canceled through our call center.However please note that the cancellation fee and cancellation period may differ for specific bus services. Please contact any of our executives for cancellation details on any specific service.`,
      },
      {
        q: "How can I cancel a bus ticket online?",
        a: `To cancel the bus ticket online, you need to click on the cancellation link provided on our home page. Enter your ticket number and the e-mail ID that was provided at the time of bus booking and click on cancel ticket.`,
      },
      {
        q: "I missed the bus. Do I get a refund?",
        a: `redBus provides a 100% refund if the bus is missed due to either redBus or its partner company's fault. However, if the bus is missed due to any other reason not directly related to redBus no refund is provided.`,
      },
      {
        q: "How can I get a refund in case I cancel a bus ticket?",
        a: `The refund is provided as per the cancellation policy of the operator. The refund can be credited to the source of payment (Example: debit card, credit card, net banking) or credited to redBus wallet. Wallet credit can be used for bus booking in future (within 6 months of cancellation).`,
      },
      {
        q: "What happens if the bus does not leave on time or is canceled?",
        a: `If your bus does not leave on time or is canceled, in such situations, you will need to consult the counter of the respective bus operators. You can also call the redBus customer care to discuss the appropriate actions.`,
      },
      {
        q: "How can I reschedule my bus tickets?",
        a: `To reschedule your bus ticket on redBus, follow these steps: Visit https://www.redbus.in/reschedule
        Search for your bus ticket by entering your ticket number and registered email ID. 
        Verify your online bus ticket details and select the date to reschedule your journey. 
        Select a bus operator, verify every detail, and make your payment if any difference in bus ticket prices needs to be cleared.`,
      },
    ],
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col justify-between">
        {/* Home page hero section Carousel */}
        <div
          className="relative hidden md:block !overflow-hidden"
          ref={heroCarouselRef}
        >
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
            <div className="min-w-full">
              <Image
                src={carousle_img_4}
                alt="Carousel image 1"
                className="h-[280px]"
              />
            </div>
            <div className="min-w-full">
              <Image
                src={carousle_img_5}
                alt="Carousel image 1"
                className="h-[280px]"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={heroCarouselRefScrollPrev}
            className="absolute top-1/2 -translate-y-1/2 left-5 p-2 rounded-full bg-white/50 hover:bg-white cursor-pointer"
          >
            <GrPrevious className="text-2xl" />
          </button>
          <button
            type="button"
            onClick={heroCarouselRefScrollNext}
            className="absolute top-1/2 -translate-y-1/2 right-5 p-2 rounded-full bg-white/50 hover:bg-white cursor-pointer"
          >
            <GrNext className="text-2xl" />
          </button>
        </div>

        {/* Bus search function */}
        <motion.form
          initial={{
            y: 100,
            opacity: 0,
          }}
          whileInView={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.6,
          }}
          viewport={{ once: true }}
          className="md:mx-8 lg:mx-[75px] md:mt-7 mb-7 md:mb-14 bg-white rounded-3xl md:shadow-[0_0_16px_rgba(0,0,0,0.3)]"
          // onClick={(e) => {
          //   const eleCoord = e.currentTarget.getBoundingClientRect();
          //   scrollBy({
          //     top: eleCoord.top - 100,
          //     behavior: "smooth",
          //   });
          // }}
          ref={busSearchBox}
          onSubmit={handleSubmit(onSearchBuses)}
        >
          <p className="md:hidden px-4 pt-5 font-bold text-[22px]">
            Bus Tickets
          </p>
          <div className="p-4 pb-0 flex flex-col xl:flex-row gap-4 xl:gap-2">
            <div className="w-full xl:w-[78%] flex flex-col lg:flex-row">
              <div className="w-full lg:w-3/5 flex flex-col md:flex-row">
                {/* Source place */}
                <div className="relative w-full md:w-1/2">
                  <button
                    type="button"
                    className="w-full p-2.5 md:p-3.5 border border-b-0 lg:border-b-[1px] rounded-se-2xl md:rounded-se-none rounded-ss-2xl lg:rounded-s-2xl border-slate-400 flex items-center gap-x-2 cursor-pointer outline-none"
                    onClick={(e) => {
                      if (busSearchBox.current) {
                        const eleCoord =
                          busSearchBox.current.getBoundingClientRect();
                        scrollBy({
                          top: eleCoord.top - 100,
                          behavior: "instant",
                        });
                      }

                      if (windowSize > 768) openFormPopover(e);
                      else setFromPlaceDialog(true);
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

                  {windowSize > 768 && (
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
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  if (e.target.value) {
                                    let filtered: string[] =
                                      boardingPoints.filter((city) =>
                                        city
                                          .toLowerCase()
                                          .includes(
                                            e.target.value.toLowerCase()
                                          )
                                      );
                                    setFilteredBrdPoints(filtered);
                                  } else {
                                    setFilteredBrdPoints(boardingPoints);
                                  }
                                }}
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
                              {filteredBrdPoints &&
                                filteredBrdPoints.length > 0 &&
                                filteredBrdPoints.map((bpc) => (
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

                              {filteredBrdPoints &&
                                filteredBrdPoints.length <= 0 && (
                                  <li>
                                    <p className="font-semibold text-center text-red-500 p-4">
                                      no city name found
                                    </p>
                                  </li>
                                )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Popover>
                  )}

                  {windowSize <= 768 && (
                    <Dialog
                      fullScreen
                      open={fromPlaceDialog}
                      onClose={closeFromDialog}
                    >
                      <div className="w-full h-full hideScrollBar overflow-y-scroll">
                        <div className="relative !bg-slate-200/50 flex flex-col gap-y-2">
                          <div className="sticky top-0 shadow-md left-0 right-0 p-4 bg-white flex items-center gap-x-2">
                            <HailOutlinedIcon sx={{ fontSize: 30 }} />
                            <div className="relative flex-1">
                              <p className="text-left text-xs text-gray-500">
                                From
                              </p>
                              <input
                                type="text"
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  if (e.target.value) {
                                    let filtered: string[] =
                                      boardingPoints.filter((city) =>
                                        city
                                          .toLowerCase()
                                          .includes(
                                            e.target.value.toLowerCase()
                                          )
                                      );
                                    console.log("filtered: ", filtered);
                                    setFilteredBrdPoints(filtered);
                                  } else {
                                    setFilteredBrdPoints(boardingPoints);
                                  }
                                }}
                                className="text-left font-bold outline-none"
                                placeholder="Enter Boarding point"
                              />
                              <button
                                type="button"
                                className="absolute z-10 top-1/2 -translate-y-1/2 right-4 rounded-s-full rounded-e-full px-3 py-2 bg-slate-200 hover:bg-slate-300"
                                onClick={() => setFromPlaceDialog(false)}
                              >
                                <IoMdClose className="text-2xl" />
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-col !bg-white p-4">
                            <p className="font-semibold">Recent Searches</p>
                          </div>

                          <div className="!bg-white">
                            <p className="font-semibold p-4">Popular cities</p>
                            <ul className="flex flex-col ">
                              {filteredBrdPoints &&
                                filteredBrdPoints.length > 0 &&
                                filteredBrdPoints.map((bpc) => (
                                  <li key={`boardingPoint-${bpc}`}>
                                    <button
                                      type="button"
                                      className="p-4 w-full h-full text-left hover:bg-[#fed9d5] border-b border-b-slate-200 cursor-pointer"
                                      onClick={() => {
                                        setValue("boardingPoint", bpc);
                                        if (bpc) clearErrors("boardingPoint");
                                        closeFromDialog();
                                      }}
                                    >
                                      {bpc}
                                    </button>
                                  </li>
                                ))}

                              {filteredBrdPoints &&
                                filteredBrdPoints.length <= 0 && (
                                  <li>
                                    <p className="font-semibold text-center text-red-500 p-4">
                                      no city name found
                                    </p>
                                  </li>
                                )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Dialog>
                  )}
                </div>

                {/* Destination place */}
                <div className="relative w-full md:w-1/2">
                  <button
                    type="button"
                    className="w-full p-2.5 md:p-3.5 border-s md:border-s-0 border-e lg:border-e-0 border-t border-b-none lg:border-b md:rounded-se-2xl lg:rounded-se-none border-slate-400 flex items-center gap-x-2 cursor-pointer outline-none"
                    onClick={(e) => {
                      if (busSearchBox.current) {
                        const eleCoord =
                          busSearchBox.current.getBoundingClientRect();
                        scrollBy({
                          top: eleCoord.top - 100,
                          behavior: "instant",
                        });
                      }
                      if (windowSize > 768) openDestPopover(e);
                      else setDestPlaceDialog(true);
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

                  {windowSize > 768 && (
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
                              <p className="text-left text-xs text-gray-500">
                                To
                              </p>
                              <input
                                type="text"
                                {...register("destinationPoint")}
                                ref={destPlacePopInput}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  if (e.target.value) {
                                    let filtered: string[] =
                                      boardingPoints.filter((city) =>
                                        city
                                          .toLowerCase()
                                          .includes(
                                            e.target.value.toLowerCase()
                                          )
                                      );
                                    setFilteredDestPoints(filtered);
                                  } else {
                                    setFilteredDestPoints(boardingPoints);
                                  }
                                }}
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
                              {filteredDestPoints &&
                                filteredDestPoints.length > 0 &&
                                filteredDestPoints.map((bpc) => (
                                  <li key={`boardingPoint-${bpc}`}>
                                    <button
                                      type="button"
                                      className="p-4 w-full h-full text-left hover:bg-[#fed9d5] border-b border-b-slate-200 cursor-pointer"
                                      onClick={() => {
                                        setValue("destinationPoint", bpc);
                                        if (bpc)
                                          clearErrors("destinationPoint");
                                        closeDestPopover();
                                      }}
                                    >
                                      {bpc}
                                    </button>
                                  </li>
                                ))}

                              {filteredDestPoints &&
                                filteredDestPoints.length <= 0 && (
                                  <li>
                                    <p className="font-semibold text-center text-red-500 p-4">
                                      no city name found
                                    </p>
                                  </li>
                                )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Popover>
                  )}

                  {windowSize <= 768 && (
                    <Dialog
                      fullScreen
                      open={destPlaceDialog}
                      onClose={closeDestDialog}
                    >
                      <div className="w-full h-full hideScrollBar overflow-y-scroll">
                        <div className="relative !bg-slate-200/50 flex flex-col gap-y-2">
                          <div className="sticky top-0 shadow-md left-0 right-0 p-4 bg-white flex items-center gap-x-2">
                            <HailOutlinedIcon sx={{ fontSize: 30 }} />
                            <div>
                              <p className="text-left text-xs text-gray-500">
                                To
                              </p>
                              <input
                                type="text"
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  if (e.target.value) {
                                    let filtered: string[] =
                                      boardingPoints.filter((city) =>
                                        city
                                          .toLowerCase()
                                          .includes(
                                            e.target.value.toLowerCase()
                                          )
                                      );
                                    setFilteredDestPoints(filtered);
                                  } else {
                                    setFilteredDestPoints(boardingPoints);
                                  }
                                }}
                                className="text-left font-bold outline-none"
                                placeholder="Enter Destination point"
                              />
                            </div>
                            <button
                              type="button"
                              className="absolute z-10 top-1/2 -translate-y-1/2 right-4 rounded-s-full rounded-e-full px-3 py-2 bg-slate-200 hover:bg-slate-300"
                              onClick={closeDestDialog}
                            >
                              <IoMdClose className="text-2xl" />
                            </button>
                          </div>

                          <div className="flex flex-col !bg-white p-4">
                            <p className="font-semibold">Recent Searches</p>
                          </div>

                          <div className="!bg-white">
                            <p className="font-semibold p-4">Popular cities</p>
                            <ul className="flex flex-col ">
                              {filteredDestPoints &&
                                filteredDestPoints.length > 0 &&
                                filteredDestPoints.map((bpc) => (
                                  <li key={`boardingPoint-${bpc}`}>
                                    <button
                                      type="button"
                                      className="p-4 w-full h-full text-left hover:bg-[#fed9d5] border-b border-b-slate-200 cursor-pointer"
                                      onClick={() => {
                                        setValue("destinationPoint", bpc);
                                        if (bpc)
                                          clearErrors("destinationPoint");
                                        setDestPlaceDialog(false);
                                      }}
                                    >
                                      {bpc}
                                    </button>
                                  </li>
                                ))}

                              {filteredDestPoints &&
                                filteredDestPoints.length <= 0 && (
                                  <li>
                                    <p className="font-semibold text-center text-red-500 p-4">
                                      no city name found
                                    </p>
                                  </li>
                                )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Dialog>
                  )}
                </div>
              </div>

              {/* Date Picker */}
              <div className="relative w-full lg:w-2/5">
                <button
                  type="button"
                  className="w-full p-2.5 md:p-3.5 border rounded-es-2xl lg:rounded-es-none rounded-ee-2xl lg:rounded-e-2xl border-slate-400 flex justify-between gap-x-1.5 items-center cursor-pointer outline-none"
                  onClick={(event: React.MouseEvent<HTMLElement>) => {
                    if (busSearchBox.current) {
                      const eleCoord =
                        busSearchBox.current.getBoundingClientRect();
                      scrollBy({
                        top: eleCoord.top - 100,
                        behavior: "instant",
                      });
                    }

                    if (windowSize > 768) openJourneyDatePopover(event);
                    else setJourneyDate(true);
                  }}
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

                {windowSize > 768 && (
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
                          width: 350,
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
                )}

                {windowSize <= 768 && (
                  <Drawer
                    anchor="bottom"
                    open={journeyDate}
                    onClose={() => setJourneyDate(false)}
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
                        onClick={() => setJourneyDate(false)}
                      >
                        <IoMdClose className="text-2xl" />
                      </button>
                    </div>

                    <div className="flex-1">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar
                          defaultValue={dayjs(new Date())}
                          value={dayjs(jDate)}
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
                          onChange={(date) => {
                            if (date) setValue("journeyDate", date.toDate());
                            setJourneyDate(false);
                          }}
                        />
                      </LocalizationProvider>
                    </div>
                  </Drawer>
                )}
              </div>
            </div>

            {/* Women booking */}
            <label className="relative p-2.5 md:p-3.5 pe-0! w-full xl:w-[22%] flex justify-between items-center border rounded-2xl border-slate-400">
              <div className="flex items-center gap-3">
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
                    className="inline-block text-left text-xs font-semibold text-blue-600 underline"
                  >
                    Know more
                  </Link>
                </div>
              </div>

              <Controller
                name="isWomen"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Switch color="primary" checked={value} onChange={onChange} />
                )}
              />
            </label>
          </div>

          {/* Submit button */}
          <div className="flex justify-center md:translate-y-1/2">
            <button
              type="submit"
              className={`p-3 m-4 md:m-0 rounded-s-full rounded-e-full min-w-[300px] w-full md:w-1/4
              bg-primary text-white font-semibold flex items-center justify-center gap-x-2 cursor-pointer outline-none`}
            >
              {loading ? (
                <CircularProgress
                  size={25}
                  sx={{
                    "&.MuiCircularProgress-root": {
                      color: "white",
                    },
                  }}
                />
              ) : (
                <FiSearch className="text-2xl" />
              )}
              <span>Search buses</span>
            </button>
          </div>
        </motion.form>
      </div>

      {/* GSRTC Growing Numbers */}
      <motion.div
        initial={{
          y: 100,
          opacity: 0,
        }}
        whileInView={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.6,
        }}
        viewport={{ once: true }}
        className="myContainer mb-7"
      >
        <p className="font-bold text-[22px] mb-5">GSRTC Growing Numbers</p>

        {/* Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:grid-rows-2 lg:grid-rows-1 gap-5 p-2">
          {growingNumbers &&
            growingNumbers.length > 0 &&
            growingNumbers.map((card, inx) => (
              <a
                key={`growingNumCard-${inx}`}
                href={card.link}
                target="_blank"
                className="hover:-translate-y-2 duration-200"
              >
                <div
                  className="w-full h-full flex flex-col justify-center gap-y-4 p-4 rounded-lg shadow-lg"
                  style={{ backgroundImage: card.backgroundImg }}
                >
                  <div className="flex justify-center">{card.icon}</div>
                  <p className="text-center text-white text-lg">{card.title}</p>
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
      </motion.div>

      {/* Top Destination */}
      <motion.div
        initial={{
          y: 100,
          opacity: 0,
        }}
        whileInView={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.6,
        }}
        viewport={{ once: true }}
        className="myContainer mb-7"
      >
        <p className="font-bold text-[22px] mb-5">Top destinations</p>

        {/* Top destination carousel */}
        <div className="relative !overflow-hidden" ref={topDestinationCarousel}>
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
          <button
            type="button"
            onClick={topDestinationCarouselScrollPrev}
            className="absolute top-1/2 -translate-y-1/2 left-5 p-2 rounded-full bg-white/50 hover:bg-white cursor-pointer"
          >
            <GrPrevious className="text-lg sm:text-xl md:text-2xl" />
          </button>
          <button
            type="button"
            onClick={topDestinationCarouselScrollNext}
            className="absolute top-1/2 -translate-y-1/2 right-5 p-2 rounded-full bg-white/50 hover:bg-white cursor-pointer"
          >
            <GrNext className="text-lg sm:text-xl md:text-2xl" />
          </button>
        </div>
      </motion.div>

      {/* Offer For you section */}
      <motion.div
        initial={{
          y: 100,
          opacity: 0,
        }}
        whileInView={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.6,
        }}
        viewport={{ once: true }}
        className="myContainer mb-7"
      >
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
        <div className="relative !overflow-hidden" ref={offersCarouselRef}>
          <div className="flex py-2">
            {offers &&
              offers.map((ofr, inx) => (
                <a
                  href="#"
                  key={`offer-${inx}`}
                  className="ms-2 relative shadow-md rounded-2xl"
                >
                  <Image
                    src={ofr.bgImage}
                    alt="Bus Offer Photo"
                    className="min-w-[300px] min-h-[200px] rounded-2xl"
                  />
                  <div className="absolute inset-0 w-full h-full px-4 py-7 flex flex-col justify-between rounded-2xl">
                    <div>
                      <p className="font-semibold mb-3">{ofr.title}</p>
                      <p className="text-xs text-black/70">
                        Valid till {DateFormater(ofr.validTill)}
                      </p>
                    </div>

                    <div>
                      <button
                        type="button"
                        className=" bg-white py-2 px-3 flex items-center gap-2 rounded-s-full rounded-e-full"
                      >
                        <MdOutlineLocalOffer className="text-2xl" />
                        <span className="font-semibold text-sm">
                          {ofr.offerCode}
                        </span>
                      </button>
                    </div>
                  </div>
                </a>
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
      </motion.div>

      {/* What's new section */}
      <motion.div
        initial={{
          y: 100,
          opacity: 0,
        }}
        whileInView={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.6,
        }}
        viewport={{ once: true }}
        className="myContainer mb-7"
      >
        <p className="font-bold text-[22px] mb-5">What&apos;s new</p>

        {/* What's new Carousel */}
        <div className="relative !overflow-hidden" ref={whatNewCarouselRef}>
          <div className="flex py-2">
            {whatsNew &&
              whatsNew.map((wn, inx) => (
                <a href="#" key={`offer-${inx}`} className="ps-2">
                  <Image
                    src={wn}
                    alt="bus_whats_new"
                    className="min-w-[300px] min-h-[200px] rounded-[20px] shadow-md"
                  />
                </a>
              ))}
          </div>
          <button
            type="button"
            onClick={whatNewCarouselScrollPrev}
            className="absolute top-1/2 -translate-y-1/2 left-5 p-2 rounded-full bg-white/50 hover:bg-white cursor-pointer"
          >
            <GrPrevious className="text-lg sm:text-xl md:text-2xl" />
          </button>
          <button
            type="button"
            onClick={whatNewCarouselScrollNext}
            className="absolute top-1/2 -translate-y-1/2 right-5 p-2 rounded-full bg-white/50 hover:bg-white cursor-pointer"
          >
            <GrNext className="text-lg sm:text-xl md:text-2xl" />
          </button>
        </div>
      </motion.div>

      {/* Testimonials */}
      <motion.div
        initial={{
          y: 100,
          opacity: 0,
        }}
        whileInView={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.6,
        }}
        viewport={{ once: true }}
        className="myContainer mb-7"
      >
        <p className="font-bold text-[22px]">Testimonials</p>
        <p className="text-xs text-[#1d1d1da3] mb-5">
          Hear from our satisfied customers
        </p>

        {/* Testimonials Carousel */}
        <div
          className="relative !overflow-hidden"
          ref={testimonialsCarouselRef}
        >
          <div className="flex">
            {testimonials &&
              testimonials.map((tsmn, inx) => (
                <a
                  href="#"
                  key={`offer-${inx}`}
                  className="ms-2 min-w-[250px] min-h-[180px] px-4 py-7 border border-slate-300 shadow-md rounded-xl flex flex-col justify-between"
                >
                  <p className="">
                    "&nbsp;{tsmn.text.substring(0, 50)}...&nbsp;"
                  </p>

                  <p className="font-semibold text-sm">{tsmn.cusName}</p>
                </a>
              ))}
          </div>
          <button
            type="button"
            onClick={testimonialsCarouselScrollPrev}
            className="absolute top-1/2 -translate-y-1/2 left-5 p-2 rounded-full bg-white/50 hover:bg-white cursor-pointer"
          >
            <GrPrevious className="text-lg sm:text-xl md:text-2xl" />
          </button>
          <button
            type="button"
            onClick={testimonialsCarouselScrollNext}
            className="absolute top-1/2 -translate-y-1/2 right-5 p-2 rounded-full bg-white/50 hover:bg-white cursor-pointer"
          >
            <GrNext className="text-lg sm:text-xl md:text-2xl" />
          </button>
        </div>
      </motion.div>

      {/* Dowbload GSRTC App */}
      <motion.div
        initial={{
          y: 100,
          opacity: 0,
        }}
        whileInView={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.6,
        }}
        viewport={{ once: true }}
        className="myContainer mb-7"
      >
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
      </motion.div>

      {/* GSRTC Information*/}
      <motion.div
        initial={{
          y: 100,
          opacity: 0,
        }}
        whileInView={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.6,
        }}
        viewport={{ once: true }}
        className="myContainer py-7"
      >
        <p className="font-bold text-[22px] mb-5">
          GSRTC: India's Leading Online Bus Booking Ticket Booking Platform
        </p>
        <p className="mb-4 text-sm">
          Gujarat State Road Transport Corporation (GSRTC) is a passenger
          transport organisation providing bus services both within Gujarat and
          neighbouring states.
        </p>
        <p className="text-sm">
          GSRTC came into existence on 1st May, 1960 on formation of Gujarat.
          From a modest begining of 7 divisions, 76 depots and 7 divisional
          workshops and a fleet of 1,767 buses it has gone to,
        </p>
        <ul className="list-disc ps-12 text-sm py-4">
          <li>16 Divisions</li>
          <li>125 Depots</li>
          <li>226 bus stations</li>
          <li>1,554 pick up stands</li>
          <li>8,322 buses</li>
        </ul>
        <p className="text-sm">
          This remarkable growth is an outcome of unflagging effort of more than
          39,795 workforce, dynamic management and sustained support from the
          state govt. It has built up formidable technical facilities.
        </p>
      </motion.div>

      {/* How to book ticket */}
      <motion.div
        initial={{
          y: 100,
          opacity: 0,
        }}
        whileInView={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.6,
        }}
        viewport={{ once: true }}
        className="myContainer py-7"
      >
        <p className="font-bold text-[22px] mb-4">
          How to Book Bus Tickets Online on GSRTC?
        </p>

        <p className="text-sm">
          Below are some simple steps that you can follow when booking train or
          bus tickets online on GSRTC.
        </p>

        <ul className="list-disc ps-12 text-sm py-4 flex flex-col gap-3">
          <li>
            <b>Step 1:</b> Visit the GSRTC website or app.
          </li>
          <li>
            <b>Step 2:</b> Select your travel date and journey details.
          </li>
          <li>
            <b>Step 3:</b> Search for your preferred bus available on your
            chosen travel date and route.
          </li>
          <li>
            <b>Step 4:</b> Select your preferred boarding or dropping points and
            enter your contact details.
          </li>
          <li>
            <b>Step 5:</b> Choose from multiple payment options to proceed with
            the payment process.
          </li>
          <li>
            <b>Step 6:</b> After the successful payment, you will receive a
            confirmation of your train or bus bookings on your registered email
            ID or mobile number.
          </li>
        </ul>
      </motion.div>

      {/* FAQs */}
      <motion.div
        initial={{
          y: 100,
          opacity: 0,
        }}
        whileInView={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.6,
        }}
        viewport={{ once: true }}
        className="myContainer py-7"
      >
        <p className="font-bold text-[22px] mb-4">
          FAQs related to Bus Tickets Booking
        </p>

        {/* Tabs */}
        <div>
          <Tabs
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            value={faqActiveTab}
            onChange={handleFAQTabs}
            aria-label="FAQs Tabs"
            sx={{
              "&.MuiTabs-root": {
                borderBottom: "1px solid #cad5e2",
              },
              "& .MuiTabs-list": {
                gap: "24px",
              },
              "& .MuiTab-root": {
                fontWeight: 600,
                paddingLeft: 0,
                paddingRight: 0,
              },
              "& .Mui-selected": {
                color: "#173c62 !important",
              },
              "& .MuiTabs-indicator": {
                height: "3px",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                backgroundColor: "#173c62",
              },
            }}
          >
            <Tab label="General" />
            <Tab label="Ticket-related" />
            <Tab label="Payment" />
            <Tab label="Cancellation & Refund" />
          </Tabs>
        </div>

        {/* Tab content */}
        <div>
          {faqActiveTab === 0 && (
            <ul>
              {FAQs.general &&
                FAQs.general.map((que, inx) => (
                  <li key={`Genera-FAQs-${inx}`}>
                    <Accordion
                      sx={{
                        "&.MuiAccordion-root": {
                          boxShadow: "none",
                          borderBottom: "1px solid #cad5e2",
                          borderRadius: 0,
                        },
                        "& .MuiAccordionSummary-root": {
                          minHeight: "48px !important",
                          fontWeight: 600,
                        },
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        className="text-semibold"
                      >
                        {que.q}
                      </AccordionSummary>
                      <AccordionDetails className="text-sm">
                        {que.a}
                      </AccordionDetails>
                    </Accordion>
                  </li>
                ))}
            </ul>
          )}
          {faqActiveTab === 1 && (
            <ul>
              {FAQs.ticketRelated &&
                FAQs.ticketRelated.map((que, inx) => (
                  <li key={`Genera-FAQs-${inx}`}>
                    <Accordion
                      sx={{
                        "&.MuiAccordion-root": {
                          boxShadow: "none",
                          borderBottom: "1px solid #cad5e2",
                          borderRadius: 0,
                        },
                        "& .MuiAccordionSummary-root": {
                          minHeight: "48px !important",
                          fontWeight: 600,
                        },
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        className="text-semibold"
                      >
                        {que.q}
                      </AccordionSummary>
                      <AccordionDetails className="text-sm">
                        {que.a}
                      </AccordionDetails>
                    </Accordion>
                  </li>
                ))}
            </ul>
          )}
          {faqActiveTab === 2 && (
            <ul>
              {FAQs.paymentRelated &&
                FAQs.paymentRelated.map((que, inx) => (
                  <li key={`Genera-FAQs-${inx}`}>
                    <Accordion
                      sx={{
                        "&.MuiAccordion-root": {
                          boxShadow: "none",
                          borderBottom: "1px solid #cad5e2",
                          borderRadius: 0,
                        },
                        "& .MuiAccordionSummary-root": {
                          minHeight: "48px !important",
                          fontWeight: 600,
                        },
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        className="text-semibold"
                      >
                        {que.q}
                      </AccordionSummary>
                      <AccordionDetails className="text-sm">
                        {que.a}
                      </AccordionDetails>
                    </Accordion>
                  </li>
                ))}
            </ul>
          )}
          {faqActiveTab === 3 && (
            <ul>
              {FAQs.cancellationRefund &&
                FAQs.cancellationRefund.map((que, inx) => (
                  <li key={`Genera-FAQs-${inx}`}>
                    <Accordion
                      sx={{
                        "&.MuiAccordion-root": {
                          boxShadow: "none",
                          borderBottom: "1px solid #cad5e2",
                          borderRadius: 0,
                        },
                        "& .MuiAccordionSummary-root": {
                          minHeight: "48px !important",
                          fontWeight: 600,
                        },
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        className="text-semibold"
                      >
                        {que.q}
                      </AccordionSummary>
                      <AccordionDetails className="text-sm">
                        {que.a}
                      </AccordionDetails>
                    </Accordion>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </motion.div>
    </div>
  );
}
