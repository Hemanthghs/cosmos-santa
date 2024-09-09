import React, {
  useRef,
  useState,
  useEffect,
  MouseEvent,
  TouchEvent,
} from "react";

const DrawingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.strokeStyle = "#ff"; // Set line color to black
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.lineWidth = 5; // Set the initial line width
      ctx.fillStyle = "#fff"; // Background color
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  const handleMouseDown = (event: MouseEvent<HTMLCanvasElement>) => {
    event.preventDefault(); // Prevent default behavior
    setIsDrawing(true);
    setLastX(event.nativeEvent.offsetX);
    setLastY(event.nativeEvent.offsetY);
  };

  const handleMouseMove = (event: MouseEvent<HTMLCanvasElement>) => {
    event.preventDefault(); // Prevent default behavior
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
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
    event.preventDefault(); // Prevent default behavior
    setIsDrawing(false);
  };

  // For touch events
  const handleTouchStart = (event: TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault(); // Prevent default behavior
    const touch = event.touches[0];
    setIsDrawing(true);
    setLastX(touch.clientX - canvasRef.current!.offsetLeft);
    setLastY(touch.clientY - canvasRef.current!.offsetTop);
  };

  const handleTouchMove = (event: TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault(); // Prevent default behavior
    if (!isDrawing) return;
    const touch = event.touches[0];
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(
        touch.clientX - canvas.offsetLeft,
        touch.clientY - canvas.offsetTop
      );
      ctx.stroke();
    }
    setLastX(touch.clientX - canvas.offsetLeft);
    setLastY(touch.clientY - canvas.offsetTop);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault(); // Prevent default behavior
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Reset background color to white
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  const submitDrawing = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Convert canvas to base64 encoded image
    const imageData = canvas.toDataURL("image/png");
    console.log("Submitting...");
  };

  return (
    <div className="flex justify-center">
      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
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
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Clear
        </button>
        <button
          onClick={submitDrawing}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default DrawingCanvas;
