"use client";
import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GrTicket } from "react-icons/gr";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  Switch,
} from "@mui/material";
import Image from "next/image";
import Dialog from "@mui/material/Dialog";
import Link from "next/link";
import ackoInsurance from "@/assets/images/imgi_5_ic_insurance_acko.png";
import { FaCircleCheck, FaCircleUser } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";

// Types
interface PassengerInfo {
  name: string;
  age: number;
  gender: "male" | "female";
}

const CheckoutPage = () => {
  const [loading, setLoading] = useState(false);
  const [cancelPayDialog, setCancelPayDialog] = useState(true);
  const passengers: PassengerInfo[] = [
    {
      name: "Ram",
      age: 30,
      gender: "male",
    },
    {
      name: "Sita",
      age: 30,
      gender: "female",
    },
    {
      name: "Laxman",
      age: 26,
      gender: "male",
    },
  ];
  const [passengerInfo, setPassengerInfo] = useState<PassengerInfo[]>([
    ...passengers,
  ]);

  // Passenger Gender
  const handleGenderChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    passengerInfo[index].gender = event.target.value as "male" | "female";
    setPassengerInfo([...passengerInfo]);
  };

  //Close cancel payment dialog
  const closeCancelPayment = () => {
    setCancelPayDialog(false);
  };

  return (
    <div className="w-full h-full py-7 px-4 md:px-8 lg:px-[75px] flex flex-col md:flex-row gap-10 md:gap-4 bg-[#f2f2f8]">
      <div className="w-full min-h-full flex gap-5">
        <div className="w-3/5 flex flex-col gap-4">
          {/* Trip Details */}
          <div>
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
                  <FaCircleCheck className="text-xl text-primary" />
                  <p className="font-semibold text-lg">Trip Details</p>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  <div className="flex justify-between items-center mb-7">
                    <p className="flex flex-col">
                      <span className="font-semibold">
                        Gurjarnagari Express
                      </span>
                      <span className="text-sm text-[#1d1d1da3]">
                        NON AC Seater / Sleeper 2+1
                      </span>
                    </p>
                    <p className="font-semibold">Sear No : 15</p>
                  </div>

                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td className="w-2/5 py-4">
                          <div className="flex flex-col">
                            <p className="flex gap-2">
                              <span className="font-bold text-lg leading-none">
                                23:30
                              </span>
                              <span className="text-sm text-[#1d1d1da3]">
                                22 Nov, Sat
                              </span>
                            </p>
                            <p className="font-semibold">Ahmedabad</p>
                          </div>
                        </td>
                        <td className="w-1/5">
                          <p className="-translate-y-1/4 border-b-2 border-b-slate-200 pb-1.5 text-center font-semibold text-sm text-[#1d1d1da3]">
                            7hr 30min
                          </p>
                        </td>
                        <td className="w-2/5 py-4">
                          <div className="flex justify-end">
                            <div className="flex flex-col items-start">
                              <p className="flex gap-2">
                                <span className="font-bold text-lg leading-none">
                                  04:30
                                </span>
                                <span className="text-sm text-[#1d1d1da3]">
                                  23 Nov, Sun
                                </span>
                              </p>
                              <p className="font-semibold">Jamnagar</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>

          {/* Passenger Details */}
          <div>
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
                  <p className="font-bold text-lg">Passengers Details</p>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className="w-full flex flex-col gap-y-5">
                  {/* Contact details form */}
                  <form className="w-full p-4 rounded-2xl border border-slate-300 bg-white">
                    <div className="mb-3">
                      <p className="text-xl font-bold">Contact details</p>
                      <p className="text-sm text-[#1d1d1da3]">
                        Ticket details will be sent to
                      </p>
                    </div>

                    {/* Phone no. */}
                    <div className="flex mb-4">
                      <button
                        type="button"
                        className="px-3 flex flex-col justify-center border-t border-b border-s rounded-ss-lg rounded-es-lg"
                      >
                        <p className="text-xs text-[#1d1d1da3]">Country Code</p>
                        <p className="flex items-center gap-x-1 font-semibold">
                          <span>+91 (IND)</span>
                          <IoMdArrowDropdown className="text-xl" />
                        </p>
                      </button>
                      <div className="flex-1 border rounded-se-lg rounded-ee-lg">
                        <TextField
                          disabled
                          type="number"
                          id="contact-info-phone"
                          label="Phone*"
                          placeholder="Enter phone no."
                          variant="filled"
                          error={true}
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
                    </div>

                    {/* Email */}
                    <div className="mb-4 border rounded-lg">
                      <TextField
                        disabled
                        type="text"
                        id="contact-info-email-id"
                        label="Email ID"
                        variant="filled"
                        placeholder="Enter email id"
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

                    {/* Residence */}
                    <div className="flex border rounded-lg justify-between items-center px-3 py-2 cursor-pointer mb-5">
                      <div>
                        <p className="text-sm text-[#1d1d1da3]">
                          State of Residence*
                        </p>
                        {/* <p className="font-semibold opacity-0"></p> */}
                        <input
                          type="text"
                          disabled
                          placeholder="Select state"
                          className="placeholder:font-bold"
                        />
                      </div>
                      <IoMdArrowDropdown className="text-lg" />
                    </div>

                    {/* WhatsApp commumication2 */}
                    <div className="flex justify-between">
                      <div className="flex items-center gap-3">
                        <FaWhatsapp className="text-[#25d366] text-4xl" />
                        <span className="text-sm">
                          Send booking details and trip updates on WhatsApp
                        </span>
                      </div>
                      <Switch
                        disabled
                        sx={{
                          "& .Mui-checked": {
                            color: "#173c62 !important",
                          },
                          "& .MuiSwitch-track": {
                            backgroundColor: "#173c62 !important",
                          },
                        }}
                      />
                    </div>
                  </form>

                  {/* List for passengers */}
                  <div className="w-full p-4 rounded-2xl border border-slate-300 bg-white">
                    <ul className="flex flex-col gap-4">
                      {passengers &&
                        passengers.map((passenger, inx) => (
                          <li key={`passengerInfo-${inx}`}>
                            <Accordion
                              defaultExpanded
                              sx={{
                                "&.MuiAccordion-root": {
                                  boxShadow: "none !important",
                                  borderRadius: "0px",
                                  borderBottom:
                                    inx != passengers.length - 1
                                      ? "1px solid #cad5e2"
                                      : "",
                                },
                                "& .MuiAccordionSummary-root": {
                                  padding: "0px",
                                },
                              }}
                            >
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id={`pasenger-accordian-${inx}`}
                              >
                                <div className="flex items-center gap-4">
                                  <FaCircleUser className="text-4xl" />
                                  <div>
                                    <p className="font-bold">
                                      Passenger {inx + 1}
                                    </p>
                                    <p className="text-sm text-[#1d1d1da3]">
                                      Male seat · Seat H, Upper Deck
                                    </p>
                                  </div>
                                </div>
                              </AccordionSummary>
                              <AccordionDetails className="!p-0">
                                <form>
                                  {/* Name */}
                                  <div className="mb-4 border rounded-lg">
                                    <TextField
                                      disabled
                                      type="text"
                                      // id="passenger-info-name"
                                      label="Name*"
                                      variant="filled"
                                      placeholder="Enter name"
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

                                  {/* Age */}
                                  <div className="mb-4 border rounded-lg">
                                    <TextField
                                      disabled
                                      type="text"
                                      // id="passenger-info-age"
                                      label="Age*"
                                      variant="filled"
                                      placeholder="Enter age"
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

                                  {/* Gender */}
                                  <div className="pb-5">
                                    <p className="text-[#1d1d1da3] mb-1">
                                      Gender*
                                    </p>
                                    <div className="flex gap-x-2">
                                      {/* Female */}
                                      <label
                                        htmlFor={`passengerGenderFemale-${inx}`}
                                        className="w-1/2 ps-4 rounded-s-full rounded-e-full border flex items-center justify-between cursor-pointer"
                                      >
                                        <p className="font-semibold">Female</p>
                                        <Radio
                                          disabled
                                          id={`passengerGenderFemale-${inx}`}
                                          sx={{
                                            color: "#173c62",
                                            "&.Mui-checked": {
                                              color: "#173c62",
                                            },
                                          }}
                                          checked={
                                            passengerInfo[inx].gender ===
                                            "female"
                                          }
                                          onChange={(
                                            event: React.ChangeEvent<HTMLInputElement>
                                          ) => handleGenderChange(event, inx)}
                                          value="female"
                                          name={`passenger-gender-${inx}`}
                                        />
                                      </label>

                                      {/* Male */}
                                      <label
                                        htmlFor={`passengerGenderMale-${inx}`}
                                        className="w-1/2 ps-4 rounded-s-full rounded-e-full border flex items-center justify-between cursor-pointer"
                                      >
                                        <p className="font-semibold">Male</p>
                                        <Radio
                                          disabled
                                          id={`passengerGenderMale-${inx}`}
                                          sx={{
                                            color: "#173c62",
                                            "&.Mui-checked": {
                                              color: "#173c62",
                                            },
                                          }}
                                          checked={
                                            passengerInfo[inx].gender === "male"
                                          }
                                          onChange={(
                                            event: React.ChangeEvent<HTMLInputElement>
                                          ) => handleGenderChange(event, inx)}
                                          value="male"
                                          name={`passenger-gender-${inx}`}
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </form>
                              </AccordionDetails>
                            </Accordion>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>

        <div className="w-2/5 flex flex-col gap-4">
          {/* Offers */}
          <div
            className=""
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
                  <p className="font-bold">Have a coupon code</p>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <form className="rounded-lg">
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

          {/* Free cancellation */}
          <div>
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
                  <p className="font-bold">Free Cancellation</p>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={`₹ ${49.0}`}
                  />

                  <p className="text-[#1d1d1da3] mb-2">
                    Cancel 6hrs before the Bus starting time & Get Full Refund.
                    NO QUESTIONS ASKED!
                  </p>
                  <Link
                    href="#"
                    className="text-blue-600 font-medium underline"
                  >
                    Know More
                  </Link>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>

          {/* Travel Insurance */}
          <div>
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
                  <p className="font-bold">Travel Insurance</p>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  <p className="text-[#1d1d1da3] mb-2">
                    Secure your Trip with Travel Insurance for just ₹ {10} per
                    person
                  </p>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
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

                  <Link
                    href="#"
                    className="text-blue-600 font-medium underline"
                  >
                    Know More
                  </Link>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>

          {/* Fare details */}
          <div className="bg-white rounded-xl p-4 shadow-md">
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
            </table>
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
