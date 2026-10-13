import express from "express";
const app = express();
import path from "node:path";

import mainRouter from "./routes/mainRouter.js";

app.set("view engine", "ejs");
app.set("views", path.join(import.meta.dirname, "views"));
app.use(express.urlencoded({ extended: false }));

app.use(mainRouter);

app.listen(3000, () => {
  console.log("Running at http://localhost:3000");
});