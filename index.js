import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import quizzesRoute from "./routes/quizzesRoute.js";
import questionRoute from "./routes/questionRoute.js";
import { engine } from "express-handlebars";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine("hbs", engine({ extname: "hbs" }));
app.set("view engine", "hbs");
app.set("views", "./resources/views");

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Database connected Successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on port : ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

app.use(cors(corsOptions));

app.use("/quizzes", quizzesRoute);
app.use("/question", questionRoute);
