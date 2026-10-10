import { Router } from "express";
import loginController from "../controller/loginController.js";

const loginRouter = Router();

loginRouter.get("/login", (req, res) => {
  res.render("login.ejs");
});

loginRouter.post("/login", loginController);

export default loginRouter;
