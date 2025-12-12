{
  /* <form
  className="w-full rounded-3xl"
  onClick={(e) => {
    const eleCoord = e.currentTarget.getBoundingClientRect();
    // console.log("eleCoord.top: ", eleCoord.top);
    scrollBy({
      top: eleCoord.top,
      behavior: "instant",
    });
  }}
  onSubmit={handleSubmit(onSearchBuses)} */
}
// >
{
  /* <div className="py-4 flex"> */
}
{
  /* Source place */
}
{
  /* <div className="relative w-[30%]">
      <button
        type="button"
        className="w-full p-2.5 border rounded-s-2xl border-slate-400 flex items-center gap-x-2 cursor-pointer outline-none"
        onClick={(e) => {
          openFormPopover(e);
        }}
      >
        <HailOutlinedIcon sx={{ fontSize: 30 }} />
        <div>
          <p className="text-left text-xs text-gray-500">From</p>
          <p className="min-h-6 text-left font-bold">
            {bPoint ?? <span className="">Boarding point</span>}
          </p>
        </div>
      </button>

      {errors.boardingPoint && (
        <small className="text-red-500 font-medium">
          {errors.boardingPoint.message}
        </small>
      )}
      <Popover
        open={Boolean(fromPlace)}
        anchorEl={fromPlace}
        disableScrollLock
        onClose={closeFromPopover}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            style: {
              width: 386,
              background: "transparent",
              borderRadius: 16,
              maxHeight: "calc(100% - 140px)",
              overflow: "hidden",
            },
          },
        }}
      >
        <div className="max-h-[calc(100vh-140px)] hideScrollBar overflow-y-scroll">
          <div className="!bg-slate-200/50 flex flex-col gap-y-2">
            <div className="p-4 bg-white flex items-center gap-x-2">
              <HailOutlinedIcon sx={{ fontSize: 30 }} />
              <div>
                <p className="text-left text-xs text-gray-500">From</p>
                <input
                  type="text"
                  {...register("boardingPoint")}
                  ref={fromPlacePopInputRef}
                  className="text-left font-bold outline-none"
                  placeholder="Enter Boarding point"
                />
              </div>
            </div>

            <div className="flex flex-col !bg-white p-4">
              <p className="font-semibold">Recent Searches</p>
            </div>

            <div className="!bg-white">
              <p className="font-semibold p-4">Popular cities</p>
              <ul className="flex flex-col ">
                {boardingPoints &&
                  boardingPoints.length > 0 &&
                  boardingPoints.map((bpc) => (
                    <li key={`boardingPoint-${bpc}`}>
                      <button
                        type="button"
                        className="p-4 w-full h-full text-left hover:bg-[#fed9d5] border-b border-b-slate-200 cursor-pointer"
                        onClick={() => {
                          setValue("boardingPoint", bpc);
                          if (bpc) clearErrors("boardingPoint");
                          closeFromPopover();
                        }}
                      >
                        {bpc}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </Popover>
    </div> */
}

{
  /* Destination place */
}
{
  /* <div className="relative w-[30%]">
      <button
        type="button"
        className="w-full p-2.5 border-t border-b border-slate-400 flex items-center gap-x-2 cursor-pointer outline-none"
        onClick={(e) => {
          openDestPopover(e);
          // console.log(e.currentTarget.getBoundingClientRect());
        }}
      >
        <LocationOnOutlinedIcon sx={{ fontSize: 30 }} />
        <div>
          <p className="text-left text-xs text-gray-500">To</p>
          <p className="min-h-6 text-left font-bold">
            {dPoint ?? <span className="">Destination point</span>}
          </p>
        </div>
      </button>

      {errors.destinationPoint && (
        <small className="text-red-500 font-medium">
          {errors.destinationPoint.message}
        </small>
      )}
      <Popover
        open={Boolean(destPlace)}
        anchorEl={destPlace}
        disableScrollLock
        onClose={closeDestPopover}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            style: {
              width: 386,
              background: "transparent",
              borderRadius: 16,
              maxHeight: "calc(100% - 140px)",
              overflow: "hidden",
            },
          },
        }}
      >
        <div className="max-h-[calc(100vh-140px)] hideScrollBar overflow-y-scroll">
          <div className="!bg-slate-200/50 flex flex-col gap-y-2">
            <div className="p-4 bg-white flex items-center gap-x-2">
              <HailOutlinedIcon sx={{ fontSize: 30 }} />
              <div>
                <p className="text-left text-xs text-gray-500">To</p>
                <input
                  type="text"
                  {...register("destinationPoint")}
                  ref={destPlacePopInput}
                  className="text-left font-bold outline-none"
                  placeholder="Enter Destination point"
                />
              </div>
            </div>

            <div className="flex flex-col !bg-white p-4">
              <p className="font-semibold">Recent Searches</p>
            </div>

            <div className="!bg-white">
              <p className="font-semibold p-4">Popular cities</p>
              <ul className="flex flex-col ">
                {boardingPoints &&
                  boardingPoints.length > 0 &&
                  boardingPoints.map((bpc) => (
                    <li key={`boardingPoint-${bpc}`}>
                      <button
                        type="button"
                        className="p-4 w-full h-full text-left hover:bg-[#fed9d5] border-b border-b-slate-200 cursor-pointer"
                        onClick={() => {
                          setValue("destinationPoint", bpc);
                          if (bpc) clearErrors("destinationPoint");
                          closeDestPopover();
                        }}
                      >
                        {bpc}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </Popover>
    </div> */
}

