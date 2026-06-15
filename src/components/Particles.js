import React, { useEffect, useRef, useCallback } from 'react';

const Particles = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: null, y: null, radius: 150 });
    const burstParticlesRef = useRef([]);

    const addBurst = useCallback((x, y, hue) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        for (let i = 0; i < 12; i++) {
            const angle = (Math.PI * 2 * i) / 12 + Math.random() * 0.5;
            const speed = 1 + Math.random() * 3;
            burstParticlesRef.current.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: Math.random() * 3 + 1,
                life: 1,
                hue: Math.random() > 0.5 ? 180 : 300,
            });
        }
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationId;
        let particles = [];
        let frameCount = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const handleMouseMove = (e) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
            // Random color burst on mouse move (throttled by frame)
            if (frameCount % 5 === 0 && Math.random() > 0.7) {
                addBurst(
                    e.clientX + (Math.random() - 0.5) * 40,
                    e.clientY + (Math.random() - 0.5) * 40,
                    Math.random() > 0.5 ? 180 : 300
                );
            }
        };

        const handleMouseLeave = () => {
            mouseRef.current.x = null;
            mouseRef.current.y = null;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.8;
                this.speedY = (Math.random() - 0.5) * 0.8;
                this.opacity = Math.random() * 0.6 + 0.1;
                this.hue = Math.random() > 0.5 ? 180 : 300;
                this.pulseSpeed = 0.01 + Math.random() * 0.03;
                this.pulsePhase = Math.random() * Math.PI * 2;
                this.baseSize = this.size;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Boundary wrap
                if (this.x < -10) this.x = canvas.width + 10;
                if (this.x > canvas.width + 10) this.x = -10;
                if (this.y < -10) this.y = canvas.height + 10;
                if (this.y > canvas.height + 10) this.y = -10;

                // Pulsing size
                this.pulsePhase += this.pulseSpeed;
                this.size = this.baseSize + Math.sin(this.pulsePhase) * 0.5;

                // Mouse interaction - repel from cursor
                const mouse = mouseRef.current;
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.radius && dist > 0) {
                        const force = (mouse.radius - dist) / mouse.radius;
                        const angle = Math.atan2(dy, dx);
                        this.x += Math.cos(angle) * force * 2;
                        this.y += Math.sin(angle) * force * 2;
                    }
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                const glow = Math.sin(this.pulsePhase) * 0.3 + 0.7;
                ctx.fillStyle = `hsla(${this.hue}, 100%, 60%, ${this.opacity * glow})`;
                ctx.fill();

                // Glow effect
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${this.hue}, 100%, 60%, ${this.opacity * 0.1})`;
                ctx.fill();
            }
        }

        const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 12000));
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            frameCount++;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw random floating orbs
            if (frameCount % 120 === 0) {
                const orbX = Math.random() * canvas.width;
                const orbY = Math.random() * canvas.height;
                const orbRadius = 100 + Math.random() * 200;
                const gradient = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, orbRadius);
                const hue = Math.random() > 0.5 ? 180 : 300;
                gradient.addColorStop(0, `hsla(${hue}, 100%, 60%, 0.03)`);
                gradient.addColorStop(1, `hsla(${hue}, 100%, 60%, 0)`);
                ctx.fillStyle = gradient;
                ctx.fillRect(orbX - orbRadius, orbY - orbRadius, orbRadius * 2, orbRadius * 2);
            }

            // Update & draw particles
            particles.forEach((p) => {
                p.update();
                p.draw();
            });

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        const avgHue = (particles[i].hue + particles[j].hue) / 2;
                        ctx.strokeStyle = `hsla(${avgHue}, 100%, 60%, ${0.15 * (1 - dist / 150)})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }

            // Update & draw burst particles
            const burstList = burstParticlesRef.current;
            for (let i = burstList.length - 1; i >= 0; i--) {
                const bp = burstList[i];
                bp.x += bp.vx;
                bp.y += bp.vy;
                bp.life -= 0.02;
                bp.vx *= 0.98;
                bp.vy *= 0.98;
                if (bp.life <= 0) {
                    burstList.splice(i, 1);
                    continue;
                }
                ctx.beginPath();
                ctx.arc(bp.x, bp.y, bp.size * bp.life, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${bp.hue}, 100%, 70%, ${bp.life * 0.8})`;
                ctx.fill();
                // Glow
                ctx.beginPath();
                ctx.arc(bp.x, bp.y, bp.size * bp.life * 4, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${bp.hue}, 100%, 70%, ${bp.life * 0.1})`;
                ctx.fill();
            }

            animationId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationId);
        };
    }, [addBurst]);

    return <canvas ref={canvasRef} id="particles-canvas" />;
};

export default Particles;