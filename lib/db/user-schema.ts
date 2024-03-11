import { Schema, model, models } from "mongoose";
import { User } from "@/lib/types/user";

const userSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 200,
    },
    password: {
      type: String,
      required: true,
      min: 16,
    },
  },
  { timestamps: true },
);

export const UserModel = models.User || model("User", userSchema);
