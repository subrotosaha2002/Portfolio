import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const CONTACT_RECEIVER = process.env.CONTACT_RECEIVER;

if (!GMAIL_USER) {
  console.error("❌ GMAIL_USER is missing in .env");
}

if (!GMAIL_APP_PASSWORD) {
  console.error("❌ GMAIL_APP_PASSWORD is missing in .env");
}

if (!CONTACT_RECEIVER) {
  console.error("❌ CONTACT_RECEIVER is missing in .env");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Portfolio contact API is running.",
    config: {
      gmailUserConfigured: Boolean(GMAIL_USER),
      gmailPasswordConfigured: Boolean(GMAIL_APP_PASSWORD),
      contactReceiverConfigured: Boolean(CONTACT_RECEIVER),
    },
  });
});

app.post("/api/contact", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      projectType,
      budget,
      timeline,
      message,
    } = req.body;

    if (!name || !email || !projectType || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    const budgetNumber = Number(budget);

    const formattedBudget =
      !Number.isNaN(budgetNumber) && budgetNumber > 0
        ? `₹${budgetNumber.toLocaleString("en-IN")}`
        : "Not provided";

    const mailOptions = {
      from: `"Portfolio Inquiry" <${GMAIL_USER}>`,
      to: CONTACT_RECEIVER,
      replyTo: email,
      subject: `New Project Inquiry — ${name}`,

      text: `
New Portfolio Project Inquiry

CLIENT DETAILS

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Company / Brand: ${company || "Not provided"}

PROJECT DETAILS

Project Type: ${projectType}
Estimated Budget: ${formattedBudget}
Expected Timeline: ${timeline || "Not provided"}

PROJECT REQUIREMENTS

${message}
      `,

      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <h2>New Portfolio Project Inquiry</h2>

          <hr style="border:none; border-top:1px solid #e5e7eb;" />

          <h3>Client Details</h3>

          <p>
            <strong>Name:</strong> ${name}<br />
            <strong>Email:</strong> ${email}<br />
            <strong>Phone:</strong> ${phone || "Not provided"}<br />
            <strong>Company / Brand:</strong> ${
              company || "Not provided"
            }
          </p>

          <h3>Project Details</h3>

          <p>
            <strong>Project Type:</strong> ${projectType}<br />
            <strong>Estimated Budget:</strong> ${formattedBudget}<br />
            <strong>Expected Timeline:</strong> ${
              timeline || "Not provided"
            }
          </p>

          <h3>Project Requirements</h3>

          <div
            style="
              padding:16px;
              background:#f3f4f6;
              border-radius:8px;
              white-space:pre-wrap;
            "
          >
            ${message}
          </div>
        </div>
      `,
    };

    console.log("📨 Sending inquiry from:", email);

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully");
    console.log("Message ID:", info.messageId);

    return res.status(200).json({
      success: true,
      message: "Your inquiry has been sent successfully.",
    });
  } catch (error) {
    console.error("❌ Contact API error:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to send your inquiry. Please try again later.",
    });
  }
});

app.listen(PORT, async () => {
  console.log(`Portfolio API running on http://localhost:${PORT}`);

  try {
    await transporter.verify();

    console.log("✅ Gmail SMTP connection verified successfully");
  } catch (error) {
    console.error("❌ Gmail SMTP verification failed:");
    console.error(error.message);
  }
});