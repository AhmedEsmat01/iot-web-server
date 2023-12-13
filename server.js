import fs from "fs";

import cors from "cors";
import express from "express";
import dotenv from 'dotenv'

import formTemperatureAlertMail from "./services/mail.service.js";

dotenv.config()

const app = express();

//body parser
app.use(express.json());

app.use(cors());

app.post("/send-temperature-pressure", async (req, res) => {
  console.log("request recived");
  const { temperature, email, threshold, pressure } = req.body;

  const newData = { temperature, pressure };

  if (temperature >= threshold) {
    await formTemperatureAlertMail(email, temperature);
    return res.status(200).json({ message: "email sent" });
  }

  res.status(200).json({ message: "success" });
});


app.all("*", (req, res) => {
  res.status(404).json({ message: "Invalid Route" });
});

const port = parseInt(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`App Running on port ${port}`);
});
