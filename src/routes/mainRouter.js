import { Router } from "express";
import authRouter from "./authRouter.js";
import loginRouter from "./loginRouter.js";
import singupRouter from "./signupRouter.js";

const mainRouter = Router();

mainRouter.use(authRouter);
mainRouter.use(loginRouter);
mainRouter.use(singupRouter);

mainRouter.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

export default mainRouter;
