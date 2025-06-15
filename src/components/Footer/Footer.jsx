import React from 'react';
import styles from './Footer.module.css';

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

        <div className={styles.centerSection}>
          <p>© {new Date().getFullYear()} PsyRehab. Всі права захищено.</p>
        </div>

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
                <img src={link.src} alt={link.alt} className={styles.socialIcon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
