import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaAward } from 'react-icons/fa';
import { SiMysql, SiShopify, SiPython } from 'react-icons/si';
import './Certifications.css';

const API_BASE = 'https://moiz.pythonanywhere.com';

const certIconMap = {
    SiMysql: <SiMysql />,
    SiShopify: <SiShopify />,
    SiPython: <SiPython />,
    FaAward: <FaAward />,
};

const Certifications = () => {
    const [certifications, setCertifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE}/api/certifications`)
            .then((res) => res.json())
            .then((data) => {
                setCertifications(data.certifications);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <section className="section certs-section"><div className="container"><p style={{ textAlign: 'center', color: '#fff' }}>Loading certifications...</p></div></section>;
    if (error) return <section className="section certs-section"><div className="container"><p style={{ textAlign: 'center', color: '#ff6b6b' }}>Failed to load certifications: {error}</p></div></section>;

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
                                {certIconMap[cert.icon] || <FaCertificate />}
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