import { useRouter } from "next/navigation";

const BookingCard = () => {
  const router = useRouter();
  return (
    <div
      className="bg-white p-4 rounded-md shadow-[0_0_7px_rgba(0,0,0,0.3)] cursor-pointer"
      onClick={() => router.push("/ticket/view/1")}
    >
      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-1/2 flex justify-between sm:gap-7 lg:gap-5">
          <div className="w-[40%]">
            <div className=" inline-flex flex-col gap-1">
              <p className="text-4xl text-primary md:text-center font-semibold leading-none">
                20
              </p>
              <p className="sm:text-nowrap">December 2025</p>
              <p className="hidden md:block font-semibold text-center">
                Friday
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1 w-[60%]">
            <p className="font-semibold text-xl text-right md:text-left">
              Ahmedabad - Surat
            </p>
            <p className="font-medium text-sm text-right md:text-left">GSRTC</p>
            <p className="text-[#1d1d1da3] text-sm text-right md:text-left">
              Non AC Seater (2+1)
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-between gap-5">
          <div className="w-[40%]">
            <p className="font-semibold text-sm text-left mb-1">Boarding</p>
            <p className="font-medium text-sm text-left text-[#1d1d1da3]">
              Ahmedabad
            </p>
          </div>

          <div className="flex flex-col items-end md:items-start w-[60%]">
            <p className="font-semibold text-sm text-left mb-1">Completed</p>
            <p className="flex flex-col sm:flex-row text-sm font-medium text-right text-[#1d1d1da3]">
              <span>PNR No:</span>
              <span>{"XXXXXXXXX"}</span>
            </p>
            <p className="flex flex-col sm:flex-row text-sm font-medium text-right text-[#1d1d1da3]">
              <span>Ref. No:</span>
              <span>{"XXXXXXXXX"}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
