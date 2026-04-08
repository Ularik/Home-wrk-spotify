import { NextFunction, Request, Response, RequestHandler } from "express";
import { HydratedDocument } from "mongoose";
import UsersOrm, { UsersFields } from "../models/Users";
import jwt from "jsonwebtoken";
import config from "../config";

export interface RequestWithUser extends Request {
  user: HydratedDocument<UsersFields>;
}

const auth: RequestHandler = async (
  expressReq: Request,
  res: Response,
  next: NextFunction,
) => {
  const req = expressReq as RequestWithUser;
  const token = req.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send({ error: "No token present" });
  }
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as { _id: string };
    const user = await UsersOrm.findOne({ _id: decoded._id, token });

    if (!user) {
      return res.status(401).send({ error: "Invalid Token" });
    }

    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "please authentificate" });
  }
};

export default auth;
