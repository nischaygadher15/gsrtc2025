"use client";

import headerBg from "@/assets/images/headerBG2.png";
import {
  Avatar,
  CircularProgress,
  Dialog,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  styled,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import Image from "next/image";
import {
  FaArrowLeft,
  FaRegEnvelope,
  FaRegUserCircle,
  FaUserCog,
  FaUserFriends,
} from "react-icons/fa";
import {
  MdAddAPhoto,
  MdEdit,
  MdOutlinePhone,
  MdOutlineRotateLeft,
  MdOutlineRotateRight,
} from "react-icons/md";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { BiUserCircle } from "react-icons/bi";
import { ChangeEvent, useState } from "react";
import { TbLogout, TbUserCog } from "react-icons/tb";
import { PiUserCircleLight } from "react-icons/pi";
import { HiOutlineLogout } from "react-icons/hi";
import { Controller, useForm } from "react-hook-form";
import {
  IoIosCloseCircleOutline,
  IoMdArrowDropdown,
  IoMdClose,
} from "react-icons/io";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import useWindowSize from "@/Hooks/useWindowSize";
import defaultUser from "@/assets/images/default-user.svg";
import { FaArrowLeftLong, FaRegTrashCan } from "react-icons/fa6";
import Cropper from "react-easy-crop";
import { FiZoomIn, FiZoomOut } from "react-icons/fi";
import getCroppedImage from "@/utils/common/getCroppedImage";

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
  const [profileTab, setProfileTab] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [travellerForm, setTravellerForm] = useState<"add" | "edit" | null>(
    null
  );
  const windowSize = useWindowSize();
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
  const [userPhotoUrl, setUserPhotoUrl] = useState<string | undefined>(
    undefined
  );
  const [userPhotoCrop, setUserPhotoCrop] = useState({ x: 0, y: 0 });
  const [userPhotoZoom, setUserPhotoZoom] = useState(1);
  const [userPhotoRotate, setUserPhotoRotate] = useState<number>(0);
  const [photoDialog, setPhotoDialog] = useState<boolean>(false);
  const [photoDimension, setPhotoDimension] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const handleProfileTabChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setProfileTab(newValue);
  };

  // User information form
  const {
    handleSubmit: profileSubmit,
    setValue: profileSetVal,
    reset: profileReset,
    control: profileControl,
    formState: { errors: profileErrors },
  } = useForm({
    // resolver: zodResolver(),
    defaultValues: {
      firstName: "sita",
      lastName: "ram",
      userDob: new Date("2000-01-01"),
      userMobileNo: "8141409448",
      userEmail: `abc@gmail.com`,
      userPass: ``,
      userGender: "female",
      userState: "gujarat",
    },
  });

  const onProfileSave = (data: any) => {
    console.log("Data: ", data);
  };

  //Contact Info: State
  interface StateInfoType {
    id: number;
    state: string;
    code: string;
  }

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

  const {
    control: userPhotoControl,
    setValue: userPhotoVal,
    reset: userPhotoReset,
    handleSubmit: userPhotoSubmit,
  } = useForm({
    defaultValues: {
      userPhoto: "",
    },
  });

  const userPhotoUpdate = (file: File | null) => {
    console.log("FIle: ", file);
  };

  const onCropComplete = async (croppedArea: any, croppedAreaPixels: any) => {
    setPhotoDimension({ ...croppedAreaPixels });
  };

  const closePhotoDialog = () => {
    setPhotoDialog(false);
  };

  const handlePhotoRotation = (action: string) => {
    switch (action) {
      case "+": {
        setUserPhotoRotate((prev) => {
          if (prev == 360) {
            return 0;
          } else {
            return prev + 90;
          }
        });
        break;
      }
      case "-": {
        setUserPhotoRotate((prev) => {
          if (prev == -360) {
            return 0;
          } else {
            return prev - 90;
          }
        });
        break;
      }
    }
  };

  const handlePhotoZoom = (action: string) => {
    switch (action) {
      case "+": {
        setUserPhotoZoom((prev) => {
          return prev + 0.5;
        });
        break;
      }
      case "-": {
        setUserPhotoZoom((prev) => {
          if (prev == 1) {
            return 1;
          } else {
            return prev - 0.5;
          }
        });
        break;
      }
    }
  };

  const handlePhotoReset = () => {
    setUserPhotoCrop({ x: 0, y: 0 });
    setUserPhotoRotate(0);
    setUserPhotoZoom(1);
  };

  const onPhotoSave = async () => {
    if (userPhotoUrl) {
      const croppedImage = await getCroppedImage(
        userPhotoUrl,
        photoDimension,
        userPhotoRotate
      );

      const croppedFile = new File([croppedImage as Blob], "cropped.jpg", {
        type: "image/jpeg",
      });

      console.log("croppedFile: ", croppedFile);

      const url = URL.createObjectURL(croppedFile);

      closePhotoDialog();

      setUserPhotoUrl(url);

      // Reset everything
      handlePhotoReset();
      userPhotoReset();
    }
  };
  return (
    <div>
      {/* header */}
      <div className="relative w-full flex items-end py-5 min-h-50 bg-primary/90 myContainer">
        {/* bg */}
        <Image
          alt="Header bg"
          src={headerBg}
          className="absolute inset-0 -z-10 w-full h-full object-cover"
        />

        <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-7">
          {/* User photo */}
          <label className="cursor-pointer">
            <Controller
              name="userPhoto"
              control={userPhotoControl}
              render={({ field: { onChange, name, value } }) => (
                <>
                  <div className="w-[110px] h-[110px] flex justify-center items-center rounded-full bg-white/70 outline-2 outline-primary/90 -outline-offset-[6px]">
                    {userPhotoUrl ? (
                      <Image
                        src={userPhotoUrl}
                        alt="User photo"
                        width={110}
                        height={110}
                        className="rounded-full"
                      />
                    ) : (
                      <MdAddAPhoto className="text-3xl" />
                    )}
                  </div>

                  <VisuallyHiddenInput
                    type="file"
                    name={name}
                    value={(value as any)?.name || ""}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      if (event.target.files) {
                        userPhotoUpdate(event.target.files[0]);
                        const url = URL.createObjectURL(event.target.files[0]);
                        setUserPhotoUrl(url);
                        setPhotoDialog(true);
                        onChange(url);
                      } else {
                        userPhotoUpdate(null);
                      }
                    }}
                  />
                </>
              )}
            />

            <Dialog
              open={photoDialog}
              onClose={closePhotoDialog}
              sx={{
                "& .MuiDialog-paper": {
                  borderRadius: "16px",
                },
              }}
            >
              <div className="relative min-w-lg h-auto bg-white">
                <button
                  type="button"
                  className="absolute top-2 right-2 z-1500 w-7 h-7 bg-white py-1 rounded-sm cursor-pointer flex items-center justify-center"
                  onClick={closePhotoDialog}
                >
                  <IoMdClose className="text-2xl" />
                </button>

                <div className="relative w-full h-[300px]">
                  <Cropper
                    image={userPhotoUrl}
                    crop={userPhotoCrop}
                    zoom={userPhotoZoom}
                    rotation={userPhotoRotate}
                    cropSize={{ width: 200, height: 200 }}
                    cropShape="round"
                    // aspect={4 / 3}
                    classes={{
                      containerClassName: "w-full max-h-[300px]",
                    }}
                    onCropChange={setUserPhotoCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setUserPhotoZoom}
                  />
                </div>

                <p className="bg-primary text-white py-5 text-sm text-center">
                  Adjust image within circle, make it look fabulous and save it!
                </p>

                {/* Photo Action */}
                <div className="p-5 flex justify-center gap-2">
                  {/* Rotate */}
                  <div className="bg-slate-100 flex items-center gap-2">
                    <button
                      type="button"
                      className="px-2 py-1 rounded-md cursor-pointer"
                      onClick={() => handlePhotoRotation("+")}
                    >
                      <MdOutlineRotateRight className="text-2xl" />
                    </button>
                    <p>|</p>
                    <button
                      type="button"
                      className="px-2 py-1 rounded-md cursor-pointer"
                      onClick={() => handlePhotoRotation("-")}
                    >
                      <MdOutlineRotateLeft className="text-2xl" />
                    </button>
                  </div>

                  {/* Zoom */}
                  <div className="flex items-center gap-2 bg-slate-100">
                    <button
                      type="button"
                      disabled={userPhotoZoom == 1}
                      className="px-2 py-1 rounded-md cursor-pointer disabled:text-gray-500 disabled:cursor-not-allowed"
                      onClick={() => handlePhotoZoom("-")}
                    >
                      <FiZoomOut className="text-2xl" />
                    </button>
                    <p>|</p>
                    <button
                      type="button"
                      className="px-2 py-1 rounded-md cursor-pointer"
                      onClick={() => handlePhotoZoom("+")}
                    >
                      <FiZoomIn className="text-2xl" />
                    </button>
                  </div>

                  <button
                    type="button"
                    disabled={loading}
                    className="text-sm min-w-20 font-semibold border border-primary p-2 rounded-sm cursor-pointer"
                    onClick={handlePhotoReset}
                  >
                    Reset
                  </button>

                  <button
                    type="button"
                    disabled={loading}
                    className="text-sm min-w-20 font-semibold bg-primary/90 hover:bg-primary p-2.5 rounded-sm text-white cursor-pointer flex justify-center items-center gap-2 disabled:text-gray-500 disabled:bg-slate-300 disabled:cursor-not-allowed"
                    onClick={onPhotoSave}
                  >
                    {loading ? (
                      <>
                        <CircularProgress
                          size={20}
                          sx={{
                            "&.MuiCircularProgress-root": {
                              color: "#6a7282",
                            },
                          }}
                        />
                        <span>Saving...</span>
                      </>
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </div>
            </Dialog>
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
        <div className="bg-white rounded-xl flex">
          {/* Sidebar */}
          <div className="hidden lg:block lg:w-1/4 border-r border-slate-300 overflow-auto hideScrollBar">
            <p className="text-xs p-5">MY ACCOUNT</p>

            <div className="flex flex-col">
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={profileTab}
                onChange={handleProfileTabChange}
                sx={{
                  borderRight: 1,
                  borderColor: "divider",
                  "& .MuiTab-root": {
                    margin: "4px 16px",
                    padding: "0px 4px",
                    minHeight: "52px",
                    borderRadius: "6px",
                  },
                  "&.MuiTabs-root": {
                    border: "none",
                  },
                  "& .MuiTabs-indicator": { display: "none" },
                  "& .Mui-selected": {
                    backgroundColor: "#173c6240 !important",
                    color: "#000000 !important",
                  },
                  "& .MuiTab-root:hover": {
                    backgroundColor: "#e2e8f0",
                  },
                }}
              >
                <Tab
                  disabled={loading}
                  label={
                    <p className="w-full p-3 flex items-center gap-2">
                      <FaRegUserCircle className="text-[27px]" />
                      <span className="text-base capitalize">My Profile</span>
                    </p>
                  }
                />
                <Tab
                  disabled={loading}
                  label={
                    <p className="w-full p-3 flex items-center gap-2">
                      <FaUserFriends className="text-2xl" />
                      <span className="text-base capitalize">
                        Co-travellers
                      </span>
                    </p>
                  }
                />
                <Tab
                  disabled={loading}
                  label={
                    <p className="w-full p-3 flex items-center gap-2">
                      <FaUserCog className="text-2xl" />
                      <span className="text-base capitalize">
                        Logged in Devices
                      </span>
                    </p>
                  }
                />

                <Tab
                  disabled={loading}
                  label={
                    <p className="w-full p-3 flex items-center gap-2">
                      <HiOutlineLogout className="text-2xl" />
                      <span className="text-base capitalize">Logout</span>
                    </p>
                  }
                />
              </Tabs>
            </div>
          </div>

          {/* profile page */}
          <div className="w-full lg:w-3/4 overflow-auto hideScrollBar">
            {/* My Profile */}
            {profileTab === 0 && (
              <div className="">
                {/* Header */}
                <div className="w-full min-h-20 flex justify-between items-center p-5 border-b border-b-slate-300">
                  <p className="text-xl font-bold">My Profile</p>
                  <button
                    type="button"
                    disabled={loading}
                    className="text-sm min-w-20 font-semibold bg-primary/90 hover:bg-primary p-2.5 rounded-sm text-white cursor-pointer flex items-center gap-2 disabled:text-gray-500 disabled:bg-slate-300 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <CircularProgress
                          size={20}
                          sx={{
                            "&.MuiCircularProgress-root": {
                              color: "#6a7282",
                            },
                          }}
                        />
                        <span>Saving...</span>
                      </>
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>

                {/* User information form */}
                <form onSubmit={profileSubmit(onProfileSave)} className="">
                  {/* General Information */}
                  <div className="p-5">
                    <p className="text-lg font-bold mb-4">
                      General Information
                    </p>
                    {/* Full name */}
                    <div className="flex gap-4">
                      {/* First Name */}
                      <div className="w-1/2">
                        <Controller
                          name="firstName"
                          control={profileControl}
                          render={({ field: { onChange, name, value } }) => (
                            <div
                              className={`flex-1 border rounded-lg ${
                                profileErrors.firstName ? "border-red-600" : ""
                              }`}
                            >
                              <TextField
                                type="text"
                                label="First name"
                                disabled={loading}
                                placeholder="Enter first name"
                                variant="filled"
                                error={profileErrors.firstName ? true : false}
                                name={name}
                                value={value}
                                onChange={onChange}
                                sx={{
                                  width: "100%",
                                  "& .MuiFilledInput-input": {
                                    fontWeight: "700 !important",
                                    backgroundColor: "white !important",
                                    borderRadius: "8px !important",
                                    textTransform: "capitalize",
                                  },
                                  "& .MuiInputLabel-root": {
                                    color: "#1d1d1da3",
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
                          )}
                        />

                        <p className="my-1 text-xs text-red-600 min-h-5">
                          {profileErrors.firstName
                            ? profileErrors.firstName.message
                            : ""}
                        </p>
                      </div>

                      {/* Last Name */}
                      <div className="w-1/2">
                        <Controller
                          name="lastName"
                          control={profileControl}
                          render={({ field: { onChange, name, value } }) => (
                            <div
                              className={`flex-1 border rounded-lg ${
                                profileErrors.firstName ? "border-red-600" : ""
                              }`}
                            >
                              <TextField
                                type="text"
                                label="Last name"
                                disabled={loading}
                                placeholder="Enter last name"
                                variant="filled"
                                name={name}
                                value={value}
                                onChange={onChange}
                                error={profileErrors.lastName ? true : false}
                                sx={{
                                  width: "100%",
                                  "& .MuiFilledInput-input": {
                                    fontWeight: "700 !important",
                                    backgroundColor: "white !important",
                                    borderRadius: "8px !important",
                                    textTransform: "capitalize",
                                  },
                                  "& .MuiInputLabel-root": {
                                    color: "#1d1d1da3",
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
                          )}
                        />

                        <p className="my-1 text-xs text-red-600 min-h-5">
                          {profileErrors.lastName
                            ? profileErrors.lastName.message
                            : ""}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      {/* Date of birth */}
                      <div className="w-1/2">
                        <Controller
                          name="userDob"
                          control={profileControl}
                          render={({ field: { onChange, name, value } }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                label="Date of birth"
                                disabled={loading}
                                format="DD/MM/YYYY"
                                name={name}
                                value={value ? dayjs(value) : null}
                                onChange={(value) => {
                                  if (value) {
                                    onChange(value.toDate());
                                  }
                                }}
                                sx={{
                                  "&.MuiPickersTextField-root": {
                                    width: "100%",
                                  },
                                  "& .MuiPickersOutlinedInput-notchedOutline": {
                                    borderColor: profileErrors.userDob
                                      ? "#e7000b !important"
                                      : "black !important",
                                    borderWidth: "1px !important",
                                    borderRadius: "8px",
                                    fontWeight: "700 !important",
                                  },
                                  "& .MuiPickersSectionList-root": {
                                    fontWeight: "700",
                                  },
                                }}
                              />
                            </LocalizationProvider>
                          )}
                        />

                        <p className="my-1 text-xs text-red-600 min-h-5">
                          {profileErrors.userDob
                            ? profileErrors.userDob.message
                            : ""}
                        </p>
                      </div>

                      {/* Gender */}
                      <div className="w-1/2">
                        <Controller
                          name="userGender"
                          control={profileControl}
                          render={({ field: { onChange, name, value } }) => (
                            <FormControl
                              sx={{
                                width: "100%",
                              }}
                              disabled={loading}
                            >
                              <InputLabel id="user_gender">Gender</InputLabel>
                              <Select
                                name={name}
                                labelId="user_gender"
                                value={value}
                                label="Gender"
                                onChange={onChange}
                                sx={{
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    border: "1px solid black !important",
                                    borderRadius: "8px",
                                  },
                                  "& .MuiOutlinedInput-input": {
                                    fontWeight: "700",
                                  },
                                }}
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                <MenuItem value={"female"}>Female</MenuItem>
                                <MenuItem value={"male"}>Man</MenuItem>
                                <MenuItem value={"other"}>Other</MenuItem>
                              </Select>
                            </FormControl>
                          )}
                        />

                        <p className="my-1 text-xs text-red-600 min-h-5">
                          {profileErrors.userDob
                            ? profileErrors.userDob.message
                            : ""}
                        </p>
                      </div>
                    </div>

                    {/* State */}
                    <button
                      type="button"
                      disabled={loading}
                      className="w-full flex border border-black rounded-lg justify-between items-center px-3 py-2 cursor-pointer mb-5 disabled:text-gray-500 disabled:cursor-default"
                      onClick={() => {
                        setContactInfoState(true);
                      }}
                    >
                      <div className="w-full z-0">
                        <p className="text-sm text-left text-[#1d1d1da3]">
                          State of Residence*
                        </p>

                        <Controller
                          name="userState"
                          disabled={true}
                          control={profileControl}
                          render={({ field: { onChange, name, value } }) => (
                            <input
                              name={name}
                              disabled={true}
                              value={value}
                              onChange={onChange}
                              className="relative -z-10 w-full text-left font-bold cursor-pointer capitalize"
                            />
                          )}
                        />
                      </div>
                      <IoMdArrowDropdown className="text-lg" />
                    </button>
                  </div>

                  <hr className="h-px mx-5 bg-slate-300 border-none" />

                  {/* Contact information */}
                  <div className="p-5">
                    <div className="mb-3">
                      <p className="text-xl font-bold">Contact details</p>
                    </div>

                    {/* Phone no. */}
                    <div>
                      <div className="flex">
                        <button
                          type="button"
                          className="px-3 flex flex-col justify-center border-t border-b border-s rounded-ss-lg rounded-es-lg"
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
                          <Controller
                            name="userMobileNo"
                            control={profileControl}
                            render={({ field: { onChange, name, value } }) => (
                              <TextField
                                type="text"
                                name={name}
                                disabled={loading}
                                label="Phone"
                                value={value}
                                placeholder="Enter phone no."
                                variant="filled"
                                onChange={onChange}
                                sx={{
                                  width: "100%",
                                  "& .MuiFilledInput-root": {
                                    fontWeight: "700 !important",
                                    backgroundColor: "white !important",
                                    borderTopLeftRadius: "0px",
                                    borderTopRightRadius: "8px",
                                    borderBottomRightRadius: "8px",
                                  },
                                  "& ::before": {
                                    display: "none",
                                  },
                                  "& ::after": {
                                    display: "none",
                                  },
                                }}
                              />
                            )}
                          />
                        </div>
                      </div>
                      <p className="my-1 text-xs text-red-600 min-h-5">
                        {profileErrors.userPass
                          ? profileErrors.userPass.message
                          : ""}
                      </p>
                    </div>

                    {/* Email */}
                    <div>
                      <div className="border rounded-lg">
                        <Controller
                          name="userEmail"
                          control={profileControl}
                          render={({ field: { onChange, name, value } }) => (
                            <TextField
                              type="text"
                              name={name}
                              disabled={loading}
                              label="Email ID"
                              variant="filled"
                              placeholder="Enter email id"
                              value={value}
                              onChange={onChange}
                              sx={{
                                width: "100%",
                                "& .MuiFilledInput-root": {
                                  fontWeight: "700 !important",
                                  backgroundColor: "white !important",
                                  borderRadius: "8px !important",
                                },
                                "& ::before": {
                                  display: "none",
                                },
                                "& ::after": {
                                  display: "none",
                                },
                              }}
                            />
                          )}
                        />
                      </div>
                      <p className="my-1 text-xs text-red-600 min-h-5">
                        {profileErrors.userPass
                          ? profileErrors.userPass.message
                          : ""}
                      </p>
                    </div>

                    {/* Password */}
                    <div>
                      <Controller
                        name="userPass"
                        control={profileControl}
                        render={({ field: { onChange, name, value } }) => (
                          <div
                            className={`flex-1 border rounded-lg ${
                              profileErrors.userPass
                                ? "border-red-600"
                                : "black"
                            }`}
                          >
                            <TextField
                              type={"password"}
                              label="Password"
                              disabled={true}
                              placeholder="Enter password."
                              variant="filled"
                              name={name}
                              value={"*********"}
                              onChange={onChange}
                              autoComplete="new-password"
                              sx={{
                                width: "100%",
                                "& .MuiFilledInput-root": {
                                  backgroundColor: "white !important",
                                  borderRadius: "8px !important",
                                },
                                "& .MuiFilledInput-input": {
                                  fontWeight: "500 !important",
                                  backgroundColor: "white !important",
                                  borderRadius: "8px !important",
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
                        )}
                      />

                      <p className="my-1 text-xs text-red-600 min-h-5">
                        {profileErrors.userPass
                          ? profileErrors.userPass.message
                          : ""}
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* State Dialog */}
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
                    <p className="font-bold">Select state of residence</p>
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      SearchStatesList(e.currentTarget.value, indiaStatesAndUTs)
                    }
                  />
                </div>
                <RadioGroup
                  name="radio-buttons-state"
                  value={
                    indiaStatesAndUTs.find((st) => st.state == stateName)?.code
                  }
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    let index = indiaStatesAndUTs.findIndex(
                      (state) => state.code == event.target.value
                    );

                    profileSetVal("userState", indiaStatesAndUTs[index].state);
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

                    {filteredStatesList && filteredStatesList.length <= 0 && (
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

            {/* Co-Traveller */}
            {profileTab === 1 && (
              <div>
                {/* Header */}
                <div className="w-full min-h-20 flex justify-between items-center p-5 border-b border-b-slate-300">
                  <p className="text-xl font-semibold flex items-center gap-2">
                    {travellerForm !== null && (
                      <button
                        type="button"
                        disabled={loading}
                        className="p-1 ps-0 cursor-pointer disabled:text-gray-500 disabled:bg-slate-300 disabled:cursor-not-allowed"
                        onClick={() => {
                          setTravellerForm(null);
                        }}
                      >
                        <FaArrowLeftLong className="text-2xl text-primary" />
                      </button>
                    )}
                    {travellerForm === null && "Co-Travellers"}
                    {travellerForm === "add" && "Add Co-Travellers"}
                    {travellerForm === "edit" && "Edit Co-Travellers"}
                  </p>

                  {travellerForm === null && (
                    <button
                      type="button"
                      disabled={loading}
                      className="text-sm font-semibold bg-primary/90 hover:bg-primary px-4 py-2.5 rounded-sm text-white cursor-pointer disabled:text-gray-500 disabled:bg-slate-300 disabled:cursor-not-allowed"
                      onClick={() => {
                        setTravellerForm("add");
                      }}
                    >
                      {windowSize <= 640 ? "+Add" : "+Add New Co-Traveller"}
                    </button>
                  )}

                  {travellerForm !== null && windowSize > 640 && (
                    <div className="flex gap-4">
                      <button
                        type="button"
                        disabled={loading}
                        className="p-2.5 cursor-pointer text-xl text-black/90 hover:text-red-700 disabled:text-gray-500 disabled:cursor-not-allowed"
                        // onClick={() => {
                        //   setTravellerForm(null);
                        // }}
                      >
                        <FaRegTrashCan />
                      </button>

                      <button
                        type="button"
                        disabled={loading}
                        className="text-sm font-semibold w-20 py-2.5 rounded-sm text-primary cursor-pointer hover:bg-slate-200 border border-primary disabled:border-slate-300 disabled:text-gray-500 disabled:bg-slate-300 disabled:cursor-not-allowed"
                        onClick={() => {
                          setTravellerForm(null);
                        }}
                      >
                        Cancel
                      </button>

                      <button
                        type="button"
                        disabled={loading}
                        className="text-sm font-semibold bg-primary/90 hover:bg-primary min-w-20 p-2.5 rounded-sm text-white cursor-pointer flex items-center gap-2 disabled:text-gray-500 disabled:bg-slate-300 disabled:cursor-not-allowed"
                        // onClick={() => {
                        //   setTravellerForm("add");
                        // }}
                      >
                        {loading ? (
                          <>
                            <CircularProgress
                              size={20}
                              sx={{
                                "&.MuiCircularProgress-root": {
                                  color: "#6a7282",
                                },
                              }}
                            />
                            <span>Saving...</span>
                          </>
                        ) : (
                          "Save"
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Travellers List */}
                {travellerForm === null && (
                  <ul className="p-5 flex flex-col gap-y-3">
                    {[1, 2, 3].map((tvlr) => (
                      <li key={`traveller-${tvlr}`}>
                        <div className="flex justify-between items-center p-3 border border-slate-300 rounded-lg hover:bg-slate-200">
                          <div className="flex items-center gap-3">
                            <Image
                              alt="Traveller photo"
                              src={defaultUser}
                              className="w-9 h-9 rounded-full"
                            />
                            <div>
                              <p className="font-semibold">Nischay Gadher</p>
                              <p className="text-sm text-gray-600">
                                Male, 26y,1 Jan 2000
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="min-w-20 p-2 flex items-center gap-1 cursor-pointer"
                            onClick={() => {
                              setTravellerForm("edit");
                            }}
                          >
                            <MdEdit className="text-xl text-blue-600" />
                            <p className="font-semibold max-h-5">Edit</p>
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Add Travellers Form */}
                {travellerForm !== null && (
                  <form onSubmit={profileSubmit(onProfileSave)} className="">
                    {/* General Information */}
                    <div className="p-5">
                      <p className="text-lg font-bold mb-4">
                        General Information
                      </p>
                      {/* Full name */}
                      <div className="flex flex-col sm:flex-row gap-x-4">
                        {/* First Name */}
                        <div className="w-full sm:w-1/2">
                          <Controller
                            name="firstName"
                            control={profileControl}
                            render={({ field: { onChange, name, value } }) => (
                              <div
                                className={`flex-1 border rounded-lg ${
                                  profileErrors.firstName
                                    ? "border-red-600"
                                    : ""
                                }`}
                              >
                                <TextField
                                  type="text"
                                  label="First name"
                                  disabled={loading}
                                  placeholder="Enter first name"
                                  variant="filled"
                                  error={profileErrors.firstName ? true : false}
                                  name={name}
                                  value={value}
                                  onChange={onChange}
                                  sx={{
                                    width: "100%",
                                    "& .MuiFilledInput-input": {
                                      fontWeight: "700 !important",
                                      backgroundColor: "white !important",
                                      borderRadius: "8px !important",
                                      textTransform: "capitalize",
                                    },
                                    "& .MuiInputLabel-root": {
                                      color: "#1d1d1da3",
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
                            )}
                          />

                          <p className="my-1 text-xs text-red-600 min-h-5">
                            {profileErrors.firstName
                              ? profileErrors.firstName.message
                              : ""}
                          </p>
                        </div>

                        {/* Last Name */}
                        <div className="w-full sm:w-1/2">
                          <Controller
                            name="lastName"
                            control={profileControl}
                            render={({ field: { onChange, name, value } }) => (
                              <div
                                className={`flex-1 border rounded-lg ${
                                  profileErrors.firstName
                                    ? "border-red-600"
                                    : ""
                                }`}
                              >
                                <TextField
                                  type="text"
                                  label="Last name"
                                  disabled={loading}
                                  placeholder="Enter last name"
                                  variant="filled"
                                  name={name}
                                  value={value}
                                  onChange={onChange}
                                  error={profileErrors.lastName ? true : false}
                                  sx={{
                                    width: "100%",
                                    "& .MuiFilledInput-input": {
                                      fontWeight: "700 !important",
                                      backgroundColor: "white !important",
                                      borderRadius: "8px !important",
                                      textTransform: "capitalize",
                                    },
                                    "& .MuiInputLabel-root": {
                                      color: "#1d1d1da3",
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
                            )}
                          />

                          <p className="my-1 text-xs text-red-600 min-h-5">
                            {profileErrors.lastName
                              ? profileErrors.lastName.message
                              : ""}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-x-4">
                        {/* Date of birth */}
                        <div className="w-full sm:w-1/2">
                          <Controller
                            name="userDob"
                            control={profileControl}
                            render={({ field: { onChange, name, value } }) => (
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  label="Date of birth"
                                  disabled={loading}
                                  format="DD/MM/YYYY"
                                  name={name}
                                  value={value ? dayjs(value) : null}
                                  onChange={(value) => {
                                    if (value) {
                                      onChange(value.toDate());
                                    }
                                  }}
                                  sx={{
                                    "&.MuiPickersTextField-root": {
                                      width: "100%",
                                    },
                                    "& .MuiPickersOutlinedInput-notchedOutline":
                                      {
                                        borderColor: profileErrors.userDob
                                          ? "#e7000b !important"
                                          : "black !important",
                                        borderWidth: "1px !important",
                                        borderRadius: "8px",
                                        fontWeight: "700 !important",
                                      },
                                    "& .MuiPickersSectionList-root": {
                                      fontWeight: "700",
                                    },
                                  }}
                                />
                              </LocalizationProvider>
                            )}
                          />

                          <p className="my-1 text-xs text-red-600 min-h-5">
                            {profileErrors.userDob
                              ? profileErrors.userDob.message
                              : ""}
                          </p>
                        </div>

                        {/* Gender */}
                        <div className="w-full sm:w-1/2">
                          <Controller
                            name="userGender"
                            control={profileControl}
                            render={({ field: { onChange, name, value } }) => (
                              <FormControl
                                sx={{
                                  width: "100%",
                                }}
                                disabled={loading}
                              >
                                <InputLabel id="user_gender">Gender</InputLabel>
                                <Select
                                  name={name}
                                  labelId="user_gender"
                                  value={value}
                                  label="Gender"
                                  onChange={onChange}
                                  sx={{
                                    "& .MuiOutlinedInput-notchedOutline": {
                                      border: "1px solid black !important",
                                      borderRadius: "8px",
                                    },
                                    "& .MuiOutlinedInput-input": {
                                      fontWeight: "700",
                                    },
                                  }}
                                >
                                  <MenuItem value="">
                                    <em>None</em>
                                  </MenuItem>
                                  <MenuItem value={"female"}>Female</MenuItem>
                                  <MenuItem value={"male"}>Man</MenuItem>
                                  <MenuItem value={"other"}>Other</MenuItem>
                                </Select>
                              </FormControl>
                            )}
                          />

                          <p className="my-1 text-xs text-red-600 min-h-5">
                            {profileErrors.userDob
                              ? profileErrors.userDob.message
                              : ""}
                          </p>
                        </div>
                      </div>

                      {/* State */}
                      <button
                        type="button"
                        disabled={loading}
                        className="w-full flex border rounded-lg justify-between items-center px-3 py-2 cursor-pointer disabled:cursor-default mb-5"
                        onClick={() => {
                          setContactInfoState(true);
                        }}
                      >
                        <div className="w-full z-0">
                          <p className="text-sm text-left text-[#1d1d1da3]">
                            State of Residence*
                          </p>

                          <Controller
                            name="userState"
                            disabled={true}
                            control={profileControl}
                            render={({ field: { onChange, name, value } }) => (
                              <input
                                name={name}
                                disabled={true}
                                value={value}
                                onChange={onChange}
                                className="relative -z-10 w-full text-left font-bold cursor-pointer capitalize disabled:text-gray-500"
                              />
                            )}
                          />
                        </div>
                        <IoMdArrowDropdown className="text-lg" />
                      </button>
                    </div>

                    <hr className="h-px mx-5 bg-slate-300 border-none" />

                    {/* Contact information */}
                    <div className="p-5">
                      <div className="mb-3">
                        <p className="text-xl font-bold">Contact details</p>
                      </div>

                      {/* Phone no. */}
                      <div>
                        <div className="flex">
                          <button
                            type="button"
                            className="px-3 flex flex-col justify-center border-t border-b border-s rounded-ss-lg rounded-es-lg"
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
                            <Controller
                              name="userMobileNo"
                              control={profileControl}
                              render={({
                                field: { onChange, name, value },
                              }) => (
                                <TextField
                                  type="text"
                                  name={name}
                                  disabled={loading}
                                  label="Phone"
                                  value={value}
                                  placeholder="Enter phone no."
                                  variant="filled"
                                  onChange={onChange}
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
                              )}
                            />
                          </div>
                        </div>
                        <p className="my-1 text-xs text-red-600 min-h-5">
                          {profileErrors.userPass
                            ? profileErrors.userPass.message
                            : ""}
                        </p>
                      </div>

                      {/* Email */}
                      <div>
                        <div className="border rounded-lg">
                          <Controller
                            name="userEmail"
                            control={profileControl}
                            render={({ field: { onChange, name, value } }) => (
                              <TextField
                                type="text"
                                name={name}
                                disabled={loading}
                                label="Email ID"
                                variant="filled"
                                placeholder="Enter email id"
                                value={value}
                                onChange={onChange}
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
                            )}
                          />
                        </div>
                        <p className="my-1 text-xs text-red-600 min-h-5">
                          {profileErrors.userPass
                            ? profileErrors.userPass.message
                            : ""}
                        </p>
                      </div>
                    </div>

                    {travellerForm !== null && windowSize <= 640 && (
                      <div className="pb-5 flex justify-center gap-4">
                        <button
                          type="button"
                          disabled={loading}
                          className="p-2.5 cursor-pointer text-xl text-black/90 hover:text-red-700 disabled:text-gray-500 disabled:bg-slate-300 disabled:cursor-not-allowed"
                          // onClick={() => {
                          //   setTravellerForm(null);
                          // }}
                        >
                          <FaRegTrashCan />
                        </button>

                        <button
                          type="button"
                          disabled={loading}
                          className="text-sm font-semibold w-20 py-2.5 rounded-sm text-primary cursor-pointer hover:bg-slate-200 border border-primary disabled:text-gray-500 disabled:bg-slate-300 disabled:cursor-not-allowed"
                          onClick={() => {
                            window.scrollTo({
                              top: 0,
                              behavior: "smooth",
                            });
                            setTravellerForm(null);
                          }}
                        >
                          Cancel
                        </button>

                        <button
                          type="button"
                          disabled={loading}
                          className="text-sm font-semibold bg-primary/90 hover:bg-primary w-20 py-2.5 rounded-sm text-white cursor-pointer disabled:text-gray-500 disabled:bg-slate-300 disabled:cursor-not-allowed"
                          // onClick={() => {
                          //   setTravellerForm("add");
                          // }}
                        >
                          Save
                        </button>
                      </div>
                    )}
                  </form>
                )}
              </div>
            )}

            {/* Logged in Devices */}
            {profileTab === 2 && (
              <div>
                {/* Header */}
                <div className="w-full min-h-20 flex justify-between items-center p-5 border-b border-b-slate-300">
                  <p className="text-xl font-semibold">Logged in Devices</p>
                </div>
              </div>
            )}
            {profileTab === 3 && <></>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
