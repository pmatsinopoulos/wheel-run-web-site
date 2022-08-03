import { format } from "date-fns"

const formattedDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  let formattedDate = "";
  if (!isNaN(date.getTime())) {
    formattedDate = format(date, "MMM dd, yyyy");
  }
  return formattedDate;
}

export default formattedDate;
