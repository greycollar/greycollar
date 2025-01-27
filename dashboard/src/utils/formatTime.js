import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(duration);
dayjs.extend(relativeTime);

export const formatStr = {
  dateTime: "DD MMM YYYY h:mm a", // 17 Apr 2022 12:00 am
  date: "DD MMM YYYY", // 17 Apr 2022
  time: "h:mm a", // 12:00 am
  split: {
    dateTime: "DD/MM/YYYY h:mm a", // 17/04/2022 12:00 am
    date: "DD/MM/YYYY", // 17/04/2022
  },
  paramCase: {
    dateTime: "DD-MM-YYYY h:mm a", // 17-04-2022 12:00 am
    date: "DD-MM-YYYY", // 17-04-2022
  },
};

export function today(format) {
  return dayjs(new Date()).startOf("day").format(format);
}

export function now() {
  return dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ");
}

export function fDateTime(date, format) {
  if (!date) {
    return null;
  }

  const isValid = dayjs(date).isValid();

  return isValid
    ? dayjs(date).format(format ?? formatStr.dateTime)
    : "Invalid time value";
}

export function fDate(date, format) {
  if (!date) {
    return null;
  }

  const isValid = dayjs(date).isValid();

  return isValid
    ? dayjs(date).format(format ?? formatStr.date)
    : "Invalid time value";
}

export function fTime(date, format) {
  if (!date) {
    return null;
  }

  const isValid = dayjs(date).isValid();

  return isValid
    ? dayjs(date).format(format ?? formatStr.time)
    : "Invalid time value";
}
