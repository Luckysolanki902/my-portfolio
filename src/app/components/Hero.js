import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import styles from './Hero.module.css';

const Hero = ({ toggleTerminal }) => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Create glitch effect timeline with GSAP
    const title = titleRef.current;
    const subtitle = subtitleRef.current;

    if (title && subtitle) {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 8 });

      // Main animation sequence
      tl.to(title, {
        skewX: 2,
        duration: 0.1,
        ease: "power1.inOut"
      })
        .to(title, {
          skewX: 0,
          duration: 0.1,
          ease: "power1.inOut"
        })
        .to(title, {
          opacity: 0.8,
          duration: 0.1
        })
        .to(title, {
          opacity: 1,
          duration: 0.1
        })
        .to(subtitle, {
          skewX: -2,
          duration: 0.1,
          delay: 0.1,
          ease: "power1.inOut"
        })
        .to(subtitle, {
          skewX: 0,
          duration: 0.1,
          ease: "power1.inOut"
        });

      // Return cleanup function
      return () => {
        tl.kill();
      };
    }
  }, []);

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section
      className={styles.heroSection}
      ref={containerRef}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className={styles.heroBackground}>
        <div className={styles.codeBg}></div>
        <div className={styles.gridOverlay}></div>
      </div>

      <div className={styles.heroContent}>
        <motion.h1
          className={styles.title}
          ref={titleRef}
          variants={itemVariants}
        >
          <span className={styles.greeting}>Hello World, I&apos;m</span>
          <span className={styles.name}>Lucky Solanki</span>
        </motion.h1>

        <motion.h2
          className={styles.subtitle}
          ref={subtitleRef}
          variants={itemVariants}
        >
          Full-Stack Web Developer
        </motion.h2>

        <motion.p
          className={styles.description}
          variants={itemVariants}
        >
          I speak fluent JavaScript and broken English. If days had more than 24 hours, I&apos;d spend the extra time jumping from one cool tech to the next. There&apos;s a 90% chance I&apos;m coding right now—transforming curiosity into creations and ideas into interactive reality.

        </motion.p>

        <motion.div
          className={styles.cta}
          variants={itemVariants}
        >
          <a href="#projects" className={`${styles.ctaButton} ${styles.primary}`}>
            View My Work
          </a>
          <div href="#terminal" onClick={toggleTerminal} style={{ cursor: 'pointer' }} className={`${styles.ctaButton} ${styles.secondary}`}>
            Chat With Me
          </div>
        </motion.div>

        <motion.div
          className={styles.scrollIndicator}
          animate={{
            y: [0, 10, 0],
            opacity: [0.2, 1, 0.2]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          <span className={styles.scrollText}>Scroll Down</span>
          <span className={styles.scrollArrow}>↓</span>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
