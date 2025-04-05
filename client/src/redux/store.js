import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './slices/boardSlice';
import taskReducer from './slices/taskSlice';

export const store = configureStore({
    reducer: {
        boards: boardReducer,
        tasks: taskReducer,
    },
});

export default store;