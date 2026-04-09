import express from "express";
import UsersOrm from "../models/Users";
import { Error } from "mongoose";

const usersRouter = express.Router();

usersRouter.post("/", async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username.trim() === "" || password.trim() === "") {
    res.sendStatus(400).send({ error: "empty username or password" });
    return;
  }
  const data = {
    username,
    password,
  };

  try {
    const user = new UsersOrm(data);
    user.generateToken();
    await user.save();
    return res.send({user, message: "Register new user"});

  } catch (err) {
    if (err instanceof Error.ValidationError) {
      return res.status(400).send(err);
    }
    return next(err);
  }
});



usersRouter.post("/sessions", async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username.trim() === "" || password.trim() === "") {
    res.status(400).send({ error: "empty username or password" });
    return;
  }

    try {
      const user = await UsersOrm.findOne({ username: username });

      if (!user) {
        res.status(400).send({ error: "user does not exist" });
        return;
      }

      const isMatch = await user.checkPassword(password);
      if (!isMatch) {
        res.status(400).send({ error: "password not valid" });
        return;
      }
      
      user.generateToken();
      await user.save();
      res.send({ user, message: "Login user" });
    } catch (err) {
      if (err instanceof Error.ValidationError) {
        return res.status(400).send(err);
      }
      return next(err);
    }
});


usersRouter.delete("/sessions", async (req, res, next) => {
  try {
    const token = req.get("Authorization");
    const success = { message: "Success" };

    if (!token) return res.send(success);

    const user = await UsersOrm.findOne({ token });
    if (!user) return res.send(success);
    user.token = "";
    user.save();
    return res.send(success);
  } catch (e) {
    return next(e);
  }
});


export default usersRouter;