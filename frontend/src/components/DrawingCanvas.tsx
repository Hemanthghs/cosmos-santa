import React, { useRef, useState, useEffect, MouseEvent, TouchEvent } from 'react';

const DrawingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const windowInnerWidth = window.innerWidth;
          let widthPercent = 0.85;
          let heightPercent = 0.7;
          // Set canvas dimensions and scale
          if(windowInnerWidth > 1000) {
            widthPercent = 0.65;
          }
          if(windowInnerWidth > 1600) {
            widthPercent = 0.5;
          }
          canvas.style.width = `${window.innerWidth*widthPercent}px`;
          canvas.style.height = `${window.innerHeight*heightPercent}px`;
          const scale = window.devicePixelRatio;
          canvas.width = Math.floor(window.innerWidth*widthPercent * scale);
          canvas.height = Math.floor(window.innerHeight*heightPercent * scale);
          ctx.scale(scale, scale);
          ctx.fillStyle = '#fff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }
    };

    handleResize(); // Initial resize
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMouseDown = (event: MouseEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    setIsDrawing(true);
    setLastX(event.nativeEvent.offsetX);
    setLastY(event.nativeEvent.offsetY);
  };

  const handleMouseMove = (event: MouseEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
      ctx.stroke();
    }
    setLastX(event.nativeEvent.offsetX);
    setLastY(event.nativeEvent.offsetY);
  };

  const handleMouseUpOrLeave = (event: MouseEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    setIsDrawing(false);
  };

  const handleTouchStart = (event: TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    const touch = event.touches[0];
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (canvas) {
      setLastX(touch.clientX - canvas.getBoundingClientRect().left);
      setLastY(touch.clientY - canvas.getBoundingClientRect().top);
    }
  };

  const handleTouchMove = (event: TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    if (!isDrawing) return;
    const touch = event.touches[0];
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(touch.clientX - canvas.getBoundingClientRect().left, touch.clientY - canvas.getBoundingClientRect().top);
      ctx.stroke();
    }
    setLastX(touch.clientX - canvas.getBoundingClientRect().left);
    setLastY(touch.clientY - canvas.getBoundingClientRect().top);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const submitDrawing = async () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const imageData = canvas.toDataURL('image/png');
      console.log('Submitting...', imageData);
    }
  };

  return (
    <div className="flex justify-center items-center bg-[#09090a]">
      <div className="relative">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
        <button
          onClick={clearCanvas}
          className="absolute top-4 left-4 bg-[#7f5ced] text-white p-2 rounded"
        >
          Clear
        </button>
        <button
          onClick={submitDrawing}
          className="absolute top-4 right-4 bg-[#7f5ced] text-white p-2 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default DrawingCanvas;
