import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBoard, getBoards, changeActiveBoard } from '../redux/slices/boardSlice';
import BoardModal from './BoardModal';


const LeftNavBar = () => {
    const dispatch = useDispatch();
    const { boards, activeBoard, loading, error } = useSelector((state) => state.boards);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(getBoards());
    }, [dispatch]);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }


    const handleCreateBoard = async (taskData) => {
        try {
            await dispatch(createBoard(taskData));
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error creating board:', error);
        }
    };

    const changeActiveBoardHandler = (_id) => {
        dispatch(changeActiveBoard(_id));
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="w-64 h-screen bg-gray-900 text-white p-4">
            <h2 className="text-xl font-bold mb-4">kanban</h2>
            <div className="space-y-2">
                <div>All Boards ({boards.length ? boards.length : 0})</div>
                {boards?.map((board) => (
                    <div
                        onClick={() => changeActiveBoardHandler(board?._id)}
                        key={board._id}
                        style={{
                            border: activeBoard?._id === board._id ? '2px solid white' : 'none',
                        }}
                        className="p-2 rounded hover:bg-gray-700 cursor-pointer"
                    >
                        {board.name}
                    </div>
                ))}
                <div
                    className="p-2 rounded hover:bg-gray-700 cursor-pointer"
                    onClick={toggleModal}
                >
                    + Create New Board
                </div>
            </div>
            {isModalOpen && (
                <BoardModal
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleCreateBoard}
                    error={error}
                />
            )}
        </div>
    );
};

export default LeftNavBar;