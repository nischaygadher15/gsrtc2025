import Popover from "@mui/material/Popover";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useState } from "react";

const BookingCard = () => {
  const [dotsAnchor, setDotsAnchor] = useState<HTMLButtonElement | null>(null);

  const openDotMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDotsAnchor(event.currentTarget);
  };

  const closeDotMenu = () => {
    setDotsAnchor(null);
  };
  return (
    <div className="relative">
      <Accordion
        sx={{
          "&.MuiAccordion-root": {
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          },
          "& .Mui-expanded": {
            margin: 0,
          },
        }}
      >
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="confirmed-ticket-accordian"
          className="!p-4 !m-0 bg-white"
        >
          <div className="w-full h-full">
            <div className="pe-8 sm:pe-12 flex flex-col md:flex-row gap-5">
              <div className="w-full md:w-1/2 flex justify-between gap-5">
                <div className="w-[40%]">
                  <div className=" inline-flex flex-col gap-1">
                    <p className="text-4xl text-primary text-center font-semibold leading-none">
                      20
                    </p>
                    <p className="sm:text-nowrap">December 2025</p>
                    <p className="font-semibold text-center">Friday</p>
                  </div>
                </div>

                <div className="flex flex-col gap-1 w-[60%]">
                  <p className="font-semibold text-xl text-right md:text-left">
                    Ahmedabad - Surat
                  </p>
                  <p className="font-medium text-sm text-right md:text-left">
                    GSRTC
                  </p>
                </div>
              </div>

              <div className="w-full md:w-1/2 flex justify-between gap-5">
                <div className="w-[60%]">
                  <p className="font-semibold text-sm text-left">Boarding</p>
                  <p className="font-medium text-sm text-left text-[#1d1d1da3]">
                    Ahmedabad
                  </p>
                </div>

                <div className="flex flex-col items-end w-[40%]">
                  <p className="font-semibold text-sm text-left">Completed</p>
                  <p className="sm:text-nowrap text-sm font-medium text-right text-[#1d1d1da3]">
                    PNR No: {"XXXXXXXXX"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AccordionSummary>

        <AccordionDetails className="">
          <div className="sm:px-4 md:px-7 lg:px-15 border-t border-t-slate-200">
            {/* Travel details */}
            <div className="py-7 ">
              <p className="mb-4 font-medium text-center text-[#1d1d1da3]">
                Travel Details
              </p>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">GSRTC</p>
                  <p className="text-[#1d1d1da3] text-sm font-medium">
                    Non AC Seater (2+1)
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Depature Time</p>
                  <p className="font-medium text-sm text-[#1d1d1da3]">
                    04:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Passenger details */}
            <div className="py-7 border-t border-t-slate-200">
              <p className="font-medium text-center text-[#1d1d1da3]">
                Passenger Details
              </p>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="p-1 text-sm font-semibold text-left">
                      Seat
                    </th>
                    <th className="p-1 text-sm font-semibold text-left">
                      Name
                    </th>
                    <th className="p-1 text-sm font-semibold text-center">
                      Age
                    </th>
                    <th className="p-1 text-sm font-semibold text-center">
                      Gender
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-1 font-semibold text-left">11</td>
                    <td className="p-1 font-semibold text-left">
                      NISCHAY K GADHER
                    </td>
                    <td className="p-1 font-semibold text-center">30</td>
                    <td className="p-1 font-semibold text-center">MALE</td>
                  </tr>
                  <tr>
                    <td className="p-1 font-semibold text-left">12</td>
                    <td className="p-1 font-semibold text-left">
                      MAHADEV AHIR
                    </td>
                    <td className="p-1 font-semibold text-center">26</td>
                    <td className="p-1 font-semibold text-center">MALE</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Fare details */}
            <div className="border-t border-t-slate-200 pt-7 ">
              <p className="font-medium text-center text-[#1d1d1da3]">
                Payment Details
              </p>
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
                      <p className="text-sm text-[#1d1d1da3] font-medium">
                        GST
                      </p>
                    </td>
                    <td className="w-[20%] pt-2 pb-4 text-sm text-[#1d1d1da3] font-medium text-right">
                      &#8377;30
                    </td>
                  </tr>
                  <tr className="">
                    <td className="w-[80%]">
                      <p className="font-medium">Total Amount Paid</p>
                    </td>
                    <td className="w-[20%] font-bold text-right">
                      &#8377;729.00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      <div className="z-10 absolute top-4 right-0 sm:right-4">
        <button
          type="button"
          className="p-3 text-[#1d1d1da3] hover:text-black cursor-pointer"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            openDotMenu(e);
          }}
        >
          <FaEllipsisVertical className="text-2xl" />
        </button>
        <Popover
          disableScrollLock
          open={Boolean(dotsAnchor)}
          anchorEl={dotsAnchor}
          onClose={closeDotMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <div className="flex flex-col">
            <button
              type="button"
              className="p-3 cursor-pointer hover:bg-slate-200"
              onClick={() => {
                closeDotMenu();
              }}
            >
              Rate and Review
            </button>
            <button
              type="button"
              className="p-3 cursor-pointer hover:bg-slate-200"
              onClick={() => {
                closeDotMenu();
              }}
            >
              Email Ticket
            </button>
            <button
              type="button"
              className="p-3 cursor-pointer hover:bg-slate-200"
              onClick={() => {
                closeDotMenu();
              }}
            >
              Show Ticket
            </button>
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default BookingCard;
