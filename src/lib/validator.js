function validate(fullname, email, password, confirm_password) {
  if (typeof fullname !== "string" || fullname.trim().length < 2) {
    throw new Error("Full name must be at least 2 characters long.");
  }

  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Email is invalid.");
  }

  if (typeof password !== "string" || password.length < 8) {
    throw new Error("Password must be at least 8 characters long.");
  }

  if (password !== confirm_password) {
    throw new Error("Passwords do not match.");
  }
}

export default validate;
