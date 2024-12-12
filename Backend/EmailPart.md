```js
const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

app.use(express.json());

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail", // Or use another email provider
  auth: {
    user: "your-email@gmail.com", // Replace with your email
    pass: "your-email-password", // Replace with your email password or app password
  },
});

app.post("/api/sendEmail", async (req, res) => {
  const { name, email, complaint } = req.body;

  const mailOptions = {
    from: "your-email@gmail.com",
    to: "receiver-email@example.com", // Replace with the recipient's email
    subject: "User Complaint",
    text: `Hello, \n\nYou have received a new complaint:\n\nName: ${name}\nEmail: ${email}\nComplaint: ${complaint}\n\nBest regards,\nYour App`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email." });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
```****