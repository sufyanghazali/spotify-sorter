import React, { useRef, useState, useEffect } from "react";

const BezierCurveEditor = () => {
  const canvasRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [selectedPointIndex, setSelectedPointIndex] = useState(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.strokeStyle = "#000";
    context.lineWidth = 2;
  }, []);

  const handleCanvasClick = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const newPoint = { x: offsetX, y: offsetY };
    setPoints([...points, newPoint]);
  };

  const handlePointClick = (index) => {
    setSelectedPointIndex(index);
  };

  const handleMouseMove = ({ nativeEvent }) => {
    if (dragging && selectedPointIndex !== null) {
      const { offsetX, offsetY } = nativeEvent;
      const newPoints = [...points];
      newPoints[selectedPointIndex] = { x: offsetX, y: offsetY };
      setPoints(newPoints);
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handlePointMouseDown = (index) => {
    setSelectedPointIndex(index);
    setDragging(true);
  };

  const drawCurve = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length - 2; i++) {
      const xc = (points[i].x + points[i + 1].x) / 2;
      const yc = (points[i].y + points[i + 1].y) / 2;
      context.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }
    context.quadraticCurveTo(
      points[points.length - 2].x,
      points[points.length - 2].y,
      points[points.length - 1].x,
      points[points.length - 1].y
    );
    context.stroke();
    points.forEach((point, index) => {
      context.beginPath();
      context.arc(point.x, point.y, 5, 0, 2 * Math.PI);
      context.fillStyle = selectedPointIndex === index ? "#f00" : "#000";
      context.fill();
      context.stroke();
      context.closePath();
    });
  };

  useEffect(() => {
    drawCurve();
  }, [points, selectedPointIndex]);

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={500}
      onClick={handleCanvasClick}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleCanvasClick}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
      onContextMenu={(e) => e.preventDefault()}
    >
      <p>
        Your browser does not support the HTML canvas element. Please try using
        a different browser.
      </p>
    </canvas>
  );
};

export default BezierCurve;
