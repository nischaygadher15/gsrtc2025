"use client";

import headerBg from "@/assets/images/headerBG2.png";
import { styled, Tab, Tabs } from "@mui/material";
import Image from "next/image";
import { FaRegEnvelope, FaUserFriends } from "react-icons/fa";
import { MdAddAPhoto, MdOutlinePhone } from "react-icons/md";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { BiUserCircle } from "react-icons/bi";
import { useState } from "react";
import { TbLogout, TbUserCog } from "react-icons/tb";
import { PiUserCircleLight } from "react-icons/pi";
import { HiOutlineLogout } from "react-icons/hi";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Profile = () => {
  const [profileTab, setProfileTab] = useState<number>(0);

  const handleProfileTabChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setProfileTab(newValue);
  };

  return (
    <div className="">
      {/* header */}
      <div className="w-full flex items-end py-5 relative h-50 bg-primary/90 myContainer">
        {/* bg */}
        <Image
          alt="Header bg"
          src={headerBg}
          className="absolute inset-0 -z-10 w-full max-h-full object-cover"
        />

        <div className="flex items-center gap-7">
          {/* User photo */}
          <label className="cursor-pointer ">
            <div className="w-[110px] h-[110px] flex justify-center items-center rounded-full bg-white/70 outline-2 outline-primary/90 -outline-offset-[6px]">
              <MdAddAPhoto className="text-3xl" />
            </div>
            {/* <Image alt="User photo" src={} className="" /> */}
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => console.log(event.target.files)}
              multiple
            />
          </label>

          {/* User name */}
          <div className="text-white">
            <p className="text-2xl font-semibold mb-2">{"Nischay K Gadher"}</p>
            <div>
              <p className="flex items-center gap-2 mb-2">
                <MdOutlinePhone className="text-2xl" />
                <span>{"8141409448"}</span>
              </p>
              <p className="flex items-center gap-2">
                <FaRegEnvelope className="text-2xl" />
                <span>{"nischaygadher15@gmail.com"}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="bg-[#f2f2f8] myContainer py-7">
        <div className="bg-white rounded-xl">
          {/* Sidebar */}
          <div className="w-1/4 border-r border-slate-300">
            <p className="text-xs p-5">MY ACCOUNT</p>

            <div>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={profileTab}
                onChange={handleProfileTabChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: "divider" }}
              >
                <Tab
                  label={
                    <p className="w-full p-2 flex items-center gap-2">
                      <PiUserCircleLight className="text-[27px]" />
                      <span>My Profile</span>
                    </p>
                  }
                />
                <Tab
                  label={
                    <p className="w-full p-2 flex items-center gap-2">
                      <FaUserFriends className="text-2xl" />
                      <span>Co-travellers</span>
                    </p>
                  }
                />
                <Tab
                  label={
                    <p className="w-full p-2 flex items-center gap-2">
                      <TbUserCog className="text-2xl" />
                      <span>Logged in Devices</span>
                    </p>
                  }
                />
              </Tabs>

              <button
                type="button"
                className="px-5 py-3 flex items-center gap-2"
              >
                <HiOutlineLogout className="text-2xl" />
                Logout
              </button>
            </div>
          </div>

          {/* profile page */}
          <div className="w-3/4"></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
