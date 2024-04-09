import express from "express";
import morgan from "morgan";

import router from "./routes/index";

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/v1", router);

app.listen(4000, () => {
  console.log("app is listening to the port 4000");
});
