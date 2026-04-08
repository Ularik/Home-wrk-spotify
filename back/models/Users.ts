import mongoose, { Model } from "mongoose";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import config from "../config";


export interface UsersFields {
    id: string;
    username: string;
    password: string;
    role: string;
    token: string
}

interface UsersMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

type UsersModel = Model<UsersFields, {}, UsersMethods>

const UsersSchema = new mongoose.Schema<UsersFields, UsersModel, UsersMethods>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["user", "admin"],
  },
  token: {
    type: String,
    required: true,
  },
});

UsersSchema.path("username").validate({
  validator: async function (this: any, value: string) {
    // Если поле name не изменялось, пропускаем валидацию
    if (!this.isModified("username")) return true;
    const user = await UsersOrm.findOne({ username: value });
    return !user;
  },

  message: "This user is already registered",
});

UsersSchema.pre("save", async function () {
    if (!this.isModified("password")) return; 

    try {
      this.password = await argon2.hash(this.password);
    } catch (e) {
      throw new Error("Error hash password");
    }
});

UsersSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    const { password, ...rets } = ret;
    return rets;
  },
});

UsersSchema.methods.checkPassword = function (password) {
  return argon2.verify(this.password, password);
};

UsersSchema.methods.generateToken = function () {
  this.token = jwt.sign({ _id: this._id }, config.jwtSecret, {
    expiresIn: "7d",
  });
};

const UsersOrm = mongoose.model<UsersFields, UsersModel>("Users", UsersSchema);
export default UsersOrm;