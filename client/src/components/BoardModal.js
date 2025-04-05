import React, { useState } from 'react';

const Modal = ({ onClose, onSubmit, error }) => {
    const [formData, setFormData] = useState({ name: '' });

    const onChange = (e) => {
        setFormData({
            name: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-4 rounded shadow-lg w-1/3">
                <h2 className="text-lg font-bold mb-4">Add New Board</h2>
                {error && <div className="text-red-500 mb-2">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={onChange}
                        className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
                        placeholder="Board Name"
                        required
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
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;