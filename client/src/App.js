import React from 'react';
import LeftNavBar from './components/LeftNavBar';
import TaskListComponent from './components/TaskListComponent';

function App() {
    const [selectedBoardId, setSelectedBoardId] = React.useState(null); // Logic to select board

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            <LeftNavBar />
            <div className="flex-1 p-4">
                <h1 className="text-2xl font-bold mb-4">Platform Launch</h1>
                <TaskListComponent boardId={selectedBoardId || 'someBoardId'} />
            </div>
        </div>
    );
}

export default App;