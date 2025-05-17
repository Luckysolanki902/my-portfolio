import React from 'react';
import styles from './FloatingButton.module.css';

const FloatingButton = ({ onClick, isActive = false }) => {
  return (
    <button 
      className={`${styles.floatingButton} ${isActive ? styles.active : ''}`}
      onClick={onClick}
      aria-label="Open Terminal"
    >
      <div className={styles.icon}>
        <div className={styles.commandIcon}>
          <div className={styles.commandDollar}>$</div>
          <div className={styles.commandCursor}></div>
        </div>
      </div>
    </button>
  );
};

export default FloatingButton;
