"use client";
import bcrypt from "bcryptjs";
import { SessionProvider } from "next-auth/react";
import { toast } from "react-toastify";

export function changeDateToString(date) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
}

export const convertToCSV = async (data) => {
  const header = Object.keys(data[0]).join(",");
  const rows = data.map((row) => Object.values(row).join(","));
  return [header, ...rows].join("\n");
};

export async function exportCSVFile(currentData) {
  var csv = await convertToCSV(currentData);
  var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  var linkElement = document.createElement("a");
  "download", `${new Date()} Site Projects`;
  linkElement.href = URL.createObjectURL(blob);
  document.body.appendChild(linkElement);
  linkElement.click();
  document.body.removeChild(linkElement);
}

export const calculateTotalPayForRows = (
  editableRows,
  setHours,
  setBreakHours,
  setExtraHours
) => {
  let totalPayForAllRows = 0;

  // Iterate over each row in editableRows
  Object.keys(editableRows).forEach((id) => {
    const row = editableRows[id];

    // Extract total hours and pay rate for the current row
    const totalHours = parseFloat(row.totalHours || 0);
    const payRate = parseFloat(row.payRate || 0);

    // Calculate total pay for the current row
    const totalPayForRow = totalHours * payRate;

    // Add total pay for the current row to the total pay for all rows
    totalPayForAllRows += totalPayForRow;
  });

  const totalPay = totalPayForAllRows.toFixed(2);
  console.log(totalPay);
  if (totalPay < 0) {
    setHours("");
    setBreakHours("");
    setExtraHours("");
    toast.error(
      `Invalid input! Total Pay should be greater than or equal to zero.`
    );
  }
  // Round total pay for all rows to two decimal places
  return totalPay;
};

export const calculateTotalHours = (hours, breakHours, extraHours) => {
  // Convert hours and extra hours to minutes
  const totalHoursMinutes = parseFloat(hours || 0) * 60;

  // Convert break hours to minutes
  const breakHoursInt = Math.floor(parseFloat(breakHours));
  const breakMinutes = Math.round(
    (parseFloat(breakHours) - breakHoursInt) * 100
  );
  // const extraHoursMinutes = parseFloat(extraHours || 0) * 60;
  const breakExtraHoursInt = Math.floor(parseFloat(extraHours));
  const breakExtraMinutes = Math.round(
    (parseFloat(extraHours) - breakExtraHoursInt) * 100
  );
  // Calculate total minutes
  const totalMinutes =
    totalHoursMinutes -
    breakHoursInt * 60 -
    breakMinutes +
    breakExtraHoursInt * 60 +
    breakExtraMinutes;

  // Convert total minutes back to hours and remaining minutes
  const totalHourss = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  const totalHours = parseFloat(`${totalHourss}.${remainingMinutes}`).toFixed(
    2
  );
  // Combine total hours and minutes with a dot
  return isNaN(totalHours) ? 0 : totalHours;
};

export const AuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export const GenerateHashPassword = (password) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
  } catch (error) {
    console.log("Error hashing password: ", error);
  }
};
