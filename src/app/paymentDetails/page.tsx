"use client";
import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GrTicket } from "react-icons/gr";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { Radio } from "@mui/material";
import { RiErrorWarningLine } from "react-icons/ri";
import Image from "next/image";
import disabledQRCode from "@/assets/images/qr-disabled.svg";
import { ImSpinner8 } from "react-icons/im";
import gpay_icon from "@/assets/images/google-pay-icon.svg";
import bhimUPI_icon from "@/assets/images/bhim_upi_icon.svg";
import amazonPay_icon from "@/assets/images/amazon-pay-icon.svg";
import Dialog from "@mui/material/Dialog";
import { RiSecurePaymentLine } from "react-icons/ri";
import { IoWalletOutline } from "react-icons/io5";
import { RiThumbUpLine } from "react-icons/ri";
import LinearProgress from "@mui/material/LinearProgress";

const PaymentPage = () => {
  const [tenTimer, setTenTimer] = useState({
    a: 1,
    b: 0,
    c: 0,
    d: 0,
  });
  const [loading, setLoading] = useState(false);
  const [cancelPayDialog, setCancelPayDialog] = useState(true);
  // Trip summary
  const [sourcePlace, setSourcePlace] = useState({
    leftPart: ["21:45", "19 Nov"],
    rightPart: ["Ahmedabad", "Gita Mandir"],
  });

  const [destPlace, setDestPlace] = useState({
    leftPart: ["05:10", "20 Nov"],
    rightPart: ["Jamnagar", "Sat rasta"],
  });

  const [payByUPI, setPayByUPI] = useState<"payByQR" | "payByID" | null>(null);

  // Start Timer
  // useEffect(() => {
  //   let { a, b, c, d } = tenTimer;
  //   let timerInterval = setInterval(() => {
  //     if (a > 0 || b > 0) {
  //       setTenTimer((prev) => {
  //         if (prev.d !== 0) {
  //           return { ...prev, d: d - 1 };
  //         } else {
  //           if(prev.c !== 0){
  //             return { ...prev, c: prev.c - 1, d: d - 1 };
  //           }else{

  //           }
  //         }
  //       });
  //     }
  //   }, 1000);

  //   return () => {
  //     clearInterval(timerInterval);
  //   };
  // }, []);

  const generateQRCode = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const closeCancelPayment = () => {
    setCancelPayDialog(false);
  };

  const [travelTime, setTravelTime] = useState("7h 25min");
  return (
    <div className="">
      {/* Timer navbar */}
      <div className="w-full bg-white border-t text-slate-200 border-t-slate-200 py-5 px-8 lg:px-[75px] flex justify-between items-center shadow-md">
        <p className="font-bold text-black">Pay &#8377;{840}</p>

        {/* 10 min timer */}
        <div>
          <p className="text-sm font-bold text-[#c24b00]">
            {tenTimer.a}
            {tenTimer.b}:{tenTimer.c}
            {tenTimer.d}
          </p>
          <LinearProgress
            variant="determinate"
            value={10}
            sx={{
              "&.MuiLinearProgress-root": {
                height: "2px",
                backgroundColor: "#e2e8f0",
              },
              "& .MuiLinearProgress-bar1": {
                backgroundColor: "#c24b00",
              },
            }}
          />
        </div>
      </div>

      <div className="w-full h-full py-7 px-4 md:px-8 lg:px-[75px] flex flex-col md:flex-row gap-10 md:gap-4 bg-[#f2f2f8]">
        <div className="order-2 md:order-1 w-full min-h-full  md:w-3/5 flex flex-col gap-y-5">
          <ul className="grid grid-rows-2 sm:grid-rows-1 grid-cols-2 sm:grid-cols-3 px-3 gap-4">
            <li>
              <p className="flex sm:justify-start items-center gap-1">
                <RiSecurePaymentLine className="text-2xl" />
                <span className="text-xs">Secure Payment</span>
              </p>
            </li>
            <li>
              <p className="flex sm:justify-center items-center gap-1">
                <IoWalletOutline className="text-2xl" />
                <span className="text-xs">Superfast Refund</span>
              </p>
            </li>
            <li>
              <p className="flex sm:justify-end items-center gap-1">
                <RiThumbUpLine className="text-2xl" />
                <span className="text-xs">Trusted by 3.6+ crore Users</span>
              </p>
            </li>
          </ul>

          {/* Coupon code */}
          <div
            onClick={() => {
              let busCouponCodeInput: HTMLInputElement | null =
                document.querySelector("#busCouponCode");
              setTimeout(() => {
                if (busCouponCodeInput) busCouponCodeInput.focus();
              }, 150);
            }}
          >
            <Accordion
              sx={{
                "&.MuiAccordion-root": {
                  borderRadius: "14px",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id={`payment-coupon-code`}
              >
                <div className="py-1 flex items-center gap-4">
                  <GrTicket className="text-xl" />
                  <p className="font-semibold text-sm">Have a coupon code</p>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <form className="border rounded-lg">
                  <TextField
                    type="text"
                    id="busCouponCode"
                    label="Coupon code"
                    variant="filled"
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <button
                              type="submit"
                              className="rounded-s-full rounded-e-full p-3 text-center font-semibold bg-primary/10 hover:bg-primary/20 cursor-pointer text-sm text-black"
                            >
                              Apply
                            </button>
                          </InputAdornment>
                        ),
                      },
                    }}
                    placeholder="Enter coupon code"
                    sx={{
                      width: "100%",
                      "& .MuiFilledInput-root": {
                        fontWeight: "700 !important",
                        backgroundColor: "white !important",
                        borderRadius: "8px !important",
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
                </form>
              </AccordionDetails>
            </Accordion>
          </div>

          {/* UPI payment */}
          <div className="shadow-md rounded-2xl bg-white p-5">
            <p className="font-bold mb-5">UPI</p>

            {/* Pay through QR code */}
            <div className="border-b border-b-slate-200">
              <Accordion
                expanded={payByUPI === "payByQR"}
                sx={{
                  "&.MuiAccordion-root": {
                    boxShadow: "none",
                  },
                }}
              >
                <AccordionSummary
                  aria-controls="panel1-content"
                  id="payByQRCodeAccordian"
                  className="!p-0"
                  onClick={() => {
                    if (payByUPI !== "payByQR") setPayByUPI("payByQR");
                    else setPayByUPI(null);
                  }}
                >
                  <div className="w-full flex justify-between items-center cursor-pointer">
                    <div className="flex items-center gap-4">
                      <MdOutlineQrCodeScanner className="text-2xl" />
                      <p className="font-semibold text-base">
                        Pay through QR code
                      </p>
                    </div>
                    <div>
                      <Radio
                        checked={payByUPI === "payByQR"}
                        // onClick={handlePayByQRCode}
                        id={`payByQRCode-radio`}
                        sx={{
                          color: "#173c62",
                          "&.Mui-checked": {
                            color: "#173c62",
                          },
                        }}
                      />
                    </div>
                  </div>
                </AccordionSummary>
                <AccordionDetails className="!p-0">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-14">
                    <p className="flex items-center gap-x-2 bg-primary/10 px-2 py-1.5 rounded-lg">
                      <RiErrorWarningLine className="text-xl" />
                      <span className="text-xs font-medium">
                        Offer code / wallet amount can only be applied before
                        generating QR code
                      </span>
                    </p>
                    <button
                      type="submit"
                      className="rounded-s-full rounded-e-full p-3 text-center font-semibold bg-primary/10 hover:bg-primary/20 cursor-pointer text-sm text-black outline-none"
                    >
                      Cancel QR Code
                    </button>
                  </div>

                  {/* QR Code */}
                  <div>
                    <div className="">
                      <div className="relative flex justify-center">
                        <Image
                          src={disabledQRCode}
                          alt="Disabled QR Code"
                          width={250}
                          height={250}
                        />
                        <button
                          type="button"
                          className={`min-w-[320px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-s-full rounded-e-full ${
                            loading ? "bg-[#7d7d7d]" : "bg-primary"
                          } text-white font-semibold flex items-center justify-center gap-x-2 cursor-pointer outline-none`}
                          onClick={generateQRCode}
                        >
                          <span>
                            {!loading
                              ? "Generate QR code & pay"
                              : "Generating..."}
                          </span>
                          {loading && (
                            <ImSpinner8 className="text-2xl text-white  animate-spin" />
                          )}
                        </button>
                      </div>

                      <p className="text-xs text-[#1d1d1da3] text-center my-7">
                        Generate QR code, scan it with any UPI App
                      </p>

                      <div className="bg-[#e4ecfd] rounded-2xl mb-5">
                        <p className="font-bold text-left p-4 pb-0">
                          How this works
                        </p>
                        {/* Steps */}
                        <div className="p-4 border-b border-b-slate-200 grid grid-cols-3 grid-rows-1 gap-5">
                          <p className="flex gap-x-3 items-center">
                            <span className="text-3xl text-[#c78500] font-bold">
                              1
                            </span>
                            <span className="text-semibold text-sm">
                              Open UPI App in your phone
                            </span>
                          </p>
                          <p className="flex gap-x-3 items-center">
                            <span className="text-3xl text-[#c78500] font-bold">
                              2
                            </span>
                            <span className="text-semibold text-sm">
                              Scan this QR Code in your selected UPI App
                            </span>
                          </p>
                          <p className="flex gap-x-3 items-center">
                            <span className="text-3xl text-[#c78500] font-bold">
                              3
                            </span>
                            <span className="text-semibold text-sm">
                              Proceed to payment & enter UPI PIN
                            </span>
                          </p>
                        </div>

                        {/* Accepted UPI Apps */}
                        <div className="p-4 flex items-center gap-x-4">
                          <p className="text-sm">We accept all UPI apps like</p>
                          <Image
                            src={gpay_icon}
                            alt="Gpay Icon"
                            width={20}
                            height={20}
                          />
                          <Image
                            src={bhimUPI_icon}
                            alt="Bhim Pay Icon"
                            width={20}
                            height={20}
                          />
                          <Image
                            src={amazonPay_icon}
                            alt="Amazon Icon"
                            width={20}
                            height={20}
                          />
                          <p className="text-[#1d1d1da3] text-xs">Many more</p>
                        </div>
                      </div>

                      <p className="font-medium text-sm text-left">
                        The e-ticket will be automatically sent to you by SMS
                        and email, once the payment is confirmed.
                      </p>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>

            <div
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });

                let payByIDInput: HTMLInputElement | null =
                  document.querySelector("#payByUPIInput");
                setTimeout(() => {
                  if (payByIDInput) payByIDInput.focus();
                }, 200);
              }}
            >
              <Accordion
                expanded={payByUPI === "payByID"}
                sx={{
                  "&.MuiAccordion-root": {
                    boxShadow: "none",
                  },
                }}
              >
                <AccordionSummary
                  aria-controls="panel1-content"
                  id="payByIDAccordian"
                  className="!p-0"
                  onClick={() => {
                    if (payByUPI !== "payByID") setPayByUPI("payByID");
                    else setPayByUPI(null);
                  }}
                >
                  <div className="w-full flex justify-between items-center cursor-pointer">
                    <div className="flex items-center gap-4">
                      <Image
                        src={bhimUPI_icon}
                        alt="BHIM UPI Icon"
                        width={24}
                        height={24}
                      />
                      <p className="font-semibold text-base">
                        Pay through UPI ID
                      </p>
                    </div>
                    <div>
                      <Radio
                        checked={payByUPI === "payByID"}
                        // onClick={handlePayByQRCode}
                        id={`payByUPIID-radio`}
                        sx={{
                          color: "#173c62",
                          "&.Mui-checked": {
                            color: "#173c62",
                          },
                        }}
                      />
                    </div>
                  </div>
                </AccordionSummary>
                <AccordionDetails className="!p-0">
                  <form className="ps-10 pe-3">
                    <div className="border rounded-lg mb-4">
                      <TextField
                        type="text"
                        id="payByUPIInput"
                        label="UPI ID"
                        variant="filled"
                        placeholder="Enter upi id"
                        sx={{
                          width: "100%",
                          "& .MuiFilledInput-root": {
                            fontWeight: "700 !important",
                            backgroundColor: "white !important",
                            borderRadius: "8px !important",
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
                    <button
                      type="submit"
                      className="w-full p-3 text-white font-bold bg-primary/90 hover:bg-primary rounded-s-full rounded-e-full mb-4 cursor-pointer"
                    >
                      Pay &#8377;{840}
                    </button>
                  </form>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </div>

        <div className="order-1 md:order-2 w-full md:w-2/5">
          {/* Trip summary */}
          <div className="bg-white rounded-2xl shadow-md">
            <div className="px-4 py-5">
              <p className="font-bold text-lg">Shree Pramukhraj Travels</p>
              <p className="mb-4  text-sm text-[#1d1d1da3]">
                1 · NON A/C Sleeper (2+1)
              </p>

              <table className="mb-6">
                <tbody>
                  {/* Source place */}
                  <tr>
                    <td>
                      <div className="pe-3 py-3">
                        <p className="font-bold text-base text-left">
                          {sourcePlace.leftPart[0]}
                        </p>
                        <p className="font-medium text-xs text-left">
                          {sourcePlace.leftPart[1]}
                        </p>
                      </div>
                    </td>
                    <td className="bg-[#e6e6e6]">
                      <div className="min-w-2 max-w-2 min-h-2 max-h-2 rounded-full bg-[#4b4b4b]"></div>
                    </td>
                    <td>
                      <div className="px-4 py-3">
                        <p className="font-bold text-base text-left">
                          {sourcePlace.rightPart[0]}
                        </p>
                        <p className="font-medium text-xs text-left">
                          {sourcePlace.rightPart[1]}
                        </p>
                      </div>
                    </td>
                  </tr>

                  {/* Trip duration */}
                  <tr>
                    <td>
                      <p className="pe-3 py-3 text-xs text-left text-[#1d1d1da3]">
                        {travelTime}
                      </p>
                    </td>
                    <td className="bg-[#e6e6e6]"></td>
                    <td></td>
                  </tr>

                  {/* destination place */}
                  <tr>
                    <td>
                      <div className="pe-3 py-3">
                        <p className="font-bold text-base text-left">
                          {destPlace.leftPart[0]}
                        </p>
                        <p className="font-medium text-xs text-left">
                          {destPlace.leftPart[1]}
                        </p>
                      </div>
                    </td>
                    <td className="bg-[#e6e6e6]">
                      <div className="min-w-2 max-w-2 min-h-2 max-h-2 rounded-full bg-[#4b4b4b]"></div>
                    </td>
                    <td>
                      <div className="px-4 py-3">
                        <p className="font-bold text-base text-left">
                          {destPlace.rightPart[0]}
                        </p>
                        <p className="font-medium text-xs text-left">
                          {destPlace.rightPart[1]}
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="px-4 py-5 border-t border-t-slate-200">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="w-[70%]">
                      <p className="font-semibold">Passenger 1</p>
                      <p className="text-[#1d1d1da3]">MALE, 30 years</p>
                    </td>
                    <td className="w-[30%] text-xs text-right">Seat No. 5</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="px-4 py-5 border-t border-t-slate-200">
              <p className="mb-4 font-semibold">Your ticket will be sent to</p>
              <p className="mb-4 text-sm">abc@gmail.com</p>
              <p className="mb-4 text-sm">1234567890</p>
            </div>

            <div className="px-4 py-5 border-t border-t-slate-200">
              <div className="mb-5">
                <p className="font-bold">Fare breakup</p>
                <p className="text-sm text-[#1d1d1da3]">1 Seat</p>
              </div>

              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="w-[80%]">
                      <p className="font-medium">Base Fare</p>
                    </td>
                    <td className="w-[20%] font-bold text-right">&#8377;550</td>
                  </tr>
                  <tr>
                    <td className="w-[80%]">
                      <p className="font-medium">GST</p>
                    </td>
                    <td className="w-[20%] font-bold text-right">
                      &#8377;27.50
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="px-4 py-5 border-t border-t-slate-200">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="w-[80%]">
                      <p className="font-semibold text-lg">Total</p>
                    </td>
                    <td className="w-[20%] font-semibold text-lg text-right">
                      &#8377;550
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel payment model */}
      <Dialog
        onClose={closeCancelPayment}
        open={cancelPayDialog}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "16px",
          },
        }}
      >
        <div className="p-4 rounded-2xl max-w-lg">
          <p className="text-2xl font-bold text-center mt-4">
            Cancel UPI Payment?
          </p>
          <p className="text-center p-7 pt-4">
            Cancelling will not affect your other payment methods, you can still
            continue with other options.
          </p>
          <button
            type="button"
            className="w-full p-3 text-white font-bold bg-primary/90 hover:bg-primary rounded-s-full rounded-e-full mb-4 cursor-pointer"
            onClick={closeCancelPayment}
          >
            Continue UPI Payment
          </button>
          <button
            type="button"
            className="w-full p-3 font-bold bg-white hover:bg-primary/10 rounded-s-full rounded-e-full border cursor-pointer"
            onClick={closeCancelPayment}
          >
            Yes, Cancel
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default PaymentPage;
