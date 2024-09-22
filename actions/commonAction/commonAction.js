"use client";
import bcrypt from "bcryptjs";
import { SessionProvider } from "next-auth/react";
import { toast } from "react-toastify";
import {
  createHash,
  randomBytes,
  createCipheriv,
  createDecipheriv,
} from "crypto";

export function changeDateToString(date) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(date).toLocaleDateString("en-GB", options);
}

export function changeDateToStringFull(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
}

export function chnageDateToISOString(date) {
  const newDate = date.toISOString().split("T")[0];
  const zeroTimeDate = newDate + "T00:00:00.000Z";
  return zeroTimeDate;
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
  if (totalPay < 0) {
    // setHours("");
    // setBreakHours("");
    // setExtraHours("");
    toast.error(
      "Total pay cannot be less than 0. Please review your hours and pay rate.",
      // `Invalid input! Total Pay should be greater than or equal to zero.`
      {
        closeButton: false, // Hide the close button
      }
    );
  }
  // Round total pay for all rows to two decimal places
  return totalPay;
};

// This is generate by Gemini Google
export function calculateTotalHoursGemini(hours, breakHours, extraHours) {
  // Extract hours and minutes from user input
  const extractHoursAndMinutes = (time) => {
    let hoursPart = Math.floor(time);
    let minutesPart = Math.round((time - hoursPart) * 100); // Treat everything after decimal as minutes

    if (minutesPart >= 60) {
      // Convert minutes exceeding 59 to additional hours
      hoursPart += Math.floor(minutesPart / 60);
      minutesPart = minutesPart % 60;
    }

    return { hours: hoursPart, minutes: minutesPart };
  };

  const { hours: totalHours, minutes: totalMinutesFromInput } =
    extractHoursAndMinutes(hours);
  const { hours: breakHoursInt, minutes: breakMinutes } =
    extractHoursAndMinutes(breakHours);
  const { hours: extraHoursInt, minutes: extraMinutes } =
    extractHoursAndMinutes(extraHours);

  // Convert all to minutes
  const totalMinutes = totalHours * 60 + totalMinutesFromInput;
  const breakMinutesTotal = breakHoursInt * 60 + breakMinutes;
  const extraMinutesTotal = extraHoursInt * 60 + extraMinutes;

  // Calculate net minutes
  const netMinutes = totalMinutes - breakMinutesTotal + extraMinutesTotal;

  // Calculate total hours and remaining minutes
  const totalHoursResult = Math.floor(netMinutes / 60);
  const remainingMinutes = netMinutes % 60;
  const finalHour = parseFloat(
    `${totalHoursResult}.${remainingMinutes}`
  ).toFixed(2);
  return finalHour;

  // return { totalHours: totalHoursResult, totalMinutes: remainingMinutes };
}

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

// 390705.5 this function take miliSecond

/* @ take the id
 * @ get the key from the environment
 * @ using the for loop
 * @ return the encryption Data
 */
export function encryptionID(id) {
  // const key = 123;
  // const encryptedCode = [];
  // for (let i = 0; i < id.toString().length; i++) {
  //   encryptedCode.push(id.toString().charCodeAt(i) ^ key);
  // }
  // return encryptedCode.join("");
  const encryptedId = createHash("sha256").update(id).digest("hex");
  // decrypt Id(encryptedId); // decrypt the id
  // decrypt the encryptedId

  return encryptedId;
}

export function encryptId(id) {
  const key =
    "52bdc56fb0440989d14fad277de68f2221727ae3501ffe3d37607e5684d4be88"; // Generate a random key
  const iv = randomBytes(16); // Initialization vector
  const cipher = createCipheriv("aes-256-cbc", Buffer.from(key, "hex"), iv);
  let encrypted = cipher.update(
    JSON.stringify({
      id,
    }),
    "utf8",
    "hex"
  );
  encrypted += cipher.final("hex");
  const encrypt = `${encrypted}?iv=${iv.toString("hex")}`;
  return encrypt;
}

export function decryptId(encryptedId, iv) {
  try {
    const key =
      "52bdc56fb0440989d14fad277de68f2221727ae3501ffe3d37607e5684d4be88";
    const decipher = createDecipheriv(
      "aes-256-cbc",
      Buffer.from(key, "hex"),
      iv
      // Buffer.from(iv, "hex")
    ); // create a decipher object
    let decrypted = decipher.update(encryptedId, "hex", "utf8"); // update the decipher object
    decrypted += decipher.final("utf8"); // final update the decipher object
    const decryptedId = JSON.parse(decrypted).id; // parse the decrypted string
    return decryptedId;
  } catch (error) {
    return error;
  }
}

// function decryptId(encryptedData, iv) {
//   const key = process.env.NEXTAUTH_SECRET;
//   const decipher = createDecipheriv("aes-256-cbc", key, Buffer.from(iv, "hex"));
//   let decrypted = decipher.update(encryptedData, "hex", "utf8");
//   decrypted += decipher.final("utf8");
//   return JSON.parse(decrypted).id;
// }

/* @ take the encryption id
 * @ get the key from the environment
 * @ using the for loop
 * @ return the decryption Data
 */
export function decryptionID(encryptedId) {
  const key = 123;
  console.log(encryptedId); // encrypted id
  const decryptCode = [];
  for (let i = 0; i < encryptedId.length; i++) {
    // Loop through each character
    decryptCode.push(String.fromCharCode(encryptedId[i] ^ key)); // XOR with the key
  } // Convert the character to a string
  console.log(decryptCode);
  return decryptCode.join(""); // Join the characters into a string
  console.log(decryptCode.join(""));
  return decryptCode.join("");

  // const key = process.env.NEXTAUTH_SECRET;
  const decryptedCode = [];
  for (let i = 0; i < encryptedId.length; i++) {
    decryptedCode.push(String.fromCharCode(encryptedId.charCodeAt(i) ^ key));
  }
  return decryptedCode.join("");
}
