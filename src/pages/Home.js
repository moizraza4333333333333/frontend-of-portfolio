import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiGithub, FiLinkedin, FiPhone } from 'react-icons/fi';
import TypingAnimation from '../components/TypingAnimation';
import './Home.css';

const greetings = [
    'Hello, I\'m',
    'Hey there, I\'m',
    'Hi, I\'m',
    'Greetings, I\'m',
    'Salam, I\'m',
];

const descriptions = [
    'Crafting futuristic digital experiences with modern web technologies and artificial intelligence. Passionate about building scalable, intelligent solutions.',
    'Turning complex problems into elegant, AI-powered web applications. Building the future one line of code at a time.',
    'Full-stack developer with a passion for AI and clean architecture. Creating software that makes a difference.',
    'Innovating at the intersection of web development and artificial intelligence. Your vision, my code.',
];

const Home = () => {
    const [greetingIndex, setGreetingIndex] = useState(0);
    const [descIndex, setDescIndex] = useState(0);

    useEffect(() => {
        const greetingInterval = setInterval(() => {
            setGreetingIndex((prev) => (prev + 1) % greetings.length);
        }, 6000);

        const descInterval = setInterval(() => {
            setDescIndex((prev) => (prev + 1) % descriptions.length);
        }, 10000);

        return () => {
            clearInterval(greetingInterval);
            clearInterval(descInterval);
        };
    }, []);

    return (
        <section className="hero-section">
            <div className="hero-container">
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <div className="hero-greeting-wrapper">
                        <AnimatePresence mode="wait">
                            <motion.p
                                className="hero-greeting"
                                key={greetingIndex}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.3 }}
                            >
                                {greetings[greetingIndex]}
                            </motion.p>
                        </AnimatePresence>
                    </div>

                    <motion.h1
                        className="hero-name"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        Muhammad{' '}
                        <span className="highlight">Moiz Raza</span>
                    </motion.h1>

                    <motion.div
                        className="hero-typing-wrapper"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <TypingAnimation
                            strings={[
                                'Full Stack Developer',
                                'AI Engineer',
                                'Prompt Engineer',
                                'Python & Flask Expert',
                                'Node.js Developer',
                            ]}
                        />
                    </motion.div>

                    <div className="hero-description-wrapper">
                        <AnimatePresence mode="wait">
                            <motion.p
                                className="hero-description"
                                key={descIndex}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.4 }}
                            >
                                {descriptions[descIndex]}
                            </motion.p>
                        </AnimatePresence>
                    </div>

                    <motion.div
                        className="hero-buttons"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                    >
                        <Link to="/projects" className="btn btn-primary">
                            View Projects <FiArrowRight />
                        </Link>
                        <Link to="/contact" className="btn btn-outline">
                            <FiPhone /> Contact Me
                        </Link>
                    </motion.div>

                    <motion.div
                        className="hero-social"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.0, duration: 0.5 }}
                    >
                        <a href="https://github.com/moizraza" target="_blank" rel="noreferrer" className="social-icon">
                            <FiGithub />
                        </a>
                        <a href="https://linkedin.com/in/moizraza" target="_blank" rel="noreferrer" className="social-icon">
                            <FiLinkedin />
                        </a>
                        <a href="tel:+923194334346" className="social-icon">
                            <FiPhone />
                        </a>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="hero-visual"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
                >
                    <div className="hero-image-frame">
                        <div className="hero-image-glow" />
                        <div className="hero-image-placeholder">
                            <img src="/profile.png" alt="Muhammad Moiz Raza" className="profile-photo" />
                        </div>
                        <div className="frame-decoration top-left" />
                        <div className="frame-decoration top-right" />
                        <div className="frame-decoration bottom-left" />
                        <div className="frame-decoration bottom-right" />
                    </div>
                    <div className="floating-tech-icons">
                        <span className="tech-badge" style={{ top: '10%', left: '-15%' }}>React</span>
                        <span className="tech-badge" style={{ top: '50%', left: '-20%' }}>Python</span>
                        <span className="tech-badge" style={{ top: '80%', left: '-10%' }}>AI</span>
                        <span className="tech-badge" style={{ top: '20%', right: '-15%' }}>Flask</span>
                        <span className="tech-badge" style={{ top: '60%', right: '-20%' }}>Node.js</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Home;