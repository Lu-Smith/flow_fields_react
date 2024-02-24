import React, { useEffect, useRef } from 'react';
import '../styles/CanvasFour.css';
import EffectFour from '../assets/EffectFour';

interface MainProps {
  mode: string;
}

const CanvasFour: React.FC<MainProps> = ({ mode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if ( window.innerWidth > 520) {
      canvas.width = 500;
      canvas.height = 300;
    } else {
      canvas.width = 300;
      canvas.height = 300;
    }

    const effect = new EffectFour(canvas, ctx);
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      effect.render();
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if ( window.innerWidth > 520) {
        canvas.width = 500;
        canvas.height = 300;
      } else {
        canvas.width = 300;
        canvas.height = 300;
      }
      effect.resize(canvas.width, canvas.height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`CanvasFour ${mode}`}>
      <canvas ref={canvasRef} id="canvas1"></canvas>
    </div>
  );
};

export default CanvasFour;