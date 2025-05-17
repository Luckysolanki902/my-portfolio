import React from 'react';
import { motion } from 'framer-motion';
import useFormSubmit from '../../lib/useFormSubmit';
import styles from './Contact.module.css';

const Contact = () => {
  const initialFormData = {
    name: '',
    email: '',
    message: ''
  };
  
  // Real API submission function
  const sendContactForm = async (formData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...formData, time: new Date().toISOString()}),
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error submitting form:', error);
      return {
        success: false,
        message: 'Failed to send message. Please try again later.'
      };
    }
  };
  
  const { 
    formData, 
    isSubmitting, 
    submitResult, 
    handleChange, 
    handleSubmit 
  } = useFormSubmit(initialFormData, sendContactForm);

  return (
    <section id="contact" className={styles.contact}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={styles.sectionHeader}
      >
        <h2 className={styles.sectionTitle}>&lt;contact&gt;<span className={styles.blink}>_</span></h2>
      </motion.div>

      <div className={styles.contactContent}>
        <motion.div 
          className={styles.contactInfo}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className={styles.infoItem}>
            <h3>Let&apos;s Connect</h3>
            <p>
              I&apos;m always open to discussing new projects, creative ideas, 
              or opportunities to be part of your vision.
            </p>
          </div>
          
          <div className={styles.infoItem}>
            <h4>Email</h4>
            <p>
              <a href="mailto:luckysolanki902@gmail.com" className={styles.contactLink}>
                luckysolanki902@gmail.com
              </a>
            </p>
          </div>
          
          <div className={styles.infoItem}>
            <h4>Social Links</h4>
            <div className={styles.socialLinks}>
              <a href="https://linkedin.com/in/lucky-solanki-3417a4229" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                LinkedIn
              </a>
              <a href="https://github.com/Luckysolanki902" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                GitHub
              </a>
            </div>
          </div>
        </motion.div>

        <motion.form 
          className={styles.contactForm}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className={styles.formControl}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          
          <div className={styles.formControl}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className={styles.formControl}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              rows="5"
              required
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className={styles.loadingSpinner}></span>
            ) : (
              'Send Message'
            )}
          </button>
          
          {submitResult.message && (
            <div className={`${styles.formMessage} ${submitResult.success ? styles.success : styles.error}`}>
              {submitResult.message}
            </div>
          )}
        </motion.form>
      </div>

      <motion.div
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className={styles.sectionFooter}
      >
        <h2 className={styles.sectionTitle}>&lt;/contact&gt;</h2>
      </motion.div>
    </section>
  );
};

export default Contact;
