"use client";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdHome } from "react-icons/io";
import { IoListOutline } from "react-icons/io5";
import { BiHelpCircle } from "react-icons/bi";
import { Dispatch, SetStateAction } from "react";

const FooterNavbar = ({
  accDrawer,
}: {
  accDrawer: {
    userAccDrawer: boolean;
    setUserAccDrawer: Dispatch<SetStateAction<boolean>>;
  };
}) => {
  const currentRoute = usePathname();
  const currentLocation = usePathname();
  const { setUserAccDrawer } = accDrawer;

  return (
    <div
      className={`border-t border-t-gray-300 ${
        currentLocation !== "/search-bus" ? "lg:hidden" : "hidden"
      } h-[74px] fixed bottom-0 left-0 right-0 z-40 min-w-full bg-white`}
    >
      {/* Navbar links */}
      <ul className="w-full h-full list-none !text-xs !font-medium grid grid-cols-4 grid-rows-1 gap-x-2">
        <li>
          <Link
            href="/"
            className={`h-full w-full flex flex-col justify-center items-center gap-y-1.5 ${
              currentRoute === "/" ? "text-primary" : "text-[#1d1d1da3]"
            }`}
          >
            <IoMdHome className="w-6 h-6" />
            <span>Home</span>
          </Link>
        </li>

        <li>
          <Link
            href="/bookings"
            className={`h-full w-full flex flex-col justify-center items-center gap-y-1.5 ${
              currentRoute === "/bookings" ? "text-primary" : "text-[#1d1d1da3]"
            }`}
          >
            <IoListOutline className="w-6 h-6" />
            <span>Bookings</span>
          </Link>
        </li>
        {/* Jay shree krishna */}
        <li>
          <Link
            href="/help"
            className={`h-full w-full flex flex-col justify-center items-center gap-y-1.5 ${
              currentRoute === "/help" ? "text-primary" : "text-[#1d1d1da3]"
            }`}
          >
            <BiHelpCircle className="w-6 h-6" />
            <span>Help</span>
          </Link>
        </li>

        <li className="">
          <button
            type="button"
            className="w-full h-full p-3 rounded-s-full rounded-e-full text-[#1d1d1da3] bg-white hover:bg-slate-200 flex flex-col justify-center items-center gap-y-1.5"
            onClick={() => setUserAccDrawer(true)}
          >
            <AccountCircleOutlinedIcon sx={{ fontSize: 24 }} />
            <span className="text-xs">Account</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default FooterNavbar;
