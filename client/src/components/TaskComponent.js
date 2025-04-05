import React from 'react';
import { deleteTask, updateTask } from '../redux/slices/taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import TaskModal from './TaskModal';

const TaskComponent = ({ task }) => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const { error } = useSelector((state) => state.tasks);

    const handleDeleteTask = async (taskId) => {
        dispatch(deleteTask(taskId));
    };

    const handleUpdateTask = async (taskData) => {
        debugger
        dispatch(updateTask(task._id, taskData));
    };

    const handleModal = async (bool) => {
        setIsModalOpen(bool)
    };

    return (
        <div className="bg-gray-800 p-4 rounded mb-2 hover:bg-gray-700">
            <div>{task.name}</div>
            <button
                className="mt-2 p-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => handleDeleteTask(task._id)}
            >
                Delete
            </button>
            <button
                className="mt-2 p-1 bg-blue-500 text-white rounded hover:bg-blue-600 ml-2"
                onClick={() => handleModal(true)}
            >
                Edit
            </button>

            {isModalOpen && (
                <TaskModal
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleUpdateTask}
                    error={error}
                    listItem={task}
                />
            )}
        </div>
    );
};

export default TaskComponent;