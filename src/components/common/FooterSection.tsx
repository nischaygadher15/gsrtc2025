"use client";
import React, { ReactNode } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import Image from "next/image";
import navbarLogo from "@/assets/images/Logos/gsrtcLogo2.svg";
import { DiAndroid } from "react-icons/di";
import { FaApple, FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import useWindowSize from "@/Hooks/useWindowSize";

const FooterSection = () => {
  const currentLocation = usePathname();
  const windowSize = useWindowSize();

  const popRotesList: string[] = [
    "Delhi To Manali Bus",
    "Delhi To Rishikesh Bus",
    "Delhi To Shimla Bus",
    "Delhi To Nainital Bus",
    "Delhi To Katra Bus",
    "Bangalore To Goa Bus",
    "Bangalore To Hyderabad Bus",
    "Bangalore To Tirupathi Bus",
    "Bangalore To Chennai Bus",
    "Bangalore To Pondicherry Bus",
    "Hyderabad To Bangalore Bus",
    "Hyderabad To Goa Bus",
    "Hyderabad To Srisailam Bus",
    "Hyderabad To Vijayawada Bus",
    "Hyderabad To Tirupathi Bus",
    "Pune To Goa Bus",
    "Pune To Mumbai Bus",
    "Pune To Nagpur Bus",
    "Pune To Kolhapur Bus",
    "Pune To Nashik Bus",
    "Mumbai To Goa Bus",
    "Mumbai To Pune Bus",
    "Mumbai To Shirdi Bus",
    "Mumbai To Mahabaleshwar Bus",
    "Mumbai To Kolhapur Bus",
    "Kolkata To Digha Bus",
    "Kolkata To Siliguri Bus",
    "Kolkata To Puri Bus",
    "Kolkata To Bakkhali Bus",
    "Kolkata To Mandarmani Bus",
    "Chennai To Bangalore Bus",
    "Chennai To Pondicherry Bus",
    "Chennai To Coimbatore Bus",
    "Chennai To Madurai Bus",
    "Chennai To Tirupathi Bus",
    "Chandigarh To Manali Bus",
    "Chandigarh To Shimla Bus",
    "Chandigarh To Delhi Bus",
    "Chandigarh To Dehradun Bus",
    "Chandigarh To Amritsar Bus",
    "Coimbatore To Chennai Bus",
    "Coimbatore To Bangalore Bus",
    "Coimbatore To Ooty Bus",
    "Coimbatore To Tiruchendur Bus",
    "Coimbatore To Madurai Bus",
    "Agra to Bareilly Bus",
    "Hisar to Chandigarh Bus",
    "Ayodhya to Varanasi",
    "Lucknow to Ballia Bus",
    "Lucknow to Moradabad Bus",
    "Rajkot to Dwarka Bus",
    "Siliguri to Gangtok Bus",
    "Ahmedabad to Goa Bus",
    "Ahmedabad to Kanpur Bus",
    "Akola to Pune Bus",
    "Delhi to Dehradun Bus",
    "Delhi to Haridwar Bus",
    "Dehradun to Delhi Bus",
    "Delhi to Agra Bus",
    "Delhi to Varanasi Bus",
  ];

  const popCitiesList: string[] = [
    "Hyderabad Bus Booking",
    "Bangalore Bus Booking",
    "Chennai Bus Booking",
    "Pune Bus Booking",
    "Delhi Bus Booking",
    "Mumbai Bus Booking",
    "Kolkata Bus Booking",
    "Ernakulam Bus Booking",
    "Ahmedabad Bus Booking",
    "Vijayawada Bus Booking",
    "Jaipur Bus Booking",
    "Indore Bus Booking",
    "Lucknow Bus Booking",
    "Bhopal Bus Booking",
    "Goa Bus Booking",
    "Ayodhya Bus Booking",
    "Prayagraj Bus Booking",
    "Varanasi Bus Booking",
  ];

  const popBusOperators = [
    "APSRTC", // Andhra Pradesh
    "ASTC", // Assam
    "BSRTC", // Bihar
    "GSRTC", // Gujarat
    "HRTC", // Himachal Pradesh
    "JKSRTC", // Jammu & Kashmir
    "KSRTC", // Karnataka
    "KSRTC", // Kerala (same short form but different state)
    "MSRTC", // Maharashtra
    "OSRTC", // Odisha
    "PRTC", // Punjab / Pepsu area
    "PSRTC", // Puducherry
    "RSRTC", // Rajasthan
    "SNT", // Sikkim Nationalised Transport
    "TNSTC", // Tamil Nadu
    "TSRTC", // Telangana
    "UPSRTC", // Uttar Pradesh
    "UTC", // Uttarakhand Transport Corporation
    "WBSTC", // West Bengal State Transport
    "SBSTC", // South Bengal State Transport
    "NBSTC", // North Bengal State Transport
  ];

  const footerLinks1: string[] = [
    "About Us",
    "Leadership",
    "Special services",
    "Achievements",
    "Tenders",
    "FAQs",
    "Sitemap",
  ];

  const footerLinks2: string[] = [
    "Booking Policies",
    "Right to information",
    "Divisions",
    "Corporate Office",
    "Performance",
    "Bus Enquiry",
  ];

  const footerLinks3: string[] = [
    "Recruitment",
    "Contact Us",
    "Awards",
    "GSRTC Direct Agents List",
    "GSRTC Franchisee Agents List",
    "Blacklisted Agencies",
    "Details of Grievance Redressal Officers for Persons with Disabilities",
  ];

  const footerLinks4: string[] = [
    "Gujarat Pavitra Yatradham Vikas Board, Gandhinagar",
    "Download",
    "Privacy Policy",
    "India Code",
    "Press Release",
    "Citizen's Rights Document(નાગરિક અધિકાર પત્ર)",
    "Circular No.323 Regarding Prevention against Women Harreshment - Act 2013 Service Regulation",
  ];

  const footerSocialIcons: {
    icon: ReactNode;
    link: string;
  }[] = [
    {
      icon: <FaFacebook className="w-8 h-8 text-[#006699]" />,
      link: "https://www.facebook.com/GSRTCOFFICIAL",
    },
    {
      icon: <FaSquareXTwitter className="w-8 h-8 " />,
      link: "https://twitter.com/OfficialGsrtc",
    },
  ];

  return (
    <div
      className={`myContainer py-7 bg-[#f2f2f8] ${
        windowSize < 1025 ? "pb-[73px]" : ""
      }`}
    >
      {/* Popular Routes */}
      <Accordion
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          "& .Mui-expanded": {
            margin: 0,
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            padding: "10px 20px",
            fontWeight: 600,
            borderBottom: "1px solid #d1d5dc",
          }}
        >
          Popular Bus Routes
        </AccordionSummary>
        <AccordionDetails>
          <ul className="flex flex-wrap flex-col sm:flex-row">
            {popRotesList &&
              popRotesList.map((route, inx) => (
                <li key={`Footer-popular-routes-${inx}`}>
                  <Link
                    href="#"
                    className="block px-5 py-3 rounded-s-full rounded-e-full bg-transparent hover:bg-gray-200 text-sm font-semibold text-blue-700 underline"
                  >
                    {route}
                  </Link>
                </li>
              ))}
          </ul>
        </AccordionDetails>
      </Accordion>

      {/* Popular Cities */}
      <Accordion
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          "& .Mui-expanded": {
            margin: 0,
          },
        }}
        id="popCitiesAccordian"
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
          sx={{
            padding: "10px 20px",
            fontWeight: 600,
            borderBottom: "1px solid #d1d5dc",
          }}
        >
          Popular Cities
        </AccordionSummary>
        <AccordionDetails>
          <ul className="flex flex-wrap flex-col sm:flex-row">
            {popCitiesList &&
              popCitiesList.map((city, inx) => (
                <li key={`Footer-popular-city-${inx}`}>
                  <Link
                    href="#"
                    className="block px-5 py-3 rounded-s-full rounded-e-full bg-transparent hover:bg-gray-200 text-sm font-semibold text-blue-700 underline"
                  >
                    {city}
                  </Link>
                </li>
              ))}
          </ul>
        </AccordionDetails>
      </Accordion>

      {/* Popular Bus Operators */}
      <Accordion
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          "& .Mui-expanded": {
            margin: 0,
          },
        }}
        id="popCitiesAccordian"
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
          sx={{
            padding: "10px 20px",
            fontWeight: 600,
            borderBottom: "1px solid #d1d5dc",
          }}
        >
          Popular Bus Operators
        </AccordionSummary>
        <AccordionDetails>
          <ul className="flex flex-wrap flex-col sm:flex-row">
            {popBusOperators &&
              popBusOperators.map((operator, inx) => (
                <li key={`Footer-popular-busOperator-${inx}`}>
                  <Link
                    href="#"
                    className="block px-5 py-3 rounded-s-full rounded-e-full bg-transparent hover:bg-gray-200 text-sm font-semibold text-blue-700 underline"
                  >
                    {operator}
                  </Link>
                </li>
              ))}
          </ul>
        </AccordionDetails>
      </Accordion>

      {/* Footer links */}
      <div className="grid gap-y-4 md:gap-y-0 lg:grid-rows-1 grid-cols-1 lg:grid-cols-4 mt-8 mb-10">
        <div>
          <ul className="flex flex-wrap flex-row lg:flex-col gap-y-1 text-left">
            {footerLinks1 &&
              footerLinks1.map((linkEle, inx) => (
                <li key={`Footer-links-col-1-${inx}`}>
                  <Link
                    href="#"
                    className="inline-block px-5 py-3 rounded-s-full rounded-e-full bg-transparent hover:bg-gray-200 text-sm font-semibold text-blue-700 underline"
                  >
                    {linkEle}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div>
          <ul className="flex flex-wrap flex-row lg:flex-col gap-y-1 text-left">
            {footerLinks2 &&
              footerLinks2.map((linkEle, inx) => (
                <li key={`Footer-links-col-2-${inx}`}>
                  <Link
                    href="#"
                    className="inline-block px-5 py-3 rounded-s-full rounded-e-full bg-transparent hover:bg-gray-200 text-sm font-semibold text-blue-700 underline"
                  >
                    {linkEle}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div>
          <ul className="flex flex-wrap flex-row lg:flex-col gap-y-1 text-left">
            {footerLinks3 &&
              footerLinks3.map((linkEle, inx) => (
                <li key={`Footer-links-col-3-${inx}`}>
                  <Link
                    href="#"
                    className="inline-block px-5 py-3 rounded-s-full rounded-e-full bg-transparent hover:bg-gray-200 text-sm font-semibold text-blue-700 underline"
                  >
                    {linkEle}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div>
          <ul className="flex flex-wrap flex-row lg:flex-col gap-y-1 text-left">
            {footerLinks4 &&
              footerLinks4.map((linkEle, inx) => (
                <li key={`Footer-links-col-4-${inx}`}>
                  <Link
                    href="#"
                    className="inline-block px-5 py-3 rounded-s-full rounded-e-full bg-transparent hover:bg-gray-200 text-sm font-semibold text-blue-700 underline"
                  >
                    {linkEle}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* Footer Logo */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center border-b border-b-gray-300 py-5">
        <div>
          <Link href="#" className="flex">
            <div className="lg:min-w-[360px] flex flex-nowrap gap-x-2 items-center">
              <Image
                src={navbarLogo}
                alt="GSRTC Navbar LOGO"
                width={60}
                quality={100}
                unoptimized
                className="object-contain"
                priority
              />
              <div className="">
                <p className="text-xs sm:text-sm text-nowrap font-semibold leading-tight tracking-tight text-[#212153]">
                  Gujarat State Road Transport Corporation
                </p>
                <p className="text-sm sm:text-base text-nowrap font-noto-guj font-semibold leading-tight tracking-wider text-[#212153]">
                  ગુજરાત રાજ્ય માર્ગ વાહન વ્યવહાર નિગમ
                </p>
                <hr className="border-px border-slate-200 my-[2px]" />
                <p className="text-nowrap text-lg text-[#cc0000] font-semibold font-allura leading-none tracking-widest">
                  Steering miles with smiles
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm text-[#1d1d1da3]">
            GSRTC is the world&apos;s largest online bus ticket booking service
            trusted by over 300+ million happy customers. GSRTC offers bus
            ticket booking through its website, iOS and Android mobile apps for
            all major routes.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="flex gap-1 items-center hover:underline">
              <DiAndroid className="text-xl text-[#a4c639]" />
              <span className="text-sm">Download Android App</span>
            </a>
            <a href="#" className="flex gap-1 items-center hover:underline">
              <FaApple className="text-xl text-[#a4c639]" />
              <span className="text-sm">Download IOS App</span>
            </a>

            <p className="flex justify-center items-center text-sm">
              Toll Free Number:&nbsp;
              <a
                href="tel:1800 233 666666"
                className="hover:underline font-semibold"
              >
                1800 233 666666
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer Social Logos */}
      <div className="flex justify-between items-center py-7">
        <p className="text-[#1d1d1da3] text-sm">
          &copy; GSRTC. All rights reserved
        </p>
        <ul className="flex items-center gap-x-5">
          {footerSocialIcons &&
            footerSocialIcons.map((icon, inx) => {
              return (
                <li key={`footer-social-icons-${inx}`}>
                  <a href={icon.link} key={`footer-social-icon-${inx}`}>
                    {icon.icon}
                  </a>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default FooterSection;
