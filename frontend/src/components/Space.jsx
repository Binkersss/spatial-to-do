import React, { useRef, useEffect, useState } from 'react';
import Task from './Task';
import '../styles/Space.css';

const Space = ({ space }) => {
  const spaceRef = useRef(null);
  const contentRef = useRef(null);
  const isTaskDragging = useRef(false); // Flag to track if a task is being dragged
  const [tasks, setTasks] = useState(space.tasks);

  useEffect(() => {
    const spaceElement = spaceRef.current;
    const contentElement = contentRef.current;

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let scale = 1;

    // Handle mouse down for dragging
    const handleMouseDown = (e) => {
      if (isTaskDragging.current) return; // Prevent dragging the space if a task is being dragged
      isDragging = true;
      startX = e.clientX - currentX;
      startY = e.clientY - currentY;
      spaceElement.style.cursor = 'grabbing';
    };

    // Handle mouse move for dragging
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      currentX = e.clientX - startX;
      currentY = e.clientY - startY;
      contentElement.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
    };

    // Handle mouse up to stop dragging
    const handleMouseUp = () => {
      isDragging = false;
      spaceElement.style.cursor = 'grab';
    };

    // Handle wheel for zooming
    const handleWheel = (e) => {
      e.preventDefault();
      const scaleChange = e.deltaY > 0 ? 0.9 : 1.1;
      scale = Math.max(0.1, Math.min(scale * scaleChange, 5)); // Clamp zoom level
      contentElement.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
    };

    // Add event listeners
    spaceElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    spaceElement.addEventListener('wheel', handleWheel);

    // Cleanup event listeners on unmount
    return () => {
      spaceElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      spaceElement.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const addTask = () => {
    const newTask = {
      id: Date.now(), // Unique ID based on timestamp
      name: `Task ${tasks.length + 1}`,
      position: { x: 50, y: 50 }, // Default position
    };
    setTasks([...tasks, newTask]); // Add the new task to the tasks array
  };

  if (!space || !space.tasks) {
    return <div>No tasks available</div>;
  }

  return (
    <div
      ref={spaceRef}
      className="space"
      style={{
        position: 'relative',
        width: '800px',
        height: '600px',
        overflow: 'hidden',
        cursor: 'grab',
      }}
    >
      <div
        ref={contentRef}
        className="space-content"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          transform: 'translate(0px, 0px) scale(1)',
          transformOrigin: 'center',
        }}
      >
        {/* Render the static grid */}
        <div className="grid"></div>

        {/* Render tasks */}
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onDragStart={() => (isTaskDragging.current = true)} // Set flag when task starts dragging
            onDragEnd={() => (isTaskDragging.current = false)} // Reset flag when task stops dragging
          />
        ))}
      </div>
      <button className="add-task-button" onClick={addTask}>
        Add Task
      </button>
    </div>
  );
};

export default Space;
