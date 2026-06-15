import React from 'react';
import { motion } from 'framer-motion';
import { FaPython, FaReact, FaNodeJs, FaPhp, FaHtml5, FaCss3Alt, FaJs, FaDatabase } from 'react-icons/fa';
import { SiFlask, SiDjango, SiPandas, SiShopify, SiMysql } from 'react-icons/si';
import './Skills.css';

const skillCategories = [
    {
        title: 'Languages & Frameworks',
        skills: [
            { name: 'Python', icon: <FaPython />, level: 95 },
            { name: 'Flask', icon: <SiFlask />, level: 90 },
            { name: 'Django', icon: <SiDjango />, level: 85 },
            { name: 'Node.js', icon: <FaNodeJs />, level: 80 },
            { name: 'PHP', icon: <FaPhp />, level: 75 },
        ],
    },
    {
        title: 'Frontend & Design',
        skills: [
            { name: 'React', icon: <FaReact />, level: 90 },
            { name: 'HTML5', icon: <FaHtml5 />, level: 95 },
            { name: 'CSS3', icon: <FaCss3Alt />, level: 90 },
            { name: 'JavaScript', icon: <FaJs />, level: 88 },
        ],
    },
    {
        title: 'Data & AI',
        skills: [
            { name: 'Pandas', icon: <SiPandas />, level: 85 },
            { name: 'SQL', icon: <FaDatabase />, level: 80 },
            { name: 'Prompt Eng.', icon: <FaPython />, level: 90 },
            { name: 'AI/ML', icon: <FaPython />, level: 85 },
        ],
    },
    {
        title: 'Certifications',
        skills: [
            { name: 'SQL Certified', icon: <SiMysql />, level: 85 },
            { name: 'Shopify Expert', icon: <SiShopify />, level: 80 },
            { name: 'Prompt Eng.', icon: <FaPython />, level: 88 },
        ],
    },
];

const Skills = () => {
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
                                            <span className="skill-icon">{skill.icon}</span>
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