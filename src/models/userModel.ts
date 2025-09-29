import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define interface for User document (removed comparePassword as it's now in service)
// Define interface for User document
interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // Don't include password in queries by default
    },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt automatically
  }
);

// Hash password before saving (keep this in model as it's schema-specific)
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// No comparePassword method here anymore - moved to userService.ts

const User = mongoose.model<IUser>("User", userSchema);

export default User;
