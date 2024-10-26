import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import JobRoutes from "./routes/JobRoutes.js";
import SendEmailRoutes from "./routes/SendEmailRoute.js";

dotenv.config();

const app = express();

app.use(express.json());

// Getting environment variables.
const port = process.env.PORT;
const mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB.
const connectToMongoDB = async () => {
  const username = process.env.MONGO_USERNAME; // Get MongoDB username from .env
  const password = encodeURIComponent(process.env.MONGO_PASSWORD); // Get MongoDB password from .env
  const dbName = process.env.MONGO_DB_NAME; // Get MongoDB database name from .env

  try {
    await mongoose.connect(
      `mongodb+srv://${username}:${password}@cluster0.bbhnx.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error', error);
  }
};

connectToMongoDB();

app.get("/", async (req, res) => {
    res.json({
        routes: {
            "/jobs": "Get all emails who are seeking for jobs.",
            "/jobs/addMail": "Add a new mail.",
            "/jobs/deleteMail": "Delete a mail.",
            "/jobs/updateMail": "Update a mail.",
        }
    })
});

app.use("/jobs", JobRoutes);
app.use("/sendEmail", SendEmailRoutes);

app.listen(port, () => {
    console.log("Server is running on port", port);
});
