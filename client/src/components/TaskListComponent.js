import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, } from '../redux/slices/taskSlice';
import TaskComponent from './TaskComponent';

const TaskListComponent = () => {
    const dispatch = useDispatch();
    const { activeBoard } = useSelector((state) => state.boards);
    const { tasks, loading, error } = useSelector((state) => state.tasks);

    useEffect(() => {
        if (activeBoard) {
            dispatch(getTasks(activeBoard?._id));
        }
    }, [dispatch, JSON.stringify(activeBoard)]);

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
                </div>
            ))}
        </div>
    );
};

export default TaskListComponent;