import mongoose from 'mongoose';

// Define the schema for contact submissions
const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Message is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Use existing model or create a new one to prevent errors with hot reloading
const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);

export default Contact;
