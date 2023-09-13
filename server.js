const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();
const port = 3000;

// Middleware to parse JSON data from the request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// POST endpoint to send an email
app.post("/send-email", async (req, res) => {
  console.log(req.body);
  try {
    // Extract data from the request body
    const { Name, Email, phone, message } = req.body;

    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "Xapollon430@gmail.com",
        pass: process.env.PASSWORD,
      },
    });

    // Email data
    const mailOptions = {
      from: "Xapollon430@gmail.com",
      to: "drivewithlux@gmail.com", // Recipient's email address
      subject: "Question From Customer",
      text: `Customer with the name of ${Name}, email of ${Email}, and number of ${phone} left this message: "${message}"`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Error sending email" });
  }
});

// New endpoint to send an email with drop-off location, date, time, and car name
app.post("/send-dropoff-email", async (req, res) => {
  console.log(req.body);
  try {
    // Extract data from the request body
    const Name = req.body.Name;
    const Email = req.body.Email;
    const Phone = req.body.Phone;
    const DropoffLocation = req.body.DropoffLocation;
    const PickUpDate = req.body["Pick Up Date"];
    const CollectionDate = req.body["Collection Date"];
    const CarName = req.body.CarName; // Add this line to extract car name

    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "Xapollon430@gmail.com",
        pass: process.env.PASSWORD,
      },
    });

    // Email data
    const mailOptions = {
      from: "Xapollon430@gmail.com",
      to: "drivewithlux@gmail.com", // Recipient's email address
      subject: "Drop-off Information",
      text: `Customer with the name of ${Name}, email of ${Email}, and number of ${Phone} has the following drop-off details for car "${CarName}":\n\nDrop-off Location: ${DropoffLocation}\nDrop-off Date: ${PickUpDate}\nDrop-off Time: ${CollectionDate}\n\n`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Drop-off email sent successfully" });
  } catch (error) {
    console.error("Error sending drop-off email:", error);
    res.status(500).json({ error: "Error sending drop-off email" });
  }
});

app.use(express.static(path.resolve(__dirname, "./luxdrive")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve("./luxdrive"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
