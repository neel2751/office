import mongoose from "mongoose";

const officeEmployeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    password: { type: String, required: true },
    department: { type: String, required: true },
    roleType: {
      type: mongoose.Types.ObjectId,
      ref: "RoleType",
      required: true,
    },
    isActive: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: false },
    isSuperAdmin: { type: Boolean, default: false },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: false },
    delete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const OfficeEmployeeModel =
  mongoose.models.OfficeEmploye ||
  mongoose.model("OfficeEmploye", officeEmployeSchema);

export default OfficeEmployeeModel;

//officeEmployeeModel will be used to create and manage instances of the Office Employee model in the database
// Method to check if the user's password is correct
// officeEmployeSchema.methods.isCorrectPassword=function(password){
//    return bcrypt.compareSync(password,this.password);
// }
// // Hashing passwords before saving them in database with bcrypt
// officeEmployeSchema.pre('save', function (next) {
//     const employee = this;
//     // If password was not changed, skip it.
//     if (!employee.isModified('password')) return next();
//     // Generate a salt and use it to hash the password.
//     bcrypt.genSalt(SALT_ROUNDS, function(err, salt) {
//         if (err) return next(err);
//         bcrypt.hash(employee.password, salt, function(err, hash)
//         {
//             if (err) return next(err);
//             // Save the hashed version of the password back to the user object.
//             employee.password = hash;
//             next();
//         })
//     });
// })
