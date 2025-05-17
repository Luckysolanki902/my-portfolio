import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ComputerMonitor from '../ComputerMonitor/ComputerMonitor';
import styles from './Projects.module.css';

const Projects = () => {
  // Project data - keeping all three but only the first two will be displayed in the monitor
  const projectsData = [
    {
      id: 1,
      name: 'Maddy Custom',
      description: 'E-commerce platform with 50k+ monthly users, featuring professional ui, cart-management, secure payment integration, order management, and analytics dashboard.',
      techStack: ['Next.js', 'Node.js', 'Express', 'MongoDB', 'Redux'],
      image: '/projects/maddycustom-preview.png',
      liveUrl: 'https://maddycustom.com',
      githubUrl: 'private'
    },
    {
      id: 2,
      name: 'Meet Your Mate',
      description: 'Anonymous social platform for students, featuring real-time chat with random stranger students, confessions, and interactive like and comment system, and user authentication.',
      techStack: ['MERN Stack', 'Socket.io', 'JWT', 'Redux'],
      image: '/projects/mym-preview.png',
      liveUrl: 'https://meetyourmate.vercel.app',
      githubUrl: 'private'
    },
  ];

  // State for active project - will still show all three in the side list
  const [selectedProject, setSelectedProject] = useState(0);

  return (
    <section id="projects" className={styles.projects}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={styles.sectionHeader}
      >
        <h2 className={styles.sectionTitle}>&lt;projects&gt;<span className={styles.blink}>_</span></h2>
      </motion.div>

      <div className={styles.projectsGrid}>
        <div className={styles.computerContainer}>
          {/* Pass only the first two projects to ComputerMonitor */}
          <ComputerMonitor projects={projectsData.slice(0, 2)} />
        </div>

        <div className={styles.projectsList}>
          {projectsData.map((project, index) => (
            <motion.div 
              key={project.id}
              className={`${styles.projectCard} ${selectedProject === index ? styles.active : ''}`}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedProject(index)}
            >
              <div className={styles.projectHeader}>
                <h3 className={styles.projectTitle}>{project.name}</h3>
                <span className={styles.projectIndex}>0{index + 1}</span>
              </div>
              <p className={styles.projectDescription}>{project.description}</p>
              <div className={styles.projectTech}>
                {project.techStack.map((tech, i) => (
                  <span key={i} className={styles.techTag}>{tech}</span>
                ))}
              </div>
              <div className={styles.projectLinks}>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                  View Live
                </a>
                <a href={project.githubUrl !== 'private' ? project.githubUrl : '#'} target={project.githubUrl !== 'private' ? '_blank' : ''} rel="noopener noreferrer" className={styles.projectLink} style={{ pointerEvents: project.githubUrl === 'private' ? 'none' : 'auto' }}>
                  {project.githubUrl === 'private' ? 'Source Code is private' : 'Source Code'}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className={styles.sectionFooter}
      >
        <h2 className={styles.sectionTitle}>&lt;/projects&gt;</h2>
      </motion.div>
    </section>
  );
};

export default Projects;
