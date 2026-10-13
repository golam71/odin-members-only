import process from "node:process";
import { makeMember, makeAdmin } from "../model/roleModel.js";

try {
  process.loadEnvFile();
} catch (error) {
  console.log(error);
}

async function becomeMember(req, res) {
  const { password } = req.body;
  try {
    if (!req.user) return res.redirect("/login");
    if (req.user.is_member) return res.redirect("/");
    if (password === process.env.MEMBER_PASSWORD) {
      await makeMember(req.user.id);
      return res.redirect("/");
    }
    res.render("member", { user: req.user, errors: ["Incorrect password"] });
  } catch (error) {
    console.log(error);
    res.render("member", { user: req.user, errors: ["Something went wrong"] });
  }
}

async function becomeAdmin(req, res) {
  const { password } = req.body;
  try {
    if (!req.user) return res.redirect("/login");
    if (!req.user.is_member) return res.redirect("/member");
    if (req.user.is_admin) return res.redirect("/");
    if (password === process.env.ADMIN_PASSWORD) {
      await makeAdmin(req.user.id);
      return res.redirect("/");
    }
    res.render("admin", { user: req.user, errors: ["Incorrect password"] });
  } catch (error) {
    console.log(error);
    res.render("admin", { user: req.user, errors: ["Something went wrong"] });
  }
}

export { becomeMember, becomeAdmin };