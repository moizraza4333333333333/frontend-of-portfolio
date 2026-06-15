import React from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { FaReact, FaPython, FaNodeJs, FaDatabase, FaRobot } from 'react-icons/fa';
import './Projects.css';

const projects = [
    {
        title: 'Bank Management System',
        desc: 'Real-time banking system with account management, transactions, and secure authentication built with Python Flask.',
        icon: <FaDatabase />,
        tags: ['Python', 'Flask', 'SQL', 'Real-time'],
    },
    {
        title: 'Restaurant Management System',
        desc: 'Complete restaurant management solution with order tracking, inventory, billing, and customer management.',
        icon: <FaNodeJs />,
        tags: ['Node.js', 'React', 'MongoDB', 'Full Stack'],
    },
    {
        title: 'Subscription Based System',
        desc: 'Scalable subscription platform with recurring billing, user tiers, payment integration, and analytics dashboard.',
        icon: <FaReact />,
        tags: ['React', 'Node.js', 'Stripe', 'API'],
    },
    {
        title: 'AI Chatbot',
        desc: 'Intelligent conversational AI chatbot with natural language processing, context awareness, and multi-platform support.',
        icon: <FaRobot />,
        tags: ['Python', 'AI', 'NLP', 'Flask'],
    },
    {
        title: 'E-Commerce Platform',
        desc: 'Full-featured e-commerce platform with product management, cart system, and secure checkout.',
        icon: <FaPython />,
        tags: ['Django', 'Python', 'SQL', 'Stripe'],
    },
    {
        title: 'Data Analytics Dashboard',
        desc: 'Interactive data visualization dashboard using Pandas and React for real-time business intelligence.',
        icon: <FaReact />,
        tags: ['Pandas', 'React', 'Python', 'Charts'],
    },
];

const Projects = () => {
    return (
        <section className="section projects-section">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Featured Projects
                </motion.h2>

                <div className="projects-grid">
                    {projects.map((project, i) => (
                        <motion.div
                            key={i}
                            className="project-card glass-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                        >
                            <div className="project-icon">{project.icon}</div>
                            <h3 className="project-title">{project.title}</h3>
                            <p className="project-desc">{project.desc}</p>
                            <div className="project-tags">
                                {project.tags.map((tag, ti) => (
                                    <span key={ti} className="project-tag">{tag}</span>
                                ))}
                            </div>
                            <div className="project-links">
                                <a href="#!" className="project-link" onClick={(e) => e.preventDefault()}><FiGithub /> Code</a>
                                <a href="#!" className="project-link" onClick={(e) => e.preventDefault()}><FiExternalLink /> Live</a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;