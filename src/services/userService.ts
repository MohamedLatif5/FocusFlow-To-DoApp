import bcrypt from "bcryptjs";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import mongoose from "mongoose";

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const comparePassword = async (
  hashedPassword: string,
  candidatePassword: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  } catch (error) {
    throw new Error("Password comparison failed");
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await comparePassword(user.password, password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  return {
    message: "Login successful",
    token,
    user: { id: (user._id as mongoose.Types.ObjectId).toString(), name: user.name, email: user.email },
  };
};

// Function to create user (example, can expand)
export const createUser = async (
  name: string,
  email: string,
  password: string
): Promise<any> => {
  // Basic validation
  if (!name || !email || !password) {
    throw new Error("Missing required fields");
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const user = new User({ name, email, password });
  await user.save();

  // Convert to plain object and remove password before returning
  const userObject = user.toObject();
  const { password: _, ...userWithoutPassword } = userObject;

  return userWithoutPassword;
};
