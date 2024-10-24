import express from 'express';
import nodemailer from 'nodemailer';
import Job from '../models/Job.js';  // Import the Job model
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Route to get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();  // Fetch all jobs from MongoDB
    console.log('Fetched all jobs:', jobs); // Logging the jobs fetched from the database
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error); // Log any errors in fetching jobs
    res.status(500).json({ message: 'Error fetching jobs' });
  }
});

// Route to send emails to selected companies
router.post('/send-mails', async (req, res) => {
  const { emails } = req.body;

  // Log received emails
  console.log('Received email list from frontend:', emails);

  if (!emails || emails.length === 0) {
    console.error('No emails provided by the frontend.');
    return res.status(400).json({ message: 'No emails provided' });
  }

  try {
    // Log that we're preparing to send emails
    console.log('Preparing to send emails...');

    // Configure the nodemailer transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'darlene.pacocha26@ethereal.email',
        pass: 'rr9whTxHAUpe3sUVyf',
      },
    });

    // Loop through the emails and send each one
    for (let email of emails) {
      console.log(`Sending email to: ${email}`);

      const mailOptions = {
        from: '"Aastha Modi" <missaastha11@gmail.com>',
        to: email,
        subject: 'Application for MERN Stack Developer Role',
        text: 'Hi there, I am interested in the MERN Stack Developer position...',
        html: '<p>Hi there, I am interested in the MERN Stack Developer position...</p>',
      };

      // Send the email using nodemailer
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${email} successfully.`);
    }

    // Send success response
    res.status(200).json({ message: 'Emails sent successfully!' });
  } catch (error) {
    console.error('Error sending emails:', error); // Log error details in the backend
    res.status(500).json({ message: 'Error sending emails', error: error.message });
  }
});

export default router;
