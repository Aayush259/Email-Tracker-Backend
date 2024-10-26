import express from "express";
import dotenv from "dotenv";
import Job from "../models/Job.js";

dotenv.config();

const router = express.Router();

// Route to get all mails.
router.get("/", async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        console.log("Error fetching jobs:", error);
        res.status(500).json({ error: "Error fetching jobs" });
    }
});

// Route to add a new mail.
router.post("/addMail", async (req, res) => {
    try {
        const alreadyExistsMail = await Job.find({ email: req.body.email });

        if (alreadyExistsMail.length > 0) {
            return res.status(400).json({ error: "Email already exists." });
        }

        const data = new Job(req.body);
        await data.save();
        res.json({
            message: "Data sent successfully",
            data: data,
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Route to delete a mail.
router.post("/deleteMail", async (req, res) => {
    const alreadyExistsMail = await Job.find({ email: req.body.email });

    if (!(alreadyExistsMail.length > 0)) {
        return res.status(400).json({ error: "Email does not exists." });
    }
    
    try {
        await Job.findOneAndDelete({ email: req.body.email });
        res.json({
            message: "Deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Route to update a mail.
router.post("/updateMail", async (req, res) => {
    const alreadyExistsMail = await Job.find({ email: req.body.email });

    if (!(alreadyExistsMail.length > 0)) {
        return res.status(400).json({ error: "Email does not exists." });
    }
    
    try {
        await Job.findOneAndUpdate({ email: req.body.email }, req.body);
        res.json({
            message: "Updated successfully",
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

export default router;
