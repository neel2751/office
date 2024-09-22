"use server";
import { connect } from "@/dbConfig/dbConfig";
import AttendanceModel from "@/models/attendanceModel";
import EmployeModel from "@/models/employeeModel";
import SiteAssignModel from "@/models/siteAssignModel";
import { getEmpSummaryData } from "../dashboardAction/dashboardAction";

export const getEmployeesForAttendance = async (date) => {
  try {
    await connect();
    // get only active status  employees for attendance
    let employees = await EmployeModel.find({ isActive: true });

    // fetch attendance data for secified date
    const attendanceRecords = await AttendanceModel.find({
      attendanceDate: new Date(date),
    });
    const employeeIds = employees.map((emp) => emp._id);
    // filter out the records which are not in the employee list
    const filteredRecord = attendanceRecords.filter((record) => {
      return employeeIds.includes(record.employeeId);
    });
    const newdata = [...new Set([...employees, filteredRecord])];
    console.log(newdata);
    return true;

    // merge the two array and return
    return [...new Set([...employees, ...filteredRecord])]; // remove duplicates using set
    // RangeError handling  for empty array
    if (!employees || !Array.isArray(employees))
      return { status: 503, message: "No employee found" };
    // send only name  and id to the client side
    let result = employees.map((item) => ({
      id: item._id,
      firstName: item.firstName,
      lastName: item.lastName,
      payRate: item.payRate,
    }));
    const data = {
      status: 200,
      count: employees.length,
      data: JSON.stringify(result),
    };
    return data;
  } catch (err) {
    console.log("Error getting all employees", err);
  }
};

