import React from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaAward } from 'react-icons/fa';
import { SiMysql, SiShopify, SiPython } from 'react-icons/si';
import './Certifications.css';

const certifications = [
    {
        title: 'SQL Database Certification',
        issuer: 'Certified Professional',
        icon: <SiMysql />,
        desc: 'Advanced database management, complex queries, optimization, and database design certified.',
        color: '#f29111',
    },
    {
        title: 'Shopify Expert Certification',
        issuer: 'Shopify Partners',
        icon: <SiShopify />,
        desc: 'Professional Shopify store development, theme customization, and e-commerce solution expert.',
        color: '#7ab55c',
    },
    {
        title: 'Prompt Engineering Mastery',
        issuer: 'AI Certification',
        icon: <SiPython />,
        desc: 'Advanced prompt crafting, AI communication optimization, and LLM interaction specialist.',
        color: '#00f0ff',
    },
    {
        title: 'Full Stack Development',
        issuer: 'Professional Developer',
        icon: <FaAward />,
        desc: 'Comprehensive full stack development with React, Node.js, Python Flask, and Django.',
        color: '#ff00e6',
    },
];

const Certifications = () => {
    return (
        <section className="section certs-section">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Certifications
                </motion.h2>

                <div className="certs-grid">
                    {certifications.map((cert, i) => (
                        <motion.div
                            key={i}
                            className="cert-card glass-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.5 }}
                        >
                            <div className="cert-icon" style={{ color: cert.color }}>
                                {cert.icon}
                            </div>
                            <div className="cert-badge">
                                <FaCertificate />
                            </div>
                            <h3 className="cert-title">{cert.title}</h3>
                            <p className="cert-issuer">{cert.issuer}</p>
                            <p className="cert-desc">{cert.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;