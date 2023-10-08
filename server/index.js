// const express = require('express')
import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "../server/routes/auth.routes.js";
import bugRoutes from "../server/routes/bug.routes.js";

const app = express();
const PORT = 4000;

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// respond with "hello world" when a GET request is made to the homepage
app.get("/", (req, res) => {
  console.log(req.body);
  res.send("Hello World!!");
});

app.use("/auth", authRoutes);

app.use('/bugs', bugRoutes)

mongoose
  .connect("mongodb://127.0.0.1:27017/bug-report")
  .then(() => console.log("Connected to DB!"));

app.listen(PORT, () => {
  console.log(`listening to port http://localhost:${PORT}`);
});
