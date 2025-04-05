import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Modal = ({ onClose, onSubmit, error, listItem }) => {
    const { activeBoard } = useSelector((state) => state.boards);
    const [formData, setFormData] = useState({ name: listItem?.name || '', status: listItem?.status || 'todo' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const onChange = (e) => {
        const data = {
            ...formData,
            [e.target.id]: e.target.value,
        }

        if (!listItem) {
            data.boardId = activeBoard._id;
        }

        setFormData(data);
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-4 rounded shadow-lg w-1/3">
                <h2 className="text-lg font-bold mb-4">Add New Task</h2>
                {error && <div className="text-red-500 mb-2">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={formData.name}
                        id='name'
                        onChange={onChange}
                        className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
                        placeholder="Task Name"
                        required
                    />
                    <select
                        value={formData.status}
                        id='status'
                        onChange={onChange}
                        className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
                    >
                        <option value="todo">To Do</option>
                        <option value="doing">Doing</option>
                        <option value="done">Done</option>
                    </select>
                    <input
                        type="text"
                        value={activeBoard.name}
                        disabled
                        className="w-full p-2 mb-2 bg-gray-600 text-white rounded"
                        placeholder="Board Name"
                    />
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Save Task {listItem ? 'Changes' : ''}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;