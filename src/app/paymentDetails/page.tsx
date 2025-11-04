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

const PaymentPage = () => {
  const [loading, setLoading] = useState(false);
  // Trip summary
  const [sourcePlace, setSourcePlace] = useState({
    leftPart: ["21:45", "19 Nov"],
    rightPart: ["Ahmedabad", "Gita Mandir"],
  });

  const [destPlace, setDestPlace] = useState({
    leftPart: ["05:10", "20 Nov"],
    rightPart: ["Jamnagar", "Sat rasta"],
  });

  const [payByQRCode, setPayByQRCode] = useState(false);

  const handlePayByQRCode = () => {
    console.log("payByQRCode:", payByQRCode);
    setPayByQRCode(!payByQRCode);
  };

  useEffect(() => {
    console.log("payByQRCode:", payByQRCode);
  }, [payByQRCode]);

  const generateQRCode = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const [travelTime, setTravelTime] = useState("7h 25min");
  return (
    <div>
      <div className="w-full h-full py-5 px-4 md:px-[75px] flex gap-4 bg-[#f2f2f8]">
        <div className="w-full min-h-full  md:w-3/5 flex flex-col gap-y-5">
          {/* Coupon code */}
          <div>
            <Accordion
              sx={{
                "&.MuiAccordion-root": {
                  borderRadius: "16px",
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
                    // id="passenger-info-name"
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
            <div>
              <Accordion
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
                  onClick={handlePayByQRCode}
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
                        checked={payByQRCode}
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
                      className="rounded-s-full rounded-e-full p-3 text-center font-semibold bg-primary/10 hover:bg-primary/20 cursor-pointer text-sm text-black"
                    >
                      Cancel QR Code
                    </button>
                  </div>

                  {/* QR Code */}
                  <div>
                    <div></div>
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
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </div>

        <div className="w-2/5 hidden md:block">
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
    </div>
  );
};

export default PaymentPage;
