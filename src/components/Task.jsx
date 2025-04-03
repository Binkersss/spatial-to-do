import React, { useRef, useEffect } from 'react';
import '../styles/Task.css';

const Task = ({ task }) => {
  const taskRef = useRef(null);
  const position = useRef({ x: task.position.x, y: task.position.y });
  const isDragging = useRef(false);

  useEffect(() => {
    const taskElement = taskRef.current;

    const handleMouseDown = (e) => {
      e.stopPropagation(); // Prevent the event from propagating to the Space component
      isDragging.current = true;
      position.current.startX = e.clientX - position.current.x;
      position.current.startY = e.clientY - position.current.y;
      taskElement.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      position.current.x = e.clientX - position.current.startX;
      position.current.y = e.clientY - position.current.startY;
      taskElement.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      taskElement.style.cursor = 'grab';
    };

    // Add event listeners
    taskElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Cleanup event listeners on unmount
    return () => {
      taskElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [task]);

  return (
    <div
      ref={taskRef}
      className="task"
      style={{
        position: 'absolute',
        transform: `translate(${position.current.x}px, ${position.current.y}px)`,
        cursor: 'grab',
      }}
    >
      {task.name}
    </div>
  );
};

export default Task;
