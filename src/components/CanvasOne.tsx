import React, { useEffect, useRef } from 'react';
import '../styles/CanvasOne.css';
import EffectOne from '../assets/EffectOne';

interface MainProps {
  mode: string;
}

const CanvasOne: React.FC<MainProps> = ({ mode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 500;
    canvas.height = 300;

    const effect = new EffectOne(canvas, ctx);
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      effect.render();
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = 500;
      canvas.height = 300;
      effect.resize(canvas.width, canvas.height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`CanvasOne ${mode}`}>
      <canvas ref={canvasRef} id="canvas1"></canvas>
    </div>
  );
};

export default CanvasOne;