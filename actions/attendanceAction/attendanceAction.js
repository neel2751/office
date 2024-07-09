"use server";
import { connect } from "@/dbConfig/dbConfig";
import AttendanceModel from "@/models/attendanceModel";
import EmployeModel from "@/models/employeeModel";

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
  try {
    await connect();

    // Fetch attendance records for the specified  date
    const attendanceRecords = await AttendanceModel.find({
      attendanceDate: new Date(date),
    });

    // Create a map to store total pay and total hours for each employee
    const employeeAttendanceMap = new Map();

    // Iterate over each record and update the map with total pay and total  hours for each employee
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
        } = attendee;
        employeeAttendanceMap.set(employeeId.toString(), {
          totalPay,
          totalHours,
          hours,
          breakHours,
          extraHours,
          aPayRate,
        });
      });
    });

    let employees;

    if (keyword) {
      const filterData = await EmployeModel.find(
        {
          // <-- Remove { query }, just pass the query object directly
          $or: [
            { firstName: { $regex: String(keyword), $options: "i" } },
            { lastName: { $regex: String(keyword), $options: "i" } },
          ],
        },
        { _id: 1, firstName: 1, lastName: 1, payRate: 1, paymentType: 1 }
      );
      employees = filterData;
    } else {
      // const records = await Attendance.find(query).sort({ attendanceDate: -1 });
      // Fetch all employees from the employe table
      employees = await EmployeModel.find(
        { isActive: true },
        { _id: 1, payRate: 1, firstName: 1, lastName: 1, paymentType: 1 }
      );
    }

    // Create an array to store employee data with total pay and total hours
    const employeesWithData = employees.map((employee) => {
      const employeeId = employee._id.toString();
      const {
        totalPay = 0,
        hours = 0,
        breakHours = 0,
        extraHours = 0,
        totalHours = 0,
      } = employeeAttendanceMap.get(employeeId) || {};
      return {
        ...employee.toObject(),
        totalPay,
        totalHours,
        hours,
        breakHours,
        extraHours,
      };
    });
    const result = {
      status: true,
      count: employeesWithData.length,
      data: JSON.stringify(employeesWithData),
    };
    return result;
  } catch (error) {
    console.error("Error fetching employee data:", error);
  }
}

export const addAttendance = async (data, editableRows) => {
  console.log(data, editableRows);
  try {
    if (!data)
      return {
        status: false,
        message: "Somthing went wrong Please try again.",
      };
    if (!editableRows) return { status: false, message: "No rows selected" };
    const { aDate, hours, breakHours, extraHours } = data;
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
    };
    let attendanceRecord = await AttendanceModel.findOne({
      attendanceDate: aDate,
    }).exec();
    if (!attendanceRecord) {
      attendanceRecord = new AttendanceModel({
        attendanceDate: aDate,
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
