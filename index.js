import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import nodemailer from "nodemailer";
import { dbConnect } from "./startup/db.js";
import routes from "./startup/routes.js";
import { Email } from "./models/email.js";

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

let allowedOrigins;

if (process.env.NODE_ENV === "development") {
  allowedOrigins = "http://localhost:3000";
} else {
  allowedOrigins = "https://misbahulhoq.vercel.app";
}
console.log(process.env.NODE_ENV);
//middlewares
app.use(express.json());
app.use(cors({ origins: allowedOrigins }));
routes(app);
dbConnect();

app.post("/api/email", async (req, res) => {
  console.log(req.body);

  if (!req.body.name || !req.body.email || !req.body.message)
    return res.status(400).send({ message: "All fields are required" });

  const email = await new Email(req.body).save();
  console.log(email);

  transporter.sendMail(
    {
      from: emailUser,
      to: "extraordinarymisbah@gmail.com",
      subject: `New message from portfolio.`,
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Contact Information</title>
  <style type="text/css">
    /* Client-specific resets */
    body, table, td, p, a, li, blockquote {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    table, td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    img {
      -ms-interpolation-mode: bicubic;
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
    }
    
    /* Basic styles */
    body {
      margin: 0;
      padding: 0;
      width: 100% !important;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #333333;
    }
    
    /* Container styles */
    .email-container {
      max-width: 600px;
      margin: 0 auto;
    }
    
    /* Header styles */
    .header {
      background: linear-gradient(135deg, #6366F1 0%, #A855F7 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    
    .header h1 {
      margin: 0;
      font-weight: 700;
      font-size: 28px;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
    }
    
    /* Content styles */
    .content {
      background-color: #ffffff;
      padding: 30px;
      border-left: 1px solid #E5E7EB;
      border-right: 1px solid #E5E7EB;
    }
    
    .info-card {
      margin-bottom: 20px;
      padding: 15px;
      background-color: #F9FAFB;
      border-radius: 6px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    
    .info-label {
      font-weight: 600;
      color: #4F46E5;
      margin-bottom: 5px;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .info-value {
      margin: 0;
      font-size: 16px;
      line-height: 1.5;
      word-break: break-word;
    }
    
    .message-box {
      background-color: #F3F4F6;
      border-radius: 6px;
      padding: 20px;
      margin-top: 20px;
      border-left: 4px solid #6366F1;
    }
    
    .footer {
      background-color: #F9FAFB;
      padding: 20px;
      text-align: center;
      color: #6B7280;
      font-size: 12px;
      border-radius: 0 0 8px 8px;
      border: 1px solid #E5E7EB;
      border-top: none;
    }
    
    /* Responsive styles */
    @media screen and (max-width: 600px) {
      .email-container {
        width: 100% !important;
      }
      
      .header, .content, .footer {
        padding: 15px !important;
      }
      
      .header h1 {
        font-size: 24px !important;
      }
      
      .info-card {
        padding: 10px !important;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Contact Information</h1>
    </div>
    
    <div class="content">
      <div class="info-card">
        <div class="info-label">Name</div>
        <p class="info-value">${req.body.name}</p>
      </div>
      
      <div class="info-card">
        <div class="info-label">Email</div>
        <p class="info-value">${req.body.email}</p>
      </div>
      
      <div class="message-box">
        <div class="info-label">Message</div>
        <p class="info-value">${req.body.message}</p>
      </div>
    </div>
    
    <div class="footer">
      This email was sent securely • Please do not reply directly to this message.
    </div>
  </div>
</body>
</html>`,
    },
    function (error, info) {
      if (error) {
        console.log(error);
        // res.send(error);
      } else {
        //console.log(info);
      }
    }
  );
  res.send({ message: "Email sent successfully", email });
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
