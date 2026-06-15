import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { FaReact, FaPython, FaNodeJs, FaDatabase, FaRobot } from 'react-icons/fa';
import './Projects.css';

const API_BASE = 'https://moiz.pythonanywhere.com';

const iconMap = {
    FaDatabase: <FaDatabase />,
    FaNodeJs: <FaNodeJs />,
    FaReact: <FaReact />,
    FaRobot: <FaRobot />,
    FaPython: <FaPython />,
};

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE}/api/projects`)
            .then((res) => res.json())
            .then((data) => {
                setProjects(data.projects);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <section className="section projects-section"><div className="container"><p style={{ textAlign: 'center', color: '#fff' }}>Loading projects...</p></div></section>;
    if (error) return <section className="section projects-section"><div className="container"><p style={{ textAlign: 'center', color: '#ff6b6b' }}>Failed to load projects: {error}</p></div></section>;

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
                            <div className="project-icon">{iconMap[project.icon] || <FaReact />}</div>
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