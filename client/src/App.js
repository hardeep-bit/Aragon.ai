import React from 'react';
import LeftNavBar from './components/LeftNavBar';
import TaskListComponent from './components/TaskListComponent';
import { useSelector } from 'react-redux';
import Modal from './components/TaskModal';
import { useDispatch } from 'react-redux';
import { createTask } from './redux/slices/taskSlice';


function App() {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const { boards, activeBoard, loading, error } = useSelector((state) => state.boards);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleCreateTask = async (taskData) => {
        try {
            await dispatch(createTask({ ...taskData, boardId: activeBoard._id }));
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error creating board:', error);
        }
    };


    return (
        <div className="flex h-screen bg-gray-900 text-white p-4">
            <LeftNavBar />
            <div className='flex flex-col flex-1'>
                <div className='flex'>
                    <h1 className="text-2xl font-bold mb-4">Platform Launch</h1>
                    <div className='ml-auto'>
                        <button
                            disabled={activeBoard === null}
                            className="p-2 rounded hover:bg-gray-700 cursor-pointer"
                            onClick={toggleModal}
                        >
                            + Create New Task
                        </button>
                    </div>
                </div>
                <TaskListComponent />
            </div>
            {isModalOpen && (
                <Modal
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleCreateTask}
                    error={error}
                />
            )}
        </div>
    );
}

export default App;