export async function attendanceData(date, keyword) {
  // const originalDate = date.toISOString().split("T")[0];
  // const newDate = originalDate + "T00:00:00.000+00:00";
  try {
    await connect();

    // Set the start and end of the query date (full day range)
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0); // Beginning of the day

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999); // End of the day

    // Query for attendance records within the entire day range
    const attendanceRecords = await AttendanceModel.find({
      // we find site id and date as well
      attendanceDate: new Date(date),
    });

    // Continue with the rest of your code logic
    const employeeAttendanceMap = new Map();
    attendanceRecords.forEach((record) => {
      record.employeAttendance.forEach((attendee) => {
        const {
          employeeId,
          totalPay,
          totalHours,
          hours,
          breakHours,
          extraHours,
          aPayRate,
          note,
        } = attendee;

        // Update the employee map with attendance data
        employeeAttendanceMap.set(employeeId.toString(), {
          totalPay,
          totalHours,
          hours,
          breakHours,
          extraHours,
          aPayRate,
          note,
        });
      });
    });

    let employees;

    if (keyword) {
      // Search employees by keyword
      employees = await EmployeModel.find({
        $or: [
          { firstName: { $regex: String(keyword), $options: "i" } },
          { lastName: { $regex: String(keyword), $options: "i" } },
        ],
      });
    } else {
      // Fetch all active employees with valid eVisa
      employees = await EmployeModel.find(
        { eVisaExp: { $gte: new Date() }, isActive: true },
        { _id: 1, payRate: 1, firstName: 1, lastName: 1, paymentType: 1 }
      );
    }

    // Combine employees with attendance data
    const employeesWithData = employees.map((employee) => {
      const employeeId = employee._id.toString();
      const {
        totalPay = 0,
        hours = 0,
        breakHours = 0,
        extraHours = 0,
        totalHours = 0,
        note = "No Note",
      } = employeeAttendanceMap.get(employeeId) || {};

      return {
        ...employee.toObject(),
        totalPay,
        totalHours,
        hours,
        breakHours,
        extraHours,
        note,
      };
    });

    // Final result to return
    const result = {
      status: true,
      count: employeesWithData.length,
      data: JSON.stringify(employeesWithData),
    };
    return result;
  } catch (error) {
    console.error("Error fetching attendance or employee data:", error);
    return { status: false, message: "Error fetching data", error };
  }
}
// show in Tabel Data of all this month
export async function getEmployeeAttendanceData(page, limit, siteId, month) {
  const siteQuery = siteId ? { siteId: siteId } : {};
  const monthQuery = month
    ? { $expr: { $eq: [{ $month: "$attendanceDate" }, month] } }
    : {};
  const query = { $and: [siteQuery, monthQuery] };
  try {
    // try to connect to the database
    await connect(); // connect to the database
    const siteAssign = await AttendanceModel.find({
      ...query,
    })
      .skip((page - 1) * limit) // skip the first (page -
      .limit(limit) // get only 10 documents
      .populate({
        path: "employeAttendance.employeeId",
        select: { firstName: 1, lastName: 1, _id: 1 },
      })
      .populate({ path: "siteId", select: { siteName: 1, _id: 1 } })
      .lean(); // find all the documents in the collection
    const totalCount = await SiteAssignModel.countDocuments({
      // Apply the same date filter as the query above
      ...query,
    });
    const countEmploye = await getEmpSummaryData();
    const convert = JSON.parse(countEmploye?.data);

    const employeeData = siteAssign.map((item) => {
      const employeInfo = item.employeAttendance.map(({ employeeId }) => {
        if (employeeId) {
          const { firstName, lastName, _id } = employeeId;
          return { label: `${firstName} ${lastName}`, value: _id };
        } else {
          return { label: "Unknown", value: null }; // Handle cases where employeeId is not populated
        }
      });
      const siteInfo = {
        label: item?.siteId?.siteName,
        value: item?.siteId?._id,
      }; // get the site name
      const id = item._id;
      const date = item.attendanceDate;
      return {
        employeInfo,
        siteInfo,
        id,
        date,
        total: convert.totalEmployees,
      }; // return the data
    });
    if (siteAssign) {
      return { status: true, data: JSON.stringify(employeeData), totalCount }; // return the documents
    } else {
      return { status: false, message: "No Site Assign Found" }; // return a message
    } // end of else
  } catch (error) {
    // if there is an error
    console.error(error); // print the error
    return { status: false, message: "Failed to Get Site Assign" }; // return a message
  } // end of catch
}
export const addAttendance = async (data, editableRows, siteId) => {
  // const newDate = data.aDate.toISOString().split("T")[0];
  // const zeroTimeDate = newDate + "T00:00:00.000+00:00";
  // data.aDate = zeroTimeDate;

  try {
    if (!data)
      return {
        status: false,
        message: "Somthing went wrong Please try again.",
      };
    if (!editableRows) return { status: false, message: "No rows selected" };
    const { aDate, hours, breakHours, extraHours, note } = data;
    const [newId, edata] = Object.entries(editableRows)[0];
    const { totalHours, totalPay, payRate } = edata;
    const employeAttendance = {
      employeeId: newId,
      hours,
      breakHours,
      extraHours,
      aDate,
      totalHours,
      totalPay,
      aPayRate: payRate,
      aDate,
      isPresent: true,
      note,
    };
    let attendanceRecord = await AttendanceModel.findOne({
      attendanceDate: aDate,
      siteId,
    }).exec();
    if (!attendanceRecord) {
      attendanceRecord = new AttendanceModel({
        attendanceDate: aDate,
        siteId,
        employeAttendance,
      });
    }
    // Find employee attendance record within the found or newly created attendance record
    const employeeAttendanceRecord = attendanceRecord.employeAttendance.find(
      (record) => record.employeeId.toString() === newId.toString()
    );
    // Update existing employee's information in the array
    if (employeeAttendanceRecord) {
      // If employee attendance record found, update it
      Object.assign(employeeAttendanceRecord, employeAttendance);
    } else {
      // If employee attendance record not found, create a new record under the attendance date
      attendanceRecord.employeAttendance.push({
        attendanceDate: aDate,
        siteId: siteId,
        ...employeAttendance,
      });
    }
    // Save the updated or newly created attendance record
    const attendance = await attendanceRecord.save();
    if (attendance) {
      const response = {
        status: true,
        message: "Successfully recorded attendance",
      };
      return response;
    }
  } catch (err) {
    console.log(err.message);
    return { status: false, message: "Somthing  went wrong!" };
  }
};
