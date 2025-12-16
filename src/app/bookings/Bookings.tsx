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

const Bookings = () => {
  const sessionId = useSelector((state: RootState) => state.session.sessionId);
  const [bookingTab, setBookingTab] = useState<number>(0);
  let winSize = useWindowSize();
  const trips = [1, 2, 3, 4, 5];

  const handleBookingTbs = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue <= 2) setBookingTab(newValue);
  };

  const dispatch = useDispatch<AppDispatch>();
  const CaptchaClientKey = process.env.NEXT_PUBLIC_Recaptcha_client_key;
  if (!CaptchaClientKey) throw new Error("Captcha key do not found!");

  const [loginWith, setLoginWith] = useState<"mobile" | "email">("mobile");
  const [loginPassEye, setLoginPassEye] = useState<boolean>(false);

  //GSRTC Login
  const [gsrtcLoginDialog, setGsrctLoginDialog] = useState<boolean>(false);

  // Recaptch
  const [captchaToken, setCaptchaToken] = useState<string>("");
  const [iAmNotRobot, setIAmNotRobot] = useState<boolean>(false);

  const onCaptchSuccess = (capchaToken: string | null) => {
    if (!capchaToken) onCaptchaFailed();
    else {
      console.log("Captcha is done.", capchaToken);
      setCaptchaToken(capchaToken);
    }
  };

  const onCaptchaFailed = () => {
    console.log("Captcha failed!!");
    setIAmNotRobot(false);
  };

  const onCaptchaExpired = () => {
    console.log("Captcha is expired.");
    setCaptchaToken("");
    setIAmNotRobot(false);
  };

  const {
    handleSubmit: mobileSubmit,
    reset: mobileReset,
    control: mobileControl,
    formState: { errors: mobileErrors },
  } = useForm<LoginByMobileSchemaType>({
    resolver: zodResolver(LoginByMobileSchema),
  });

  const {
    handleSubmit: emailSubmit,
    reset: emailReset,
    control: emailControl,
    formState: { errors: emailErrors },
  } = useForm<LoginByEmailSchemaType>({
    resolver: zodResolver(LoginByEmailSchema),
  });

  const openGsrctLoginDialog = () => {
    setGsrctLoginDialog(true);
  };

  const closeGsrctLoginDialog = () => {
    setGsrctLoginDialog(false);
    setCaptchaToken("");
    setIAmNotRobot(false);
    mobileReset();
    emailReset();
  };

  useEffect(() => {
    mobileReset();
    emailReset();
    if (captchaToken) setIAmNotRobot(true);
  }, [loginWith]);

  const onMobileLogin = async (data: LoginByMobileSchemaType) => {
    console.log("data: ", data);
  };

  const onEmailLogin = (data: LoginByEmailSchemaType) => {
    console.log("data: ", data);
  };

  useEffect(() => {
    console.log("Current Session: ", sessionId);
  }, [sessionId]);

  const handleSignInWithGoogle = useGoogleLogin({
    flow: "auth-code",
    onSuccess: ({ code }) => {
      console.log("Auth-code: ", code);
      dispatch(setSession(code));
      closeGsrctLoginDialog();
      toast.success("You have successfully logged in!");
    },
    onError: () => {
      console.log("Login with Google failed");
      toast.error("Login with Google failed");
    },
  });

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
                className="underline underline-offset-1 text-blue-600"
                onClick={openGsrctLoginDialog}
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

      {/* GSRTC Login/Sign up Dialog */}
      <Dialog
        fullScreen={winSize < 640 ? true : false}
        onClose={closeGsrctLoginDialog}
        open={gsrtcLoginDialog}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: winSize < 640 ? "0px" : "16px",
            margin: 0,
            overflow: "hidden",
            maxHeight: winSize < 640 ? "100vh" : "calc(100% - 32px)",
          },
        }}
      >
        <div
          className={`relative ${
            winSize > 640
              ? "w-xl min-h-[calc(100vh-32px)] max-h-[calc(100vh-32px)]"
              : "w-screen h-screen"
          } flex flex-col bg-white overflow-y-auto hideScrollBar`}
        >
          {/* Header */}
          <div className="sticky top-0 left-0 right-0 z-999 p-4 bg-white flex justify-between items-center">
            <p className="text-xl font-bold">Login to GSRTC</p>
            <button
              type="button"
              className="rounded-s-full rounded-e-full p-2 hover:bg-slate-200 cursor-pointer"
              onClick={closeGsrctLoginDialog}
            >
              <IoMdClose className="text-2xl" />
            </button>
          </div>

          <div className="px-4">
            {loginWith === "mobile" ? (
              <form onSubmit={mobileSubmit(onMobileLogin)}>
                {/* Mobile no. */}
                <div>
                  <p className="text-lg font-bold mb-1">
                    What's your mobile number?
                  </p>
                  <div className="flex">
                    <button
                      type="button"
                      disabled
                      className="px-3 flex flex-col justify-center border-t border-b border-s rounded-ss-lg rounded-es-lg"
                    >
                      <p className="text-xs text-[#1d1d1da3]">Country Code</p>
                      <p className="flex items-center gap-x-1 font-semibold">
                        <span>+91 (IND)</span>
                        <IoMdArrowDropdown className="text-xl" />
                      </p>
                    </button>

                    <Controller
                      name="userMobileNo"
                      control={mobileControl}
                      render={({ field: { onChange, name, value } }) => (
                        <div className="flex-1 border rounded-se-lg rounded-ee-lg">
                          <TextField
                            type="text"
                            label="Mobile number"
                            placeholder="Enter mobile no."
                            variant="filled"
                            name={name}
                            value={value}
                            onChange={onChange}
                            error={false}
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
                      )}
                    />
                  </div>
                  <p className="my-1 text-xs text-red-600 min-h-5">
                    {mobileErrors.userMobileNo
                      ? mobileErrors.userMobileNo.message
                      : ""}
                  </p>
                </div>

                <div>
                  {/* Recatcha */}
                  {!iAmNotRobot && (
                    <div className="flex justify-center py-4">
                      <ReCAPTCHA
                        sitekey={CaptchaClientKey}
                        onChange={onCaptchSuccess}
                        onErrored={onCaptchaFailed}
                        onExpired={onCaptchaExpired}
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={captchaToken ? false : true}
                    className="w-full py-3 font-semibold text-center bg-primary/90 hover:bg-primary text-white rounded-s-full rounded-e-full cursor-pointer disabled:bg-gray-200 disabled:hover:bg-gray-300 disabled:text-gray-500"
                  >
                    Generate OTP
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={emailSubmit(onEmailLogin)}>
                {/* Email */}
                <div>
                  <p className="text-lg font-bold mb-1">Email</p>
                  <Controller
                    name="userEmail"
                    control={emailControl}
                    render={({ field: { onChange, name, value } }) => (
                      <div className="flex-1 border rounded-lg">
                        <TextField
                          type="text"
                          label="Email"
                          placeholder="Enter email id."
                          variant="filled"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={false}
                          sx={{
                            width: "100%",
                            "& .MuiFilledInput-root": {
                              fontWeight: "500 !important",
                              backgroundColor: "white !important",
                              borderRadius: "8px",
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
                    )}
                  />

                  <p className="my-1 text-xs text-red-600 min-h-5">
                    {emailErrors.userEmail ? emailErrors.userEmail.message : ""}
                  </p>
                </div>

                {/* Password */}
                <div>
                  <p className="text-lg font-bold mb-1">Password</p>
                  <Controller
                    name="userPass"
                    control={emailControl}
                    render={({ field: { onChange, name, value } }) => (
                      <div className="flex-1 border rounded-lg">
                        <TextField
                          type={loginPassEye ? "text" : "password"}
                          label="Password"
                          placeholder="Enter password."
                          variant="filled"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={false}
                          slotProps={{
                            input: {
                              endAdornment: (
                                <button
                                  type="button"
                                  onClick={() => setLoginPassEye(!loginPassEye)}
                                  className="cursor-pointer"
                                >
                                  {loginPassEye ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </button>
                              ),
                            },
                          }}
                          sx={{
                            width: "100%",
                            "& .MuiFilledInput-root": {
                              fontWeight: "500 !important",
                              backgroundColor: "white !important",
                              borderRadius: "8px",
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
                    )}
                  />

                  <p className="my-1 text-xs text-red-600 min-h-5">
                    {emailErrors.userPass ? emailErrors.userPass.message : ""}
                  </p>
                </div>

                <div>
                  {/* Recatcha */}
                  {!iAmNotRobot && (
                    <div className="flex justify-center py-4">
                      <ReCAPTCHA
                        sitekey={CaptchaClientKey}
                        onChange={onCaptchSuccess}
                        onErrored={onCaptchaFailed}
                        onExpired={onCaptchaExpired}
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={captchaToken ? false : true}
                    className="w-full py-3 font-semibold text-center bg-primary/90 hover:bg-primary text-white rounded-s-full rounded-e-full cursor-pointer disabled:bg-gray-200 disabled:hover:bg-gray-300 disabled:text-gray-500"
                  >
                    Login
                  </button>
                </div>
              </form>
            )}

            <p className="flex justify-center items-center gap-2 py-5">
              <span className="w-1/2 h-px bg-slate-200"></span>
              <span className="text-slate-500 text-sm text-nowrap">
                Or Login/Signup With
              </span>
              <span className="w-1/2 h-px bg-slate-200"></span>
            </p>

            <div className="flex flex-col sm:flex-row sm:items-stretch justify-center gap-4">
              {/* Login with google */}
              <button
                type="button"
                className="inline-flex justify-center bg-[#1a73e8]/90 hover:bg-[#1a73e8] p-1 rounded-s-full rounded-e-full sm:rounded-sm cursor-pointer"
                onClick={() => handleSignInWithGoogle()}
              >
                <div className="bg-white p-1.5 rounded-ss-sm rounded-es-sm">
                  <Image
                    src={googleIcon}
                    width={24}
                    height={24}
                    alt="Google Sign In Icon"
                  />
                </div>

                <p className="sm:flex-1 flex justify-center items-center font-semibold text-white text-sm px-2">
                  Sign in with Google
                </p>
              </button>

              {loginWith === "mobile" ? (
                <>
                  {/* Login with Email */}
                  <button
                    type="button"
                    className="min-h-11 inline-flex justify-center items-center bg-primary/90 hover:bg-primary p-1  rounded-s-full rounded-e-full sm:rounded-sm cursor-pointer"
                    onClick={() => {
                      setLoginWith("email");
                    }}
                  >
                    <MdOutlineEmail className="w-7 h-7 text-white" />
                    <p className="sm:flex-1 flex justify-center items-center font-semibold text-white text-sm px-2">
                      Sign in with Email
                    </p>
                  </button>
                </>
              ) : (
                <>
                  {/* Login with Email */}
                  <button
                    type="button"
                    className="flex items-center bg-primary/90 hover:bg-primary p-1 rounded-sm cursor-pointer"
                    onClick={() => {
                      setLoginWith("mobile");
                    }}
                  >
                    <FaMobileAlt className="w-7 h-7 text-white" />
                    <p className="sm:flex-1 flex justify-center items-center font-semibold text-white text-sm px-2">
                      Sign in with Mobile No.
                    </p>
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="w-full p-3 flex flex-wrap justify-center items-center gap-2 mb-4">
            <p className="text-sm text-center">By logging in, I agree</p>
            <p className="text-sm flex justify-center items-center gap-2">
              <a href="#" className="text-blue-500">
                Terms & Conditions
              </a>
              <span>&</span>
              <a href="#" className="text-blue-500">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Bookings;
