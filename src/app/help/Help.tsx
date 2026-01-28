"use client";

import Image from "next/image";
import indiaLangGif from "@/assets/images/india_language.gif";
import customerCare from "@/assets/images/help_bg.jpg";
import { useEffect } from "react";
import { getAuth } from "@/lib/auth/getAuth";

const Help = () => {
  // Check user authentication
  useEffect(() => {
    getAuth();
  }, []);
  return (
    <div className="myContainer bg-primary/90 min-h-[700px] flex flex-col lg:flex-row items-stretch sm:gap-4">
      <div className="order-2 lg:order-1 w-full lg:max-w-[400px] sm:min-w-[400px] sm:px-4 py-5 sm:py-10">
        <div className="bg-white w-full h-full min-h-[500px] rounded-md">
          {/* header */}
          <div className="flex justify-between p-4 border-b border-b-slate-300">
            <p className="font-semibold text-xl">FAQs</p>
            <button type="button" className="cursor-pointer">
              <Image
                src={indiaLangGif}
                width={30}
                height={30}
                alt="Indian language Gif"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="order-1 lg:order-2 w-full pe-0 xl:pe-20 px-0 lg:px-20 py-5 sm:py-10">
        <p className="text-2xl sm:text-4xl text-white font-bold">GSRTC Help</p>
        <Image
          src={customerCare}
          alt="Customer care Background"
          className="my-7"
        />
        <p className="text-2xl sm:text-4xl text-white font-bold mb-7">
          24/7 Customer Support
        </p>
      </div>
    </div>
  );
};

export default Help;
