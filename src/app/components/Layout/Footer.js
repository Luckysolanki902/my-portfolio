import React from 'react';
import styles from './Footer.module.css';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <motion.div 
          className={styles.footerContent}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className={styles.footerLogo}>
            <span>&lt;Lucky<span className={styles.slash}>/</span>Solanki&gt;</span>
          </div>
          
          <div className={styles.footerLinks}>
            <a href="mailto:luckysolanki902@gmail.com" className={styles.socialLink}>
              luckysolanki902@gmail.com
            </a>
            <a href="https://linkedin.com/in/lucky-solanki-3417a4229" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              LinkedIn
            </a>
            <a href="https://github.com/Luckysolanki902" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              GitHub
            </a>
          </div>
          
          <div className={styles.copyright}>
            <span>&copy; {currentYear} Lucky Solanki. All rights reserved.</span>
            <span className={styles.hackerNote}>Made with 💻 and ☕</span>
          </div>
        </motion.div>
      </div>
      <div className={styles.commandLine}>
        <span className={styles.prompt}>$ exit</span>
        <span className={styles.result}>Process terminated. Status code: 0</span>
      </div>
    </footer>
  );
};

export default Footer;
