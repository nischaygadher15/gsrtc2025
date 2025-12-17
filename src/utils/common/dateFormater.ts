export const DateFormater = (date: Date) => {
  const argDate = new Date(date);
  console.log("argDate:", argDate);
  const day = argDate.getDate();
  const month = argDate.getMonth();
  const year = argDate.getFullYear();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${day} ${months[month]}, ${year}`;
};

// Get day of week
export const getDayOfWeek = (date: Date) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return daysOfWeek[date.getDay()];
};
