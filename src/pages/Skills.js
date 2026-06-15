import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPython, FaReact, FaNodeJs, FaPhp, FaHtml5, FaCss3Alt, FaJs, FaDatabase } from 'react-icons/fa';
import { SiFlask, SiDjango, SiPandas, SiShopify, SiMysql } from 'react-icons/si';
import './Skills.css';

const API_BASE = 'https://moiz.pythonanywhere.com';

const skillIconMap = {
    FaPython: <FaPython />,
    FaReact: <FaReact />,
    FaNodeJs: <FaNodeJs />,
    FaPhp: <FaPhp />,
    FaHtml5: <FaHtml5 />,
    FaCss3Alt: <FaCss3Alt />,
    FaJs: <FaJs />,
    FaDatabase: <FaDatabase />,
    SiFlask: <SiFlask />,
    SiDjango: <SiDjango />,
    SiPandas: <SiPandas />,
    SiShopify: <SiShopify />,
    SiMysql: <SiMysql />,
};

const Skills = () => {
    const [skillCategories, setSkillCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE}/api/skills`)
            .then((res) => res.json())
            .then((data) => {
                setSkillCategories(data.skills);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <section className="section skills-section"><div className="container"><p style={{ textAlign: 'center', color: '#fff' }}>Loading skills...</p></div></section>;
    if (error) return <section className="section skills-section"><div className="container"><p style={{ textAlign: 'center', color: '#ff6b6b' }}>Failed to load skills: {error}</p></div></section>;

    return (
        <section className="section skills-section">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Skills & Expertise
                </motion.h2>

                <div className="skills-grid">
                    {skillCategories.map((cat, ci) => (
                        <motion.div
                            key={ci}
                            className="skill-category glass-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: ci * 0.15, duration: 0.5 }}
                        >
                            <h3 className="skill-category-title">{cat.title}</h3>
                            <div className="skill-items">
                                {cat.skills.map((skill, si) => (
                                    <div key={si} className="skill-item">
                                        <div className="skill-header">
                                            <span className="skill-icon">{skillIconMap[skill.icon] || <FaPython />}</span>
                                            <span className="skill-name">{skill.name}</span>
                                            <span className="skill-percent">{skill.level}%</span>
                                        </div>
                                        <div className="skill-bar">
                                            <motion.div
                                                className="skill-bar-fill"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: true }}
                                                transition={{ delay: ci * 0.15 + si * 0.08, duration: 1, ease: 'easeOut' }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;