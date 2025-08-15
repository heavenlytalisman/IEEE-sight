import React, { useRef, useEffect } from 'react';
import './BackgroundEffects.scss';
import shapesData from './shapesData'; // stores SVGs and parallax depths

const BackgroundEffects = () => {
  const canvasRef = useRef();
  const shapesRef = useRef([]);

  // Particle Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrame;

    const initParticles = () => {
      particles = Array.from({ length: 500 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
        dx: (Math.random() - 0.5) * 0.2,
        dy: (Math.random() - 0.5) * 0.2,
      }));
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    window.addEventListener('resize', resize);
    resize();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      });
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Parallax on mousemove
  useEffect(() => {
    const handleMove = ({ clientX, clientY }) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const offsetX = (clientX - centerX) / centerX;
      const offsetY = (clientY - centerY) / centerY;
      shapesRef.current.forEach(({ el, depth }) => {
        if (el) {
          const moveX = offsetX * depth * 20;
          const moveY = offsetY * depth * 20;
          el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        }
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="background-effects">
      <canvas ref={canvasRef} className="particle-canvas" />
      <div className="gradient-overlay" />
      {shapesData.map((shape, idx) => (
        <div
          key={idx}
          className="shape-layer"
          ref={el => (shapesRef.current[idx] = { el, depth: shape.depth })}
          dangerouslySetInnerHTML={{ __html: shape.svg }}
        />
      ))}
      <div className="glow-overlay" />
    </div>
  );
};

export default BackgroundEffects;
