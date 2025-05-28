import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';


const Footer = () => {
  const socialLinks = [
    { href: 'https://facebook.com', src: '/PSYREHABB/Facebook.png', alt: 'Facebook' },
    { href: 'https://twitter.com', src: '/PSYREHABB/twitter.png', alt: 'Twitter' },
    { href: 'https://instagram.com', src: '/PSYREHABB/instagram.png', alt: 'Instagram' },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <div className={styles.logo}>
            <h1>PsyRehab</h1>
          </div>
        </div>
        <nav className={styles.navigation}>
          <ul>
            <li><Link to="/#main-block-section">Головна</Link></li>
            <li><Link to="/#about-section">Про нас</Link></li>
            <li><Link to="/#services-section">Послуги</Link></li>
          </ul>
        </nav>
        <div className={styles.rightSection}>
          <div className={styles.socialIcons}>
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <img
                  src={link.src}
                  alt={link.alt}
                  className={styles.socialIcon}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} PsyRehab. Всі права захищено.
      </div>
    </footer>
  );
};

export default Footer;
