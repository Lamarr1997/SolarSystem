import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <nav className="footer-links">
          <a href="/about" className="nav-link">About</a>
          <a
            href="https://github.com/Lamarr1997"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            <i className="fa-brands fa-github"></i>
          </a>
          <a
            href="https://instagram.com/lp_keepbusy"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
