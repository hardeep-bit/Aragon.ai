import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, createTask } from '../redux/slices/taskSlice';
import TaskComponent from './TaskComponent';
import Modal from './Modal';

const TaskListComponent = ({ boardId }) => {
    const dispatch = useDispatch();
    const { tasks, loading, error } = useSelector((state) => state.tasks);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(getTasks(boardId));
    }, [dispatch, boardId]);

    const handleAddTask = () => {
        setIsModalOpen(true);
    };

    const handleCreateTask = async (taskData) => {
        try {
            await dispatch(createTask({ ...taskData, boardId }));
            setIsModalOpen(false);
        } catch (error) {

        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const segregatedTasks = {
        todo: tasks.filter((t) => t.status === 'todo'),
        doing: tasks.filter((t) => t.status === 'doing'),
        done: tasks.filter((t) => t.status === 'done'),
    };

    return (
        <div className="flex space-x-4 p-4">
            {['todo', 'doing', 'done'].map((status) => (
                <div key={status} className="w-1/3">
                    <h3 className="text-lg font-bold mb-2 capitalize">{status} ({segregatedTasks[status].length})</h3>
                    {segregatedTasks[status].map((task) => (
                        <TaskComponent key={task._id} task={task} />
                    ))}
                    <button
                        className="mt-2 p-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                        onClick={handleAddTask}
                    >
                        + Add New Task
                    </button>
                </div>
            ))}
            {isModalOpen && (
                <Modal
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleCreateTask}
                    initialData={{ name: '', status: 'todo', boardId }}
                    error={error}
                />
            )}
        </div>
    );
};

export default TaskListComponent;