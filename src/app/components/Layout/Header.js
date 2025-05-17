import React from 'react';
import styles from './Header.module.css';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <header className={styles.header}>
      <motion.div 
        className={styles.logo}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className={styles.logoText}>&lt;Lucky<span className={styles.slash}>/</span>Solanki&gt;</span>
      </motion.div>
      
      <motion.nav 
        className={styles.nav}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ul className={styles.navList}>
          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link href="/#about">About</Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link href="/#projects">Projects</Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link href="/#skills">Skills</Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link href="/#contact">Contact</Link>
          </motion.li>
        </ul>
      </motion.nav>
    </header>
  );
};

export default Header;
