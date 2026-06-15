import React from 'react';
import { FiGithub, FiLinkedin, FiPhone, FiHeart } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-brand">
                    <span className="logo-bracket">{'<'}</span>
                    <span className="logo-text">Moiz</span>
                    <span className="logo-bracket">{'/>'}</span>
                </div>

                <p className="footer-copy">
                    &copy; {year} Muhammad Moiz Raza. Built with <FiHeart className="footer-heart" /> passion.
                </p>

                <div className="footer-social">
                    <a href="https://github.com/moizraza" target="_blank" rel="noreferrer"><FiGithub /></a>
                    <a href="https://linkedin.com/in/moizraza" target="_blank" rel="noreferrer"><FiLinkedin /></a>
                    <a href="tel:+923194334346"><FiPhone /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;