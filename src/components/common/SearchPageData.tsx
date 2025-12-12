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
import { ReactNode } from "react";

//Boarding points List
export const boardingPoints: string[] = [
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

export interface FilterContentType {
  filterId: string;
  icon?: ReactNode;
  content: ReactNode;
}

export interface FilterType {
  title: string;
  contentsList: FilterContentType[];
  isSearchable?: boolean;
}

export const filterList: FilterType[] = [
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
      },
    ],
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
      },
    ],
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
      },
      {
        filterId: "busType_NON_AC",
        icon: <MdOutlineNoBackpack className="text-xl" />,
        content: (
          <div>
            <p className="font-medium">NON-AC</p>
          </div>
        ),
      },
      {
        filterId: "busType_Seater",
        icon: <MdOutlineAirlineSeatReclineExtra className="text-xl" />,
        content: (
          <div>
            <p className="font-medium">SEATER</p>
          </div>
        ),
      },
      {
        filterId: "busType_Sleeper",
        icon: <MdOutlineBed className="text-xl" />,
        content: (
          <div>
            <p className="font-medium">SLEEPER</p>
          </div>
        ),
      },
    ],
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
      },
    ],
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
      },
      {
        filterId: "busFeatures_highRatedBuses",
        icon: <RiBusWifiLine className="text-xl" />,
        content: (
          <div>
            <p className="font-medium">High Rated Buses</p>
          </div>
        ),
      },
      {
        filterId: "busFeatures_deals",
        icon: <MdOutlineLocalOffer className="text-xl" />,
        content: (
          <div>
            <p className="font-medium">Deals</p>
          </div>
        ),
      },
      {
        filterId: "busFeatures_primoBus",
        icon: <FaRegStar className="text-xl" />,
        content: (
          <div>
            <p className="font-medium">Primo Bus</p>
          </div>
        ),
      },
      {
        filterId: "busFeatures_freeCancellation",
        icon: <FiCheckCircle className="text-xl" />,
        content: (
          <div>
            <p className="font-medium">Free Cancellation</p>
          </div>
        ),
      },
      {
        filterId: "busFeatures_volvoBuses",
        icon: <FiCheckCircle className="text-xl" />,
        content: (
          <div>
            <p className="font-medium">Volvo Buses</p>
          </div>
        ),
      },
    ],
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
      },
      {
        filterId: "busOperator_MHSRTC",
        icon: null,
        content: (
          <div>
            <p className="font-medium">MHSRTC</p>
          </div>
        ),
      },
      {
        filterId: "busOperator_RSRTC",
        icon: null,
        content: (
          <div>
            <p className="font-medium">RSRTC</p>
          </div>
        ),
      },
      {
        filterId: "busOperator_MPSRTC",
        icon: null,
        content: (
          <div>
            <p className="font-medium">MPSRTC</p>
          </div>
        ),
      },
    ],
    isSearchable: true,
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
      },
      {
        filterId: "amenities_blanket",
        icon: <BiBlanket className="text-xl" />,
        content: (
          <div>
            <p className="font-medium">Blanket</p>
          </div>
        ),
      },
      {
        filterId: "amenities_chargingPoint",
        icon: <PiPlugCharging className="text-xl" />,
        content: (
          <div>
            <p className="font-medium">Charging Point</p>
          </div>
        ),
      },
      {
        filterId: "amenitie_toilet",
        icon: <LiaRestroomSolid className="text-xl" />,
        content: (
          <div>
            <p className="font-medium">Toilet</p>
          </div>
        ),
      },
    ],
    isSearchable: true,
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
      },
      {
        filterId: "specialBusFeature_highlyRatedByWomen",
        icon: null,
        content: (
          <div>
            <p className="font-medium">Highly rated by women</p>
          </div>
        ),
      },
      {
        filterId: "specialBusFeature_womenTravelling",
        icon: null,
        content: (
          <div>
            <p className="font-medium">Women Travelling</p>
          </div>
        ),
      },
    ],
  },
];

// export const tagsList: {
//   name: string;
//   icon: React.ReactNode;
//   title: string;
// }[] = [
//   {
//     name: "primoBus",
//     icon: <FaRegStar className="text-xl" />,
//     title: "Primo Bus",
//   },
//   {
//     name: "ac",
//     icon: <TbAirConditioning className="text-xl" />,
//     title: "AC",
//   },
//   {
//     name: "sleeper",
//     icon: <MdOutlineBed className="text-xl" />,
//     title: "SLEEPER",
//   },
//   {
//     name: "singleSeat",
//     icon: <TbArmchair className="text-xl" />,
//     title: "Single Seats",
//   },
//   {
//     name: "seater",
//     icon: <MdOutlineAirlineSeatReclineExtra className="text-xl" />,
//     title: "SEATER",
//   },
//   {
//     name: "non_ac",
//     icon: <MdOutlineNoBackpack className="text-xl" />,
//     title: "NON AC",
//   },
//   {
//     name: "earlyMorning",
//     icon: <FiSunrise className="text-xl" />,
//     title: "06:00-12:00",
//   },
//   {
//     name: "evening",
//     icon: <FiSunset className="text-xl" />,
//     title: "18:00-24:00",
//   },
//   {
//     name: "highRatedBuses",
//     icon: <RiBusWifiLine className="text-xl" />,
//     title: "High Rated Buses",
//   },
//   {
//     name: "livaTracking",
//     icon: <FaMapLocationDot className="text-xl" />,
//     title: "Live Tracking",
//   },
// ];

export const tagsList = [
  {
    filterId: "busFeatures_primoBus",
    icon: <FaRegStar className="text-xl" />,
    title: "Primo Bus",
  },
  {
    filterId: "busType_AC",
    icon: <TbAirConditioning className="text-xl" />,
    title: "AC",
  },
  {
    filterId: "busType_Sleeper",
    icon: <MdOutlineBed className="text-xl" />,
    title: "SLEEPER",
  },
  {
    filterId: "singleWindowSeaterOrSleeper",
    icon: <TbArmchair className="text-xl" />,
    title: "Single Seats",
  },
  {
    filterId: "busType_Seater",
    icon: <MdOutlineAirlineSeatReclineExtra className="text-xl" />,
    title: "SEATER",
  },
  {
    filterId: "busType_NON_AC",
    icon: <MdOutlineNoBackpack className="text-xl" />,
    title: "NON-AC",
  },
  {
    filterId: "evening_18_to_24",
    icon: <FiSunset className="text-xl" />,
    title: "18:00-24:00",
  },
  {
    filterId: "busFeatures_highRatedBuses",
    icon: <RiBusWifiLine className="text-xl" />,
    title: "High Rated Buses",
  },
  {
    filterId: "busFeatures_liveTracking",
    icon: <FaMapLocationDot className="text-xl" />,
    title: "Live Tracking",
  },
];
