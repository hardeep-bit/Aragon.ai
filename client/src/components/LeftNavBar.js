import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBoards } from '../redux/slices/boardSlice';

const LeftNavBar = () => {
    const dispatch = useDispatch();
    const { boards, loading, error } = useSelector((state) => state.boards);

    useEffect(() => {
        dispatch(getBoards());
    }, [dispatch]);

    const handleCreateBoard = () => {
        // Logic to open modal for creating board
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="w-64 h-screen bg-gray-900 text-white p-4">
            <h2 className="text-xl font-bold mb-4">kanban</h2>
            <div className="space-y-2">
                <div>All Boards ({boards.length})</div>
                {boards?.items?.map((board) => (
                    <div
                        key={board._id}
                        className="p-2 rounded hover:bg-gray-700 cursor-pointer"
                    >
                        {board.name}
                    </div>
                ))}
                <div
                    className="p-2 rounded hover:bg-gray-700 cursor-pointer"
                    onClick={handleCreateBoard}
                >
                    + Create New Board
                </div>
            </div>
        </div>
    );
};

export default LeftNavBar;