import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiCpu, FiSmartphone, FiDatabase } from 'react-icons/fi';
import './About.css';

const quotes = [
    '"Code is like poetry – every line should have purpose."',
    '"The best way to predict the future is to build it."',
    '"Simplicity is the soul of efficiency."',
    '"First, solve the problem. Then, write the code."',
    '"Innovation distinguishes between a leader and a follower."',
    '"Any sufficiently advanced technology is indistinguishable from magic."',
];

const About = () => {
    const [quoteIndex, setQuoteIndex] = useState(0);
    const [hueShift, setHueShift] = useState(0);

    useEffect(() => {
        const quoteInterval = setInterval(() => {
            let newIdx;
            do {
                newIdx = Math.floor(Math.random() * quotes.length);
            } while (newIdx === quoteIndex);
            setQuoteIndex(newIdx);
        }, 10000);

        const hueInterval = setInterval(() => {
            setHueShift((prev) => (prev + 0.5) % 360);
        }, 100);

        return () => {
            clearInterval(quoteInterval);
            clearInterval(hueInterval);
        };
    }, [quoteIndex]);

    const highlights = [
        { icon: <FiCode />, label: 'Full Stack Dev', desc: 'React, Node.js, Flask, Django' },
        { icon: <FiCpu />, label: 'AI Engineer', desc: 'Machine Learning & NLP' },
        { icon: <FiSmartphone />, label: 'Prompt Engineer', desc: 'Advanced prompt crafting' },
        { icon: <FiDatabase />, label: 'Data Analysis', desc: 'Pandas, Python, SQL' },
    ];

    return (
        <section className="section about-section">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    About Me
                </motion.h2>

                <div className="about-grid">
                    <motion.div
                        className="about-content"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="about-subtitle">
                            Turning Ideas Into{' '}
                            <span
                                className="highlight"
                                style={{
                                    background: `linear-gradient(135deg, hsl(${hueShift}, 100%, 60%), hsl(${(hueShift + 60) % 360}, 100%, 60%))`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}
                            >
                                Digital Reality
                            </span>
                        </h3>
                        <p className="about-text">
                            I'm Muhammad Moiz Raza, a passionate Full Stack Developer and AI Engineer
                            based in Pakistan. With expertise spanning from traditional web development
                            to cutting-edge artificial intelligence, I craft solutions that are both
                            powerful and elegant.
                        </p>
                        <p className="about-text">
                            My journey in tech has equipped me with deep knowledge of Python, Flask,
                            Django, React, Node.js, and modern web technologies. I specialize in
                            building real-time systems, AI-powered applications, and robust backend
                            architectures that scale.
                        </p>

                        {/* Random rotating quote */}
                        <motion.div
                            className="about-quote"
                            key={quoteIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            style={{
                                borderLeftColor: `hsl(${hueShift}, 100%, 60%)`,
                            }}
                        >
                            {quotes[quoteIndex]}
                        </motion.div>

                        <div className="about-stats">
                            <div className="stat-item">
                                <span
                                    className="stat-number"
                                    style={{ color: `hsl(${hueShift}, 100%, 60%)` }}
                                >
                                    5+
                                </span>
                                <span className="stat-label">Projects</span>
                            </div>
                            <div className="stat-item">
                                <span
                                    className="stat-number"
                                    style={{ color: `hsl(${(hueShift + 60) % 360}, 100%, 60%)` }}
                                >
                                    3+
                                </span>
                                <span className="stat-label">Certifications</span>
                            </div>
                            <div className="stat-item">
                                <span
                                    className="stat-number"
                                    style={{ color: `hsl(${(hueShift + 120) % 360}, 100%, 60%)` }}
                                >
                                    24/7
                                </span>
                                <span className="stat-label">Available</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="about-highlights"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {highlights.map((item, i) => (
                            <motion.div
                                key={i}
                                className="highlight-card glass-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.4 }}
                                style={{
                                    borderColor: `hsla(${(hueShift + i * 60) % 360}, 100%, 60%, 0.2)`,
                                }}
                            >
                                <div
                                    className="highlight-icon"
                                    style={{
                                        color: `hsl(${(hueShift + i * 60) % 360}, 100%, 60%)`,
                                    }}
                                >
                                    {item.icon}
                                </div>
                                <div>
                                    <h4>{item.label}</h4>
                                    <p>{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;