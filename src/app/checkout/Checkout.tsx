"use client";
import React, { useEffect, useState } from "react";
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
  RadioGroup,
  Switch,
} from "@mui/material";
import Image from "next/image";
import Dialog from "@mui/material/Dialog";
import Link from "next/link";
import ackoInsurance from "@/assets/images/imgi_5_ic_insurance_acko.png";
import { FaCircleCheck, FaCircleUser } from "react-icons/fa6";
import { IoMdArrowDropdown, IoMdClose } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import useWindowSize from "@/Hooks/useWindowSize";
import { useRouter } from "next/navigation";

// Types
interface PassengerInfo {
  name: string;
  age: number;
  gender: "male" | "female";
  editFlag: boolean;
}

const CheckoutPage = () => {
  let router = useRouter();
  const windowSize = useWindowSize();
  const [cancelPayDialog, setCancelPayDialog] = useState<boolean>(false);
  const passengers: PassengerInfo[] = [
    {
      name: "Ram",
      age: 30,
      gender: "male",
      editFlag: false,
    },
    {
      name: "Sita",
      age: 30,
      gender: "female",
      editFlag: false,
    },
    {
      name: "Laxman",
      age: 26,
      gender: "male",
      editFlag: false,
    },
  ];
  const [passengerInfo, setPassengerInfo] = useState<PassengerInfo[]>([
    ...passengers,
  ]);
  const [contactInfoEdit, setContactInfoEdit] = useState<boolean>(false);

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

  //Residence State

  interface StateInfoType {
    id: number;
    state: string;
    code: string;
  }

  const indiaStatesAndUTs: StateInfoType[] = [
    { id: 0, state: "Andhra Pradesh", code: "AP" },
    { id: 1, state: "Arunachal Pradesh", code: "AR" },
    { id: 2, state: "Assam", code: "AS" },
    { id: 3, state: "Bihar", code: "BR" },
    { id: 4, state: "Chhattisgarh", code: "CG" },
    { id: 5, state: "Goa", code: "GA" },
    { id: 6, state: "Gujarat", code: "GJ" },
    { id: 7, state: "Haryana", code: "HR" },
    { id: 8, state: "Himachal Pradesh", code: "HP" },
    { id: 9, state: "Jharkhand", code: "JH" },
    { id: 10, state: "Karnataka", code: "KA" },
    { id: 11, state: "Kerala", code: "KL" },
    { id: 12, state: "Madhya Pradesh", code: "MP" },
    { id: 13, state: "Maharashtra", code: "MH" },
    { id: 14, state: "Manipur", code: "MN" },
    { id: 15, state: "Meghalaya", code: "ML" },
    { id: 16, state: "Mizoram", code: "MZ" },
    { id: 17, state: "Nagaland", code: "NL" },
    { id: 18, state: "Odisha", code: "OD" },
    { id: 19, state: "Punjab", code: "PB" },
    { id: 20, state: "Rajasthan", code: "RJ" },
    { id: 21, state: "Sikkim", code: "SK" },
    { id: 22, state: "Tamil Nadu", code: "TN" },
    { id: 23, state: "Telangana", code: "TS" },
    { id: 24, state: "Tripura", code: "TR" },
    { id: 25, state: "Uttar Pradesh", code: "UP" },
    { id: 26, state: "Uttarakhand", code: "UK" },
    { id: 27, state: "West Bengal", code: "WB" },
    // Union Territories
    { id: 28, state: "Andaman and Nicobar Islands", code: "AN" },
    { id: 29, state: "Chandigarh", code: "CH" },
    { id: 30, state: "Dadra and Nagar Haveli and Daman and Diu", code: "DN" },
    { id: 31, state: "Delhi", code: "DL" },
    { id: 32, state: "Jammu and Kashmir", code: "JK" },
    { id: 33, state: "Ladakh", code: "LA" },
    { id: 34, state: "Lakshadweep", code: "LD" },
    { id: 35, state: "Puducherry", code: "PY" },
  ];
  const [contactInfoState, setContactInfoState] = useState<boolean>(false);
  const [stateName, setStateName] = useState<string>("Select state");
  const [filteredStatesList, setFilteredStatesList] =
    useState<StateInfoType[]>(indiaStatesAndUTs);

  const closeStateDialog = () => {
    setContactInfoState(false);
    setFilteredStatesList(indiaStatesAndUTs);
  };

  const SearchStatesList = (text: string, contList: StateInfoType[]) => {
    const filtered: StateInfoType[] = contList.filter(
      (states) =>
        states.state.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
        states.code.toLocaleLowerCase().includes(text.toLocaleLowerCase())
    );
    setFilteredStatesList(filtered);
  };

  return (
    <div className="w-full h-full py-7 px-4 md:px-8 lg:px-[75px] flex flex-col md:flex-row gap-10 md:gap-4 bg-[#f2f2f8]">
      <div className="w-full min-h-full flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-3/5 flex flex-col gap-4">
          {/* Trip Details */}
          <div>
            <Accordion
              defaultExpanded
              sx={{
                "&.MuiAccordion-root": {
                  borderRadius: "14px",
                },
                "& .Mui-expanded": {
                  margin: "0px !important",
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
                  <div className="flex justify-between items-center gap-3 mb-5">
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
                            <p className="flex flex-col md:flex-row gap-2">
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
                          <p className="hidden xs:block -translate-y-1/4 border-b-2 border-b-slate-200 pb-1.5 text-center font-semibold text-sm text-[#1d1d1da3]">
                            <span>7hr 30min</span>
                          </p>
                        </td>
                        <td className="w-2/5 py-4">
                          <div className="flex justify-end">
                            <div className="flex flex-col items-start">
                              <p className="flex flex-col md:flex-row gap-2">
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

          {/* Passenger + Contact Details */}
          <div className="w-full p-4 rounded-2xl shadow-md bg-white">
            <ul className="flex flex-col gap-4">
              {/* Contact details form */}
              <li>
                <Accordion
                  defaultExpanded
                  sx={{
                    "&.MuiAccordion-root": {
                      boxShadow: "none !important",
                      borderRadius: "0px",
                      borderBottom: "1px solid #cad5e2",
                    },
                    "& .MuiAccordionSummary-root": {
                      padding: "0px",
                    },
                    "& .Mui-expanded": {
                      margin: "0px !important",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id={`passenger-contact-information`}
                  >
                    <div className="flex items-center gap-4">
                      <FaCircleUser className="text-4xl" />
                      <div>
                        <p className="font-bold">Contact details</p>
                      </div>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails className="!p-0">
                    <form className="w-full">
                      {/* Edit button */}
                      <div className="w-full flex justify-between mb-2">
                        <p className="text-sm text-[#1d1d1da3]">
                          Ticket details will be sent to
                        </p>
                        <button
                          type="button"
                          className=" hover:text-primary cursor-pointer flex gap-1"
                          onClick={() => setContactInfoEdit(true)}
                        >
                          <FaEdit className="text-xl" />
                          <span className="font-semibold">Edit</span>
                        </button>
                      </div>

                      {/* Phone no. */}
                      <div className="flex mb-4">
                        <button
                          disabled={!contactInfoEdit}
                          type="button"
                          className={`disabled:bg-[#e0e0e0] px-3 flex flex-col justify-center border-t border-b border-s rounded-ss-lg rounded-es-lg ${
                            contactInfoEdit ? "cursor-pointer" : ""
                          }`}
                        >
                          <p className="text-xs text-[#1d1d1da3]">
                            Country Code
                          </p>
                          <p className="flex items-center gap-x-1 font-semibold">
                            <span>+91 (IND)</span>
                            <IoMdArrowDropdown className="text-xl" />
                          </p>
                        </button>
                        <div className="flex-1 border rounded-se-lg rounded-ee-lg">
                          <TextField
                            disabled={!contactInfoEdit}
                            type="number"
                            id="contact-info-phone"
                            label="Phone*"
                            placeholder="Enter phone no."
                            variant="filled"
                            error={true}
                            sx={{
                              width: "100%",
                              "& .MuiFilledInput-root": {
                                fontWeight: "700",
                                backgroundColor: contactInfoEdit
                                  ? "white !important"
                                  : "",
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
                          disabled={!contactInfoEdit}
                          type="text"
                          id="contact-info-email-id"
                          label="Email ID"
                          variant="filled"
                          placeholder="Enter email id"
                          sx={{
                            width: "100%",
                            "& .MuiFilledInput-root": {
                              fontWeight: "700",
                              backgroundColor: contactInfoEdit
                                ? "white !important"
                                : "",
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

                      {/* Residence State */}
                      <button
                        type="button"
                        disabled={!contactInfoEdit}
                        className={`w-full flex disabled:bg-[#e0e0e0] border rounded-lg justify-between items-center px-3 py-2 ${
                          contactInfoEdit ? "cursor-pointer" : ""
                        } mb-5`}
                        onClick={() => {
                          setContactInfoState(true);
                        }}
                      >
                        <div className="flex-1 flex flex-col items-start">
                          <p className="text-sm text-[#1d1d1da3]">
                            State of Residence*
                          </p>
                          <p className="text-left text-[#1d1d1da3] font-bold">
                            {stateName}
                          </p>
                        </div>
                        <IoMdArrowDropdown className="text-lg" />
                      </button>

                      {/* Residence State Dialog */}
                      <Dialog
                        fullScreen={windowSize > 640 ? false : true}
                        onClose={closeStateDialog}
                        open={contactInfoState}
                        sx={{
                          "& .MuiDialog-paper": {
                            overflow: "hidden",
                            borderRadius: windowSize > 640 ? "16px" : "0px",
                          },
                        }}
                      >
                        <div className="relative w-full sm:w-lg overflow-y-auto hideScrollBar">
                          <div className="sticky top-0 left-0 right-0 bg-white z-[1000] shadow-sm p-4">
                            <div className="flex justify-between items-center mb-7">
                              <p className="font-bold">
                                Select state of residence
                              </p>
                              <button
                                type="button"
                                className="rounded-s-full rounded-e-full px-3.5 py-2.5 bg-slate-200 hover:bg-slate-300"
                                onClick={closeStateDialog}
                              >
                                <IoMdClose className="text-2xl" />
                              </button>
                            </div>
                            <input
                              type="text"
                              className="py-4 px-5 w-full h-full rounded-s-full rounded-e-full bg-[#f2f2f8] placeholder:text-gray-500 outline-none"
                              placeholder="Search for state"
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) =>
                                SearchStatesList(
                                  e.currentTarget.value,
                                  indiaStatesAndUTs
                                )
                              }
                            />
                          </div>
                          <RadioGroup
                            value={
                              indiaStatesAndUTs.find(
                                (st) => st.state == stateName
                              )?.code
                            }
                            name="radio-buttons-state"
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setStateName(() => {
                                let index = indiaStatesAndUTs.findIndex(
                                  (state) => state.code == event.target.value
                                );
                                return indiaStatesAndUTs[index].state;
                              });
                            }}
                          >
                            <ul className="">
                              {filteredStatesList &&
                                filteredStatesList.map((st, inx, stArr) => (
                                  <li key={`state-code-${st.id}`}>
                                    <label
                                      htmlFor={`state-options-${st.id}`}
                                      className={`flex justify-between items-center font-medium cursor-pointer px-4 py-2.5 ${
                                        inx !== stArr.length - 1
                                          ? "border-b border-b-slate-200"
                                          : ""
                                      }`}
                                    >
                                      <span>{st.state}</span>
                                      <Radio
                                        id={`state-options-${st.id}`}
                                        onClick={closeStateDialog}
                                        value={st.code}
                                        sx={{
                                          color: "#173c62",
                                          "&.Mui-checked": {
                                            color: "#173c62",
                                          },
                                        }}
                                      />
                                    </label>
                                  </li>
                                ))}

                              {filteredStatesList &&
                                filteredStatesList.length <= 0 && (
                                  <li>
                                    <p className="px-4 py-5 text-center font-semibold">
                                      No state found
                                    </p>
                                  </li>
                                )}
                            </ul>
                          </RadioGroup>
                        </div>
                      </Dialog>

                      {/* WhatsApp commumication 2 */}
                      <div className="flex justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <FaWhatsapp className="text-[#25d366] text-4xl" />
                          <span className="text-sm">
                            Send booking details and trip updates on WhatsApp
                          </span>
                        </div>
                        <Switch
                          disabled={!contactInfoEdit}
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
                  </AccordionDetails>
                </Accordion>
              </li>
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
                        "& .Mui-expanded": {
                          margin: "0px !important",
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
                            <p className="font-bold">Passenger {inx + 1}</p>
                            <p className="text-sm text-[#1d1d1da3]">
                              Male seat · Seat H, Upper Deck
                            </p>
                          </div>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails className="!p-0">
                        <form>
                          {/* Edit button */}
                          <div className="flex justify-end">
                            <button
                              type="button"
                              className="p-3 pt-0 hover:text-primary cursor-pointer flex gap-1"
                              onClick={() =>
                                setPassengerInfo((prev) => {
                                  let tempPrev = [...prev];
                                  tempPrev[inx].editFlag = true;
                                  return tempPrev;
                                })
                              }
                            >
                              <FaEdit className="text-xl" />
                              <span className="font-semibold">Edit</span>
                            </button>
                          </div>

                          {/* Name */}
                          <div className="mb-4 border rounded-lg">
                            <TextField
                              disabled={!passengerInfo[inx].editFlag}
                              type="text"
                              // id="passenger-info-name"
                              label="Name*"
                              variant="filled"
                              placeholder="Enter name"
                              sx={{
                                width: "100%",
                                "& .MuiFilledInput-root": {
                                  fontWeight: "700 !important",
                                  backgroundColor: passengerInfo[inx].editFlag
                                    ? "white !important"
                                    : "",
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
                              disabled={!passengerInfo[inx].editFlag}
                              type="text"
                              // id="passenger-info-age"
                              label="Age*"
                              variant="filled"
                              placeholder="Enter age"
                              sx={{
                                width: "100%",
                                "& .MuiFilledInput-root": {
                                  fontWeight: "700 !important",
                                  backgroundColor: passengerInfo[inx].editFlag
                                    ? "white !important"
                                    : "",
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
                            <p className="text-[#1d1d1da3] mb-1">Gender*</p>
                            <div className="flex gap-x-2">
                              {/* Female */}
                              <label
                                htmlFor={`passengerGenderFemale-${inx}`}
                                className={`w-1/2 ps-4 ${
                                  passengerInfo[inx].editFlag
                                    ? "cursor-pointer"
                                    : "bg-[#e0e0e0]"
                                } rounded-s-full rounded-e-full border flex items-center justify-between`}
                              >
                                <p className="font-semibold">Female</p>
                                <Radio
                                  disabled={!passengerInfo[inx].editFlag}
                                  id={`passengerGenderFemale-${inx}`}
                                  sx={{
                                    color: "#173c62",
                                    "&.Mui-checked": {
                                      color: "#173c62",
                                    },
                                  }}
                                  checked={
                                    passengerInfo[inx].gender === "female"
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
                                className={`w-1/2 ${
                                  passengerInfo[inx].editFlag
                                    ? "cursor-pointer"
                                    : "bg-[#e0e0e0]"
                                } ps-4 rounded-s-full rounded-e-full border flex items-center justify-between`}
                              >
                                <p className="font-semibold">Male</p>
                                <Radio
                                  disabled={!passengerInfo[inx].editFlag}
                                  id={`passengerGenderMale-${inx}`}
                                  sx={{
                                    color: "#173c62",
                                    "&.Mui-checked": {
                                      color: "#173c62",
                                    },
                                  }}
                                  checked={passengerInfo[inx].gender === "male"}
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

        <div className="w-full md:w-2/5 flex flex-col gap-4">
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
                "& .Mui-expanded": {
                  margin: "0px !important",
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
                "& .Mui-expanded": {
                  margin: "0px !important",
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
                    label={
                      <span className="font-semibold text-lg">
                        &#8377; {49.0}
                      </span>
                    }
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
                "& .Mui-expanded": {
                  margin: "0px !important",
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
                    &#8377;620
                  </td>
                </tr>
                <tr>
                  <td className="w-[80%]">
                    <p className="pt-2 text-sm text-[#1d1d1da3] font-medium">
                      Free Cancellation
                    </p>
                  </td>
                  <td className="pt-2 w-[20%] text-sm text-[#1d1d1da3] font-medium text-right">
                    &#8377;49
                  </td>
                </tr>
                <tr>
                  <td className="w-[80%]">
                    <p className="pt-2 text-sm text-[#1d1d1da3] font-medium">
                      Travel Insurance
                    </p>
                  </td>
                  <td className="pt-2 w-[20%] text-sm text-[#1d1d1da3] font-medium text-right">
                    &#8377;30
                  </td>
                </tr>
                <tr>
                  <td className="w-[80%] pt-2 pb-4">
                    <p className="text-sm text-[#1d1d1da3] font-medium">GST</p>
                  </td>
                  <td className="w-[20%] pt-2 pb-4 text-sm text-[#1d1d1da3] font-medium text-right">
                    &#8377;30
                  </td>
                </tr>
                <tr className="border-t border-t-slate-200">
                  <td className="w-[80%] pt-4">
                    <p className="font-medium">Total Amount To Be Paid</p>
                  </td>
                  <td className="w-[20%] pt-4 font-bold text-right">
                    &#8377;729.00
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Term and condition */}

          <FormControlLabel
            sx={{
              "&.MuiFormControlLabel-root": {
                margin: "0px",
                paddingLeft: "8px",
              },
            }}
            control={<Checkbox />}
            label={
              <p className="flex flex-wrap items-center gap-1">
                <span className="text-sm">Yes and I accept the</span>
                <Link href="#" className="text-blue-600 text-sm">
                  Terms and conditions
                </Link>
              </p>
            }
          />

          {/* Checkout Button */}
          <button
            type="submit"
            className={`p-3 rounded-s-full rounded-e-full w-full bg-primary/95 hover:bg-primary text-white font-semibold cursor-pointer outline-none`}
            onClick={() => router.push("/ticket/view/1")}
          >
            Continue to Pay ₹ {729.0}
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
          <p className="text-center pb-7 sm:p-7 pt-4">
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
