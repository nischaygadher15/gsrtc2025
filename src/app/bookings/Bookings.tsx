"use client";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import BookingCard from "@/components/common/BookingCard";
import useWindowSize from "@/Hooks/useWindowSize";
import { TextField } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Dialog from "@mui/material/Dialog";
import { IoMdArrowDropdown, IoMdClose } from "react-icons/io";
import ReCAPTCHA from "react-google-recaptcha";
import googleIcon from "@/assets/images/google-sing-In.svg";
import { MdOutlineEmail } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Controller, useForm } from "react-hook-form";
import {
  LoginByEmailSchema,
  LoginByEmailSchemaType,
  LoginByMobileSchema,
  LoginByMobileSchemaType,
} from "@/lib/schema/auth/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { sessionLogout, setSession } from "@/redux/slices/session/sessionSlice";
import { setLoginDialog } from "@/redux/slices/session/dialogSlice";
import { getAuth } from "@/lib/auth/getAuth";

const Bookings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const sessionId = useSelector(
    (state: RootState) => state.session.access_token,
  );
  const [bookingTab, setBookingTab] = useState<number>(0);
  let winSize = useWindowSize();
  const trips = [1, 2, 3, 4, 5];

  const handleBookingTbs = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue <= 2) setBookingTab(newValue);
  };

  const CaptchaClientKey = process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY;
  if (!CaptchaClientKey) throw new Error("Captcha key do not found!");

  useEffect(() => {
    console.log("Current Session: ", sessionId);
  }, [sessionId]);

  useEffect(() => {
    const getAuthFunc = async () => {
      const auth = await getAuth();
      console.log("auth: ", auth);
    };

    getAuthFunc();
  }, []);

  return (
    <>
      <div className="myContainer min-h-[300px] flex flex-col justify-center bg-[#f2f2f8]">
        {sessionId ? (
          <div className="md:px-10 lg:px-24">
            <p className="font-semibold text-xl py-7">My Bookings</p>
            <div className="pb-7">
              <div className="mb-7">
                <Tabs
                  value={bookingTab}
                  onChange={handleBookingTbs}
                  variant={winSize > 640 ? "standard" : "scrollable"}
                  scrollButtons={"auto"}
                  sx={{
                    "& .MuiTab-root": {
                      textAlign: "left",
                      fontSize: 18,
                      textTransform: "capitalize",
                      fontWeight: 500,
                    },
                    "& .MuiTabs-indicator": {
                      backgroundColor: "#173c62",
                    },
                    "& .Mui-selected": {
                      color: "#173c62 !important",
                    },
                    "& .MuiTabs-list": {
                      gap: winSize > 640 ? "30px" : "20px",
                    },
                  }}
                >
                  <Tab label="Upcoming" />
                  <Tab label="Cancelled" />
                  <Tab label="Completed" />
                </Tabs>
              </div>

              {/* Upcoming */}
              {bookingTab == 0 && (
                <ul className="flex flex-col gap-4">
                  {trips &&
                    trips.map((trip) => (
                      <li key={`upcomming-${trip}`}>
                        <BookingCard />
                      </li>
                    ))}
                </ul>
              )}

              {/* Cancelled */}
              {bookingTab == 1 && (
                <ul className="flex flex-col gap-4">
                  {trips &&
                    trips.map((trip) => (
                      <li key={`cancelled-${trip}`}>
                        <BookingCard />
                      </li>
                    ))}
                </ul>
              )}

              {/* Completed */}
              {bookingTab == 2 && (
                <ul className="flex flex-col gap-4">
                  {trips &&
                    trips.map((trip) => (
                      <li key={`completed-${trip}`}>
                        <BookingCard />
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        ) : (
          <div
            className="bg-white rounded-md min-h-[150px] flex justify-center items-center p-4 font-semibold flex-wrap sm:items-center gap-3"
            style={{
              boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            }}
          >
            <p>Please login to view the profile details</p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="underline underline-offset-1 text-blue-600 cursor-pointer"
                onClick={() => dispatch(setLoginDialog(true))}
              >
                Login Now
              </button>
              <span>OR</span>
              <Link
                href="/"
                className="underline underline-offset-1 text-blue-600"
              >
                Go to home page
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Bookings;
