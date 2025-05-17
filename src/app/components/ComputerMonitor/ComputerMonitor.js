'use client'
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import styles from './ComputerMonitor.module.css';
import './ComputerMonitor.additions.css';
import './ComputerMonitor.fix.css'; // Import fix specific CSS
import { useRouter } from 'next/navigation';
import safariStyles from './Safari.module.css';

const ComputerMonitor = ({ projects = [] }) => {
  const [isPowered, setIsPowered] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [showIframe, setShowIframe] = useState(false); // Renamed but kept for compatibility
  const [isClosing, setIsClosing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const screenRef = useRef(null);
  const timeoutRef = useRef(null);
  const router = useRouter()
  const browserRef = useRef(null);  // Default projects if none provided - only showing 2 projects as requested


  // Filter out the third project if it comes from props
  const filteredProjects = projects.filter((_, index) => index !== 2).slice(0, 2)


  // Handle power button click
  const togglePower = () => {
    const newPowerState = !isPowered;
    setIsPowered(newPowerState);

    // Close browser if it's open
    if (showIframe) {
      closeBrowser();
    }

    // Reset active project when turning off
    if (!newPowerState) {
      setActiveProject(0);
    }
  };  // Handle closing the browser with animation - memoized to prevent re-renders
  const closeBrowser = React.useCallback(() => {
    setIsClosing(true);
    // Reset all browser states
    setIsFullscreen(false);
    setIsMinimized(false);
    setTimeout(() => {
      setShowIframe(false);
      setIsClosing(false);
    }, 300); // Match this to the animation duration
  }, []);
  // Toggle fullscreen mode for Safari browser - memoized to prevent re-renders
  const toggleFullscreen = React.useCallback(() => {
    setIsFullscreen(prevState => !prevState);
    setIsMinimized(false); // Exit minimized state when going fullscreen
  }, []);
  // Toggle minimized mode for Safari browser - memoized to prevent re-renders
  const toggleMinimize = React.useCallback((e) => {
    // If this was triggered from a click event, prevent it from bubbling further
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }

    setIsMinimized(prevState => !prevState);
    setIsFullscreen(false); // Exit fullscreen state when minimizing
  }, []);

  // Change displayed project
  const switchProject = (index) => {
    if (isPowered) {
      setActiveProject(index);
      if (showIframe) {
        closeBrowser();
      }
    }
  };

  // Create screen on/off animation with GSAP
  useEffect(() => {
    if (screenRef.current) {
      if (isPowered) {
        // Power on animation
        gsap.to(screenRef.current, {
          opacity: 0,
          duration: 0.1,
          onComplete: () => {
            gsap.set(screenRef.current, {
              background: 'radial-gradient(circle, #2d3748 0%, #1a202c 100%)' // Darker sci-fi background
            });
            gsap.fromTo(screenRef.current,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out'
              }
            );
          }
        });
      } else {
        // Power off animation
        gsap.to(screenRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.in',
          onComplete: () => {
            gsap.set(screenRef.current, {
              background: '#000000'
            });
          }
        });
      }
    }

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Add glitch effect occasionally when powered on
    if (isPowered) {
      const addRandomGlitch = () => {
        const glitchElement = screenRef.current;
        if (!glitchElement) return;

        glitchElement.classList.add(styles.glitch);

        setTimeout(() => {
          glitchElement.classList.remove(styles.glitch);
        }, 150);

        timeoutRef.current = setTimeout(addRandomGlitch, Math.random() * 10000 + 5000);
      };

      timeoutRef.current = setTimeout(addRandomGlitch, 5000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isPowered]);  // Handle opening a project display with Mac-like Safari animation
  const openWebPreview = (e) => {
    // Stop event propagation
    if (e) {
      e.stopPropagation();
    }

    // Show loading state and project display
    setIsLoading(true);
    setShowIframe(true);

    // Simulate loading delay for better UX
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  };

  // Current time for the Mac-style UI
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000);

    return () => {
      clearInterval(timer);
    };
  }, []);  // Add keyboard shortcuts for Safari browser
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (showIframe) {
        // ESC key to close browser or exit fullscreen/minimized mode
        if (e.key === 'Escape') {
          if (isFullscreen) {
            toggleFullscreen();
          } else if (isMinimized) {
            toggleMinimize();
          } else {
            closeBrowser();
          }
        }
        // F key to toggle fullscreen
        if (e.key === 'f' || e.key === 'F') {
          toggleFullscreen();
        }
        // M key to toggle minimize
        if (e.key === 'm' || e.key === 'M') {
          toggleMinimize();
        }

        // Ctrl+Alt+M to quickly restore from minimized state
        if (e.key === 'm' && e.ctrlKey && e.altKey && isMinimized) {
          e.preventDefault();
          toggleMinimize();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [showIframe, isFullscreen, isMinimized, toggleFullscreen, toggleMinimize, closeBrowser]);

  // Handle project display loading animation
  useEffect(() => {
    if (showIframe) {
      setIsLoading(true);

      // Simulate brief loading for better UX
      const timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 1200); // Short loading time for smooth transition

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [showIframe, activeProject]);  // Format URL for direct use with Link component
  const formatUrl = (url) => {
    if (!url) return '#';
    
    // Return the URL as is, no need to sanitize as Next.js Link handles this
    return url;
  };
  return (
    <motion.div
      className={styles.computerContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className={styles.monitor}>
        <div className={styles.screen}>
          <div
            ref={screenRef}
            className={`${styles.screenContent} ${isPowered ? styles.powered : ''}`}
          >
            {isPowered && (
              <>
                {/* Mac top bar with sci-fi theme */}
                <div className={`${styles.macTopBar} ${styles.sciFiTopBar}`}>
                  <div className={styles.macLogo}>◈</div>
                  <div className={styles.macMenuItems}>
                    <span>VS-Code</span>
                    <span className={styles.terminalNav}>Terminal</span>
                    <span >Spotify</span>
                  </div>
                  <div className={styles.macStatusIcons}>
                    <span className={styles.macTime}>
                      {currentTime}
                    </span>
                  </div>
                </div>
                {/* Enhanced Desktop with URL shortcuts - hidden when browser is open */}
                {!showIframe && (
                  <div className={styles.macDesktop}>
                    {filteredProjects.map((project, index) => (
                      <div
                        key={index}
                        className={`${styles.desktopIcon} ${activeProject === index ? styles.selectedIcon : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveProject(index);
                          openWebPreview(e);
                        }}
                        style={{
                          cursor: isPowered ? 'pointer' : 'default',
                          zIndex: 100
                        }}
                      >
                        <div className={styles.desktopIconImage}>
                          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="48" height="48" rx="8" fill="rgba(80, 130, 255, 0.8)" />
                            <path d="M12 12H36V30H12V12Z" fill="#E1E1E1" />
                            <path d="M12 14H36V18H12V14Z" fill="#A3A3A3" />
                            <circle cx="15" cy="16" r="1.5" fill="#FF5F56" />
                            <circle cx="20" cy="16" r="1.5" fill="#FFBD2E" />
                            <circle cx="25" cy="16" r="1.5" fill="#27C93F" />
                            <path d="M16 22H32V26H16V22Z" fill="#D1D1D1" />
                          </svg>
                        </div>
                        <span className={styles.desktopLabel}>{project.name}</span>
                      </div>
                    ))}
                  </div>
                )}                {/* Mac Dock removed as requested */}
                {/* Safari browser window - visible only when showIframe is true */}                {showIframe && (<div
                  ref={browserRef}
                  className={`${styles.browserFrame} ${safariStyles.safari} ${isClosing ? safariStyles.closing : ''} ${isMinimized ? safariStyles.minimized : ''} ${isFullscreen ? safariStyles.fullscreen : ''}`}
                  onClick={(e) => {
                    // Only handle clicks on the browser container itself, not its children
                    if (e.target === e.currentTarget && isMinimized) {
                      toggleMinimize(e);
                    }
                  }}
                ><div className={safariStyles.header}>
                    <div className={safariStyles.controls}>
                      {/* Traffic lights with click handlers */}
                      <div className={`${safariStyles.trafficLight} ${safariStyles.close}`} ></div>
                      <div className={`${safariStyles.trafficLight} ${safariStyles.minimize}`} ></div>
                      <div className={`${safariStyles.trafficLight} ${safariStyles.maximize}`} ></div>
                    </div>
                    <div className={safariStyles.addressBar}>
                      <span className={safariStyles.secure}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 1C8.7 1 6 3.7 6 7V9C4.9 9 4 9.9 4 11V21C4 22.1 4.9 23 6 23H18C19.1 23 20 22.1 20 21V11C20 9.9 19.1 9 18 9V7C18 3.7 15.3 1 12 1ZM12 3C14.2 3 16 4.8 16 7V9H8V7C8 4.8 9.8 3 12 3ZM12 15C13.1 15 14 14.1 14 13C14 11.9 13.1 11 12 11C10.9 11 10 11.9 10 13C10 14.1 10.9 15 12 15Z" fill="currentColor" />
                        </svg>
                      </span>
                      <div className={safariStyles.urlContainer}>                          <span className={safariStyles.urlIcon}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor" />
                        </svg>
                      </span>
                        <span className={safariStyles.liveUrl}>{filteredProjects[activeProject]?.liveUrl}</span>
                      </div>
                    </div>
                    <div className={safariStyles.icons}>
                      <button
                        className={`${safariStyles.icon} ${safariStyles.fullscreenButton}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMinimize();
                        }}
                        title={isFullscreen ? "Exit fullscreen (Press F)" : "Enter fullscreen (Press F)"}
                        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                      >                          {isFullscreen ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" fill="currentColor" />
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16 3h6v6h-2V5h-4V3zM2 3h6v2H4v4H2V3zm18 18h-6v-2h4v-4h2v6zM4 21v-6h2v4h4v2H4z" fill="currentColor" />
                        </svg>
                      )}
                      </button>
                      <button
                        className={`${safariStyles.icon} ${safariStyles.closeButton}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          closeBrowser();
                        }}
                        title="Close window (Press ESC)"
                        aria-label="Close window"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95 1.414-1.414 4.95 4.95z" fill="currentColor" />
                        </svg>
                      </button>
                    </div>                    </div>                    <div 
                      className={safariStyles.content} 
                      onClick={(e) => {
                        // This prevents clicks on the content area from interfering with button clicks
                        if (e.target === e.currentTarget) {
                          e.stopPropagation();
                        }
                      }}
                    >
                    {isLoading && <div className={safariStyles.loading}></div>}                        {/* Always show project info instead of iframe */}                      <div 
                        className={safariStyles.projectDisplay}
                        onClick={(e) => {
                          // This prevents clicks on the project display from interfering with button clicks
                          if (e.target === e.currentTarget) {
                            e.stopPropagation();
                          }
                        }}
                      >
                      <div 
                        className={safariStyles.projectInfo}
                        onClick={(e) => {
                          // This prevents clicks on the project info area from interfering with button clicks
                          if (e.target === e.currentTarget) {
                            e.stopPropagation();
                          }
                        }}
                      >
                        <div className={safariStyles.decorativeElements}>
                          <div className={safariStyles.decorativeCircle}></div>
                          <div className={safariStyles.decorativeCircle}></div>
                        </div>

                        <div className={safariStyles.imageContainer}>

                        </div>

                        <h2 className={safariStyles.projectTitle}>{filteredProjects[activeProject]?.name}</h2>
                        <div className={safariStyles.projectDivider}></div>
                        <p className={safariStyles.projectDescription}>{filteredProjects[activeProject]?.description || "A beautifully designed project with modern UI/UX principles and optimized performance."}</p>

                        <div className={safariStyles.projectTech}>                            <div className={safariStyles.techBadge}>
                          <span className={safariStyles.techIcon}>
                            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                              <path d="M2 17l10 5 10-5"></path>
                              <path d="M2 12l10 5 10-5"></path>
                            </svg>
                          </span>
                          <span>Next.js</span>
                        </div>
                          <div className={safariStyles.techBadge}>
                            <span className={safariStyles.techIcon}>
                              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                                <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
                              </svg>
                            </span>
                            <span>React</span>
                          </div>
                          <div className={safariStyles.techBadge}>
                            <span className={safariStyles.techIcon}>
                              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                                <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
                              </svg>
                            </span>
                            <span>TailwindCSS</span>
                          </div>
                          {activeProject === 0 && <div className={safariStyles.techBadge}>
                            <span className={safariStyles.techIcon}>
                              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                                <path d="M21.9 8.89l-1.05-4.37c-.22-.9-1-1.52-1.91-1.52H5.05c-.9 0-1.69.63-1.9 1.52L2.1 8.89c-.24 1.02-.02 2.06.62 2.88.08.11.19.19.28.29V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6.94c.09-.09.2-.18.28-.28.64-.82.87-1.87.62-2.89zm-2.99-3.9l1.05 4.37c.1.42.01.84-.25 1.17-.14.18-.44.47-.94.47-.61 0-1.14-.49-1.21-1.14L16.98 5l1.93.89zM13 5h1.96l.54 4.52c.05.39-.07.78-.33 1.07-.22.26-.54.41-.95.41-.67 0-1.22-.59-1.22-1.31V5zM8.49 9.52L9.04 5H11v4.69c0 .72-.55 1.31-1.29 1.31-.34 0-.65-.15-.89-.41-.25-.29-.37-.68-.33-1.07zm-4.45-.16L5.05 5l1.94.89-0.57 4.46c-.07.59-.6 1.14-1.21 1.14-.5 0-.79-.29-.93-.47-.27-.32-.36-.75-.26-1.16zM10 19v-3h4v3h-4zm6 0v-3c0-1.1-.9-2-2-2H10c-1.1 0-2 .9-2 2v3H5v-6.03c.08-.03.17-.03.25-.03.51 0 1.02-.2 1.44-.57.47-.41.83-.98 1-1.64l.15-1.01c.26 1.24 1.32 2.25 2.66 2.25h2.99c1.34 0 2.4-1.01 2.66-2.25l.15 1.01c.17.66.53 1.23 1 1.64.42.37.93.57 1.44.57.08 0 .17 0 .25.03V19h-3z"></path>
                              </svg>
                            </span>
                            <span>E-Commerce</span>
                          </div>}
                          {activeProject === 1 && <div className={safariStyles.techBadge}>
                            <span className={safariStyles.techIcon}>
                              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                                <path d="M16.5,6.5A3.5,3.5 0 0,1 20,10a3.5,3.5 0 0,1 -3.5,3.5A3.5,3.5 0 0,1 13,10A3.5,3.5 0 0,1 16.5,6.5M16.5,12A2,2 0 0,0 18.5,10A2,2 0 0,0 16.5,8A2,2 0 0,0 14.5,10A2,2 0 0,0 16.5,12M7.5,6.5A3.5,3.5 0 0,1 11,10A3.5,3.5 0 0,1 7.5,13.5A3.5,3.5 0 0,1 4,10A3.5,3.5 0 0,1 7.5,6.5M7.5,12A2,2 0 0,0 9.5,10A2,2 0 0,0 7.5,8A2,2 0 0,0 5.5,10A2,2 0 0,0 7.5,12M12,14C13.74,14 15.36,14.5 16.5,15.36L16.5,14.5A5,5 0 0,0 11.5,9.5A1.5,1.5 0 0,0 10,11A1.5,1.5 0 0,0 11.5,12.5A2,2 0 0,1 13.5,14.5V15.36C12.36,14.5 10.74,14 9,14C6,14 3,15.3 3,17V20H12V17C12,16.08 13.76,15.3 16.5,15.36L16.5,16.97C13.77,17 12,17.7 12,19V20H21V17C21,15.3 18,14 15,14L15,13.97C17.9,13.91 20,15.27 20,17V20H23V17C23,15.3 20,14 17,14C15.26,14 13.64,14.5 12.5,15.36L12.5,14.5A2,2 0 0,1 14.5,12.5A1.5,1.5 0 0,0 16,11A1.5,1.5 0 0,0 14.5,9.5A5,5 0 0,0 9.5,14.5L9.5,15.36C10.64,14.5 12.26,14 14,14C16.9,14 19,15.3 19,17V20"></path>
                              </svg>
                            </span>
                            <span>Social Platform</span>
                          </div>}                          </div>                        <div 
                          className={safariStyles.projectButtons}
                        >                          {filteredProjects[activeProject]?.liveUrl && (
                            <Link 
                              href={filteredProjects[activeProject]?.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`${safariStyles.projectButton} ${safariStyles.primary}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                // Ensure proper event handling
                              }}
                              title="Visit actual website"
                            >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6zm11-3v8h-2V6.413l-7.793 7.794-1.414-1.414L17.585 5H13V3h8z" fill="currentColor" />
                              </svg>
                              <span className={safariStyles.buttonText}>Visit Website</span>
                              <span className={safariStyles.buttonGlow}></span>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                )}
              </>
            )}

            {/* Scanlines effect on the screen */}
            <div className={styles.scanlines}></div>

            {/* Reflection overlay */}
            <div className={styles.screenReflection}></div>
          </div>
        </div>

        <div className={styles.stand}></div>
        <div className={styles.base}></div>

        <div className={styles.controls}>
          <button
            className={`${styles.powerButton} ${isPowered ? styles.active : ''}`}
            onClick={togglePower}
            aria-label="Power button"
          >
            <span className={styles.powerIcon}></span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ComputerMonitor;
