import passport from "passport";

const loginController = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureMessage: true,
});

export default loginController;
