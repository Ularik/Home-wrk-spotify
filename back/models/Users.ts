import mongoose, { Model, Document, HydratedDocument } from "mongoose";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import config from "../config";


export interface UserFields {
  id: string;
  username: string;
  password: string;
  confirmPassword: string;
  token: string;
  role: string;
  displayName: string;
  googleID?: string;
  avatar?: string;
  __confirmPassword: string;
}


interface UsersMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

interface UserVirtuals {
    confirmPassword: string;
}

type UsersModel = Model<UserFields, {}, UsersMethods>

const UsersSchema = new mongoose.Schema<
 HydratedDocument<UserFields>,
 UsersModel, 
 UsersMethods, 
 {}, 
 UserVirtuals>({
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

  displayName: {
    type: String,
    required: true
  },
  googleID: String,
  avatar: String,
}, {
    virtuals: {
        confirmPassword: {
            get() {
                return this.__confirmPassword
            },
            set(confirmPassword: string) {
                this.__confirmPassword = confirmPassword;
            }
        }
    }
});

UsersSchema.path("username").validate({
  validator: async function (this: Document, value: string) {
    if (!this.isModified("username")) return true;
    const user = await UsersOrm.findOne({ username: value });
    return !user;
  },

  message: "This user is already registered",
});

UsersSchema.path("password").validate(function (currentPassword: string) {
  if (!this.isModified("password")) return;

  // Если пароли НЕ совпадают, возвращаем false
  return currentPassword === this.confirmPassword;
}, "Passwords do not match");

UsersSchema.pre("save", async function () {
    if (!this.isModified("password")) return; 

    try {
      this.password = await argon2.hash(this.password);
    } catch (e) {
      throw new Error("Error hash password");
    }
});

UsersSchema.methods.generateToken = function () {
  this.token = jwt.sign({ _id: this._id }, config.refreshSecret, {
    expiresIn: "7d",
  });
};


UsersSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    const { password, ...rets } = ret;
    return rets;
  },
});

UsersSchema.methods.checkPassword = function (password) {
  return argon2.verify(this.password, password);
};

const UsersOrm = mongoose.model("Users", UsersSchema);
export default UsersOrm;