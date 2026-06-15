import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiUser, FiCode, FiBriefcase, FiMail, FiAward } from 'react-icons/fi';
import './Navbar.css';

const navLinks = [
    { path: '/', label: 'Home', icon: <FiHome /> },
    { path: '/about', label: 'About', icon: <FiUser /> },
    { path: '/skills', label: 'Skills', icon: <FiCode /> },
    { path: '/projects', label: 'Projects', icon: <FiBriefcase /> },
    { path: '/certifications', label: 'Certifications', icon: <FiAward /> },
    { path: '/contact', label: 'Contact', icon: <FiMail /> },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [location]);

    return (
        <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <span className="logo-bracket">{'<'}</span>
                    <span className="logo-text">Moiz</span>
                    <span className="logo-bracket">{'/>'}</span>
                </Link>

                <div className={`navbar-menu ${mobileOpen ? 'active' : ''}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                        >
                            <span className="nav-icon">{link.icon}</span>
                            <span className="nav-label">{link.label}</span>
                            <span className="nav-indicator" />
                        </Link>
                    ))}
                </div>

                <button
                    className={`hamburger ${mobileOpen ? 'active' : ''}`}
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;