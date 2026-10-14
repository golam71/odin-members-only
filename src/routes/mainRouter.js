import { Router } from "express";
import securityRouter from "./securityRouter.js";
import authRouter from "./authRouter.js";
import loginRouter from "./loginRouter.js";
import singupRouter from "./signupRouter.js";
import messageRouter from "./messageRouter.js";
import roleRouter from "./roleRouter.js";
import { getAllMessages } from "../model/messageModel.js";

const mainRouter = Router();

mainRouter.use(securityRouter);
mainRouter.use(authRouter);
mainRouter.use(loginRouter);
mainRouter.use(singupRouter);
mainRouter.use(messageRouter);
mainRouter.use(roleRouter);

mainRouter.get("/", async (req, res) => {
  try {
    const messages = await getAllMessages();
    res.render("index", { user: req.user, messages });
  } catch (error) {
    console.log(error);
    res.render("index", { user: req.user, messages: [] });
  }
});

export default mainRouter;