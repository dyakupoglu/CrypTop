import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define the User schema
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// // Hash the password before saving the user
// UserSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   }
//   next();
// });

// // Compare the password
// UserSchema.methods.comparePassword = function (password, callback) {
//   bcrypt.compare(password, this.password, (err, isMatch) => {
//     if (err) return callback(err);
//     callback(null, isMatch);
//   });
// };

export default mongoose.model("User", UserSchema);
