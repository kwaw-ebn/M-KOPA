const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Email transporter (use your Gmail or SMTP)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-app-password"
  }
});

app.post("/apply", (req, res) => {
  const { name, phone, location } = req.body;

  const mailOptions = {
    from: "your-email@gmail.com",
    to: "your-email@gmail.com",
    subject: "New Application",
    text: `Name: ${name}\nPhone: ${phone}\nLocation: ${location}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.status(500).send(error);
    res.send("Application submitted successfully!");
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));