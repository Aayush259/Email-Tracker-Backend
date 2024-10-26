import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const EmailUser = process.env.SENDER_EMAIL;
const EmailPassword = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
        user: EmailUser,
        pass: EmailPassword,
    }
});

const sendEmail = async (req, res) => {
    try {
        const emails = req.body.emails;
        const subject = req.body.subject;
        const emailContent = req.body.emailContent;

        if (!emails || emails.length === 0 || !subject || !emailContent) {
            return res.status(400).json({ error: "Invalid request data" });
        }

        const emailPromises = emails.map(email => {
            const mailOptions = {
                from: EmailUser,
                to: email,
                subject: subject,
                text: emailContent,
            };

            return transporter.sendMail(mailOptions);
        });

        await Promise.all(emailPromises);

        return res.json({ message: "Emails sent successfully" });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};

router.post("/", async (req, res) => { sendEmail(req, res) });

export default router;
