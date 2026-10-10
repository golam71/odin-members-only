import bcrypt from "bcryptjs";
import { insertUser } from "../model/singupModel.js";
import validate from "../lib/validator.js";

async function singupController(req, res) {
  const { fullname, email, password, confirm_password } = req.body;

  try {
    validate(fullname, email, password, confirm_password);
    const hashed_password = await bcrypt.hash(password, 12);

    await insertUser(fullname, email, hashed_password);
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
}

export default singupController;
