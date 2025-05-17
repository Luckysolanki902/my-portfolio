import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './Terminal.module.css';

const Terminal = ({ initialMessage = "Hey, I'm Lucky Solanki, a full-stack web developer. Type help to view available commands or type ai to start a conversation.", onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', content: initialMessage },
  ]);
  const [loading, setLoading] = useState(false);
  const [aiMode, setAiMode] = useState(false); // AI mode toggle
  const terminalRef = useRef(null);
  const terminalContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Effect for handling clicks outside the terminal
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        terminalContainerRef.current && 
        !terminalContainerRef.current.contains(event.target) &&
        !event.target.closest('.floatingButton') // Don't close if clicking the floating button
      ) {
        if (onClose) onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  // Handle close
  const handleClose = (e) => {
    e.stopPropagation();
    if (onClose) onClose();
  };

  // Commands that the terminal recognizes
  const commands = {
    help: {
      description: 'Show available commands',
      action: () => {
        return Object.keys(commands).map(cmd => (
          `${cmd}: ${commands[cmd].description}`
        )).join('\n');
      }
    },
    ai: {
      description: 'Toggle AI mode for smarter conversations',
      action: () => {
        // This is handled in executeCommand
        return null;
      }
    },
    about: {
      description: 'Learn about Lucky Solanki',
      action: () => {
        return `I'm Lucky Solanki, a Full-Stack Web Developer with expertise in Node.js, React, MongoDB, MySQL, and more.
Currently a B.Tech student at Harcourt Butler Technical University, I combine academic knowledge with practical experience as the Web Developer & Tech Lead at Maddy Custom.
I've worked on scaling e-commerce platforms, building admin dashboards, and creating student social platforms like Meet Your Mate (MYM).
I'm passionate about creating innovative digital solutions with clean, efficient code.`;
      }
    },
    skills: {
      description: 'List my technical skills',
      action: () => {
        return `Frontend Development:
- React.js, Next.js, HTML5, CSS3, JavaScript
- Tailwind CSS, Material-UI
- Redux.js, Redux Persist, React Spring

Backend & API:
- Node.js, Express.js
- MongoDB, MySQL
- REST APIs, Payment Gateways (Razorpay, Stripe)

Cloud & DevOps:
- AWS (S3, CloudFront, Amplify)
- Shiprocket, Webhooks, Systems Design

Real-Time Communication:
- Socket.IO, WebRTC, Agora RTC

Authentication & Security:
- Firebase, NextAuth, CryptoJS, Clerk

Data & ML:
- Python (NumPy, Pandas, Matplotlib, Seaborn)
- Machine Learning Fundamentals

Tools:
- Git, GitHub, VS Code, Postman, Figma`;
      }
    },
    projects: {
      description: 'View my projects',
      action: () => {
        return `1. MYM - An Anonymous Social Media for Students
   Tech: Socket.IO, Express, Next.js, MongoDB, CryptoJS
   URL: meetyourmate.vercel.app
   - Connected college students across India for anonymous interactions
   - Features include anonymous text chat, vlogs, and interactive commenting
   - Optimized for high traffic with real-time communication

2. Technika '24 Website
   - HBTU's technical fest website with seamless event registration
   - Integrated ticketing and merchandise systems, boosting participation by 20%
   - Implemented coupon logic and Cloudinary for media handling

3. Maddy Custom E-commerce Platform
   - Scalable platform managing 50,000+ monthly users and 2,000+ transactions
   - Comprehensive admin dashboard for product management 
   - Integrated secure payment verification and Shiprocket

4. AI Quiz Solver
   - Automated quiz solver capturing screen content with PyAutoGUI
   - Uses Tesseract for OCR and OpenAI API for problem-solving
   - Sends answers to WhatsApp using Twilio integration`;
      }
    },
    contact: {
      description: 'Get my contact information',
      action: () => {
        return `Email: luckysolanki902@gmail.com
LinkedIn: linkedin.com/in/lucky-solanki-3417a4229
GitHub: github.com/Luckysolanki902
Mobile: +91 9027495997`;
      }
    },
    clear: {
      description: 'Clear the terminal',
      action: () => {
        setHistory([]);
        return null;
      }
    }
  };

  // Process AI requests by calling the OpenAI API route
  const processAiRequest = async (message) => {
    setLoading(true);
    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      
      if (!response.ok) {
        throw new Error('API request failed');
      }
      
      const data = await response.json();
      return data.reply;
    } catch (error) {
      console.error('Error processing AI request:', error);
      return "Sorry, I couldn't process that request. Please try again later.";
    } finally {
      setLoading(false);
    }
  };

  // Handle async AI responses
  const processAI = async (query) => {
    setLoading(true);
    
    try {
      const aiResponse = await processAiRequest(query);
      setLoading(false);
      return aiResponse;
    } catch (error) {
      setLoading(false);
      return "I don't have specific information about that. Try asking about my skills, projects, or background.";
    }
  };

  // Handle command execution
  const executeCommand = async (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === '') {
      return;
    }
    
    // Add user input to history
    setHistory(prev => [...prev, { type: 'user', content: cmd }]);
    
    // Special command to toggle AI mode
    if (trimmedCmd === "ai") {
      const newAiMode = !aiMode;
      setAiMode(newAiMode);
      setHistory(prev => [...prev, { 
        type: 'system', 
        content: `AI mode ${newAiMode ? 'enabled' : 'disabled'}. ${newAiMode ? 'Now I can answer more questions!' : 'Back to command mode.'}` 
      }]);
      return;
    }
    
    // Check if it's a recognized command
    if (commands[trimmedCmd]) {
      const result = commands[trimmedCmd].action();
      if (result !== null) {
        setHistory(prev => [...prev, { type: 'system', content: result }]);
      }
    } else if (aiMode) {
      // In AI mode, use the OpenAI API integration
      try {
        const aiResponse = await processAiRequest(cmd);
        setHistory(prev => [...prev, { type: 'system', content: aiResponse }]);
      } catch (error) {
        console.error('AI processing error:', error);
        setHistory(prev => [...prev, { 
          type: 'system', 
          content: "Sorry, I couldn't process that request. Please try again later." 
        }]);
      }
    } else {
      // Fallback to simulated responses
      const aiResponse = await processAI(cmd);
      setHistory(prev => [...prev, { type: 'system', content: aiResponse }]);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    executeCommand(input);
    setInput('');
  };

  // Auto-scroll to bottom when history updates
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when terminal is clicked
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
    return (
    <motion.div 
      className={styles.terminalContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      ref={terminalContainerRef}
    >
      <div className={styles.terminalHeader}>
        <div className={styles.terminalTitle}>lucky@terminal ~ </div>
        <button 
          className={styles.closeButton}
          onClick={handleClose}
          title="Close"
          aria-label="Close terminal"
        >×</button>
      </div>
      
      <div className={styles.terminalBody} onClick={focusInput} ref={terminalRef}>
        {history.map((item, index) => (
          <div key={index} className={`${styles.terminalLine} ${styles[item.type]}`}>
            {item.type === 'user' ? (
              <>
                <span className={styles.prompt}>visitor@lucky-portfolio:~$ </span>
                {item.content}
              </>
            ) : (
              <>{item.content}</>
            )}
          </div>
        ))}
        {loading && (
          <div className={styles.terminalLine}>
            <span className={styles.loading}>
              <span className={styles.loadingText}>Thinking</span>
              <span className={styles.loadingDots}>
                <span className={styles.dot}>.</span>
                <span className={styles.dot}>.</span>
                <span className={styles.dot}>.</span>
              </span>
            </span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className={styles.inputForm}>
          <span className={styles.prompt}>visitor@lucky-portfolio:~$ </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={styles.terminalInput}
            ref={inputRef}
            autoFocus
            aria-label="Terminal input"
            spellCheck="false"
          />
        </form>
      </div>
      
      <div className={styles.terminalFooter}>
        <div className={styles.footerText}>Type &quot;help&quot; to see available commands{aiMode ? " | AI Mode Active" : ""}</div>
      </div>
    </motion.div>
  );
};

export default Terminal;
