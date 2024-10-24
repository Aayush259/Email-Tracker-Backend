import express from 'express'; 
import cors from 'cors'; 
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url'; // Import to fix __dirname issue
import { dirname } from 'path';      // Import to fix __dirname issue

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: '*', // Allow all origins (for development purposes)
}));
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
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

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname); // This will log the correct directory now

// Importing routes
import jobRoutes from './routes/JobRoutes.js';

// Use routes
app.use('/api/jobs', jobRoutes); 

// Port setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
