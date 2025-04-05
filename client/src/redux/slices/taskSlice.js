import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createTask = createAsyncThunk('tasks/createTask', async (taskData, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:9000/api/tasks', taskData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Failed to create task');
    }
});

export const getTasks = createAsyncThunk('tasks/getTasks', async (boardId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`http://localhost:9000/api/tasks/board/${boardId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Failed to fetch tasks');
    }
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId, { rejectWithValue }) => {
    try {
        await axios.delete(`http://localhost:9000/api/tasks/${taskId}`);
        return taskId;
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Failed to fetch tasks');
    }
});

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.loading = false;

                if (!action.payload.isSuccess) {
                    return alert(action.payload.error)
                }

                state.tasks = [...state.tasks, action.payload.data];
            })
            .addCase(createTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload.items;
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                const newTaskList = state.tasks.filter((task) => task._id !== action.payload);
                state.loading = false;
                state.tasks = newTaskList;
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default taskSlice.reducer;