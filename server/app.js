import express from "express";
import parser from "body-parser";
import dotenv from "dotenv";
import v1Routes from "./routes/index.js";
import response from "./utilities/response.js";

dotenv.config();
const app = express();
app.listen(80);

app.use(parser.json({ inflate: true })); // since we need to parse json

app.use("/v1", v1Routes);
app.use("/v1", response);
