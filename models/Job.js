import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true }
});

const Job = mongoose.model('Job', jobSchema);
export default Job;
