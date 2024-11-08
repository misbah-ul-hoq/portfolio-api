import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import nodemailer from "nodemailer";
dotenv.config();
const app = express();
const port = process.env.PORT || 8080;
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

//middlewares
app.use(express.json());
app.use(cors());

app.post("/api/email", async (req, res) => {
  console.log(req.body);

  transporter.sendMail(
    {
      from: emailUser,
      to: "extraordinarymisbah@gmail.com",
      subject: `${req.body.subject}`,
      // text: `${req.body.message} <br /> `,
      html: `<h3>${req.body.message}</h3>  <br /> 
      <h3>Sender's Name: ${req.body.name}</h3> 
      <h3>Senders Email: ${req.body.email}</h3>`,
    },
    function (error, info) {
      if (error) {
        // console.log(error);
        res.send(error);
      } else {
        // console.log(info);
        res.send(info);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
