export const DateFormater = (date: Date) => {
  const argDate = new Date(date);
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
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return daysOfWeek[date.getDay()];
};


