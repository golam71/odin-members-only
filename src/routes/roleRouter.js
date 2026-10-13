import { Router } from "express";
import ensureAuth from "../lib/ensureAuth.js";
import { becomeMember, becomeAdmin } from "../controller/roleController.js";

const roleRouter = Router();

roleRouter.get("/member", ensureAuth, (req, res) => {
  res.render("member", { user: req.user });
});

roleRouter.get("/admin", ensureAuth, (req, res) => {
  res.render("admin", { user: req.user });
});

roleRouter.post("/member", ensureAuth, becomeMember);
roleRouter.post("/admin", ensureAuth, becomeAdmin);

export default roleRouter;