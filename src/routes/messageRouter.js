import { Router } from "express";
import ensureAuth from "../lib/ensureAuth.js";
import { createMessageController, deleteMessageController } from "../controller/messageController.js";

const messageRouter = Router();

messageRouter.get("/message", ensureAuth, (req, res) => {
  res.render("message", { user: req.user });
});

messageRouter.post("/message", ensureAuth, createMessageController);
messageRouter.post("/deleteMessage", ensureAuth, deleteMessageController);

export default messageRouter;