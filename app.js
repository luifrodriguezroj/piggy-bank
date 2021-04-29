const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const app = express();
const nodemailer = require("nodemailer");
require("dotenv/config");

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, () => {
  console.log("connected to DB!");
});

const accountsRouter = require('./routes/accounts');
app.use('/accounts', accountsRouter);

app.post('/contact', async (req, res) => {
  let transporter = nodemailer.createTransport({
    host: "in-v3.mailjet.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let info = await transporter.sendMail({
    from: '"Luis Rodríguez" <luifrodriguezroj@unal.edu.co>',
    to: req.body.email + ", luifrodriguezroj@unal.edu.co",
    subject: req.body.subject,
    text: req.body.content,
  });

  console.log("Message sent: %s", info.messageId);

  res.send("Email sent!");
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/piggy-bank-client/build/'));
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/piggy-bank-client/build/index.html'));
} else {
  app.get("/", (req, res) => {
    res.send("Api running");
  })
}

app.listen(process.env.PORT || 5000);
