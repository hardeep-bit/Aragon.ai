import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createBoard = createAsyncThunk('boards/createBoard', async (name, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:9000/api/boards', { name });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Failed to create board');
    }
});

export const getBoards = createAsyncThunk('boards/getBoards', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('http://localhost:9000/api/boards');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Failed to fetch boards');
    }
});

const boardSlice = createSlice({
    name: 'boards',
    initialState: {
        boards: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createBoard.pending, (state) => {
                state.loading = true;
            })
            .addCase(createBoard.fulfilled, (state, action) => {
                state.loading = false;
                state.boards.push(action.payload);
            })
            .addCase(createBoard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getBoards.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBoards.fulfilled, (state, action) => {
                state.loading = false;
                state.boards = action.payload;
            })
            .addCase(getBoards.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default boardSlice.reducer;