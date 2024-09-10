import React, {
  useRef,
  useState,
  useEffect,
  MouseEvent,
  TouchEvent,
} from "react";

const STROKE_WIDTH = 3;

const DrawingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const windowInnerWidth = window.innerWidth;
          let widthPercent = 0.65;
          let heightPercent = 0.7;
          let fixedHeight = 400;

          if (windowInnerWidth < 650) {
            widthPercent = 0.8;
          }
          if (windowInnerWidth > 1000) {
            widthPercent = 0.5;
          }

          canvas.style.width = `${window.innerWidth * widthPercent}px`;

          if (windowInnerWidth < 1000) {
            canvas.style.height = `${fixedHeight}px`;
          } else {
            canvas.style.height = `${window.innerHeight * heightPercent}px`;
          }

          const scale = window.devicePixelRatio;
          canvas.width = Math.floor(window.innerWidth * widthPercent * scale);

          if (windowInnerWidth < 1000) {
            canvas.height = Math.floor(fixedHeight * scale);
          } else {
            canvas.height = Math.floor(
              window.innerHeight * heightPercent * scale
            );
          }

          ctx.scale(scale, scale);
          ctx.fillStyle = "#fff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
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

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.lineWidth = STROKE_WIDTH;
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

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.lineWidth = STROKE_WIDTH;
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(
        touch.clientX - canvas.getBoundingClientRect().left,
        touch.clientY - canvas.getBoundingClientRect().top
      );
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
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const submitDrawing = async () => {
    const canvas = canvasRef.current;
    if (canvas) {
      console.log("Submitting...");
      clearCanvas();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="picture flex-1 flex justify-center items-center">
          <img className="w-[70%] rounded-lg" src="/sample-picture-2.jpg" />
        </div>
        <div className="drawing flex-1 flex justify-center flex-col gap-4 items-center bg-[#09090a]">
          <div className="relative">
            <canvas
              className="rounded-lg"
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
              className="absolute top-4 right-4 bg-[#0df128a5] text-white p-2 rounded flex items-center"
            >
              <span className="mr-2 text-white">&#10006;</span>
              Clear
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={submitDrawing}
          className="bg-[#0df128a5] text-white p-2 rounded"
        >
          Submit Drawing
        </button>
      </div>
    </div>
  );
};

export default DrawingCanvas;
