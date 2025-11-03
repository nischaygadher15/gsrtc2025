"use client";
import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import TextField from "@mui/material/TextField";

const PaymentPage = () => {
  // Trip summary
  const [sourcePlace, setSourcePlace] = useState({
    leftPart: ["21:45", "19 Nov"],
    rightPart: ["Ahmedabad", "Gita Mandir"],
  });

  const [destPlace, setDestPlace] = useState({
    leftPart: ["05:10", "20 Nov"],
    rightPart: ["Jamnagar", "Sat rasta"],
  });

  const [travelTime, setTravelTime] = useState("7h 25min");
  return (
    <div>
      <div className="w-full h-full py-5 px-4 md:px-[75px] flex gap-4 bg-[#f2f2f8]">
        <div className="w-full min-h-full bg-white md:w-3/5 flex flex-col gap-y-5">
          {/* Coupon code */}
          <div>
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id={`payment-coupon-code`}
              >
                <div className="flex items-center gap-4">
                  <LocalActivityIcon sx={{ fontSize: 24 }} />
                  <p className="font-medium text-sm">Have coupon code</p>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <form className="border rounded-lg">
                  <TextField
                    type="text"
                    // id="passenger-info-name"
                    label="Coupon code"
                    variant="filled"
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
