import mongoose, { Model } from "mongoose";
import bcrypt from "bcrypt";
import { randomUUID } from "node:crypto";

const SALT_WORK_FACTOR = 10;

interface UsersFields {
    username: string;
    password: string;
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

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
});

UsersSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    const { password, ...rets } = ret;

    return rets;
  },
});

UsersSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UsersSchema.methods.generateToken = function () {
  this.token = randomUUID();
}

const UsersOrm = mongoose.model<UsersFields, UsersModel>("Users", UsersSchema);
export default UsersOrm;