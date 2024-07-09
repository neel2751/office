import mongoose from "mongoose";

// Define the bankDetails schema
const bankDetailSchema = new mongoose.Schema({
  accountName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: Number,
    required: true,
  },
  sortCode: {
    type: Number,
    required: true,
  },
});
// Define the Full Address schema
const addressSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  streetAddress: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  zipCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    default: "United Kingdom", // Default to UK if not provided
  },
});

const employeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide a firstName"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide a LastName"],
    },
    email: {
      type: String,
      unique: true,
    },
    ePassword: {
      type: String,
      default: "cdc@1234",
    },
    phone: {
      type: Number,
      unique: true,
      // validate(value) {
      //   if (!/^(\+\d{1,3}|0)?\s?-?\(?\d{1,5}\)?[\.\-\s]?[01]{9}$/.test(value)) {
      //     throw new Error("Phone number is invalid");
      //   }
      // },
      required: true,
    },
    eAddress: {
      type: addressSchema,
      required: true,
    },
    employeType: {
      // CIS or PAYROLL
      type: String,
      required: true,
    },
    paymentType: {
      // MONTHLY or WEEKLY
      type: String,
      // enum: ['Hourly', 'Fixed']
      enum: ["Weekly", "Monthly"],
    },
    bankDetail: {
      type: bankDetailSchema,
      required: false,
    },
    projectSite: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProjectSite",
    },
    payRate: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: false,
    },
    employeRole: {
      type: String,
      required: true,
    },
    employeNI: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerfied: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    delete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const EmployeModel = mongoose.model("Employe", employeSchema);

export default EmployeModel;

//#AFTER WE CAN IMPLEMENT THIS FOR EVERYONE
// hourlyRate: {
//   type: Number,
//   required: function () {
//     return this.paymentType == "Hourly";
//   },
// },
// workDaysInWeek: {
//   type: Number,
//   min: [1, "Work days in a week should be at least 1."],
//   max: [7, "Work days in a week cannot exceed 7."],
//   required: function () {
//     return this.paymentType == "Hourly";
//   },
// },
// fixedSalary: {
//   type: Number,
//   required: function () {
//     return this.paymentType == "Fixed";
//   },
//   },
