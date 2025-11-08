"use client";
import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GrTicket } from "react-icons/gr";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Checkbox, FormControlLabel, FormGroup, Radio } from "@mui/material";
import Image from "next/image";
import Dialog from "@mui/material/Dialog";
import Link from "next/link";
import ackoInsurance from "@/assets/images/imgi_5_ic_insurance_acko.png";

const CheckoutPage = () => {
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
    <div className="w-full h-full py-7 px-4 md:px-8 lg:px-[75px] flex flex-col md:flex-row gap-10 md:gap-4 bg-[#f2f2f8]">
      <div className="w-full min-h-full flex gap-5">
        <div className="w-3/5 flex flex-col gap-3">
          {/* Trip Details */}
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
              defaultExpanded
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
                  <p className="font-semibold text-sm">Trip Details</p>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Adipisci consequatur minima id suscipit totam voluptatum vel
                odio autem officiis modi placeat nostrum, repellat odit quis
                repellendus dolorem accusamus delectus molestias. Maiores nam
                harum molestiae excepturi, asperiores enim laudantium atque
                exercitationem doloribus dignissimos nobis tempora tenetur
                provident voluptas iste culpa eos libero natus aperiam quo
                necessitatibus incidunt optio officia modi? Neque. Earum dolores
                quisquam, cum voluptatibus dolor odit quidem autem nihil
                blanditiis molestias optio laudantium corrupti deserunt, ea eos
                deleniti sunt veniam non doloremque accusamus illum inventore
                aut maxime. Sit, saepe.
              </AccordionDetails>
            </Accordion>
          </div>

          {/* Passenger Details */}
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
              defaultExpanded
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
                  <p className="font-semibold text-sm">Passenger Details</p>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Adipisci consequatur minima id suscipit totam voluptatum vel
                odio autem officiis modi placeat nostrum, repellat odit quis
                repellendus dolorem accusamus delectus molestias. Maiores nam
                harum molestiae excepturi, asperiores enim laudantium atque
                exercitationem doloribus dignissimos nobis tempora tenetur
                provident voluptas iste culpa eos libero natus aperiam quo
                necessitatibus incidunt optio officia modi? Neque. Earum dolores
                quisquam, cum voluptatibus dolor odit quidem autem nihil
                blanditiis molestias optio laudantium corrupti deserunt, ea eos
                deleniti sunt veniam non doloremque accusamus illum inventore
                aut maxime. Sit, saepe.
              </AccordionDetails>
            </Accordion>
          </div>

          {/* Travel Insurance */}
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
              defaultExpanded
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
                  <p className="font-semibold text-sm">Travel Insurance</p>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Adipisci consequatur minima id suscipit totam voluptatum vel
                odio autem officiis modi placeat nostrum, repellat odit quis
                repellendus dolorem accusamus delectus molestias. Maiores nam
                harum molestiae excepturi, asperiores enim laudantium atque
                exercitationem doloribus dignissimos nobis tempora tenetur
                provident voluptas iste culpa eos libero natus aperiam quo
                necessitatibus incidunt optio officia modi? Neque. Earum dolores
                quisquam, cum voluptatibus dolor odit quidem autem nihil
                blanditiis molestias optio laudantium corrupti deserunt, ea eos
                deleniti sunt veniam non doloremque accusamus illum inventore
                aut maxime. Sit, saepe.
              </AccordionDetails>
            </Accordion>
          </div>

          {/* Free cancellation */}
          <div className="bg-white rounded-2xl p-4">
            <p className="font-bold">Free Cancellation</p>

            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={`₹ ${49.0}`}
              />
            </FormGroup>

            <p className="text-[#1d1d1da3] mb-2">
              Cancel 6hrs before the Bus starting time & Get Full Refund. NO
              QUESTIONS ASKED!
            </p>
            <Link href="#" className="text-blue-600 font-medium underline">
              Know More
            </Link>
          </div>

          {/* Travel Insurance */}
          <div className="bg-white rounded-2xl p-4">
            <p className="font-bold">Travel Insurance</p>
            <p className="text-[#1d1d1da3] mb-2">
              Secure your Trip with Travel Insurance for just ₹ {10} per person
            </p>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={
                  <Image
                    src={ackoInsurance}
                    width={87}
                    height={28}
                    alt="ACKO Insurance Logo"
                  />
                }
              />
            </FormGroup>

            <Link href="#" className="text-blue-600 font-medium underline">
              Know More
            </Link>
          </div>

          {/* Term and condition */}
          <FormGroup sx={{ paddingX: "16px" }}>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={
                <p className="flex items-center gap-2">
                  <span>Yes and I accept the</span>
                  <Link href="*" className="text-blue-600">
                    Terms and conditions
                  </Link>
                </p>
              }
            />
          </FormGroup>

          {/* Checkout Button */}
          <button
            type="submit"
            className={`p-3 rounded-s-full rounded-e-full w-full bg-primary/95 hover:bg-primary text-white font-semibold cursor-pointer outline-none`}
          >
            Continue to Pay ₹ {650}
          </button>
        </div>
        <div className="w-2/5 flex flex-col gap-3">
          {/* Offers */}
          <div className="p-4">
            <Accordion
              defaultExpanded
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
                  <p className="font-semibold text-sm">Offers</p>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <form className="rounded-lg">
                  <ul>
                    <li>Offer1</li>
                    <li>Offer2</li>
                    <li>Offer3</li>
                  </ul>
                  <div className="">
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
                          border: "1px solid #1d1d1da3",
                          borderRadius: "16px !important",
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
                </form>
              </AccordionDetails>
            </Accordion>
          </div>

          {/* Fare details */}
          <div className="bg-white rounded-xl p-4">
            <p className="font-bold">Fare Details</p>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="w-[80%]">
                    <p className="pt-2 text-sm text-[#1d1d1da3] font-medium">
                      Base Fare
                    </p>
                  </td>
                  <td className="pt-2 w-[20%] text-sm text-[#1d1d1da3] font-medium text-right">
                    ₹620
                  </td>
                </tr>
                <tr>
                  <td className="w-[80%] pb-4">
                    <p className="text-sm text-[#1d1d1da3] font-medium">GST</p>
                  </td>
                  <td className="w-[20%] text-sm text-[#1d1d1da3] font-medium text-right pb-4">
                    ₹30
                  </td>
                </tr>
                <tr className="border-t border-t-slate-200">
                  <td className="w-[80%] pt-4">
                    <p className="font-medium">Total Amount To Be Paid</p>
                  </td>
                  <td className="w-[20%] pt-4 font-bold text-right">₹650.00</td>
                </tr>
              </tbody>
              <p></p>
            </table>
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

export default CheckoutPage;
