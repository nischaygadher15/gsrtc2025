"use client";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdHome } from "react-icons/io";
import { IoListOutline } from "react-icons/io5";
import { BiHelpCircle } from "react-icons/bi";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Avatar } from "@mui/material";

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
  const sessionId = useSelector((state: RootState) => state.session.session_id);
  const userData = useSelector((state: RootState) => state.user.data);

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
            onClick={() => setUserAccDrawer(true)}
            className={`w-full h-full text-[#1d1d1da3] rounded-s-full rounded-e-full bg-white hover:bg-slate-200 flex flex-col justify-center items-center gap-1.5 cursor-pointer  `}
          >
            {!sessionId ? (
              <AccountCircleOutlinedIcon sx={{ fontSize: 24 }} />
            ) : (
              <>
                {userData.user_photo ? (
                  <Image
                    src={userData.user_photo}
                    alt="User profile photo"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                ) : (
                  <Avatar
                    alt="User profile photo"
                    sx={{
                      width: 24,
                      height: 24,
                      bgcolor: "#173c62",
                      color: "white",
                    }}
                    children={
                      <p className="text-xs font-semibold">
                        {userData.first_name.toUpperCase()[0]}
                        {userData.last_name.toUpperCase()[0]}
                      </p>
                    }
                  />
                )}
              </>
            )}

            <span className="text-xs font-medium capitalize">
              {userData.first_name ? userData.first_name : "Account"}
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default FooterNavbar;
