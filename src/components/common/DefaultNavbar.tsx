"use client";
import navbarLogo from "@/assets/images/Logos/gsrtcLogo2.svg";
import {
  CircularProgress,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { TbTicketOff } from "react-icons/tb";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { BsTicketDetailed } from "react-icons/bs";
import { RiFontSize } from "react-icons/ri";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import womenSvg from "@/assets/images/female.svg";
import { usePathname } from "next/navigation";
import Dialog from "@mui/material/Dialog";
import { IoMdArrowDropdown, IoMdClose, IoMdHome } from "react-icons/io";
import ReCAPTCHA from "react-google-recaptcha";
import googleIcon from "@/assets/images/google-sing-In.svg";
import { IoListOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { FaMobileAlt, FaUser } from "react-icons/fa";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { BiHelpCircle, BiLogOut } from "react-icons/bi";
import { Controller, useForm } from "react-hook-form";
import {
  EmailSignUpSchema,
  EmailSignUpSchemaType,
  LoginByEmailSchema,
  LoginByEmailSchemaType,
  LoginByMobileSchema,
  LoginByMobileSchemaType,
  OtpVerificationSchema,
  OtpVerificationSchemaType,
} from "@/lib/schema/auth/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { sessionLogout, setSession } from "@/redux/slices/session/sessionSlice";
import {
  forgotPasswordAPI,
  loginWithEmailAPI,
  loginWithGoogleAPI,
  loginWithMobileAPI,
  logoutAPI,
  mobileLoginResendOtpAPI,
  onMobileOtpLoginAPI,
  resetPasswordAPI,
  signUpWithEmailAPI,
  signUpWithGoogleAPI,
} from "@/services/auth.service";
import OtpInput from "react-otp-input";
import LocalTimer from "./LocalTimer";
import useWindowSize from "@/Hooks/useWindowSize";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {
  setLoginDialog,
  setSignUpDialog,
} from "@/redux/slices/session/dialogSlice";
import { GetDeviceInfo } from "@/utils/common/deviceInfo";
import { AxiosError } from "axios";

const DefaultNavbar = ({
  accDrawer,
}: {
  accDrawer: {
    userAccDrawer: boolean;
    setUserAccDrawer: Dispatch<SetStateAction<boolean>>;
  };
}) => {
  const { userAccDrawer, setUserAccDrawer } = accDrawer;
  const currentLocation = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const loginDialog = useSelector(
    (state: RootState) => state.dialog.loginDialog,
  );
  const signUpDialog = useSelector(
    (state: RootState) => state.dialog.signUpDialog,
  );
  const resetPasswordDialog = useSelector(
    (state: RootState) => state.dialog.resetPassword,
  );
  const winSize = useWindowSize();
  const CaptchaClientKey = process.env.NEXT_PUBLIC_Recaptcha_client_key;
  if (!CaptchaClientKey) throw new Error("Captcha key do not found!");

  const [loginWith, setLoginWith] = useState<"mobile" | "email">("mobile");
  const [lostPassword, setLostPassword] = useState<"forgot" | "reset" | null>(
    null,
  );
  const [loginPassEye, setLoginPassEye] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingGoogle, setLoadingGoogle] = useState<boolean>(false);
  const [otpVerifying, setOtpVerifying] = useState<boolean>(false);
  const [otpResending, setOtpResending] = useState<boolean>(false);
  const [optSent, setOptSent] = useState<{ status: boolean; otp_id: string }>({
    status: false,
    otp_id: "",
  });
  const [otpCounting, setOtpCounting] = useState<boolean>(false);
  const [otpExpired, setOtpExpired] = useState<boolean>(false);
  const [gsrtcLoginDialog, setGsrtcLoginDialog] = useState<boolean>(false);
  const [gsrtcSignUpDialog, setGsrtcSignUpDialog] = useState<boolean>(false);
  const sessionId = useSelector(
    (state: RootState) => state.session?.access_token,
  );
  let fpAgent: any;

  // User Account Dropdown
  const handleUserDrawer = () => {
    setUserAccDrawer(true);
  };
  const closeUserDrawer = () => {
    setUserAccDrawer(false);
  };

  // Recaptch
  const [captchaToken, setCaptchaToken] = useState<string>("");
  const [iAmNotRobot, setIAmNotRobot] = useState<boolean>(false);

  const onCaptchSuccess = (capchaToken: string | null) => {
    if (!capchaToken) onCaptchaFailed();
    else {
      // console.log("Captcha is done.", capchaToken);
      setCaptchaToken(capchaToken);
      setIAmNotRobot(true);
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
    getValues: mobileGetValues,
    control: mobileControl,
    formState: { errors: mobileErrors },
  } = useForm<LoginByMobileSchemaType>({
    resolver: zodResolver(LoginByMobileSchema),
    defaultValues: {
      userMobileNo: "8141409448",
    },
  });

  const {
    handleSubmit: otpSubmit,
    reset: otpReset,
    getValues: otpGetValues,
    control: otpControl,
    formState: { errors: otpErrors },
  } = useForm<OtpVerificationSchemaType>({
    resolver: zodResolver(OtpVerificationSchema),
    defaultValues: {
      userLoginOTP: "",
    },
  });

  const {
    handleSubmit: emailSubmit,
    reset: emailReset,
    control: emailControl,
    formState: { errors: emailErrors },
  } = useForm<LoginByEmailSchemaType>({
    resolver: zodResolver(LoginByEmailSchema),
    defaultValues: {
      userEmail: "ram312@gmail.com",
      userPass: "Ram@@312",
    },
  });

  const openGsrctLoginDialog = () => {
    setGsrtcLoginDialog(true);
  };

  const closeGsrctLoginDialog = () => {
    if (!loading && !loadingGoogle) {
      setGsrtcLoginDialog(false);
      setCaptchaToken("");
      setIAmNotRobot(false);
      setLoginWith("mobile");
      mobileReset();
      emailReset();

      // OPT Form
      otpReset();
      setLoading(false);
      setOtpVerifying(false);
      setOtpResending(false);
      setOptSent({
        status: false,
        otp_id: "",
      });
      setOtpExpired(false);
      setOtpCounting(false);

      //Redux
      dispatch(setLoginDialog(false));

      closeForgotPassword();
    }
  };

  useEffect(() => {
    mobileReset();
    emailReset();
    if (captchaToken) setIAmNotRobot(true);
  }, [loginWith]);

  const onMobileLogin = async (data: LoginByMobileSchemaType) => {
    try {
      setLoading(true);

      // Create or Get device id
      const deviceInfo = await GetDeviceInfo();

      console.log("deviceInfo: ", deviceInfo);

      const mobileLoginRes = await loginWithMobileAPI({
        userMobileNo: data.userMobileNo,
        device_ip: deviceInfo.device_ip,
        device_lat: deviceInfo.device_lat,
        device_long: deviceInfo.device_long,
      });

      console.log("mobileLoginRes: ", mobileLoginRes);

      if (mobileLoginRes.status === 200) {
        setOptSent({
          status: true,
          otp_id: mobileLoginRes.opt_id,
        });
        toast.success(mobileLoginRes.message);
      } else {
        toast.error(mobileLoginRes.message);
      }
    } catch (error: any) {
      console.log("error:", error);
      toast.error(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  };

  const onOtpSubmit = async (data: any) => {
    setOtpVerifying(true);
    console.log("OTP: ", data);
    try {
      // Create or Get device id
      const deviceInfo = await GetDeviceInfo();
      console.log("deviceInfo: ", deviceInfo);

      const otpVerifyRes = await onMobileOtpLoginAPI({
        otp: data.userLoginOTP,
        otp_id: optSent.otp_id,
        device_ip: deviceInfo.device_ip,
        device_lat: deviceInfo.device_lat,
        device_long: deviceInfo.device_long,
      });

      if (otpVerifyRes.status === 200) {
        dispatch(setSession(otpVerifyRes.access_token));
        closeGsrctLoginDialog();
        closeUserDrawer();
        toast.success("OTP verified successfully.");
      }
    } catch (error: any) {
      console.log("error:", error);
      toast.error(error.response ? error.response.data.message : error.message);
      setOtpVerifying(false);
    } finally {
      setOtpVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    const userMobileNo = mobileGetValues("userMobileNo");

    if (!userMobileNo) {
      toast.error("Mobile no. do not found");
    }

    try {
      setOtpResending(true);
      const resendOtpRes = await mobileLoginResendOtpAPI(userMobileNo);

      console.log("resendOtpRes: ", resendOtpRes);

      if (resendOtpRes.message === "success") {
        setOtpCounting(true);
        toast.success(`OTP sent successfully on ${userMobileNo}.`);
      }
    } catch (error: any) {
      console.log("error:", error);
      toast.error(error.response ? error.response.data.message : error.message);
    } finally {
      setOtpResending(false);
    }
  };

  useEffect(() => {
    if (optSent.status) {
      setOtpCounting(true);
    } else {
      setOtpCounting(false);
    }
  }, [optSent]);

  const onEmailLogin = async (data: LoginByEmailSchemaType) => {
    console.log("data: ", data);

    try {
      setLoading(true);

      // Create or Get device id
      const deviceInfo = await GetDeviceInfo();

      console.log("deviceInfo: ", deviceInfo);

      const emailLoginRes = await loginWithEmailAPI({
        userEmail: data.userEmail,
        userPass: data.userPass,
        device_ip: deviceInfo.device_ip,
        device_lat: deviceInfo.device_lat,
        device_long: deviceInfo.device_long,
      });

      console.log("emailLoginRes: ", emailLoginRes);

      if (emailLoginRes.status === 200) {
        setLoading(false);
        toast.success(emailLoginRes.message);
        dispatch(setSession(emailLoginRes.access_token));
        closeGsrctLoginDialog();
        closeUserDrawer();
      } else {
        toast.error(emailLoginRes.message);
      }
    } catch (error: any) {
      console.log("error:", error);
      toast.error(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Current Session: ", sessionId);
  }, [sessionId]);

  const handleSessionLogout = async () => {
    try {
      setLoading(true);
      const logoutRes = await logoutAPI();

      console.log("logoutRes: ", logoutRes);

      if (logoutRes.status === 200) {
        dispatch(sessionLogout());
        closeUserDrawer();
        toast.success("You have successfully logged out!");
      } else {
        toast.error(logoutRes.message);
      }
    } catch (error: any) {
      console.log("error:", error);
      toast.error(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  };

  const randomUser = Math.ceil(Math.random() * 10000);

  // Email Sign up form
  const {
    handleSubmit: signUpSubmit,
    reset: signUpReset,
    control: signUpControl,
    formState: { errors: signUpErrors },
  } = useForm<EmailSignUpSchemaType>({
    resolver: zodResolver(EmailSignUpSchema),
    defaultValues: {
      firstName: "sita",
      lastName: "ram",
      userDob: new Date("2000-01-01"),
      gender: "male",
      userMobileNo: "8141409448",
      userEmail: `ram${randomUser}@gmail.com`,
      userPass: `Ram@@${randomUser}`,
    },
  });

  const openGsrctSignUpDialog = () => {
    setGsrtcSignUpDialog(true);
  };

  const closeGsrtcSignUpDialog = () => {
    if (!loading && !loadingGoogle) {
      setGsrtcSignUpDialog(false);
      signUpReset();

      //Redux
      dispatch(setSignUpDialog(false));
    }
  };

  const onEmailSignUp = async (data: EmailSignUpSchemaType) => {
    console.log("data: ", data);
    setLoading(true);

    try {
      //Sign up payload
      const deviceInfo = await GetDeviceInfo();

      console.log("deviceInfo: ", deviceInfo);

      const signUpRes = await signUpWithEmailAPI({
        first_name: data.firstName,
        last_name: data.lastName,
        user_dob: data.userDob,
        gender: data.gender,
        user_mobile_no: data.userMobileNo,
        user_email: data.userEmail,
        user_pass: data.userPass,
        device_ip: deviceInfo.device_ip,
        device_lat: deviceInfo.device_lat,
        device_long: deviceInfo.device_long,
      });

      console.log("signUpRes: ", signUpRes);

      if (signUpRes && signUpRes.status === 201) {
        toast.success(signUpRes.message);
        dispatch(setSession("1234567890"));
        closeGsrtcSignUpDialog();
        closeUserDrawer();
      }
    } catch (error: any) {
      console.log("error:", error);
      toast.error(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  };

  // Login with google
  const handleLoginWithGoogle = useGoogleLogin({
    flow: "auth-code",
    ux_mode: "popup",
    scope: "openid email profile",
    onSuccess: async ({ code }) => {
      try {
        setLoadingGoogle(true);
        console.log("Auth-code: ", code);

        //Sign up payload
        const deviceInfo = await GetDeviceInfo();

        console.log("deviceInfo: ", deviceInfo);

        const googleLoginRes = await loginWithGoogleAPI({
          code,
          device_ip: deviceInfo.device_ip,
          device_lat: deviceInfo.device_lat,
          device_long: deviceInfo.device_long,
        });

        console.log("googleLoginRes: ", googleLoginRes);

        if (googleLoginRes.status === 200) {
          toast.success(googleLoginRes.message);
          dispatch(setSession(googleLoginRes.access_token));
          closeGsrctLoginDialog();
          closeUserDrawer();
        } else {
          toast.error(googleLoginRes.message);
        }
      } catch (error: any) {
        console.log("error:", error);
        toast.error(
          error.response ? error.response.data.message : error.message,
        );
      } finally {
        setLoadingGoogle(false);
      }
    },
    onError: () => {
      setLoadingGoogle(false);
      console.log("Login with Google failed");
      toast.error("Login with Google failed");
    },
  });

  // Sign up with google
  const handleSignupWithGoogle = useGoogleLogin({
    flow: "auth-code",
    ux_mode: "popup",
    scope: "openid email profile",
    onSuccess: async ({ code }) => {
      console.log("Auth-code: ", code);

      //Sign up payload
      const deviceInfo = await GetDeviceInfo();

      console.log("deviceInfo: ", deviceInfo);

      try {
        setLoadingGoogle(true);
        const googleSignupRes = await signUpWithGoogleAPI({
          code,
          device_ip: deviceInfo.device_ip,
          device_lat: deviceInfo.device_lat,
          device_long: deviceInfo.device_long,
        });

        console.log("googleSignupRes: ", googleSignupRes);

        if (googleSignupRes.status === 201) {
          toast.success(googleSignupRes.message);
          dispatch(setSession(code));
          closeGsrtcSignUpDialog();
          closeUserDrawer();
        } else {
          toast.error(googleSignupRes.message);
        }
      } catch (error: any) {
        console.log("error:", error);
        toast.error(
          error.response ? error.response.data.message : error.message,
        );
      } finally {
        setLoadingGoogle(false);
      }
    },
    onError: () => {
      setLoadingGoogle(false);
      toast.error("Sign up with Google failed");
    },
  });

  // Forgot Password Form
  const {
    handleSubmit: forgotPassSubmit,
    reset: forgotPassReset,
    control: forgotPassControl,
    formState: { errors: forgotPassErrors },
  } = useForm({
    // resolver: zodResolver(LoginByEmailSchema),
    defaultValues: {
      userEmail: "nischaygadher15@gmail.com",
    },
  });

  const closeForgotPassword = () => {
    setLostPassword(null);
    setLoginWith("email");
    forgotPassReset();
  };

  const onForgotPassword = async (data: any) => {
    console.log("Data: ", data);
    setLoading(true);

    try {
      const deviceInfo = await GetDeviceInfo();
      console.log("deviceInfo: ", deviceInfo);

      const forgotPasswordResp = await forgotPasswordAPI({
        userEmail: data.userEmail,
        device_ip: deviceInfo.device_ip,
        device_lat: deviceInfo.device_lat,
        device_long: deviceInfo.device_long,
      });

      console.log("forgotPasswordResp: ", forgotPasswordResp);

      if (forgotPasswordResp && forgotPasswordResp.status === 200) {
        toast.success(forgotPasswordResp.message);
        closeGsrctLoginDialog();
        closeUserDrawer();
      } else {
        toast.error(forgotPasswordResp.message);
      }
    } catch (error: any) {
      console.log("error:", error);
      toast.error(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  };

  // Reset Password Form
  const {
    handleSubmit: resetPassSubmit,
    reset: resetPassReset,
    control: resetPassControl,
    formState: { errors: resetPassErrors },
  } = useForm({
    // resolver: zodResolver(LoginByEmailSchema),
    defaultValues: {
      userPass: "",
      userConfirmPass: "",
    },
  });

  const onResetPassword = async (data: any) => {
    if (!resetPasswordDialog.resetCode) {
      toast.error("Unauthorized request!");
      return;
    }

    console.log("Data: ", data);
    setLoading(true);

    try {
      const deviceInfo = await GetDeviceInfo();

      console.log("deviceInfo: ", deviceInfo);

      const resetPasswordResp = await resetPasswordAPI({
        userPass: data.userPass,
        resetCode: resetPasswordDialog.resetCode,
        device_ip: deviceInfo.device_ip,
        device_lat: deviceInfo.device_lat,
        device_long: deviceInfo.device_long,
      });

      console.log("resetPasswordResp: ", resetPasswordResp);

      if (resetPasswordResp.status === 200) {
        toast.success(resetPasswordResp.message);
      } else {
        toast.error(resetPasswordResp.message);
      }
    } catch (error: any) {
      console.log("error:", error);
      toast.error(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav
      className={`myContainer ${
        currentLocation !== "/search-bus"
          ? "sticky top-0 left-0 right-0 z-40 flex shadow-md"
          : "relative border-b border-b-slate-200 z-40 hidden lg:flex"
      }  min-w-full bg-white justify-between py-3`}
    >
      {/* GSRTC Logo */}
      <Link href="#">
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
            <p className="text-xs sm:text-sm text-nowrap font-semibold leading-snug tracking-normal text-[#212153]">
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

      {/* Navbar links */}
      <ul className="list-none !text-xs !font-medium hidden lg:flex justify-end items-center gap-x-1.5 xl:gap-x-3">
        <li>
          <Link
            href="/"
            className={`p-3 h-full w-full flex justify-center items-center gap-1.5 rounded-s-full rounded-e-full bg-white hover:bg-slate-200 ${
              currentLocation === "/" ? "text-primary" : "text-black"
            }`}
          >
            <IoMdHome className="w-6 h-6" />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link
            href="/bookings"
            className={`p-3 h-full w-full flex items-center gap-1.5  rounded-s-full rounded-e-full bg-white hover:bg-slate-200 ${
              currentLocation === "/bookings" ? "text-primary" : "text-black"
            }`}
          >
            <IoListOutline className="w-6 h-6" />
            <span>Bookings</span>
          </Link>
        </li>
        <li>
          <Link
            href="/help"
            className={`p-3 h-full w-full flex items-center gap-1.5  rounded-s-full rounded-e-full bg-white hover:bg-slate-200 ${
              currentLocation === "/help" ? "text-primary" : "text-black"
            }`}
          >
            <BiHelpCircle className="w-6 h-6" />
            <span>Help</span>
          </Link>
        </li>
        {/* <li className="">
          <a
            href="https://yatradham.gujarat.gov.in/Booking"
            className="p-3 text-black rounded-s-full flex flex-col xl:flex-row xl:items-center gap-1  rounded-e-full bg-white hover:bg-slate-200"
          >
            <span>Sharvan Tirth</span>
            <span>Darshan</span>
          </a>
        </li> */}
        {/* <li>
          <a
            href="https://www.soutickets.in/#/gsrtc-booking"
            className="p-3 text-black rounded-s-full flex flex-col xl:flex-row xl:items-center gap-1  rounded-e-full bg-white hover:bg-slate-200"
          >
            <span>Unity</span>
            <span>Booking</span>
          </a>
        </li> */}
        <li className="">
          <button
            type="button"
            onClick={handleUserDrawer}
            className={`text-black rounded-s-full rounded-e-full bg-white hover:bg-slate-200 flex items-center gap-1.5 cursor-pointer p-2 ${
              sessionId ? "border" : ""
            }`}
          >
            {!sessionId ? (
              <>
                <AccountCircleOutlinedIcon sx={{ fontSize: 24 }} />
                <span className="text-xs">Account</span>
              </>
            ) : (
              <>
                <Image
                  src="https://res.cloudinary.com/dcj3txipr/image/upload/v1768503255/randomUser_rty2wh.jpg"
                  alt="User profile photo"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="text-sm font-semibold">Sita</span>
              </>
            )}
          </button>
        </li>
      </ul>

      {/* <=============== Drawer and Dialogs ===============> */}

      {/* Account Drawer */}
      <Drawer anchor="right" open={userAccDrawer} onClose={closeUserDrawer}>
        <div className={`${winSize <= 640 ? "w-screen" : "w-[360px]"}`}>
          <div className="relative p-4 border-b-[1px] border-slate-200 flex items-center justify-between ">
            <span className="font-semibold">Account</span>
            <button
              type="button"
              onClick={closeUserDrawer}
              className="absolute top-1/2 -translate-y-1/2 right-0 cursor-pointer px-3.5 py-2 rounded-s-full rounded-e-full bg-white hover:bg-slate-200"
            >
              <CloseIcon sx={{ fontSize: 24 }} />
            </button>
          </div>

          {sessionId ? (
            <>
              {/* My Details */}
              <div className="">
                <p className="p-4 text-[22px] font-bold leading-tight pt-7 pb-2">
                  My Details
                </p>

                <Link href="/profile" onClick={closeUserDrawer}>
                  <div className="w-full flex justify-between items-center p-4 font-semibold border-b-1 border-b-slate-400">
                    <div className="flex items-center gap-x-3">
                      <Image
                        src="https://res.cloudinary.com/dcj3txipr/image/upload/v1768503255/randomUser_rty2wh.jpg"
                        alt="User profile photo"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div className="flex flex-col">
                        <span>Sita</span>
                        <span className="text-xs font-normal text-blue-600">
                          View your profile
                        </span>
                      </div>
                    </div>

                    <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
                  </div>
                </Link>

                <Link href="/bookings" onClick={closeUserDrawer}>
                  <div className="w-full flex justify-between items-center p-4 font-semibold border-b-1 border-b-slate-400">
                    <div className="flex items-center gap-x-3">
                      <IoListOutline className="w-6 h-6" />
                      <span>My Bookings</span>
                    </div>

                    <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
                  </div>
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Login/Sign up */}
              <div className="px-4">
                <p className="py-10 font-bold text-[28px] leading-tight tracking-tight text-wrap">
                  Log in to manage your bookings
                </p>
                <button
                  type="button"
                  onClick={openGsrctLoginDialog}
                  className="w-full py-3 font-semibold text-center bg-primary/90 hover:bg-primary text-white rounded-s-full rounded-e-full cursor-pointer
                "
                >
                  GSRCT Log In
                </button>
                <div className="py-5 flex items-center gap-3">
                  <p className="font-medium">Don&apos;t have an account?</p>
                  <button
                    type="button"
                    className="text-sm underline font-bold hover:bg-slate-200 py-2 px-3 rounded-s-full rounded-e-full cursor-pointer"
                    onClick={openGsrctSignUpDialog}
                  >
                    Sign up
                  </button>
                </div>
              </div>
              {/* Agent Login */}
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  sx={{
                    padding: "4px 16px",
                    borderRadius: 0,
                    fontWeight: 500,
                  }}
                >
                  <div className="flex items-center gap-x-3">
                    <PersonOutlineOutlinedIcon sx={{ fontSize: 24 }} />
                    <span>Agent Login</span>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <ul className="flex flex-col">
                    <li className="p-4 bg-white">
                      <p className="w-full py-3 font-semibold text-center bg-primary/90 hover:bg-primary text-white rounded-s-full rounded-e-full">
                        Agent Login
                      </p>
                    </li>
                    <li className="p-4 bg-white hover:bg-slate-200">
                      New Agent Register
                    </li>
                    <li className="p-4 bg-white hover:bg-slate-200">
                      Agent Allotment
                    </li>
                    <li className="p-4 bg-white hover:bg-slate-200">
                      E-Top Status
                    </li>
                  </ul>
                </AccordionDetails>
              </Accordion>
              {/* Bus pass login */}
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  sx={{
                    padding: "4px 16px",
                    borderRadius: 0,
                    fontWeight: 500,
                  }}
                >
                  <div className="flex items-center gap-x-3">
                    <DescriptionOutlinedIcon sx={{ fontSize: 24 }} />
                    <span>Bus pass Login</span>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <ul className="flex flex-col">
                    <li className="bg-white">
                      <p className="w-full py-3 font-semibold text-center bg-primary/90 hover:bg-primary text-white rounded-s-full rounded-e-full">
                        Bus pass Login
                      </p>
                      <div className="py-5 flex items-center gap-3">
                        <p className="font-medium">
                          Don&apos;t have an account?
                        </p>
                        <Link
                          href="/signup"
                          className="text-sm underline font-bold hover:bg-slate-200 py-2 px-3 rounded-s-full rounded-e-full"
                        >
                          Sign up
                        </Link>
                      </div>
                    </li>
                  </ul>
                </AccordionDetails>
              </Accordion>
            </>
          )}

          {/* Wallet */}
          <div className="">
            <p className="p-4 text-[22px] font-bold leading-tight py-7">
              Payments
            </p>

            <Link href="#" onClick={closeUserDrawer}>
              <div className="w-full flex justify-between items-center p-4 pt-0 font-semibold border-b-1 border-b-slate-400">
                <div className="flex items-center gap-x-3">
                  <AccountBalanceWalletOutlinedIcon sx={{ fontSize: 24 }} />
                  <span>Wallet</span>
                </div>

                <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
              </div>
            </Link>
          </div>

          <div className="">
            <p className="p-4 text-[22px] font-bold leading-tight py-7">More</p>
            {/* Offer */}
            <Link href="#" onClick={closeUserDrawer}>
              <div className="w-full flex justify-between items-center p-4 pt-0 font-semibold border-b-1 border-b-slate-400">
                <div className="flex items-center gap-x-3">
                  <LocalOfferOutlinedIcon sx={{ fontSize: 24 }} />
                  <span>Offer</span>
                </div>

                <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
              </div>
            </Link>

            {/* Know about GSRTC */}
            <Link href="#" onClick={closeUserDrawer}>
              <div className="w-full flex justify-between items-center p-4 font-semibold border-b-1 border-b-slate-400">
                <div className="flex items-center gap-x-3">
                  <InfoOutlinedIcon sx={{ fontSize: 24 }} />
                  <span>Know about GSRTC</span>
                </div>

                <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
              </div>
            </Link>

            {/* Help */}
            <Link href="#" onClick={closeUserDrawer}>
              <div className="w-full flex justify-between items-center p-4 font-semibold border-b-1 border-b-slate-400">
                <div className="flex items-center gap-x-3">
                  <HelpOutlineOutlinedIcon sx={{ fontSize: 24 }} />
                  <span>Help</span>
                </div>

                <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
              </div>
            </Link>

            {/* Cancel Ticket */}
            <Link href="#" onClick={closeUserDrawer}>
              <div className="w-full flex justify-between items-center p-4 font-semibold border-b-1 border-b-slate-400">
                <div className="flex items-center gap-x-3">
                  <TbTicketOff style={{ fontSize: 24 }} />
                  <span>Cancel Ticket</span>
                </div>

                <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
              </div>
            </Link>

            {/* Reschedule Ticket */}
            <Link href="#" onClick={closeUserDrawer}>
              <div className="w-full flex justify-between items-center p-4 font-semibold border-b-1 border-b-slate-400">
                <div className="flex items-center gap-x-3">
                  <CalendarTodayIcon sx={{ fontSize: 24 }} />
                  <span>Reschedule Ticket</span>
                </div>

                <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
              </div>
            </Link>

            {/* Search Ticket */}
            <Link href="#" onClick={closeUserDrawer}>
              <div className="w-full flex justify-between items-center p-4 font-semibold border-b-1 border-b-slate-400">
                <div className="flex items-center gap-x-3">
                  <BsTicketDetailed style={{ fontSize: 24 }} />
                  <span>Search Ticket</span>
                </div>

                <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
              </div>
            </Link>

            {/* Langauge */}
            <Link href="#" onClick={closeUserDrawer}>
              <div className="w-full flex justify-between items-center p-4 font-semibold border-b-1 border-b-slate-400">
                <div className="flex items-center gap-x-3">
                  <RiFontSize style={{ fontSize: 24 }} />
                  <div className="flex flex-col">
                    <span>Langauge</span>
                    <span className="text-sm font-medium text-[#1d1d1da3]">
                      English
                    </span>
                  </div>
                </div>

                <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
              </div>
            </Link>

            {/* Notifications */}
            <Link href="#" onClick={closeUserDrawer}>
              <div className="w-full flex justify-between items-center p-4 font-semibold border-b-1 border-b-slate-400">
                <div className="flex items-center gap-x-3">
                  <NotificationsActiveOutlinedIcon sx={{ fontSize: 24 }} />
                  <span>Notifications</span>
                </div>

                <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
              </div>
            </Link>

            {/* State */}
            <Link href="#" onClick={closeUserDrawer}>
              <div className="w-full flex justify-between items-center p-4 font-semibold border-b-1 border-b-slate-400">
                <div className="flex items-center gap-x-3">
                  <LocalOfferOutlinedIcon sx={{ fontSize: 24 }} />
                  <div className="flex flex-col">
                    <span>State</span>
                    <span className="text-sm font-medium text-[#1d1d1da3]">
                      Gujarat
                    </span>
                  </div>
                </div>

                <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
              </div>
            </Link>

            {/* Booking for women */}
            <Link href="#" onClick={closeUserDrawer}>
              <div className="w-full flex justify-between items-center p-4 font-semibold border-b-1 border-b-slate-400 mb-7">
                <div className="flex items-center gap-x-3">
                  <Image
                    src={womenSvg}
                    height={24}
                    width={24}
                    alt="Booking for women"
                    className="h-6 w-6"
                  />
                  <div className="flex flex-col">
                    <span>Booking for women</span>
                    <span className="text-gray-500 text-sm font-normal">
                      {false ? "Yes" : "No"}
                    </span>
                  </div>
                </div>

                <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
              </div>
            </Link>

            {/* Logout */}
            {sessionId && (
              <button
                type="button"
                className="w-full flex justify-between items-center p-4 pt-0 font-semibold border-b-1 border-b-slate-400 cursor-pointer"
                onClick={handleSessionLogout}
              >
                <div className="flex items-center gap-x-3">
                  <BiLogOut className="w-6 h-6" />
                  <span>Logout</span>
                </div>

                <div className="flex items-center gap-3">
                  {loading && (
                    <CircularProgress
                      size={25}
                      sx={{
                        "&.MuiCircularProgress-root": {
                          color: "black",
                        },
                      }}
                    />
                  )}

                  <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
                </div>
              </button>
            )}
          </div>
        </div>
      </Drawer>

      {/* GSRTC Login Dialog */}
      <Dialog
        fullScreen={winSize <= 640 ? true : false}
        onClose={closeGsrctLoginDialog}
        open={gsrtcLoginDialog || loginDialog}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: winSize <= 640 ? "0px" : "16px",
            margin: 0,
            overflow: "hidden",
            maxHeight: winSize <= 640 ? "none" : "calc(100% - 32px)",
          },
        }}
      >
        <div
          className={`relative flex flex-col bg-white overflow-y-auto hideScrollBar ${
            winSize <= 640
              ? "w-full h-full"
              : "w-xl min-h-[calc(100vh-32px)] max-h-[calc(100vh-32px)]"
          }`}
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

          {/* Forms */}
          {!lostPassword && !resetPasswordDialog.status && (
            <div className="px-4 flex-1">
              {loginWith === "mobile" ? (
                <>
                  {/* OPT Verification form */}
                  <form
                    className={`${
                      optSent.status
                        ? ""
                        : "w-0 h-0 overflow-hidden -z-10 opacity-0"
                    }`}
                    onSubmit={otpSubmit(onOtpSubmit)}
                  >
                    {/* onSubmit={otpSubmit(onOtpSubmit)} */}
                    <p className="text-lg sm:text-[22px] font-bold">
                      Enter the OTP we just sent you
                    </p>

                    <div className="flex justify-between items-center my-6">
                      <p className="flex flex-col">
                        <span className="text-sm">Mobile number</span>
                        <span className="font-semibold">
                          +91 {mobileGetValues("userMobileNo")}
                        </span>
                      </p>

                      <button
                        type="button"
                        className="px-3 py-1.5 rounded-s-full rounded-e-full font-semibold text-sm underline underline-offset-1 hover:bg-slate-200"
                        onClick={() => {
                          setOptSent({
                            status: false,
                            otp_id: "",
                          });
                          otpReset();
                          setOtpCounting(false);
                        }}
                      >
                        Edit
                      </button>
                    </div>

                    <div className="mb-3">
                      <Controller
                        name="userLoginOTP"
                        control={otpControl}
                        render={({ field: { value, onChange } }) => (
                          <div>
                            <p className="text-sm mb-2">Enter OTP</p>
                            <OtpInput
                              value={value}
                              onChange={onChange}
                              numInputs={6}
                              containerStyle="flex gap-2"
                              inputStyle="min-w-8 sm:min-w-12 h-10 sm:h-14 rounded-sm sm:rounded-lg border focus:border-2 text-xl sm:text-2xl font-semibold focus:outline-4 outline-primary/20"
                              renderInput={(props) => <input {...props} />}
                            />

                            <p className="mt-1 min-h-5 text-sm text-red-700">
                              {otpErrors.userLoginOTP
                                ? otpErrors.userLoginOTP.message
                                : " "}
                            </p>
                          </div>
                        )}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={otpVerifying ? true : false}
                      className={`w-full flex justify-center items-center gap-3 py-3 font-semibold bg-primary/90 hover:bg-primary text-white rounded-s-full rounded-e-full cursor-pointer disabled:cursor-default
                     disabled:bg-gray-200 disabled:text-gray-500`}
                    >
                      {otpVerifying ? (
                        <>
                          <CircularProgress
                            size={25}
                            sx={{
                              "&.MuiCircularProgress-root": {
                                color: "#6a7282",
                              },
                            }}
                          />
                          <span>Verifying...</span>
                        </>
                      ) : (
                        "Verify OTP"
                      )}
                    </button>

                    <div className="py-5 flex items-center gap-2">
                      <p className="text-sm font-medium">
                        Didn't receive the OTP? Retry in
                      </p>
                      <LocalTimer
                        time={15}
                        isCounting={otpCounting}
                        setIsCounting={setOtpCounting}
                        expiry={setOtpExpired}
                      />
                    </div>

                    {/* Resend button */}
                    {otpExpired && (
                      <button
                        type="button"
                        disabled={otpResending ? true : false}
                        className={`w-full flex justify-center items-center gap-3 py-3 font-semibold bg-primary/90 hover:bg-primary text-white rounded-s-full rounded-e-full cursor-pointer disabled:cursor-default
                     disabled:bg-gray-200 disabled:text-gray-500`}
                        onClick={handleResendOtp}
                      >
                        {otpResending ? (
                          <>
                            <CircularProgress
                              size={25}
                              sx={{
                                "&.MuiCircularProgress-root": {
                                  color: "#6a7282",
                                },
                              }}
                            />
                            <span>Resending...</span>
                          </>
                        ) : (
                          "Resend OTP"
                        )}
                      </button>
                    )}
                  </form>

                  {/* Mobile login form */}
                  <form
                    onSubmit={mobileSubmit(onMobileLogin)}
                    className={`${
                      optSent.status
                        ? "w-0 h-0 overflow-hidden -z-10 opacity-0"
                        : ""
                    }`}
                  >
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
                          <p className="text-xs text-[#1d1d1da3]">
                            Country Code
                          </p>
                          <p
                            className={`flex items-center gap-x-1 font-semibold ${
                              loading ? "text-[#1d1d1da3]" : ""
                            }`}
                          >
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
                                disabled={loading}
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

                    {/* Recaptcha */}
                    <div>
                      {/* <div
                        className={`${
                          iAmNotRobot
                            ? "w-0! max-h-0 relative overflow-hidden -z-10 opacity-0 p-0"
                            : "pb-4 flex justify-center"
                        }`}
                      >
                        <ReCAPTCHA
                          sitekey={CaptchaClientKey}
                          onChange={onCaptchSuccess}
                          onErrored={onCaptchaFailed}
                          onExpired={onCaptchaExpired}
                        />
                      </div> */}

                      <button
                        type="submit"
                        // disabled={loading || !captchaToken ? true : false}
                        disabled={loading}
                        className={`w-full flex justify-center items-center gap-3 py-3 font-semibold bg-primary/90 hover:bg-primary text-white rounded-s-full rounded-e-full cursor-pointer disabled:cursor-default
                     disabled:bg-gray-200 disabled:text-gray-500`}
                      >
                        {loading ? (
                          <>
                            <CircularProgress
                              size={25}
                              sx={{
                                "&.MuiCircularProgress-root": {
                                  color: "#6a7282",
                                },
                              }}
                            />
                            <span>Generating...</span>
                          </>
                        ) : (
                          "Generate OTP"
                        )}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <form onSubmit={emailSubmit(onEmailLogin)}>
                  {/* Email */}
                  <div>
                    {/* <p className="text-lg font-bold mb-1">Email</p> */}
                    <Controller
                      name="userEmail"
                      control={emailControl}
                      render={({ field: { onChange, name, value } }) => (
                        <div className="flex-1 border rounded-lg">
                          <TextField
                            type="text"
                            label="Email"
                            disabled={loading}
                            placeholder="Enter email id."
                            variant="filled"
                            name={name}
                            value={value}
                            onChange={onChange}
                            error={false}
                            sx={{
                              width: "100%",
                              "& .MuiFilledInput-input": {
                                fontWeight: "500 !important",
                                backgroundColor: "white !important",
                                borderRadius: "8px !important",
                              },
                              "& .MuiInputLabel-root": {
                                color: "#1d1d1da3",
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
                      {emailErrors.userEmail
                        ? emailErrors.userEmail.message
                        : ""}
                    </p>
                  </div>

                  {/* Password */}
                  <div>
                    {/* <p className="text-lg font-bold mb-1">Password</p> */}
                    <Controller
                      name="userPass"
                      control={emailControl}
                      render={({ field: { onChange, name, value } }) => (
                        <div className="flex-1 border rounded-lg">
                          <TextField
                            type={loginPassEye ? "text" : "password"}
                            label="Password"
                            disabled={loading}
                            placeholder="Enter password."
                            variant="filled"
                            name={name}
                            value={value}
                            onChange={onChange}
                            error={false}
                            autoComplete="new-password"
                            slotProps={{
                              input: {
                                endAdornment: (
                                  <button
                                    type="button"
                                    disabled={loading}
                                    onClick={() =>
                                      setLoginPassEye(!loginPassEye)
                                    }
                                    className="cursor-pointer disabled:cursor-default"
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
                                backgroundColor: "white !important",
                                borderRadius: "8px !important",
                              },
                              "& .MuiFilledInput-input": {
                                fontWeight: "500 !important",
                                backgroundColor: "white !important",
                                borderRadius: "8px !important",
                              },
                              "& .MuiInputLabel-root": {
                                color: "#1d1d1da3",
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
                    {/* Recaptcha */}
                    {/* <div
                    className={`${
                      iAmNotRobot
                        ? "w-0! max-h-0 relative overflow-hidden -z-10 opacity-0 p-0"
                        : "pb-4 flex justify-center"
                    }`}
                  >
                    <ReCAPTCHA
                      sitekey={CaptchaClientKey}
                      onChange={onCaptchSuccess}
                      onErrored={onCaptchaFailed}
                      onExpired={onCaptchaExpired}
                    />
                  </div> */}

                    <button
                      type="submit"
                      // disabled={loading || !captchaToken ? true : false}
                      disabled={loading}
                      className="w-full py-3 font-semibold flex justify-center items-center gap-2 bg-primary/90 hover:bg-primary text-white rounded-s-full rounded-e-full cursor-pointer disabled:cursor-default disabled:bg-gray-200 disabled:text-gray-500"
                    >
                      {loading ? (
                        <>
                          <CircularProgress
                            size={25}
                            sx={{
                              "&.MuiCircularProgress-root": {
                                color: "#6a7282",
                              },
                            }}
                          />
                          <span>Logging...</span>
                        </>
                      ) : (
                        "Login"
                      )}
                    </button>
                  </div>
                </form>
              )}

              <div className="w-full mt-5 flex justify-between items-center gap-2 text-sm">
                {loginWith === "email" && (
                  <button
                    type="button"
                    disabled={loading}
                    className="font-semibold text-blue-500 disabled:text-gray-500 underline underline-offset-1 cursor-pointer disabled:cursor-default"
                    onClick={() => {
                      setLostPassword("forgot");
                    }}
                  >
                    Forgot your password?
                  </button>
                )}

                <div className="flex items-center gap-1 text-sm">
                  <p>Don't have account?</p>
                  <button
                    type="button"
                    disabled={loading}
                    className="font-semibold text-blue-500 disabled:text-gray-500 underline underline-offset-1 cursor-pointer disabled:cursor-default"
                    onClick={() => {
                      closeGsrctLoginDialog();
                      openGsrctSignUpDialog();
                    }}
                  >
                    Sign up
                  </button>
                </div>
              </div>

              {!optSent.status && (
                <>
                  <p className="flex justify-center items-center gap-2 py-5">
                    <span className="w-10 h-px bg-slate-200"></span>
                    <span className="text-slate-500 text-sm text-nowrap">
                      Login With
                    </span>
                    <span className="w-10 h-px bg-slate-200"></span>
                  </p>

                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    {/* Login with google */}
                    <button
                      type="button"
                      disabled={loadingGoogle || loading}
                      className={`min-h-12 flex justify-center items-center gap-2 bg-[#1a73e8]/90 hover:bg-[#1a73e8] text-white p-1.5 pe-3 rounded-sm cursor-pointer ${
                        winSize <= 640
                          ? "rounded-s-full rounded-e-full"
                          : "rounded-sm"
                      } disabled:cursor-default disabled:bg-gray-200 disabled:text-gray-500`}
                      onClick={handleLoginWithGoogle}
                    >
                      <div className="bg-white p-1 rounded-ss-sm rounded-es-sm">
                        <Image
                          src={googleIcon}
                          width={24}
                          height={24}
                          alt="Google Sign In Icon"
                        />
                      </div>

                      <p className="flex justify-center items-center font-semibold text-sm">
                        Sign in with Google
                      </p>

                      {loadingGoogle && (
                        <CircularProgress
                          size={25}
                          sx={{
                            "&.MuiCircularProgress-root": {
                              color: "#6a7282",
                            },
                          }}
                        />
                      )}
                    </button>

                    {loginWith === "mobile" ? (
                      <>
                        {/* Login with Email */}
                        <button
                          type="button"
                          disabled={loading}
                          className={`min-h-12 flex justify-center items-center bg-primary/90 hover:bg-primary p-1.5 cursor-pointer ${
                            winSize <= 640
                              ? "rounded-s-full rounded-e-full"
                              : "rounded-sm"
                          } disabled:cursor-default disabled:bg-gray-200 text-white disabled:text-gray-500`}
                          onClick={() => {
                            setLoginWith("email");
                          }}
                        >
                          <MdOutlineEmail className="w-7 h-7 " />
                          <p className="flex justify-center items-center font-semibold  text-sm px-2">
                            Sign in with Email
                          </p>
                        </button>
                      </>
                    ) : (
                      <>
                        {/* Login with Mobile No. */}
                        <button
                          type="button"
                          disabled={loading}
                          className={`min-h-12 flex justify-center items-center bg-primary/90 hover:bg-primary p-1.5 rounded-sm cursor-pointer ${
                            winSize <= 640
                              ? "rounded-s-full rounded-e-full"
                              : "rounded-sm"
                          } disabled:cursor-default disabled:bg-gray-200 disabled:text-gray-500`}
                          onClick={() => {
                            setLoginWith("mobile");
                          }}
                        >
                          <FaMobileAlt className="w-7 h-7 text-white" />
                          <p className="flex justify-center items-center font-semibold text-white text-sm px-2">
                            Sign in with Mobile No.
                          </p>
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {lostPassword === "forgot" && (
            <div className="px-4 flex-1">
              <p className="text-2xl font-semibold mb-10">
                Forgot your password?
              </p>

              <p className="text-sm mb-5">
                To reset your password, please enter the email address of your
                GSRTC account.
              </p>

              <form onSubmit={forgotPassSubmit(onForgotPassword)}>
                {/* Email */}
                <div>
                  <Controller
                    name="userEmail"
                    control={forgotPassControl}
                    render={({ field: { onChange, name, value } }) => (
                      <div className="flex-1 border rounded-lg">
                        <TextField
                          type="text"
                          label="Email"
                          disabled={loading}
                          placeholder="Enter email id."
                          variant="filled"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={false}
                          sx={{
                            width: "100%",
                            "& .MuiFilledInput-input": {
                              fontWeight: "500 !important",
                              backgroundColor: "white !important",
                              borderRadius: "8px !important",
                            },
                            "& .MuiInputLabel-root": {
                              color: "#1d1d1da3",
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
                    {forgotPassErrors.userEmail
                      ? forgotPassErrors.userEmail.message
                      : ""}
                  </p>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 font-semibold flex justify-center items-center gap-2 bg-primary/90 hover:bg-primary text-white rounded-s-full rounded-e-full cursor-pointer disabled:cursor-default disabled:bg-gray-200 disabled:text-gray-500"
                  >
                    {loading && (
                      <CircularProgress
                        size={25}
                        sx={{
                          "&.MuiCircularProgress-root": {
                            color: "#6a7282",
                          },
                        }}
                      />
                    )}
                    Reset my password
                  </button>
                </div>
              </form>

              <hr className="h-px mb-5 mt-10 border-none bg-slate-300" />

              <div className="text-center">
                <button
                  type="button"
                  className="text-sm text-center underline underline-offset-1 cursor-pointer font-semibold text-blue-500 p-1.5 "
                  onClick={closeForgotPassword}
                >
                  Go to login
                </button>
              </div>
            </div>
          )}

          {lostPassword === "reset" ||
            (resetPasswordDialog.status && (
              <div className="px-4 flex-1">
                <p className="text-2xl font-semibold mb-7">Password reset</p>

                <p className="text-sm mb-4">
                  Please enter a new password for your Todoist account.
                </p>
                <p className="text-sm mb-5">
                  This will end all active sessions for your account from all
                  devices.
                </p>

                <form onSubmit={resetPassSubmit(onResetPassword)}>
                  {/* Password */}
                  <div>
                    <Controller
                      name="userPass"
                      control={resetPassControl}
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
                            autoComplete="new-password"
                            slotProps={{
                              input: {
                                endAdornment: (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setLoginPassEye(!loginPassEye)
                                    }
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
                                backgroundColor: "white !important",
                                borderRadius: "8px !important",
                              },
                              "& .MuiFilledInput-input": {
                                fontWeight: "500 !important",
                                backgroundColor: "white !important",
                                borderRadius: "8px !important",
                              },
                              "& .MuiInputLabel-root": {
                                color: "#1d1d1da3",
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
                      {resetPassErrors.userPass
                        ? resetPassErrors.userPass.message
                        : ""}
                    </p>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <Controller
                      name="userConfirmPass"
                      control={resetPassControl}
                      render={({ field: { onChange, name, value } }) => (
                        <div className="flex-1 border rounded-lg">
                          <TextField
                            type={loginPassEye ? "text" : "password"}
                            label="Confirm Password"
                            placeholder="Enter confirm password"
                            variant="filled"
                            name={name}
                            value={value}
                            onChange={onChange}
                            error={false}
                            autoComplete="new-password"
                            slotProps={{
                              input: {
                                endAdornment: (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setLoginPassEye(!loginPassEye)
                                    }
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
                                backgroundColor: "white !important",
                                borderRadius: "8px !important",
                              },
                              "& .MuiFilledInput-input": {
                                fontWeight: "500 !important",
                                backgroundColor: "white !important",
                                borderRadius: "8px !important",
                              },
                              "& .MuiInputLabel-root": {
                                color: "#1d1d1da3",
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
                      {resetPassErrors.userPass
                        ? resetPassErrors.userPass.message
                        : ""}
                    </p>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 font-semibold flex justify-center items-center gap-2 bg-primary/90 hover:bg-primary text-white rounded-s-full rounded-e-full cursor-pointer disabled:cursor-default disabled:bg-gray-200 disabled:text-gray-500"
                    >
                      {loading && (
                        <CircularProgress
                          size={25}
                          sx={{
                            "&.MuiCircularProgress-root": {
                              color: "#6a7282",
                            },
                          }}
                        />
                      )}
                      Reset my password
                    </button>
                  </div>
                </form>

                <hr className="h-px mt-7 mb-5 border-none bg-slate-300" />

                <div className="flex justify-center items-center gap-1">
                  <p className="text-sm">Need additional help?</p>
                  <button
                    type="button"
                    className="text-sm text-center underline underline-offset-1 cursor-pointer font-semibold text-blue-500"
                    // onClick={() => {}}
                  >
                    Contact us
                  </button>
                </div>
              </div>
            ))}

          {/* Footer */}
          <div className="w-full p-3 flex flex-col justify-center items-center border-t border-t-slate-200">
            <p className="text-xs text-center">By logging in, I agree</p>
            <p className="text-xs flex justify-center items-center gap-2">
              <a
                href={`${loading ? "/#" : "/#"}`}
                className="text-blue-500 hover:underline"
              >
                Terms & Conditions
              </a>
              <span>&</span>
              <a
                href={`${loading ? "/#" : "/#"}`}
                className="text-blue-500 hover:underline"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </Dialog>

      {/* GSRTC Sign up Dialog */}
      <Dialog
        fullScreen={winSize <= 640 ? true : false}
        onClose={closeGsrtcSignUpDialog}
        open={gsrtcSignUpDialog || signUpDialog}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: winSize <= 640 ? "0px" : "16px",
            margin: 0,
            overflow: "hidden",
            maxHeight: winSize <= 640 ? "none" : "calc(100% - 32px)",
          },
        }}
      >
        <div
          className={`relative flex flex-col bg-white overflow-y-auto hideScrollBar ${
            winSize <= 640
              ? "w-full h-full"
              : "w-xl min-h-[calc(100vh-32px)] max-h-[calc(100vh-32px)]"
          }`}
        >
          {/* Header */}
          <div className="sticky top-0 left-0 right-0 z-999 p-4 bg-white flex justify-between items-center">
            <p className="text-xl font-bold">Sign Up to GSRTC</p>
            <button
              type="button"
              className="rounded-s-full rounded-e-full p-2 hover:bg-slate-200 cursor-pointer"
              onClick={closeGsrtcSignUpDialog}
            >
              <IoMdClose className="text-2xl" />
            </button>
          </div>

          {/* Forms */}
          <div className="px-4 flex-1">
            <form onSubmit={signUpSubmit(onEmailSignUp)}>
              {/* Full name */}
              <div className="flex gap-4">
                {/* First Name */}
                <div className="w-1/2">
                  <Controller
                    name="firstName"
                    control={signUpControl}
                    render={({ field: { onChange, name, value } }) => (
                      <div
                        className={`flex-1 border rounded-lg ${
                          signUpErrors.firstName ? "border-red-600" : ""
                        }`}
                      >
                        <TextField
                          type="text"
                          label="First name"
                          disabled={loading}
                          placeholder="Enter first name"
                          variant="filled"
                          error={signUpErrors.firstName ? true : false}
                          name={name}
                          value={value}
                          onChange={onChange}
                          sx={{
                            width: "100%",
                            "& .MuiFilledInput-input": {
                              fontWeight: "500 !important",
                              backgroundColor: "white !important",
                              borderRadius: "8px !important",
                            },
                            "& .MuiInputLabel-root": {
                              color: "#1d1d1da3",
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
                    {signUpErrors.firstName
                      ? signUpErrors.firstName.message
                      : ""}
                  </p>
                </div>

                {/* Last Name */}
                <div className="w-1/2">
                  <Controller
                    name="lastName"
                    control={signUpControl}
                    render={({ field: { onChange, name, value } }) => (
                      <div
                        className={`flex-1 border rounded-lg ${
                          signUpErrors.firstName ? "border-red-600" : ""
                        }`}
                      >
                        <TextField
                          type="text"
                          label="Last name"
                          disabled={loading}
                          placeholder="Enter last name"
                          variant="filled"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={signUpErrors.lastName ? true : false}
                          sx={{
                            width: "100%",
                            "& .MuiFilledInput-input": {
                              fontWeight: "500 !important",
                              backgroundColor: "white !important",
                              borderRadius: "8px !important",
                            },
                            "& .MuiInputLabel-root": {
                              color: "#1d1d1da3",
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
                    {signUpErrors.lastName ? signUpErrors.lastName.message : ""}
                  </p>
                </div>
              </div>

              {/* Date of birth */}
              <div>
                <Controller
                  name="userDob"
                  control={signUpControl}
                  render={({ field: { onChange, name, value } }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Date of birth"
                        disabled={loading}
                        format="DD/MM/YYYY"
                        name={name}
                        value={value ? dayjs(value) : null}
                        onChange={(value) => {
                          if (value) {
                            onChange(value.toDate());
                          }
                        }}
                        sx={{
                          "&.MuiPickersTextField-root": {
                            width: "100%",
                          },
                          "& .MuiPickersOutlinedInput-notchedOutline": {
                            borderColor: signUpErrors.userDob
                              ? "#e7000b !important"
                              : "black !important",
                            borderWidth: "1px !important",
                            borderRadius: "8px",
                          },
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />

                <p className="my-1 text-xs text-red-600 min-h-5">
                  {signUpErrors.userDob ? signUpErrors.userDob.message : ""}
                </p>
              </div>

              {/* Gender */}
              <div className="w-full">
                <Controller
                  name="gender"
                  control={signUpControl}
                  render={({ field: { onChange, name, value } }) => (
                    <div>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Age
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={value}
                          label="Gender"
                          onChange={onChange}
                          sx={{
                            "& .MuiOutlinedInput-notchedOutline": {
                              border: "1px solid black !important",
                            },
                          }}
                        >
                          <MenuItem value={"male"}>Male</MenuItem>
                          <MenuItem value={"female"}>Female</MenuItem>
                          <MenuItem value={"other"}>Other</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  )}
                />

                <p className="my-1 text-xs text-red-600 min-h-5">
                  {signUpErrors.gender ? signUpErrors.gender.message : ""}
                </p>
              </div>

              {/* Mobile no. */}
              <div>
                <div
                  className={`flex border rounded-lg ${
                    signUpErrors.userMobileNo ? "border-red-600" : "black"
                  }`}
                >
                  <button
                    type="button"
                    disabled
                    className="px-3 flex flex-col justify-center"
                  >
                    <p className="text-xs text-[#1d1d1da3]">Country Code</p>
                    <p
                      className={`flex items-center gap-x-1 font-semibold ${
                        loading ? "text-[#1d1d1da3]" : ""
                      }`}
                    >
                      <span>+91 (IND)</span>
                      <IoMdArrowDropdown className="text-xl" />
                    </p>
                  </button>

                  <Controller
                    name="userMobileNo"
                    control={signUpControl}
                    render={({ field: { onChange, name, value } }) => (
                      <div
                        className={`flex-1 border-s ${
                          signUpErrors.userMobileNo ? "border-red-600" : "black"
                        }`}
                      >
                        <TextField
                          type="text"
                          label="Mobile number"
                          disabled={loading}
                          placeholder="Enter mobile no."
                          variant="filled"
                          name={name}
                          value={value}
                          onChange={onChange}
                          sx={{
                            width: "100%",
                            "& .MuiFilledInput-input": {
                              backgroundColor: "white !important",
                              borderTopLeftRadius: "0px",
                              borderTopRightRadius: "8px",
                              borderBottomRightRadius: "8px",
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
                  {signUpErrors.userMobileNo
                    ? signUpErrors.userMobileNo.message
                    : ""}
                </p>
              </div>

              {/* Email */}
              <div>
                <Controller
                  name="userEmail"
                  control={signUpControl}
                  render={({ field: { onChange, name, value } }) => (
                    <div
                      className={`flex-1 border rounded-lg ${
                        signUpErrors.userEmail ? "border-red-600" : "black"
                      }`}
                    >
                      <TextField
                        type="text"
                        label="Email"
                        disabled={loading}
                        placeholder="Enter email id."
                        variant="filled"
                        name={name}
                        value={value}
                        onChange={onChange}
                        sx={{
                          width: "100%",
                          "& .MuiFilledInput-input": {
                            backgroundColor: "white !important",
                            borderRadius: "8px",
                          },
                          "& .MuiInputLabel-root": {
                            color: "#1d1d1da3",
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
                  {signUpErrors.userEmail ? signUpErrors.userEmail.message : ""}
                </p>
              </div>

              {/* Password */}
              <div>
                <Controller
                  name="userPass"
                  control={signUpControl}
                  render={({ field: { onChange, name, value } }) => (
                    <div
                      className={`flex-1 border rounded-lg ${
                        signUpErrors.userPass ? "border-red-600" : "black"
                      }`}
                    >
                      <TextField
                        type={loginPassEye ? "text" : "password"}
                        label="Password"
                        disabled={loading}
                        placeholder="Enter password."
                        variant="filled"
                        name={name}
                        value={value}
                        onChange={onChange}
                        autoComplete="new-password"
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
                            backgroundColor: "white !important",
                            borderRadius: "8px !important",
                          },
                          "& .MuiFilledInput-input": {
                            fontWeight: "500 !important",
                            backgroundColor: "white !important",
                            borderRadius: "8px !important",
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
                  {signUpErrors.userPass ? signUpErrors.userPass.message : ""}
                </p>
              </div>

              {/* Recaptcha */}
              {/* <div
                className={`${
                  iAmNotRobot
                    ? "w-0! max-h-0 relative overflow-hidden -z-10 opacity-0 p-0"
                    : "pb-4 flex justify-center"
                }`}
              >
                <ReCAPTCHA
                  sitekey={CaptchaClientKey}
                  onChange={onCaptchSuccess}
                  onErrored={onCaptchaFailed}
                  onExpired={onCaptchaExpired}
                />
              </div> */}

              {/* Sign Up button */}
              <div className="flex justify-center mb-5">
                <button
                  type="submit"
                  // disabled={loading || !captchaToken ? true : false}
                  disabled={loading}
                  className="w-full py-3 font-semibold flex justify-center items-center gap-2 bg-primary/90 hover:bg-primary text-white rounded-s-full rounded-e-full cursor-pointer disabled:cursor-default disabled:bg-gray-200 disabled:text-gray-500"
                >
                  {loading ? (
                    <>
                      <CircularProgress
                        size={25}
                        sx={{
                          "&.MuiCircularProgress-root": {
                            color: "#6a7282",
                          },
                        }}
                      />
                      <span>Signing up...</span>
                    </>
                  ) : (
                    "Sign up"
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <p>Already have account?</p>
                <button
                  type="button"
                  disabled={loading}
                  className="font-semibold text-blue-500 disabled:text-slate-500 underline underline-offset-1 cursor-pointer disabled:cursor-default"
                  onClick={() => {
                    closeGsrtcSignUpDialog();
                    openGsrctLoginDialog();
                  }}
                >
                  Login
                </button>
              </div>
            </form>

            {/* Sign up with google */}
            <div>
              <p className="flex justify-center items-center gap-2 py-5">
                <span className="w-10 h-px bg-slate-200"></span>
                <span className="text-slate-500 text-sm text-nowrap">
                  Login/Signup With
                </span>
                <span className="w-10 h-px bg-slate-200"></span>
              </p>

              <div className="flex justify-center mb-5">
                <button
                  type="button"
                  disabled={loadingGoogle || loading}
                  className={`w-full sm:w-auto  min-h-12 flex justify-center items-center gap-2 bg-[#1a73e8]/90 hover:bg-[#1a73e8] text-white p-1.5 pe-3 rounded-sm cursor-pointer ${
                    winSize <= 640
                      ? "rounded-s-full rounded-e-full"
                      : "rounded-sm"
                  }  disabled:cursor-default disabled:bg-gray-200 disabled:text-gray-500`}
                  onClick={handleSignupWithGoogle}
                >
                  <div className="bg-white p-1 rounded-ss-sm rounded-es-sm">
                    <Image
                      src={googleIcon}
                      width={24}
                      height={24}
                      alt="Google Sign In Icon"
                    />
                  </div>

                  <p className="flex justify-center items-center font-semibold  text-sm">
                    Sign up with Google
                  </p>

                  {loadingGoogle && (
                    <CircularProgress
                      size={25}
                      sx={{
                        "&.MuiCircularProgress-root": {
                          color: "#6a7282",
                        },
                      }}
                    />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="w-full p-3 flex flex-col justify-center items-center border-t border-t-slate-200">
            <p className="text-xs text-center">By Singing Up, I agree</p>
            <p className="text-xs flex justify-center items-center gap-2">
              <a
                href={loading ? "/#" : "/#"}
                className="text-blue-500 hover:underline"
              >
                Terms & Conditions
              </a>
              <span>&</span>
              <a
                href={loading ? "/#" : "/#"}
                className="text-blue-500 hover:underline"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </Dialog>
    </nav>
  );
};

export default DefaultNavbar;
