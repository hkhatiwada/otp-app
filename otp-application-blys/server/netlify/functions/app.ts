import express from "express";

// const express = require("express");
// const bodyParser = require("body-parser");
import serverless from "serverless-http";

const app = express();
const router = express.Router();

app.use(express.json());

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log("Server started"));

app.use(express.static("dist"));

// Generate a random 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

router.get("/healthcheck", (req, res) => {
  res.send("api health check success");
});

router.post("/verify-otp", (req, res) => {
  const otp = req.body.otp;

  if (otp.length !== 6 || otp.charAt(5) === "7") {
    res
      .status(400)
      .json({ error: "Otp should be 6 digits and shouldn't end with 7" });
  } else {
    res
      .status(200)
      .json({ success: true, message: "OTP verified successfully" });
  }
});

app.use("/api", router);
export const handler = serverless(app);
