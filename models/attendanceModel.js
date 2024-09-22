import mongoose from "mongoose";

const employeAttendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Types.ObjectId,
    ref: "Employe",
    required: true,
  },
  hours: {
    type: Number,
    required: true,
    validate(value) {
      if (typeof value !== "number") throw new Error("Hours must be a number");
    },
  },
  breakHours: {
    type: Number,
    default: 0,
    // validate(value) { if (this.hours && (isNaN(parseInt(value)) || value < this.hours)) throw new Error("Break time can't be")
    validate(value) {
      if (this.hours < value)
        throw new Error("Break time can't be longer than work time");
    },
  },
  extraHours: {
    type: Number,
    default: 0,
  },
  totalHours: {
    type: Number,
    required: true,
    // computed property that returns the sum of hours and extraHours properties and subtract s breakHours
    // get() { return this.hours + this.extraHours - this.breakHours }
    //    get() { return this.extraHours + this.hours - this.breakHours }
    // get() {
    //   return this.getDataValue("hours") + this.getDataValue("extraHours");
    // }
  },
  totalPay: {
    type: Number,
    required: true,
    // calculated property that multiplies the totalHours by the hourlyWage
    // get() { return this.totalHours * this.hourlyWage }
    // get() {
    //   return this.totalHours * Employee.payRate;
    // },
  },
  aPayRate: {
    type: Number,
    required: true,
    // static property that defines the pay rate for all instances of the Employee model
    // static payRate = 15 ;
  },
  aDate: {
    type: Date,
    required: true,
  },
  isPresent: {
    type: Boolean,
    required: true,
  },
  note: { type: String, required: false },
});
// Define virtual property for totalPay
// employeAttendanceSchema.virtual("totalPay").get(function () {
//   return this.totalHours * this.aPayRate;
// });
const attendanceSchema = new mongoose.Schema(
  {
    attendanceDate: {
      type: Date,
      required: true,
    },
    siteId: {
      type: mongoose.Types.ObjectId,
      ref: "ProjectSite",
      required: true, // Ensure siteId is mandatory
    },
    employeAttendance: {
      // Student's ID who is attending the class
      type: [employeAttendanceSchema],
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const AttendanceModel =
  mongoose.models.Attendance || mongoose.model("Attendance", attendanceSchema);
export default AttendanceModel;

// Method to get the attendance of an Employee on a specific day
// employeAttendanceSchema.statics.getDaywiseAttendance = async function (
//   employeeId,
//   date
// ) {
//   return await this.findOne({ employeeId, date });
// };

// // Method to add/update the Attendance for an Employee for a particular Day
// employeAttendanceSchema.methods.addOrUpdateAttendance = async function ({
//   _id,
//   ...attendanceData
// }) {
//   const doc = await this.model(_id ? "_id" : false).findById(_id);
//   if (!_id) {
//     // Create New
//     console.log("Creating new");
//     return this.create(attendanceData);
//   } else {
//     // Update Existing
//     Object.assign(doc, attendance.set(attendanceData));
//     return doc.save();
//   }
// };
