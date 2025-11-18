import GsrtcBus from "@/assets/images/GSRTC_bus_trasparentBGCropped.png";
import { LinearProgress } from "@mui/material";
import Image from "next/image";

const BusLoaderProvider = () => {
  return (
    <div
      className={`fixed inset-0 z-[1000] bg-white flex justify-center items-center`}
    >
      <div className="flex flex-col gap-5">
        <Image
          src={GsrtcBus}
          className="w-[150px] sm:w-[200px] lg:w-[300px] h-[80px] sm:h-[100px] lg:h-[150px]"
          alt="GSRTC bus logo"
        />
        <LinearProgress
          sx={{
            "&.MuiLinearProgress-root": {
              height: "5px",
              borderRadius: "16px",
              backgroundColor: "#cad5e2",
            },
            "& .MuiLinearProgress-bar1": {
              backgroundColor: "#173c62",
            },
            "& .MuiLinearProgress-bar2": {
              backgroundColor: "#173c62",
            },
          }}
        />
      </div>
    </div>
  );
};

export default BusLoaderProvider;
