import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request) {
  try {
    // Get the request body
    const { message } = await request.json();
    
    if (!message) {
      return NextResponse.json(
        { error: "No message provided" },
        { status: 400 }
      );
    }

    const myResume = `LUCKY SOLANKI
 +91 9027495997 | luckysolanki902@gmail.com | linkedin.com/in/lucky-solanki-3417a4229 | github.com/Luckysolanki902
 EDUCATION
 Harcourt Butler Technical University
 Bachelor of Technology (ME)
 EXPERIENCE
 2021 – 2025
 Kanpur, India
 Web Developer & Tech Lead
 Maddy Custom
 Dec 2022 - Present 
Kanpur, India (Hybrid: On-Site & Remote)
 Led the development of a scalable eCommerce platform from scratch, managing 50,000+ monthly users and 2,000+ transactions,
 with a focus on performance optimization and tech workflows.
 Built a comprehensive admin dashboard with features like product management, bulk image downloads, reporting, and role-based
 access for Marketing, Production, and Design departments.
 Integrated secure payment verification and Shiprocket with webhook-based order tracking for streamlined operations.
 Leveraged MS Clarity, Google Analytics, and Search Console for user behavior analysis and SEO-driven optimizations.
 Web Development Head
 Technical Sub Council, HBTU
 Nov 2023 – Jan 2024 
Kanpur, India (Remote, Freelance)
 Built HBTU's technical fest website with seamless event registration, ticketing, and merchandise systems, boosting participation
 by 20%
 Integrated coupon logic and Cloudinary for efficient media handling, enhancing sales and user experience.
 Intern, Machine Learning with Python
 Zebo.AI
 Worked on Python-based ML projects, including restaurant review classification and image classification.
 Utilized Pandas, NumPy, Seaborn, and Matplotlib for data analysis and insights extraction.
 PROJECTS
 May 2022 – Jun 2022
 Kanpur, India (Remote)
 MYM - An Anonymous Social Media for Students (meetyourmate.vercel.app)
 Developed and launched a platform connecting college students across India for anonymous, open, and honest interactions,
 encouraging meaningful conversations.
 Created innovative features like anonymous text chat, anonymous vlogs, and interactive commenting, with private replies to
 ensure a safe and engaging environment.
 Implemented scalability optimizations to handle high user traffic, ensuring smooth performance and low latency even during
 peak times.
 Integrated real-time communication with Socket.IO and secured data with CryptoJS for privacy.
 Technologies used: Socket.IO, Express, Next.js, MongoDB, CryptoJS.
 Technika ’24 Website
 Built HBTU's technical fest website with seamless event registration, ticketing, and merchandise systems, boosting participation
 by 20%.
 Integrated coupon logic and Cloudinary for efficient media handling, enhancing sales and user experience.
 AI Quiz Solver
 Developed an automated quiz solver that captures the screen when the cursor is placed in the bottom right corner, extracts the
 text using Tesseract, and sends it to OpenAI API for solving.
 The correct option is then sent to WhatsApp using Twilio.
 Technologies used: Python, PyAutoGUI for screen capture, Tesseract for OCR, OpenAI API, Twilio for WhatsApp integration.
 KEY SKILLS
 Frontend Development & UI/UX: React.js, Next.js, HTML5, CSS3, JavaScript, TypeScript, Tailwind CSS, Material-UI, Redux.js,
 Redux Persist, React Spring
 Backend & API Development: Node.js, Express.js, MongoDB, MySQL, REST APIs, Payment Gateways (Razorpay, Stripe)
 Cloud, DevOps & Scalability: AWS (S3, CloudFront, Amplify), Shiprocket, Webhooks, Systems Design
 Real-Time Communication: Socket.IO, WebRTC, Agora RTC
 Authentication & Security: Firebase, NextAuth, CryptoJS, Clerk
 Data Analysis & Machine Learning: Python (NumPy, Pandas, Matplotlib, Seaborn), ML Fundamentals
 Version Control & CI/CD: Git, GitHub
 Development Tools & Software: VS Code, Postman, Figma, Burp Suite, Kali Linux (Security Testing), SQLmap`
    
    // Initialize OpenAI client
    // Note: You would need to provide your API key in an environment variable
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // This should be set in .env.local file
    });
    
    // Make a request to the OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are Lucky Solanki, a passionate fullstack web developer who loves to code and can code for hours and hours. Provide concise, professional, and helpful responses related to your work, skills, and experience in web development.\n \n Your resume is:\n" + myResume
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 300,
    });
    
    const aiResponse = completion.choices[0].message.content;
    
    return NextResponse.json({ reply: aiResponse });
  } catch (error) {
    console.error('OpenAI API error:', error);
    
    return NextResponse.json(
      { error: "Error processing your request" },
      { status: 500 }
    );
  }
}
