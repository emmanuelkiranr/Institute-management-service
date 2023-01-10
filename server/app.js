import express from "express";
import accountsRoute from "./apps/public/routes.js";
import adminRoute from "./apps/admin/routes.js";
import parser from "body-parser";

const app = express();
app.listen(80);

app.use(parser.json({ inflate: true })); // since we need to parse json

app.use("/api/v1", accountsRoute);
app.use("/api/v1", adminRoute);
