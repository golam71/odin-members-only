import { Router } from "express";
import singupController from "../controller/signupController.js";

const singupRouter = Router();

singupRouter.get("/signup", (req, res) => {
  res.render("singup.ejs");
});

singupRouter.post("/signup", singupController);

export default singupRouter;
