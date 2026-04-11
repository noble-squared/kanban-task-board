import React from 'react';
import { useState } from 'react';
import type { Task } from '../types';

interface TaskComponentProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  task: Task;
} 
 
//const TaskComponent: React.FC = () => {
const TaskComponent = React.forwardRef<HTMLButtonElement, TaskComponentProps>(
  ({ className, task, ...props }, ref) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div className="bg-indigo-800 shadow-md rounded-lg">
      <button className="w-full p-4 text-left" onClick={() => setExpanded(!expanded)} {...props} ref={ref}>
        <>
        {task.label && <p className="w-fit text-sm text-black bg-green-500"> {task.label} </p>}
        <h3 className="text-lg font-bold">{task.title}</h3>
        </>
      </button>
      {expanded && (
        <div className="bg-indigo-300 text-gray-700">
          <p>Description:</p>
          <p>{task.description}</p>
          {task.due_date && <p>Due date: {task.due_date.toDateString()}</p>}
          {task.priority && <p>Priority: {task.priority}</p>}
        </div>
      )}
    </div>
  );
});
 
export default TaskComponent;