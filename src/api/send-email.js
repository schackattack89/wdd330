import nodemailer from 'nodemailer';
import express from 'express';

const router = express.Router();

router.post('/send-email', async (req, res) => {
  const { user_name, user_email, user_message } = req.body;

  if (!user_name || !user_email || !user_message) {
    return res.status(400).send({ error: "Missing required fields." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your preferred service
      auth: {
        user: 'your_email@gmail.com',
        pass: 'your_app_password' // Gmail requires an App Password
      }
    });

    const mailOptions = {
      from: user_email,
      to: 'your_email@gmail.com',
      subject: `New message from ${user_name}`,
      text: user_message
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send({ success: "Email sent successfully!" });
  } catch (err) {
    console.error("Email failed:", err);
    res.status(500).send({ error: "Failed to send email." });
  }
});

export default router;
