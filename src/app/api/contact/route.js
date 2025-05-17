import { NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import Contact from '../../models/Contact';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    // Parse the request body
    const { name, email, message, time } = await req.json();
    
    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Please provide all required fields' },
        { status: 400 }
      );
    }
    
    // Connect to MongoDB
    await connectDB();
    
    // Create a new contact record
    const newContact = await Contact.create({
      name,
      email,
      message
    });
    
    // Set up nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    
    // Send email notification
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: 'luckysolanki902@gmail.com',
      subject: 'Someone contacted you from your portfolio',
      html: `
        <div style="
          font-family: sans-serif;
          max-width: 500px;
          margin: 0 auto;
          padding: 2rem;
          border: 1px solid #ddd;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        ">
          <p style="margin-bottom: 1rem;"><strong>Name:</strong> ${name}</p>
          <p style="margin-bottom: 1rem;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #337ab7;">${email}</a></p>
          <p style="margin-bottom: 1rem;"><strong>Message:</strong></p>
          <blockquote style="
            background-color: #f9f9f9;
            border-left: 10px solid #ccc;
            margin: 1.5rem 0;
            padding: 0.5rem 1rem;
            quotes: none;
          ">
            ${message}
          </blockquote>
          <p style="margin-bottom: 1rem;"><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `
    });
    
    return NextResponse.json({
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
    });
    
  } catch (error) {
    console.error('Error in contact submission:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
