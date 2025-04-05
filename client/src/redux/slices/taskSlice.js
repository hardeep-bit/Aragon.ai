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
        const response = await axios.get(`http://localhost:9000/api/tasks?boardId=${boardId}`);
        return response.data;
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
                state.tasks.push(action.payload);
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
                state.tasks = action.payload;
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default taskSlice.reducer;