const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 8081;
require('dotenv').config()
app.use(bodyParser.json());
app.use(cors({
  origin: '*', 
  credentials: true 
}));


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_ID, // enter your gmail id
    pass: process.env.EMAIL_PASSKEY, // enter your gmail app - password 
    },
  });

app.post('/send-email', (req, res) => {
  console.log("entered send-email" + req.body);
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: 'sanu3199netflix@gmail.com',  
    to: to,                        
    subject: subject,              
    text: text                     
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: error.toString() });
    }
    res.status(200).json({ message: 'Email sent succesfully : ' + info.response });
  });
});

app.get('/', (req, res) => {
  res.send('Hello, welcome to the email server!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
