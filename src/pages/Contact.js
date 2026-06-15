import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import './Contact.css';

const API_BASE = 'https://moiz.pythonanywhere.com';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_BASE}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Something went wrong');
            setSent(true);
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setSent(false), 3000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="section contact-section">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Get In Touch
                </motion.h2>

                <div className="contact-grid">
                    <motion.div
                        className="contact-info"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="contact-item">
                            <div className="contact-icon"><FiPhone /></div>
                            <div>
                                <h4>Phone</h4>
                                <a href="tel:+923194334346">+92 319 4334346</a>
                            </div>
                        </div>
                        <div className="contact-item">
                            <div className="contact-icon"><FiMail /></div>
                            <div>
                                <h4>Email</h4>
                                <a href="mailto:moizraza@email.com">moizraza@email.com</a>
                            </div>
                        </div>
                        <div className="contact-item">
                            <div className="contact-icon"><FiMapPin /></div>
                            <div>
                                <h4>Location</h4>
                                <p>Pakistan</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <div className="contact-icon"><FaWhatsapp /></div>
                            <div>
                                <h4>WhatsApp</h4>
                                <a href="https://wa.me/923194334346" target="_blank" rel="noreferrer">+92 319 4334346</a>
                            </div>
                        </div>
                    </motion.div>

                    <motion.form
                        className="contact-form"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                name="message"
                                rows="5"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {error && <p className="form-error" style={{ color: '#ff6b6b', marginBottom: '1rem' }}>{error}</p>}
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Sending...' : sent ? 'Message Sent!' : 'Send Message'} <FiSend />
                        </button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
};

export default Contact;