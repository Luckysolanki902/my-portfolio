import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import styles from './About.module.css';

const About = () => {
  const sectionRef = useRef(null);
  
  // Skills data
  const skills = [
    { name: 'JavaScript', level: 90 },
    { name: 'React', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'MongoDB', level: 85 },
    { name: 'MySQL', level: 70 },
    { name: 'Express', level: 80 },
    { name: 'Next.js', level: 92 },
    { name: 'CSS/SASS', level: 95 },
    { name: 'Git', level: 90 },
    { name: 'AWS', level: 70 }
  ];

  // Education data
  const education = [
    {
      degree: 'B.Tech in Computer Science',
      institution: 'Harcourt Butler Technical University',
      duration: '2021 - 2025',
      location: 'Kanpur, India'
    }
  ];

  // Experience data
  const experience = [
    {
      position: 'Web Developer & Tech Lead',
      company: 'Maddy Custom',
      duration: 'May 2023 - Present',
      description: 'Led development team in scaling an e-commerce platform to 50k+ monthly users. Implemented admin dashboard with analytics and order management features. Optimized site performance and reduced load times by 40%.'
    },
    {
      position: 'Full-Stack Developer',
      company: 'Meet Your Mate (MYM)',
      duration: 'Jan 2023 - Apr 2023',
      description: 'Created an anonymous student social platform with MERN stack. Implemented real-time messaging with Socket.io and authentication system using JWT.'
    }
  ];

  useEffect(() => {
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll(`.${styles.skillBar}`);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const level = bar.dataset.level;
          gsap.to(bar, {
            width: `${level}%`,
            duration: 1,
            ease: 'power2.out',
          });
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.2 });

    skillBars.forEach(bar => {
      observer.observe(bar);
    });

    return () => {
      skillBars.forEach(bar => {
        observer.unobserve(bar);
      });
    };
  }, []);

  return (
    <section id="about" className={styles.about} ref={sectionRef}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={styles.sectionHeader}
      >
        <h2 className={styles.sectionTitle}>&lt;about&gt;<span className={styles.blink}>_</span></h2>
      </motion.div>

      <div className={styles.aboutContent}>
        <motion.div 
          className={styles.aboutText}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p>
            I&apos;m a Full-Stack Web Developer with a passion for building performant and user-friendly web applications. 
            Currently pursuing B.Tech in Computer Science at Harcourt Butler Technical University, 
            I combine my academic knowledge with practical experience to create innovative digital solutions.
          </p>
          <p>
            With expertise in the MERN stack (MongoDB, Express.js, React, Node.js), 
            I specialize in developing scalable web applications with clean, efficient code.
          </p>
        </motion.div>

        <motion.div 
          className={styles.skills}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3>Technical Skills</h3>
          <div className={styles.skillsList}>
            {skills.map((skill, index) => (
              <div key={index} className={styles.skillItem}>
                <div className={styles.skillName}>{skill.name}</div>
                <div className={styles.skillBarContainer}>
                  <div 
                    className={styles.skillBar} 
                    data-level={skill.level}
                    style={{ width: '0%' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className={styles.resume}>
        <motion.div 
          className={styles.education}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3>&lt;education/&gt;</h3>
          {education.map((edu, index) => (
            <div key={index} className={styles.resumeItem}>
              <div className={styles.resumeHeader}>
                <h4>{edu.degree}</h4>
                <span className={styles.duration}>{edu.duration}</span>
              </div>
              <p>{edu.institution}, {edu.location}</p>
            </div>
          ))}
        </motion.div>

        <motion.div 
          className={styles.experience}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3>&lt;experience/&gt;</h3>
          {experience.map((exp, index) => (
            <div key={index} className={styles.resumeItem}>
              <div className={styles.resumeHeader}>
                <h4>{exp.position}</h4>
                <span className={styles.duration}>{exp.duration}</span>
              </div>
              <p className={styles.company}>{exp.company}</p>
              <p>{exp.description}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className={styles.sectionFooter}
      >
        <h2 className={styles.sectionTitle}>&lt;/about&gt;</h2>
      </motion.div>
    </section>
  );
};

export default About;