{
  /* Date Picker */
}
{
  /* <div className="relative w-[32%]">
      <button
        type="button"
        className="w-full p-2.5 border border-slate-400 flex justify-between gap-x-1.5 items-center cursor-pointer outline-none"
        onClick={openJourneyDatePopover}
      >
        <div className="flex items-center gap-x-2">
          <CalendarMonthOutlinedIcon sx={{ fontSize: 30 }} />
          <div>
            <p className="text-left text-xs text-gray-500">Date of Journey</p>
            <p className="min-h-6 text-left font-bold text-nowrap">
              {jDate ? DateFormater(jDate) : "DD-MM-YYYY"}
            </p>
          </div>
        </div>

        <div className="flex gap-x-2 overflow-y-scroll hideScrollBar">
          <span
            className="bg-[#fed9d5] hover:bg-[#f8d3cf] font-bold px-3 py-2 rounded-s-full text-sm rounded-e-full cursor-pointer"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              setValue("journeyDate", new Date(Date.now()));
            }}
          >
            Today
          </span>
          <span
            className="bg-[#fed9d5] hover:bg-[#f8d3cf] text-sm font-bold px-3 py-2 rounded-s-full rounded-e-full cursor-pointer"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              setValue(
                "journeyDate",
                new Date(Date.now() + 24 * 60 * 60 * 1000)
              );
            }}
          >
            Tomorrow
          </span>
        </div>
      </button>

      {errors.journeyDate && (
        <small className="text-red-500 font-medium">
          {errors.journeyDate.message}
        </small>
      )}

      <Popover
        open={Boolean(journeyDatePop)}
        anchorEl={journeyDatePop}
        disableScrollLock
        onClose={closeJourneyDatePopover}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            style: {
              width: 330,
              background: "white",
              borderRadius: 16,
              maxHeight: "calc(100% - 140px)",
              overflow: "hidden",
              top: 0,
              left: 0,
            },
          },
        }}
      >
        <div className="max-h-[calc(100vh-140px)] hideScrollBar overflow-y-scroll !bg-transparent">
          <div className="flex flex-col bg-white">
            <div className="p-4 pb-0 flex items-center gap-x-2 border-b-slate-200">
              <CalendarMonthOutlinedIcon sx={{ fontSize: 30 }} />
              <div>
                <p className="text-left text-xs text-gray-500">
                  Date of Journey
                </p>
                <p className="text-left font-bold">
                  {getValues("journeyDate")
                    ? DateFormater(getValues("journeyDate"))
                    : "DD-MM-YYYY"}
                </p>
              </div>
            </div>
            <div className="flex-1">
              <Controller
                name="journeyDate"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                      defaultValue={dayjs(new Date())}
                      sx={{
                        margin: 0,
                        minWidth: "100%",
                        "& .MuiPickersDay-root": {
                          fontSize: 16,
                        },
                        "& .MuiDayCalendar-weekContainer": {
                          justifyContent: "space-around",
                        },
                        "& .MuiDayCalendar-header": {
                          justifyContent: "space-around",
                        },
                        "& .MuiDayCalendar-weekDayLabel": {
                          fontSize: 16,
                        },
                        "& .MuiPickersCalendarHeader-label": {
                          fontSize: 16,
                        },
                        "& .MuiYearCalendar-root": {
                          width: "100%",
                          minHeight: "100%",
                          padding: "0px 20px",
                        },
                        "&.MuiDateCalendar-root": {
                          maxHeight: "100%",
                          height: "100%",
                          padding: "0px 16px 30px 16px",
                        },
                      }}
                      value={dayjs(value)}
                      onChange={(date) => {
                        closeJourneyDatePopover();
                        if (date) onChange(date.toDate());
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
            </div>
          </div>
        </div>
      </Popover>
    </div> */
}

{
  /* Submit button */
}
{
  /* <div className="flex justify-center w-[8%] max-h-[62px] p-2 border border-s-0 border-slate-400 rounded-se-2xl rounded-ee-2xl">
      <button
        type="submit"
        className={`w-full h-full rounded-s-full rounded-e-full ${
          loading ? "bg-[#7d7d7d]" : "bg-primary"
        } text-white font-semibold flex items-center justify-center gap-x-2 cursor-pointer outline-none`}
      >
        {!loading ? (
          <FiSearch className="text-2xl" />
        ) : (
          <ImSpinner8 className="text-2xl text-white  animate-spin" />
        )}
      </button>
    </div> */
}
{
  /* </div> */
}
{
  /* </form>; */
}
