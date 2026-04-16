import { NextFunction, Request, Response, RequestHandler } from "express";
import { HydratedDocument } from "mongoose";
import UsersOrm, { UserFields } from "../models/Users";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import config from "../config";

export interface RequestWithUser extends Request {
  user: HydratedDocument<UserFields>;
}

const auth: RequestHandler = async (
  expressReq: Request,
  res: Response,
  next: NextFunction,
) => {
  const req = expressReq as RequestWithUser;
  const jwtToken = req.cookies.accessToken;

  if (!jwtToken) {
      return res.status(401).send({error: 'No access token present'});
  }
  try {
    const decoded = jwt.verify(jwtToken, config.jwtSecret) as { _id: string };
    const user = await UsersOrm.findOne({ _id: decoded._id });

    if (!user) {
      return res
        .status(401)
        .send({ error: "Invalid or expired access token" });
    }

    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    if (e instanceof TokenExpiredError) {
      return res.status(401).send({ error: "Your token expired" });
    } else {
      return res
        .status(401)
        .send({ error: "Please authenticate. Invalid access token" });
    }
  }
};

export default auth;
