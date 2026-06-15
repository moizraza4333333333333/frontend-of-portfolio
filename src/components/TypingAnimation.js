import React, { useState, useEffect, useCallback } from 'react';
import './TypingAnimation.css';

const TypingAnimation = ({ strings, typeSpeed = 80, deleteSpeed = 50, pauseDuration = 2000 }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const tick = useCallback(() => {
        const fullText = strings[currentIndex];

        if (!isDeleting) {
            setDisplayText(fullText.substring(0, displayText.length + 1));
            if (displayText.length === fullText.length) {
                setTimeout(() => setIsDeleting(true), pauseDuration);
                return;
            }
        } else {
            setDisplayText(fullText.substring(0, displayText.length - 1));
            if (displayText.length === 0) {
                setIsDeleting(false);
                setCurrentIndex((prev) => (prev + 1) % strings.length);
                return;
            }
        }
    }, [displayText, currentIndex, isDeleting, strings, pauseDuration]);

    useEffect(() => {
        const timer = setTimeout(tick, isDeleting ? deleteSpeed : typeSpeed);
        return () => clearTimeout(timer);
    }, [tick, isDeleting, deleteSpeed, typeSpeed]);

    return (
        <span className="typing-animation">
            <span className="typing-text">{displayText}</span>
            <span className="typing-cursor">|</span>
        </span>
    );
};

export default TypingAnimation;