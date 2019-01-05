import React from 'react';
import styles from './Header.module.css';

function Header() {
  return (
      <header className={styles.container}>
        <a href="/">
          SPORT EVENT POLLS
        </a>
      </header>
  );
}

export default Header;