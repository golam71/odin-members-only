import { Router } from "express";
import loginController from "../controller/loginController.js";

const loginRouter = Router();

loginRouter.get("/login", (req, res) => {
  const errors = req.session.messages || [];
  req.session.messages = [];
  res.render("login.ejs", { errors });
});

loginRouter.post("/login", loginController);

export default loginRouter;
