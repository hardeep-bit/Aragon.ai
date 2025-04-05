import React from 'react';

const TaskComponent = ({ task, onDelete, onUpdate }) => {
    return (
        <div className="bg-gray-800 p-4 rounded mb-2 hover:bg-gray-700">
            <div>{task.name}</div>
            <button
                className="mt-2 p-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => onDelete(task._id)}
            >
                Delete
            </button>
            <button
                className="mt-2 p-1 bg-blue-500 text-white rounded hover:bg-blue-600 ml-2"
                onClick={() => onUpdate(task._id)}
            >
                Edit
            </button>
        </div>
    );
};

export default TaskComponent;