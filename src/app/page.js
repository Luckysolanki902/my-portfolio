"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import MainLayout from "./components/Layout/MainLayout";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import Terminal from "./components/Terminal/Terminal";
import FloatingButton from "./components/ui/FloatingButton";

export default function Home() {
  const [isTerminalVisible, setIsTerminalVisible] = useState(false);
  
  const toggleTerminal = () => {
    setIsTerminalVisible(!isTerminalVisible);
  };
  
  const handleTerminalClose = () => {
    setIsTerminalVisible(false);
  };
  
  return (
    <MainLayout>
      <div className={styles.page}>
        <Hero toggleTerminal={toggleTerminal}/>
        <About />
        <Projects />
        <Contact />
        
        {isTerminalVisible && (
          <Terminal 
            onClose={handleTerminalClose}
          />
        )}
        
        <FloatingButton 
          onClick={toggleTerminal}
          isActive={isTerminalVisible}
        />
      </div>
    </MainLayout>
  );
}
